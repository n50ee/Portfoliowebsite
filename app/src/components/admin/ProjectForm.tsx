import { useState } from "react";
import { Input, Textarea } from "../brand/Field";
import { Button } from "../brand/Button";
import { ImageField } from "./ImageField";
import { GalleryField } from "./GalleryField";
import type { Project } from "../../lib/types";

export interface ProjectFormValues {
  slug: string;
  title: string;
  client: string;
  description: string;
  body: string;
  tags: string[];
  themeAccent: string | null;
  themeTint: string | null;
  imageUrl: string | null;
  gallery: string[];
  role: string | null;
  timeline: string | null;
  team: string | null;
  status: string;
  sortOrder: number;
  published: boolean;
}

function toFormValues(project?: Project | null): ProjectFormValues {
  return {
    slug: project?.slug ?? "",
    title: project?.title ?? "",
    client: project?.client ?? "",
    description: project?.description ?? "",
    body: project?.body ?? "",
    tags: project?.tags ?? [],
    themeAccent: project?.themeAccent ?? "",
    themeTint: project?.themeTint ?? "",
    imageUrl: project?.imageUrl ?? "",
    gallery: project?.gallery ?? [],
    role: project?.role ?? "",
    timeline: project?.timeline ?? "",
    team: project?.team ?? "",
    status: project?.status ?? "Shipped",
    sortOrder: project?.sortOrder ?? 0,
    published: project?.published ?? true,
  };
}

export function ProjectForm({
  project,
  onSubmit,
  submitLabel,
}: {
  project?: Project | null;
  onSubmit: (values: ProjectFormValues) => Promise<void>;
  submitLabel: string;
}) {
  const [values, setValues] = useState<ProjectFormValues>(() => toFormValues(project));
  const [tagsText, setTagsText] = useState(() => (project?.tags ?? []).join(", "));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await onSubmit({
        ...values,
        tags: tagsText
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        themeAccent: values.themeAccent || null,
        themeTint: values.themeTint || null,
        imageUrl: values.imageUrl || null,
        role: values.role || null,
        timeline: values.timeline || null,
        team: values.team || null,
      });
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
          label="Slug (used in the URL: /work/slug)"
          value={values.slug}
          onChange={(e) => set("slug", e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Client" value={values.client} onChange={(e) => set("client", e.target.value)} />
        <Input label="Status" value={values.status} onChange={(e) => set("status", e.target.value)} />
      </div>
      <Textarea
        label="Short description (shown on the homepage card)"
        rows={2}
        value={values.description}
        onChange={(e) => set("description", e.target.value)}
      />
      <Textarea
        label="Full case study body"
        rows={8}
        value={values.body}
        onChange={(e) => set("body", e.target.value)}
      />
      <Input label="Tags (comma separated)" value={tagsText} onChange={(e) => setTagsText(e.target.value)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input label="Role" value={values.role ?? ""} onChange={(e) => set("role", e.target.value)} />
        <Input label="Timeline" value={values.timeline ?? ""} onChange={(e) => set("timeline", e.target.value)} />
        <Input label="Team" value={values.team ?? ""} onChange={(e) => set("team", e.target.value)} />
      </div>
      <ImageField
        label="Hero image (shown at the top of the case study)"
        value={values.imageUrl ?? ""}
        onChange={(url) => set("imageUrl", url)}
      />
      <GalleryField
        label="Photo gallery (shown below the hero image)"
        value={values.gallery}
        onChange={(urls) => set("gallery", urls)}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input
          label="Accent color (hex, e.g. #4285F4)"
          value={values.themeAccent ?? ""}
          onChange={(e) => set("themeAccent", e.target.value)}
        />
        <Input
          label="Tint color (hex, e.g. #EAF1FE)"
          value={values.themeTint ?? ""}
          onChange={(e) => set("themeTint", e.target.value)}
        />
        <Input
          label="Sort order"
          type="number"
          value={values.sortOrder}
          onChange={(e) => set("sortOrder", Number(e.target.value))}
        />
      </div>
      <label className="flex items-center gap-2 text-body-sm text-ink-900">
        <input
          type="checkbox"
          checked={values.published}
          onChange={(e) => set("published", e.target.checked)}
        />
        Published (visible on the live site)
      </label>
      {error && <p className="text-caption text-critical">{error}</p>}
      <Button type="submit" disabled={submitting} className="self-start">
        {submitting ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
