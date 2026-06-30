import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeatureShowcase } from "@/components/feature-showcase";
import { ImageAutoSlider } from "@/components/image-auto-slider";
import { ProjectMedia } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import { getProject, projects } from "@/lib/projects";

/** Renders text with `**phrase**` segments highlighted (theme-aware gold). */
function highlight(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="hl font-medium">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  // the next three projects (wrapping) shown as "more to read" cards
  const more = [1, 2, 3].map((o) => projects[(idx + o) % projects.length]);

  const meta = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    ...(project.team ? [{ label: "Team", value: project.team }] : []),
    ...(project.platform ? [{ label: "Platform", value: project.platform }] : []),
    { label: "Category", value: project.category },
    ...(project.tools ? [{ label: "Tools", value: project.tools }] : []),
    ...(project.methods ? [{ label: "Methods", value: project.methods }] : []),
  ];

  return (
    <article>
      {/* Header */}
      <header className="px-gutter pt-32 md:pt-44 pb-12">
        <Link
          href="/work"
          className="eyebrow link-underline inline-block mb-10"
        >
          ← All work
        </Link>
        <p className="eyebrow mb-5">{project.category}</p>
        <h1 className="display text-[clamp(2.5rem,9vw,8rem)] max-w-[14ch]">
          {project.title}
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-ink/80 leading-relaxed">
          {project.summary}
        </p>
      </header>

      {/* Cover */}
      <div className="px-gutter">
        <Reveal>
          <ProjectMedia
            src={`/work/${project.slug}/cover.jpg`}
            accent={project.accent}
            accentText={project.accentText}
            label={project.title}
            className="aspect-[16/9] w-full rounded-md"
            sizes="100vw"
          />
        </Reveal>
      </div>

      {/* Meta + overview */}
      <div className="px-gutter mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-x-16">
        <div className="md:col-span-4">
          <dl className="grid grid-cols-2 md:grid-cols-1 gap-y-6 gap-x-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow mb-1">{m.label}</dt>
                <dd className="text-base">{m.value}</dd>
              </div>
            ))}
            <div>
              <dt className="eyebrow mb-2">Tags</dt>
              <dd className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-3 py-1 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </dd>
            </div>
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm link-underline mt-2"
              >
                {project.externalLabel ?? "Visit ↗"}
              </a>
            )}
          </dl>
        </div>

        <div className="md:col-span-8">
          <Reveal>
            <p
              className="display text-[clamp(1.25rem,2.8vw,2.25rem)]"
              style={{ lineHeight: 1.2 }}
            >
              {project.overview}
            </p>
          </Reveal>

          {project.metrics && (
            <div className="mt-12 grid grid-cols-2 gap-6">
              {project.metrics.map((m) => (
                <Reveal key={m.label}>
                  <p className="display text-4xl md:text-5xl">{m.value}</p>
                  <p className="mt-2 text-sm text-muted">{m.label}</p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {project.caseStudy ? (
        /* Rich, flagship case study: text blocks + per-section captioned screens */
        <div className="px-gutter mt-24 md:mt-36 space-y-24 md:space-y-36">
          {(() => {
            const isFeature = (b: (typeof project.caseStudy)[number]) =>
              b.kicker?.toLowerCase().startsWith("feature");
            const featureBlocks = project.caseStudy!.filter(isFeature);
            const firstFeatureIdx = project.caseStudy!.findIndex(isFeature);
            return project.caseStudy!.map((block, i) => {
              // collapse the contiguous run of feature blocks into one sticky
              // index + scrolling-content showcase, rendered at the first feature
              if (isFeature(block)) {
                if (i !== firstFeatureIdx) return null;
                return (
                  <FeatureShowcase
                    key="feature-showcase"
                    features={featureBlocks}
                    accent={project.accent}
                    accentText={project.accentText}
                  />
                );
              }
              const cols = block.imageCols ?? 3;
              const imgSizes =
                cols === 3
                  ? "(max-width: 768px) 100vw, 33vw"
                  : "(max-width: 768px) 100vw, 50vw";
              return (
              <div key={`${block.heading}-${i}`}>
                <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-x-16">
                  <div
                    className={`md:col-span-4 ${
                      block.lessons
                        ? "md:sticky md:top-28 md:self-start"
                        : ""
                    }`}
                  >
                    <p className="eyebrow mb-4">
                      {block.kicker ?? String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="display text-2xl md:text-3xl">
                      {block.heading}
                    </h2>
                    {block.oneLiner && (
                      <p className="mt-3 text-base text-muted leading-relaxed">
                        {block.oneLiner}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-8 space-y-6">
                    {block.body && (
                      <p className="text-lg md:text-xl text-ink/80 leading-relaxed whitespace-pre-line">
                        {block.body}
                      </p>
                    )}
                    {block.table && (
                      <dl className="border-t border-line">
                        {block.table.map((row) => (
                          <div
                            key={row.left}
                            className="grid grid-cols-1 items-start gap-2 border-b border-line py-5 sm:grid-cols-[1fr_auto_1.5fr] sm:gap-5"
                          >
                            <dt className="text-base text-ink/70">
                              {highlight(row.left)}
                            </dt>
                            <span
                              aria-hidden
                              className="hidden text-muted sm:block sm:pt-1"
                            >
                              →
                            </span>
                            <dd className="text-base leading-relaxed">
                              {highlight(row.right)}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {block.points && (
                      <div className="space-y-5">
                        {block.points.map((pt) => (
                          <div key={pt.title}>
                            <h3 className="mb-1 text-base font-semibold">
                              {pt.title}
                            </h3>
                            <p className="text-base md:text-lg text-ink/70 leading-relaxed">
                              {pt.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {block.callout && (
                      <p className="border-l-2 border-ink/30 pl-5 text-lg md:text-xl font-medium leading-relaxed">
                        {block.callout}
                      </p>
                    )}
                    {block.lessons && (
                      <div className="space-y-14 md:space-y-16">
                        {block.lessons.map((lesson, li) => (
                          <Reveal
                            key={lesson.heading}
                            className={
                              li > 0
                                ? "border-t border-line pt-14 md:pt-16"
                                : ""
                            }
                          >
                            <h3 className="display text-2xl leading-tight md:text-3xl">
                              {lesson.heading}
                            </h3>
                            <p className="mt-4 text-lg leading-relaxed text-muted md:text-xl">
                              {lesson.body}
                            </p>
                            <div className="mt-7 rounded-2xl border border-line bg-ink/[0.03] p-5 sm:p-6">
                              <span className="block text-base font-bold uppercase text-[#00BD67] md:text-lg">
                                Now
                              </span>
                              <p className="mt-0.5 text-base italic leading-relaxed text-ink/85 md:text-lg">
                                {lesson.now}
                              </p>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                {block.slider && (
                  <div className="mt-28 md:mt-32">
                    <ImageAutoSlider
                      images={block.slider}
                      caption={block.sliderCaption}
                      accent={project.accent}
                    />
                  </div>
                )}

                {block.images && (
                  <div
                    className={`mt-14 grid grid-cols-1 gap-4 sm:gap-5 ${
                      cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
                    }`}
                  >
                    {block.images.map((img, j) => {
                      const isLastOdd =
                        cols !== 3 &&
                        block.images!.length % 2 !== 0 &&
                        j === block.images!.length - 1;
                      return (
                        <Reveal
                          key={img.src}
                          className={isLastOdd ? "sm:col-span-2" : ""}
                        >
                          <ProjectMedia
                            src={img.src}
                            accent={project.accent}
                            accentText={project.accentText}
                            label={block.heading}
                            className={`w-full rounded-3xl ${
                              img.ratio ?? "aspect-[9/16]"
                            }`}
                            sizes={
                              isLastOdd
                                ? "(max-width: 768px) 100vw, 100vw"
                                : imgSizes
                            }
                          />
                        </Reveal>
                      );
                    })}
                  </div>
                )}
              </div>
              );
            });
          })()}
        </div>
      ) : (
        <>
          {/* Simple case study: text sections + gallery grid */}
          <div className="px-gutter mt-24 md:mt-36 space-y-24 md:space-y-36">
            {project.sections.map((section, i) => (
              <section
                key={section.heading}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-x-16"
              >
                <div className="md:col-span-4">
                  <p className="eyebrow mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="display text-2xl md:text-3xl">
                    {section.heading}
                  </h2>
                </div>
                <div className="md:col-span-8">
                  <p className="text-lg md:text-xl text-ink/80 leading-relaxed whitespace-pre-line">
                    {section.body}
                  </p>
                </div>
              </section>
            ))}
          </div>

          {project.gallery > 0 && (
            <div className="px-gutter mt-24 md:mt-36">
              <p className="eyebrow mb-8">Gallery</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Array.from({ length: project.gallery }).map((_, i) => (
                  <Reveal key={i} className={i % 3 === 0 ? "sm:col-span-2" : ""}>
                    <ProjectMedia
                      src={`/work/${project.slug}/${String(i + 1).padStart(2, "0")}.jpg`}
                      accent={project.accent}
                      accentText={project.accentText}
                      label={`${project.title} ${i + 1}`}
                      className={`w-full rounded-md ${
                        i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                      }`}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* More projects to read */}
      <section className="px-gutter mt-32 md:mt-44 border-t border-line pt-14 md:pt-20 pb-32 md:pb-48">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
          <div>
            <p className="eyebrow mb-4">Continue exploring</p>
            <h2 className="display text-[clamp(1.75rem,5vw,3.5rem)] leading-none">
              More projects to read.
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-line px-6 py-3 text-xs font-medium uppercase tracking-widest transition-colors hover:bg-ink/5 sm:inline-flex"
          >
            See all work
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8">
          {more.map((p) => (
            <Reveal key={p.slug}>
              <Link href={`/work/${p.slug}`} className="group block">
                <div className="overflow-hidden rounded-md">
                  <ProjectMedia
                    src={`/work/${p.slug}/cover.jpg`}
                    accent={p.accent}
                    accentText={p.accentText}
                    label={p.title}
                    className="aspect-[16/10] w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="eyebrow">{p.category}</p>
                  <p className="eyebrow">{p.year}</p>
                </div>
                <h3 className="display mt-2 text-xl md:text-2xl transition-transform duration-500 group-hover:translate-x-1">
                  {p.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {p.summary}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* mobile-only see all */}
        <Link
          href="/work"
          className="mt-12 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-xs font-medium uppercase tracking-widest transition-colors hover:bg-ink/5 sm:hidden"
        >
          See all work
          <span aria-hidden>→</span>
        </Link>
      </section>
    </article>
  );
}
