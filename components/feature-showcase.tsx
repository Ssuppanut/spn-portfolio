"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ProjectMedia } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import type { RichSection } from "@/lib/projects";

/** width:height factor from a Tailwind `aspect-*` class (square / [w/h]). */
function ratioValue(cls?: string): number {
  if (!cls) return 1;
  if (cls.includes("square")) return 1;
  const m = cls.match(/aspect-\[(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)\]/);
  return m ? Number(m[1]) / Number(m[2]) : 1;
}

/** split a list into fixed-size rows. */
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

/**
 * The six product features shown as a sticky left-hand index (number + name)
 * beside a single scrolling content column on the right. Each index entry turns
 * from muted to solid as its section is reached, acting as a reading-progress
 * marker; clicking one jumps to that feature.
 */
export function FeatureShowcase({
  features,
  accent,
  accentText,
}: {
  features: RichSection[];
  accent: string;
  accentText?: "light" | "dark";
}) {
  const [active, setActive] = useState(-1);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      // a feature counts as "reached" once its top crosses ~45% of the viewport
      const trigger = window.innerHeight * 0.45;
      let current = -1;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= trigger) current = i;
      });
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const jumpTo = (i: number) =>
    refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-16">
      {/* sticky index — desktop only */}
      <nav className="hidden md:col-span-4 md:block">
        <ol className="sticky top-28">
          {features.map((f, i) => {
            const reached = i <= active;
            return (
              <li key={f.heading} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  className="flex w-full items-baseline gap-4 py-4 text-left"
                >
                  <span className="w-8 shrink-0 font-mono text-xl leading-tight text-muted/60 lg:w-10 lg:text-2xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`display text-xl leading-tight transition-colors duration-500 lg:text-2xl ${
                      reached ? "text-ink" : "text-muted/60"
                    }`}
                  >
                    {f.heading}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* scrolling content — right column */}
      <div className="md:col-span-8 space-y-28 md:space-y-40">
        {features.map((f, i) => {
          const cols = f.imageCols ?? 3;
          return (
            <div
              key={f.heading}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="scroll-mt-28"
            >
              {/* section header — number · name with a trailing rule */}
              <div className="mb-8 flex items-center gap-5">
                <p className="eyebrow shrink-0">
                  {String(i + 1).padStart(2, "0")} · {f.heading}
                </p>
                <span aria-hidden className="h-px flex-1 bg-line" />
              </div>

              {f.oneLiner && (
                <p
                  className="display text-xl md:text-2xl"
                  style={{ lineHeight: 1.35 }}
                >
                  {f.oneLiner}
                </p>
              )}

              <div className="mt-6 space-y-6">
                {f.body && (
                  <p className="text-lg leading-relaxed text-ink/80 md:text-xl whitespace-pre-line">
                    {f.body}
                  </p>
                )}
                {f.points && (
                  <div className="space-y-5">
                    {f.points.map((pt) => (
                      <div key={pt.title}>
                        <h3 className="mb-1 text-base font-semibold">
                          {pt.title}
                        </h3>
                        <p className="text-base leading-relaxed text-ink/70 md:text-lg">
                          {pt.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {f.callout && (
                  <p className="border-l-2 border-ink/30 pl-5 text-lg font-medium leading-relaxed md:text-xl">
                    {f.callout}
                  </p>
                )}
              </div>

              {f.images && (
                <div className="mt-10 space-y-4 sm:space-y-5">
                  {chunk(f.images, cols).map((row, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5"
                    >
                      {row.map((img) => (
                        // width grows in proportion to aspect ratio, so every
                        // image in a row ends up the same height
                        <div
                          key={img.src}
                          className="min-w-0 sm:basis-0 sm:grow-[var(--g)]"
                          style={{ "--g": ratioValue(img.ratio) } as CSSProperties}
                        >
                          <Reveal className="w-full">
                            <ProjectMedia
                              src={img.src}
                              accent={accent}
                              accentText={accentText}
                              label={f.heading}
                              className={`w-full rounded-3xl transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/30 ${
                                img.ratio ?? "aspect-square"
                              }`}
                              sizes="(max-width: 768px) 100vw, 40vw"
                            />
                          </Reveal>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
