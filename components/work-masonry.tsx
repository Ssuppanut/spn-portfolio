"use client";

import { useEffect, useState } from "react";
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
    <div className="flex items-start gap-5 lg:gap-8">
      {columns.map((col, ci) => (
        <div
          key={ci}
          className="flex min-w-0 flex-1 flex-col gap-14 lg:gap-24"
          style={{ marginTop: offsets[ci % offsets.length] ?? 0 }}
        >
          {col.map((p) => (
            <WorkTile key={p.slug} project={p} ratio={TILE_RATIO} />
          ))}
        </div>
      ))}
    </div>
  );
}
