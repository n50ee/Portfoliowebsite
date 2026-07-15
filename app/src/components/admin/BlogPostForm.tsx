import { useState } from "react";
import { Input, Textarea } from "../brand/Field";
import { Button } from "../brand/Button";
import type { BlogPost } from "../../lib/types";

export interface BlogPostFormValues {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImageUrl: string | null;
  published: boolean;
}

function toFormValues(post?: BlogPost | null): BlogPostFormValues {
  return {
    slug: post?.slug ?? "",
    title: post?.title ?? "",
    excerpt: post?.excerpt ?? "",
    body: post?.body ?? "",
    coverImageUrl: post?.coverImageUrl ?? "",
    published: post?.published ?? false,
  };
}

export function BlogPostForm({
  post,
  onSubmit,
  submitLabel,
}: {
  post?: BlogPost | null;
  onSubmit: (values: BlogPostFormValues) => Promise<void>;
  submitLabel: string;
}) {
  const [values, setValues] = useState<BlogPostFormValues>(() => toFormValues(post));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof BlogPostFormValues>(key: K, value: BlogPostFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await onSubmit({ ...values, coverImageUrl: values.coverImageUrl || null });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Title" value={values.title} onChange={(e) => set("title", e.target.value)} required />
        <Input
          label="Slug (used in the URL: /blog/slug)"
          value={values.slug}
          onChange={(e) => set("slug", e.target.value)}
          required
        />
      </div>
      <Textarea
        label="Excerpt (shown in the list page)"
        rows={2}
        value={values.excerpt}
        onChange={(e) => set("excerpt", e.target.value)}
      />
      <Textarea label="Body" rows={12} value={values.body} onChange={(e) => set("body", e.target.value)} />
      <Input
        label="Cover image URL (optional)"
        value={values.coverImageUrl ?? ""}
        onChange={(e) => set("coverImageUrl", e.target.value)}
      />
      <label className="flex items-center gap-2 text-body-sm text-ink-900">
        <input type="checkbox" checked={values.published} onChange={(e) => set("published", e.target.checked)} />
        Published (visible on the live site)
      </label>
      {error && <p className="text-caption text-critical">{error}</p>}
      <Button type="submit" disabled={submitting} className="self-start">
        {submitting ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
