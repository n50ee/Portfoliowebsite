import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { NavBar } from "../../components/brand/NavBar";
import { Footer } from "../../components/brand/Footer";
import { Container } from "../../components/brand/Container";
import { Card } from "../../components/brand/Card";
import { Badge } from "../../components/brand/Badge";
import { Tag } from "../../components/brand/Tag";
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

      <section className="py-8 pb-16">
        <div className="mb-4 flex items-center gap-2.5">
          <span
            className="font-body text-caption font-semibold uppercase tracking-eyebrow"
            style={{ color: accent }}
          >
            {project.client}
          </span>
          <Badge tone="success">{project.status}</Badge>
        </div>
        <h1 className="mb-5 max-w-[760px] font-display text-display-lg font-medium tracking-display text-ink-900">
          {project.title}
        </h1>
        <div className="mb-8 flex flex-wrap gap-2">
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
      </section>

      <section className="grid grid-cols-1 gap-12 pb-24 md:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line font-body text-body leading-body text-ink-700">{project.body}</div>
        <Card raised>
          <h3 className="mb-3 font-display text-heading-sm text-ink-900">At a glance</h3>
          {[
            { label: "Role", value: project.role },
            { label: "Timeline", value: project.timeline },
            { label: "Team", value: project.team },
          ].map((row) => (
            <div
              key={row.label}
              className="flex justify-between border-b border-line-soft py-2.5 font-body text-body-sm last:border-b-0"
            >
              <span className="text-ink-500">{row.label}</span>
              <span className="font-semibold text-ink-900">{row.value || "-"}</span>
            </div>
          ))}
        </Card>
      </section>

      <Footer />
    </Container>
  );
}
