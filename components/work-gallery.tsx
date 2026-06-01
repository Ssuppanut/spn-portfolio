"use client";

import { useState } from "react";
import { categories, projects, type Category } from "@/lib/projects";
import { WorkMasonry } from "./work-masonry";

type Filter = "All" | Category;
const filters: Filter[] = ["All", ...categories];

export function WorkGallery() {
  const [active, setActive] = useState<Filter>("All");
  const shown =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-16 md:mb-24">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              active === f
                ? "bg-ink text-paper border-ink"
                : "border-line text-muted hover:text-ink hover:border-ink/40"
            }`}
          >
            {f}
            <span className="ml-2 font-mono text-xs opacity-60">
              {f === "All"
                ? projects.length
                : projects.filter((p) => p.category === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* key on the filter remounts the masonry so reveals + offsets re-run */}
      <WorkMasonry key={active} projects={shown} />
    </div>
  );
}
