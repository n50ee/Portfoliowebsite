import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { BlogPostForm, type BlogPostFormValues } from "../../../../components/admin/BlogPostForm";
import { adminGetBlogPost, adminUpdateBlogPost } from "../../../../lib/api/admin.functions";

export const Route = createFileRoute("/admin/_authed/blog/$id")({
  loader: async ({ params }) => {
    const post = await adminGetBlogPost({ data: { id: Number(params.id) } });
    if (!post) throw notFound();
    return post;
  },
  component: EditBlogPost,
});

function EditBlogPost() {
  const post = Route.useLoaderData();
  const navigate = useNavigate();

  async function handleSubmit(values: BlogPostFormValues) {
    await adminUpdateBlogPost({ data: { id: post.id, ...values } });
    navigate({ to: "/admin/blog" });
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-heading-lg font-semibold text-ink-900">Edit post</h1>
      <BlogPostForm post={post} onSubmit={handleSubmit} submitLabel="Save changes" />
    </div>
  );
}
