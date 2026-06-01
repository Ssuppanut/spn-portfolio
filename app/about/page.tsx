import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.tagline,
};

const expertise = [
  "UX/UI Design",
  "Product Design",
  "Design Systems",
  "User Research",
  "Prototyping",
  "Interaction Design",
  "Web Design",
  "Mobile Apps",
];

const industries = ["Fintech", "Banking", "Crypto / Web3", "Travel", "Logistics"];

const tools = ["Figma", "Protopie", "After Effects", "Lottie", "Framer"];

export default function AboutPage() {
  return (
    <section className="px-gutter pt-32 md:pt-44">
      <p className="eyebrow mb-6">About</p>
      <h1 className="display text-[clamp(2.5rem,7vw,6rem)] max-w-[18ch]">
        {site.role} based in {site.location}.
      </h1>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7 space-y-6">
          {site.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-xl md:text-2xl leading-relaxed text-ink/80">
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="md:col-span-4 md:col-start-9 space-y-12">
          <div>
            <p className="eyebrow mb-4">Expertise</p>
            <ul className="space-y-2">
              {expertise.map((e) => (
                <li key={e} className="text-base border-b border-line pb-2">
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Industries</p>
            <ul className="flex flex-wrap gap-2">
              {industries.map((e) => (
                <li
                  key={e}
                  className="rounded-full border border-line px-3 py-1 text-sm"
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Tools</p>
            <ul className="flex flex-wrap gap-2">
              {tools.map((e) => (
                <li
                  key={e}
                  className="rounded-full border border-line px-3 py-1 text-sm"
                >
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
