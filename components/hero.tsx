"use client";

import { motion } from "motion/react";
import { RevealText } from "./reveal";
import { Portrait } from "./portrait";
import { site } from "@/lib/site";

export function Hero() {
  // split full name into two stacked lines (first / last)
  const [firstName, ...rest] = site.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section className="px-gutter pt-20 md:pt-28 pb-20 md:pb-28 min-h-[88vh] flex flex-col justify-start lg:justify-center">
      <div>
        <motion.p
          className="eyebrow mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {site.available ? "Available for work — 2026" : site.role}
        </motion.p>

        {/* mobile portrait — sits above the name (desktop one is beside it) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden mb-8 h-40 w-40"
        >
          <Portrait src="/portrait.jpg" label={site.name} className="h-full w-full" />
        </motion.div>

        <div className="flex items-center gap-8">
          <h1 className="display text-[clamp(2.75rem,9vw,9rem)] max-w-[16ch]">
            <RevealText text={firstName} delay={0.15} />
            <br />
            <RevealText text={lastName} delay={0.35} />
          </h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="ml-auto hidden md:block shrink-0 aspect-square h-[calc(1.9*clamp(2.75rem,9vw,9rem))]"
          >
            <Portrait src="/portrait.jpg" label={site.name} className="h-full w-full" />
          </motion.div>
        </div>

        <motion.div
          className="mt-10 md:mt-[156px] lg:mt-[116px] flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="max-w-md text-lg md:text-xl text-ink/80 leading-relaxed">
            {site.tagline}
          </p>
          <div className="font-mono text-xs uppercase tracking-widest text-muted space-y-1 md:text-right">
            <p>{site.role}</p>
            <p>{site.location}</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-14 md:mt-22 flex items-center gap-3 text-muted">
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-xl"
        >
          ↓
        </motion.span>
        <span className="font-mono text-xs uppercase tracking-widest">
          Scroll to explore
        </span>
      </div>
    </section>
  );
}
