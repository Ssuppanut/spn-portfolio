"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { site, socialLinks } from "@/lib/site";
import { ScrollRevealText } from "./scroll-reveal-text";

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export function Footer({
  revealProgress,
}: {
  revealProgress?: MotionValue<number>;
}) {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  // driven by the pinned-reveal scroll (or own viewport scroll as a fallback)
  const ref = useRef<HTMLElement>(null);
  const local = useScroll({ target: ref, offset: ["start end", "start 0.4"] });
  const progress = revealProgress ?? local.scrollYProgress;
  const y = useTransform(progress, [0, 1], [90, 0]);

  return (
    // always white background + dark text, in both light and dark site themes
    <footer ref={ref} className="overflow-hidden bg-white text-neutral-900">
      <motion.div style={{ y }} className="px-gutter pt-12 pb-10 md:pt-16 md:pb-14">
        {/* socials, top-right */}
        <div className="mb-12 flex justify-end gap-7 md:mb-16">
          {socialLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-neutral-900 transition-opacity hover:opacity-50"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* big scroll-reveal heading (about → footer transition) */}
        <h2 className="display max-w-[20ch] text-[clamp(1.75rem,5vw,4rem)] leading-[1.06] text-neutral-900">
          <ScrollRevealText text={site.ctaHeading} progress={progress} />
        </h2>

        {/* CTA row */}
        <div className="mt-10 flex flex-wrap items-center gap-6 md:mt-12">
          <Link
            href="/contact"
            className="rounded-xl bg-neutral-900 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            Get in Touch
          </Link>
          {site.available && (
            <span className="flex items-center gap-3 text-sm text-neutral-900">
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-rose-100">
                <span className="z-10 h-2 w-2 rounded-full bg-neutral-900" />
                <span className="absolute inset-1.5 rounded-full bg-rose-300/60 animate-ping" />
              </span>
              Available For Work
            </span>
          )}
        </div>

        {/* bottom row */}
        <div className="mt-16 flex flex-col gap-6 md:mt-24 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:gap-8">
            <a
              href={site.phoneHref}
              className="text-neutral-500 transition-colors hover:text-neutral-900"
            >
              {site.phone}
            </a>
            <span className="flex items-center gap-2">
              <a
                href={`mailto:${site.email}`}
                className="text-neutral-500 transition-colors hover:text-neutral-900"
              >
                {site.email}
              </a>
              <button
                onClick={copyEmail}
                aria-label={copied ? "Email copied" : "Copy email"}
                title={copied ? "Copied!" : "Copy email"}
                className="text-neutral-400 transition-colors hover:text-neutral-900"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </span>
          </div>
          <p className="text-sm font-medium text-neutral-900">{site.name}</p>
        </div>
      </motion.div>
    </footer>
  );
}
