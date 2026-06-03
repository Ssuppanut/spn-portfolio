import Link from "next/link";
import { HeroScrollReveal } from "@/components/hero-scroll-reveal";
import { Hero } from "@/components/hero";
import { FeaturedWork } from "@/components/featured-work";
import { ScrollRevealText } from "@/components/scroll-reveal-text";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* lens reveal — the hero is revealed through the "SPN." letters as you scroll */}
      <HeroScrollReveal>
        <Hero />
      </HeroScrollReveal>

      <FeaturedWork />

      {/* About */}
      <section className="px-gutter mt-32 md:mt-48 mb-40 md:mb-64">
        <div className="mb-14 flex items-center justify-between gap-4">
          <h3 className="display lowercase text-[clamp(1.75rem,5vw,3.75rem)] leading-none">
            about
          </h3>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-xl bg-ink/10 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-ink/20"
          >
            Show more
          </Link>
        </div>

        <p className="display lowercase max-w-[22ch] text-[clamp(2.25rem,6.5vw,5.25rem)] leading-[1.08]">
          <ScrollRevealText text={site.intro} />
        </p>

        <div className="mt-12 grid max-w-4xl gap-8 md:mt-16 md:grid-cols-2">
          {site.about.map((p, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-muted md:text-lg"
            >
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
