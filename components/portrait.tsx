"use client";

import { useState } from "react";

/**
 * Circular profile photo. Shows a clean placeholder (initials) until a real
 * image is dropped at the given `src` (e.g. /public/portrait.jpg), which then
 * fades in. No broken-image flash while the file is missing.
 */
export function Portrait({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const initials = label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative overflow-hidden rounded-full border border-line bg-ink/5 ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center text-muted">
        <span
          className="font-mono font-semibold tracking-tight select-none"
          style={{ fontSize: "clamp(1.75rem, 5vw, 4rem)" }}
        >
          {initials}
        </span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!loaded}
      />
    </div>
  );
}
