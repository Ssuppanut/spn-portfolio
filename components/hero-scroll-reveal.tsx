"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroScrollReveal — "through-the-lens" text-mask reveal (à la podium.global).
 *
 * - `children` (the real <Hero/>) sits BEHIND a full-screen overlay (the `ink`
 *   token = inverse of the page bg, so it works in light & dark).
 * - An SVG <mask> punches the word "SPN." (Rubik Glitch) out of the overlay
 *   with a small static blur; scaling the group upscales the cached blur, so it
 *   softens as it zooms out — without animating the filter each frame.
 * - On scroll the "SPN." group scales up (transform: scale only) until the
 *   letters clear the viewport and the hero is revealed, then it unpins.
 * - The hero is invisible (blends into the bg) while the lens opens, then fades
 *   in. "SCROLL DOWN" sits just under the SPN (same coord space → consistent
 *   gap on every viewport) and fades out as you start scrolling.
 */
export function HeroScrollReveal({ children }: { children: ReactNode }) {
  const container = useRef<HTMLElement>(null);
  const lensRef = useRef<SVGGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<SVGGElement>(null);

  // how much the "SPN." holes scale to fully clear the viewport
  const FINAL_SCALE = 34;

  useGSAP(
    () => {
      const lens = lensRef.current;
      const content = contentRef.current;
      if (!lens || !content) return;

      gsap.set(lens, { transformOrigin: "center center", force3D: true });

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        gsap.set(lens, { scale: FINAL_SCALE });
        gsap.set(content, { opacity: 1 });
        gsap.set(hintRef.current, { opacity: 0 });
        return;
      }

      gsap.set(content, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        lens,
        { scale: 1 },
        { scale: FINAL_SCALE, ease: "none", force3D: true },
        0
      );
      tl.to(content, { opacity: 1, ease: "none" }, 0);
      tl.to(hintRef.current, { opacity: 0, ease: "none", duration: 0.12 }, 0);
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden">
      {/* ── BEHIND THE LENS: the real hero (revealed through the letters) ── */}
      <div
        ref={contentRef}
        className="absolute inset-0"
        style={{ willChange: "opacity" }}
      >
        {children}
      </div>

      {/* ── OVERLAY: "SPN." mask + "SCROLL DOWN" hint ── */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* small base blur — scaling softens it further (cached, cheap) */}
          <filter id="hsr-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
          </filter>

          <mask id="hsr-lens-mask">
            <rect x="0" y="0" width="1000" height="1000" fill="white" />
            <g
              ref={lensRef}
              style={{ willChange: "transform" }}
              transform="scale(1)"
            >
              <text
                x="500"
                y="500"
                textAnchor="middle"
                dominantBaseline="central"
                fill="black"
                filter="url(#hsr-blur)"
                style={{
                  fontFamily: "var(--font-rubik-glitch)",
                  fontSize: 230,
                  letterSpacing: "-4px",
                }}
              >
                SPN.
              </text>
            </g>
          </mask>
        </defs>

        {/* visible overlay — `ink` token = inverse of the page bg in both themes */}
        <rect
          x="0"
          y="0"
          width="1000"
          height="1000"
          style={{ fill: "var(--color-ink)" }}
          mask="url(#hsr-lens-mask)"
        />

        {/* "SCROLL DOWN" hint — under the SPN, paper colour contrasts overlay */}
        <g ref={hintRef} style={{ fill: "var(--color-paper)" }}>
          <text
            x="500"
            y="702"
            textAnchor="middle"
            className="text-[22px] lg:text-[12px]"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "9px" }}
          >
            SCROLL DOWN
          </text>
          <text
            x="500"
            y="744"
            textAnchor="middle"
            className="text-[26px] lg:text-[14px]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ↓
          </text>
        </g>
      </svg>
    </section>
  );
}
