"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { projects } from "@/lib/projects";
import { WorkMasonry } from "./work-masonry";

// shared gray pill-button style (matches the footer "Get in Touch" shape)
export const pillButton =
  "inline-flex items-center gap-2 rounded-xl bg-ink/10 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-ink/20";

export function FeaturedWork() {
  const featured = projects.slice(0, 8);

  // fade the whole section in as it scrolls into view, out as it leaves
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.section
      ref={ref}
      id="work"
      style={{ opacity }}
      className="px-gutter mt-24 md:mt-40"
    >
      {/* heading + action on one row */}
      <div className="mb-10 flex items-center justify-between gap-4 lg:mb-14">
        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="display text-[clamp(1.75rem,5vw,3.75rem)]"
        >
          work
        </motion.h3>
        <Link href="/work" className={pillButton}>
          View all {projects.length} projects
        </Link>
      </div>

      <WorkMasonry projects={featured} />
    </motion.section>
  );
}
