"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="mr-[0.25em] inline-block">
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Words fill from faint → full as the element scrolls through the viewport.
 * Inherits font + color from its parent, so it works in any theme / on the
 * always-white footer alike.
 */
export function ScrollRevealText({
  text,
  className = "",
  progress,
}: {
  text: string;
  className?: string;
  /** optional external scroll progress (0→1); falls back to own viewport scroll */
  progress?: MotionValue<number>;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const local = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });
  const p = progress ?? local.scrollYProgress;
  const words = text.split(" ");

  return (
    <span ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={p} range={[start, end]}>
            {w}
          </Word>
        );
      })}
    </span>
  );
}
