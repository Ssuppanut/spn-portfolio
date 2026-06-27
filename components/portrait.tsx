"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const imgRef = useRef<HTMLImageElement>(null);

  // Cached images can already be `complete` before React attaches `onLoad`, so
  // the event never fires. Check on mount so a cached portrait still fades in.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

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
      <Image
        ref={imgRef}
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`}
        alt={label}
        fill
        sizes="(max-width: 768px) 40vw, 320px"
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!loaded}
      />
    </div>
  );
}
