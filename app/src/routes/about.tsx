import { createFileRoute, Link } from "@tanstack/react-router";
import { NavBar } from "../components/brand/NavBar";
import { Footer } from "../components/brand/Footer";
import { Container } from "../components/brand/Container";
import { Card } from "../components/brand/Card";
import { Tag } from "../components/brand/Tag";
import { buttonClasses } from "../components/brand/Button";
import { getAboutData } from "../lib/api/content.functions";

export const Route = createFileRoute("/about")({
  loader: () => getAboutData(),
  head: () => ({
    meta: [{ title: "About | Ameer Moavia" }, { name: "description", content: "About Ameer Moavia, media ops & partnerships specialist." }],
  }),
  component: About,
});

function About() {
  const profile = Route.useLoaderData();

  return (
    <Container>
      <NavBar />

      <section className="grid grid-cols-1 gap-12 py-24 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="mb-5 font-display text-display-lg font-medium tracking-display text-ink-900">About</h1>
          <p className="mb-5 whitespace-pre-line font-body text-body leading-body text-ink-700">
            {profile.bio || "Placeholder bio. Add your real background, focus areas, and what you're looking for next from the admin dashboard."}
          </p>
          {profile.skills.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className={buttonClasses("secondary", "md")}>
              Get in touch
            </Link>
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className={buttonClasses("ghost", "md")}>
                Download résumé
              </a>
            )}
          </div>
        </div>

        <Card>
          <h3 className="mb-4 font-display text-heading-sm text-ink-900">Experience</h3>
          {profile.experience.length > 0 ? (
            profile.experience.map((entry, i) => (
              <div key={i} className="mb-4 font-body last:mb-0">
                <div className="text-body-sm font-semibold text-ink-900">{entry.role}</div>
                <div className="text-caption text-ink-500">
                  {entry.place} · {entry.years}
                </div>
              </div>
            ))
          ) : (
            <p className="text-body-sm text-ink-500">Add your work history from the admin dashboard.</p>
          )}
        </Card>
      </section>

      <Footer />
    </Container>
  );
}
