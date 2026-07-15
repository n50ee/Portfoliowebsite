import { createFileRoute, Link } from "@tanstack/react-router";
import { NavBar } from "../components/brand/NavBar";
import { Footer } from "../components/brand/Footer";
import { Container } from "../components/brand/Container";
import { ProjectTile } from "../components/brand/ProjectTile";
import { buttonClasses } from "../components/brand/Button";
import { getHomeProjects } from "../lib/api/content.functions";

export const Route = createFileRoute("/")({
  loader: () => getHomeProjects(),
  component: Index,
});

function Index() {
  const projects = Route.useLoaderData();

  return (
    <Container>
      <NavBar />

      <section className="py-24 sm:py-24">
        <p className="mb-4 font-body text-caption font-semibold uppercase tracking-eyebrow text-signature-500">
          Product designer
        </p>
        <h1 className="mb-5 max-w-[720px] font-display text-display-lg font-medium tracking-display text-ink-900">
          I design products people actually enjoy using.
        </h1>
        <p className="mb-8 max-w-[560px] font-body text-subtitle text-ink-700">
          Ameer Moavia, currently freelancing on product and interaction design.
          Selected case studies below.
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

      <section className="pb-24">
        <h2 className="mb-6 font-display text-heading-md font-semibold text-ink-900">Selected work</h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectTile key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-body-sm text-ink-500">
            No projects published yet. Add some from the admin dashboard.
          </p>
        )}
      </section>

      <Footer />
    </Container>
  );
}
