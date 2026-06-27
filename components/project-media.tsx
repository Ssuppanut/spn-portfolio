"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Always renders a tasteful accent-colored placeholder with the project
 * initials. If a real image exists at `src` it fades in on top. This means the
 * whole site looks finished before any screenshots are added — just drop files
 * into /public/work/<slug>/ and they appear automatically. No broken-image
 * flash while the file is missing.
 */
export function ProjectMedia({
  src,
  accent,
  accentText = "light",
  label,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  accent: string;
  accentText?: "light" | "dark";
  label: string;
  className?: string;
  /** responsive sizes hint for the optimizer; defaults to a 2-up grid cell */
  sizes?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Cached images can already be `complete` before React attaches `onLoad`, so
  // the event never fires. Check on mount so cached covers still fade in.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  const initials = label
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: accent }}
    >
      {/* placeholder (always present, sits underneath) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          color: accentText === "light" ? "rgba(255,255,255,0.85)" : "#121211",
        }}
      >
        <span
          className="font-mono font-semibold tracking-tight select-none"
          style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}
        >
          {initials}
        </span>
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(120% 120% at 0% 0%, #fff 0%, transparent 45%)",
          }}
        />
      </div>

      {/* real image fades in only once it actually loads. next/image resizes,
          serves modern formats and lazy-loads it — same crop, far less bytes. */}
      <Image
        ref={imgRef}
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`}
        alt={label}
        fill
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!loaded}
      />
    </div>
  );
}
