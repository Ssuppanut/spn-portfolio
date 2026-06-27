"use client";

import { useEffect, useState } from "react";
import { BubbleBackground } from "@/components/animate-ui/backgrounds/bubble";

// Monochrome blob colours (R,G,B). Near-black in dark mode; a light-blue family
// around #DFEDF7 in light mode. Slight hue variation keeps the motion visible.
const DARK = {
  first: "38,38,46",
  second: "32,38,52",
  third: "46,42,38",
  fourth: "40,40,48",
  fifth: "44,40,52",
  sixth: "36,40,44",
};
const LIGHT = {
  first: "223,237,247",
  second: "214,232,247",
  third: "226,239,250",
  fourth: "218,234,246",
  fifth: "229,240,248",
  sixth: "205,228,248",
};

/**
 * Fixed, full-viewport animated bubble backdrop behind all content. Base colour
 * follows the paper token; blob colours follow the active theme, read straight
 * from the `<html>` class (the source of truth next-themes toggles).
 */
export function SiteBackground() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsLight(el.classList.contains("light"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const colors = isLight ? LIGHT : DARK;

  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
      <BubbleBackground
        interactive
        className="size-full"
        style={{ backgroundColor: "var(--color-paper)" }}
        colors={colors}
      />
    </div>
  );
}
