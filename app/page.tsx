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
          <div className="hidden sm:block">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink/5"
            >
              Show more
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <p className="display lowercase max-w-[22ch] text-[clamp(2.25rem,6.5vw,5.25rem)] leading-[1.08]">
          <ScrollRevealText text={site.intro} />
        </p>

        {/* mobile-only: button sits below the copy, centered */}
        <div className="mt-12 flex justify-center sm:hidden">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink/5"
          >
            Show more
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
