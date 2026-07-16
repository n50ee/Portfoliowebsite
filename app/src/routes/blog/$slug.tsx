import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { NavBar } from "../../components/brand/NavBar";
import { Footer } from "../../components/brand/Footer";
import { Container } from "../../components/brand/Container";
import { ArticleBody } from "../../components/brand/ArticleBody";
import { getBlogPostDetail } from "../../lib/api/content.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getBlogPostDetail({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) =>
    loaderData
      ? { meta: [{ title: `${loaderData.title} | Ameer Moavia` }, { name: "description", content: loaderData.excerpt }] }
      : {},
  component: BlogPost,
});

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function BlogPost() {
  const post = Route.useLoaderData();

  return (
    <Container>
      <NavBar />

      <Link to="/blog" className="mt-6 inline-block font-body text-body-sm text-ink-500 no-underline hover:text-ink-900">
        ← Back to writing
      </Link>

      <article className="py-8 pb-24">
        <span className="mb-2 block font-body text-caption text-ink-500">{formatDate(post.publishedAt)}</span>
        <h1 className="mb-8 max-w-[760px] font-display text-display-lg font-medium tracking-display text-ink-900">
          {post.title}
        </h1>
        <div className="max-w-[760px]">
          {post.excerpt && (
            <>
              <p className="font-body text-subtitle leading-body text-ink-700">{post.excerpt}</p>
              <hr className="my-8 border-line-soft" />
            </>
          )}
          <ArticleBody markdown={post.body} />
        </div>
      </article>

      <Footer />
    </Container>
  );
}
