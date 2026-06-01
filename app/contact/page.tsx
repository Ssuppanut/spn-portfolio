import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { site, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <section className="px-gutter pt-32 md:pt-44 min-h-[70vh] flex flex-col justify-center">
      <p className="eyebrow mb-8">
        {site.available
          ? "Available for full-time roles & freelance"
          : "Get in touch"}
      </p>
      <Reveal>
        <h1 className="display text-[clamp(2rem,6vw,5rem)] max-w-[16ch]">
          Let&apos;s build something people love to use.
        </h1>
      </Reveal>

      <Reveal delay={0.1} className="mt-14">
        <a
          href={`mailto:${site.email}`}
          className="display text-[clamp(1.5rem,5vw,3.5rem)] link-underline inline-block break-all"
        >
          {site.email}
        </a>
      </Reveal>

      <Reveal delay={0.2} className="mt-16">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {socialLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-base link-underline opacity-70 hover:opacity-100"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
