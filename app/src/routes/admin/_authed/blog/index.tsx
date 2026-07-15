import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Card } from "../../../../components/brand/Card";
import { Badge } from "../../../../components/brand/Badge";
import { adminDeleteBlogPost, adminListBlogPosts } from "../../../../lib/api/admin.functions";

export const Route = createFileRoute("/admin/_authed/blog/")({
  loader: () => adminListBlogPosts(),
  component: BlogList,
});

function BlogList() {
  const posts = Route.useLoaderData();
  const router = useRouter();

  async function handleDelete(id: number, title: string) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    await adminDeleteBlogPost({ data: { id } });
    router.invalidate();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-heading-lg font-semibold text-ink-900">Writing</h1>
        <Link
          to="/admin/blog/new"
          className="rounded-md bg-signature-500 px-4 py-2 text-body-sm font-semibold text-[#fff8f4] no-underline hover:bg-signature-600"
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-body-sm text-ink-500">No posts yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((p) => (
            <Card key={p.id} padding="md" className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate font-display text-heading-sm font-semibold text-ink-900">{p.title}</span>
                  <Badge tone={p.published ? "success" : "neutral"}>{p.published ? "Published" : "Draft"}</Badge>
                </div>
                <div className="text-caption text-ink-500">/blog/{p.slug}</div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link
                  to="/admin/blog/$id"
                  params={{ id: String(p.id) }}
                  className="rounded-md border border-ink-900 px-3 py-1.5 text-caption font-semibold text-ink-900 no-underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p.id, p.title)}
                  className="rounded-md border border-transparent px-3 py-1.5 text-caption font-semibold text-critical"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
