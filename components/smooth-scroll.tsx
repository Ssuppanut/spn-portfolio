"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Buttery, eased page scrolling (Lenis) — the signature feel of sites like
 * podium.global. Native scroll position is still driven, so Motion's
 * useScroll / whileInView keep working.
 *
 * Lenis is also wired into GSAP's ticker + ScrollTrigger so GSAP-pinned
 * sections (e.g. HeroScrollReveal) stay perfectly in sync with the smooth
 * scroll. Disabled entirely for reduced-motion users.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // drive Lenis from GSAP's ticker + keep ScrollTrigger synced with Lenis
  useEffect(() => {
    if (reduced) return;

    const lenis = lenisRef.current?.lenis;
    const onScroll = () => ScrollTrigger.update();
    lenis?.on("scroll", onScroll);

    const raf = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis?.off("scroll", onScroll);
      gsap.ticker.remove(raf);
    };
  }, [reduced]);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        autoRaf: false, // GSAP ticker drives the raf instead
      }}
    >
      {children}
    </ReactLenis>
  );
}
