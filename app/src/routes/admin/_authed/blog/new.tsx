import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BlogPostForm, type BlogPostFormValues } from "../../../../components/admin/BlogPostForm";
import { adminCreateBlogPost } from "../../../../lib/api/admin.functions";

export const Route = createFileRoute("/admin/_authed/blog/new")({
  component: NewBlogPost,
});

function NewBlogPost() {
  const navigate = useNavigate();

  async function handleSubmit(values: BlogPostFormValues) {
    await adminCreateBlogPost({ data: values });
    navigate({ to: "/admin/blog" });
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-heading-lg font-semibold text-ink-900">New post</h1>
      <BlogPostForm onSubmit={handleSubmit} submitLabel="Create post" />
    </div>
  );
}
