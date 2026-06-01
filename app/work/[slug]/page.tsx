import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMedia } from "@/components/project-media";
import { Reveal } from "@/components/reveal";
import { getProject, projects } from "@/lib/projects";

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
  const next = projects[(idx + 1) % projects.length];

  const meta = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    { label: "Category", value: project.category },
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
        <p className="mt-8 text-xl md:text-2xl text-ink/80 max-w-2xl leading-relaxed">
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
          />
        </Reveal>
      </div>

      {/* Meta + overview */}
      <div className="px-gutter mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10">
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
            <p className="display text-[clamp(1.5rem,3.5vw,2.75rem)] leading-[1.15]">
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

      {/* Sections interleaved with gallery */}
      <div className="px-gutter mt-24 md:mt-36 space-y-24 md:space-y-36">
        {project.sections.map((section, i) => (
          <section
            key={section.heading}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-4">
              <p className="eyebrow mb-4">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="display text-2xl md:text-3xl">{section.heading}</h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="text-lg md:text-xl text-ink/80 leading-relaxed">
                {section.body}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* Gallery */}
      <div className="px-gutter mt-24 md:mt-36">
        <p className="eyebrow mb-8">Gallery</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: project.gallery }).map((_, i) => (
            <Reveal
              key={i}
              className={i % 3 === 0 ? "sm:col-span-2" : ""}
            >
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

      {/* Next project */}
      <Link
        href={`/work/${next.slug}`}
        className="group block px-gutter mt-32 border-t border-line pt-12"
      >
        <p className="eyebrow mb-4">Next project</p>
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="display text-[clamp(2rem,7vw,6rem)] transition-transform duration-500 group-hover:translate-x-2">
            {next.title}
          </h2>
          <span className="text-2xl transition-transform duration-500 group-hover:translate-x-2">
            →
          </span>
        </div>
      </Link>
    </article>
  );
}
