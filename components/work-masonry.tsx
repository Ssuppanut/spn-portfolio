"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { type Project } from "@/lib/projects";
import { WorkTile } from "./work-tile";

// every tile uses the same ratio as BITKUB NEXT
const TILE_RATIO = "aspect-[5/4]";

function colsForWidth(w: number) {
  if (w < 640) return 1;
  if (w < 1024) return 2;
  return 4;
}

// per-column top offset (px) creating Podium's scattered column starts
function offsetsFor(cols: number) {
  if (cols >= 4) return [0, 96, 40, 152];
  if (cols === 2) return [0, 80];
  return [0];
}

export function WorkMasonry({ projects }: { projects: Project[] }) {
  const [cols, setCols] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  // alternating column parallax — even columns drift up, odd columns drift down
  const yUp = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const yDown = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  useEffect(() => {
    const update = () => setCols(colsForWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const columns: Project[][] = Array.from({ length: cols }, () => []);
  projects.forEach((p, i) => columns[i % cols].push(p));
  const offsets = offsetsFor(cols);

  return (
    <div
      ref={containerRef}
      className="flex items-start gap-5 overflow-hidden pb-30 lg:gap-8"
    >
      {columns.map((col, ci) => (
        <motion.div
          key={ci}
          className="flex min-w-0 flex-1 flex-col gap-14 lg:gap-24"
          style={{
            marginTop: offsets[ci % offsets.length] ?? 0,
            // no parallax on mobile (single column)
            y: cols === 1 ? 0 : ci % 2 === 0 ? yUp : yDown,
          }}
        >
          {col.map((p) => (
            <WorkTile key={p.slug} project={p} ratio={TILE_RATIO} />
          ))}
        </motion.div>
      ))}
    </div>
  );
}
