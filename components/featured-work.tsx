"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { projects } from "@/lib/projects";
import { WorkTile } from "./work-tile";

// shared outlined-pill button (matches the "See all work" button in case studies)
export const pillButton =
  "inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink/5";

export function FeaturedWork() {
  const featured = projects.slice(0, 6);

  // fade the whole section in as it scrolls into view, out as it leaves
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // alternating-column parallax — only on desktop (the 3-col grid)
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: gridProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  const yUp = useTransform(gridProgress, [0, 1], [60, -60]);
  const yDown = useTransform(gridProgress, [0, 1], [-60, 60]);

  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
        <div className="hidden sm:block">
          <Link href="/work" className={pillButton}>
            View all {projects.length} projects
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* 1 col on mobile, 2 on tablet, 3 on desktop (6 projects = 3 + 3).
          On desktop the middle column drifts opposite the outer two on scroll. */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
      >
        {featured.map((p, i) => (
          <motion.div
            key={p.slug}
            style={{ y: desktop ? (i % 3 === 1 ? yDown : yUp) : 0 }}
          >
            <WorkTile project={p} ratio="aspect-[4/3]" />
          </motion.div>
        ))}
      </div>

      {/* mobile-only: button sits below the projects, centered */}
      <div className="mt-12 flex justify-center sm:hidden">
        <Link href="/work" className={pillButton}>
          View all {projects.length} projects
          <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.section>
  );
}
