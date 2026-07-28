import { createFileRoute, Link } from "@tanstack/react-router";
import { NavBar } from "../components/brand/NavBar";
import { Footer } from "../components/brand/Footer";
import { Container } from "../components/brand/Container";
import { ExperienceCard } from "../components/brand/ExperienceCard";
import { AnimatedFrameBadge } from "../components/brand/AnimatedFrameBadge";
import { buttonClasses } from "../components/brand/Button";
import { HireMeCard } from "../components/brand/HireMeCard";
import { CategoryGrid } from "../components/brand/CategoryGrid";
import { PhotoGallery } from "../components/brand/PhotoGallery";
import { PeopleGrid } from "../components/brand/PeopleGrid";
import { WorkRevealColumns } from "../components/brand/WorkRevealColumns";
import { getHomeProjects, getAboutData } from "../lib/api/content.functions";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [projects, profile] = await Promise.all([getHomeProjects(), getAboutData()]);
    return { projects, experience: profile.experience, people: profile.people };
  },
  component: Index,
});

function Index() {
  const { projects, experience, people } = Route.useLoaderData();
  const photoGroups = projects
    .map((p) => ({
      title: p.title,
      images: Array.from(new Set([p.imageUrl, ...p.gallery].filter((url): url is string => Boolean(url)))),
    }))
    .filter((g) => g.images.length > 0);

  return (
    <Container>
      <NavBar />

      <section className="py-24 sm:py-24">
        <p className="mb-4 font-body text-caption font-semibold uppercase tracking-eyebrow text-signature-500">
          Media ops & partnerships
        </p>
        <h1 className="mb-5 max-w-[720px] font-display text-display-lg font-medium tracking-display text-ink-900">
          I build partnerships, media operations, and communities that scale.
        </h1>
        <p className="mb-8 max-w-[560px] font-body text-subtitle text-ink-700">
          Ameer Moavia. Media operations, partnerships, and community building
          across government, esports, and tech. Selected work below.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className={buttonClasses("primary", "md")}>
            Get in touch
          </Link>
          <Link to="/about" className={buttonClasses("secondary", "md")}>
            About me
          </Link>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="pb-24">
          <h2 className="mb-6 font-display text-heading-md font-semibold text-ink-900">Selected Work</h2>
          <WorkRevealColumns
            items={projects.map((p) => ({ slug: p.slug, client: p.client, imageUrl: p.imageUrl }))}
          />
        </section>
      )}

      {photoGroups.length > 0 && (
        <section className="pb-24">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-heading-md font-semibold text-ink-900">Photos</h2>
            <AnimatedFrameBadge>5 years of Community Service</AnimatedFrameBadge>
          </div>
          <PhotoGallery groups={photoGroups} />
        </section>
      )}

      <section className="pb-24">
        <h2 className="mb-6 font-display text-heading-md font-semibold text-ink-900">Focus areas</h2>
        <CategoryGrid />
      </section>

      {people.length > 0 && (
        <section className="pb-24">
          <h2 className="mb-6 font-display text-heading-md font-semibold text-ink-900">People we've worked with</h2>
          <PeopleGrid people={people} />
        </section>
      )}

      {experience.length > 0 && (
        <section className="pb-24">
          <h2 className="mb-6 font-display text-heading-md font-semibold text-ink-900">Work Experience</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {experience.map((entry, i) => (
              <ExperienceCard key={i} entry={entry} />
            ))}
          </div>
        </section>
      )}

      <section className="flex justify-center pb-24">
        <HireMeCard />
      </section>

      <Footer />
    </Container>
  );
}
