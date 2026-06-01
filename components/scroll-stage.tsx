"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useScroll, useTransform } from "motion/react";
import { Footer } from "./footer";

/**
 * Fixed footer reveal: the footer is pinned behind the page content (lower
 * z-index, fixed at the bottom). The content layer is opaque and reserves a
 * bottom margin equal to the footer height, so as you scroll to the end the
 * content slides up and "uncovers" the still footer behind it.
 *
 * `revealProgress` (0→1 over that final stretch of scroll) drives the footer's
 * word-fill + inner parallax so they animate exactly as it's revealed.
 */
export function ScrollStage({ children }: { children: ReactNode }) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerH, setFooterH] = useState(0);
  const [startProgress, setStartProgress] = useState(0.85);

  const { scrollYProgress } = useScroll();
  const revealProgress = useTransform(
    scrollYProgress,
    [startProgress, 1],
    [0, 1],
    { clamp: true }
  );

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const recalc = () => {
      const h = el.offsetHeight;
      setFooterH(h);
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setStartProgress(
        maxScroll > 0 ? Math.max(0, (maxScroll - h) / maxScroll) : 0.85
      );
    };
    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    window.addEventListener("resize", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
    };
  }, []);

  return (
    <>
      {/* content layer — opaque, sits above the footer */}
      <div className="relative z-10 flow-root min-h-screen bg-paper">
        {children}
      </div>

      {/* transparent spacer — adds real scroll room so the content can slide up
          and uncover the fixed footer behind it (margin-bottom collapses, so a
          spacer element is used instead) */}
      <div aria-hidden className="pointer-events-none" style={{ height: footerH }} />

      {/* pinned footer behind the content */}
      <div ref={footerRef} className="fixed inset-x-0 bottom-0 z-0">
        <Footer revealProgress={revealProgress} />
      </div>
    </>
  );
}
