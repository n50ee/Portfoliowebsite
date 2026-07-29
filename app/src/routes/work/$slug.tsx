import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { NavBar } from "../../components/brand/NavBar";
import { Footer } from "../../components/brand/Footer";
import { Container } from "../../components/brand/Container";
import { Card } from "../../components/brand/Card";
import { Badge } from "../../components/brand/Badge";
import { Tag } from "../../components/brand/Tag";
import { MovingGallery } from "../../components/brand/MovingGallery";
import { TournamentResultsTable } from "../../components/brand/TournamentResultsTable";
import { getProjectDetail } from "../../lib/api/content.functions";

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ params }) => {
    const project = await getProjectDetail({ data: { slug: params.slug } });
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) =>
    loaderData
      ? { meta: [{ title: `${loaderData.title} | Ameer Moavia` }, { name: "description", content: loaderData.description }] }
      : {},
  component: CaseStudy,
});

function CaseStudy() {
  const project = Route.useLoaderData();
  const accent = project.themeAccent || "var(--color-signature-500)";
  const tint = project.themeTint || "var(--color-paper-sunken)";

  return (
    <Container>
      <NavBar />

      <Link to="/" className="mt-6 inline-block font-body text-body-sm text-ink-500 no-underline hover:text-ink-900">
        ← Back to work
      </Link>

      <section className="pb-20 pt-10 sm:pt-16">
        <div className="mb-5 flex items-center gap-2.5">
          <span
            className="font-body text-caption font-semibold uppercase tracking-eyebrow"
            style={{ color: accent }}
          >
            {project.client}
          </span>
          <Badge tone="success">{project.status}</Badge>
        </div>
        <h1 className="mb-6 max-w-[820px] font-display text-display-lg font-semibold tracking-display text-ink-900">
          {project.title}
        </h1>
        {project.description && (
          <p className="mb-8 max-w-[560px] font-body text-subtitle text-ink-500">{project.description}</p>
        )}
        <div className="mb-14 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div
          className="relative aspect-hero overflow-hidden rounded-xl border border-line-soft"
          style={{ background: project.imageUrl ? undefined : tint }}
        >
          {project.imageUrl ? (
            <img src={project.imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <>
              <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: accent }} />
              <div className="flex h-full items-center justify-center font-body text-body-sm text-ink-300">
                Project hero image placeholder
              </div>
            </>
          )}
        </div>

        {project.gallery.length > 0 && (
          <div className="mt-6">
            <MovingGallery images={project.gallery} />
          </div>
        )}
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-[640px] whitespace-pre-line font-body text-subtitle leading-body text-ink-700">
          {project.body}
        </div>
      </section>

      <section className="pb-24">
        <div className="grid grid-cols-1 gap-8 border-y border-line-soft py-8 sm:grid-cols-3">
          {[
            { label: "Role", value: project.role },
            { label: "Timeline", value: project.timeline },
            { label: "Team", value: project.team },
          ].map((row) => (
            <div key={row.label} className="font-body">
              <div className="mb-1.5 text-caption font-semibold uppercase tracking-eyebrow text-ink-500">
                {row.label}
              </div>
              <div className="text-heading-sm font-semibold text-ink-900">{row.value || "-"}</div>
            </div>
          ))}
        </div>
      </section>

      {project.results.length > 0 && (
        <section className="pb-24">
          <h2 className="mb-6 font-display text-heading-md font-semibold text-ink-900">Detailed results</h2>
          <TournamentResultsTable results={project.results} />
        </section>
      )}

      <Footer />
    </Container>
  );
}
