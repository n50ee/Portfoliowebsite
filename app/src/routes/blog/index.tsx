import { createFileRoute, Link } from "@tanstack/react-router";
import { NavBar } from "../../components/brand/NavBar";
import { Footer } from "../../components/brand/Footer";
import { Container } from "../../components/brand/Container";
import { getPublishedBlogPosts } from "../../lib/api/content.functions";

export const Route = createFileRoute("/blog/")({
  loader: () => getPublishedBlogPosts(),
  head: () => ({
    meta: [{ title: "Writing | Ameer Moavia" }, { name: "description", content: "Notes on product and interaction design." }],
  }),
  component: BlogIndex,
});

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function BlogIndex() {
  const posts = Route.useLoaderData();

  return (
    <Container>
      <NavBar />

      <section className="py-24">
        <h1 className="mb-10 font-display text-display-lg font-medium tracking-display text-ink-900">Writing</h1>

        {posts.length > 0 ? (
          <div className="flex flex-col divide-y divide-line-soft">
            {posts.map((post) => (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block py-6 font-body text-inherit no-underline first:pt-0"
              >
                <span className="mb-1 block text-caption text-ink-500">{formatDate(post.publishedAt)}</span>
                <h2 className="mb-1.5 font-display text-heading-sm font-semibold text-ink-900">{post.title}</h2>
                <p className="text-body-sm text-ink-500">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-body-sm text-ink-500">No posts published yet. Write your first one from the admin dashboard.</p>
        )}
      </section>

      <Footer />
    </Container>
  );
}
