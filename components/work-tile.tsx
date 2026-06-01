"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import type { Project } from "@/lib/projects";
import { ProjectMedia } from "./project-media";

/**
 * A single project in the Podium-style staggered masonry grid:
 * - variable aspect ratio (drives the masonry stagger)
 * - image drifts (parallax) and scales on hover
 * - caption: big uppercase title (left) + year / client (right)
 */
export function WorkTile({
  project,
  ratio = "aspect-[4/3]",
}: {
  project: Project;
  ratio?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        <div
          ref={frameRef}
          className={`relative ${ratio} w-full overflow-hidden rounded-md`}
        >
          <motion.div
            style={{ y }}
            className="absolute inset-0 scale-[1.18] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.26]"
          >
            <ProjectMedia
              src={`/work/${project.slug}/cover.jpg`}
              accent={project.accent}
              accentText={project.accentText}
              label={project.title}
              className="h-full w-full"
            />
          </motion.div>
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
        </div>

        {/* caption */}
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="title-strong text-xl md:text-2xl leading-none transition-transform duration-500 group-hover:translate-x-1">
            {project.title}
          </h3>
          <div className="shrink-0 text-right font-mono text-[0.7rem] uppercase tracking-wider text-muted leading-tight">
            <span className="block">{project.year}</span>
            <span className="block">{project.client}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
