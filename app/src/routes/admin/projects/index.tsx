import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { AdminShell } from "../../../components/admin/AdminShell";
import { Card } from "../../../components/brand/Card";
import { Badge } from "../../../components/brand/Badge";
import { requireAdminBeforeLoad } from "../../../lib/admin-guard";
import {
  adminDeleteProject,
  adminListProjects,
  adminReorderProjects,
} from "../../../lib/api/admin.functions";
import type { Project } from "../../../lib/types";

export const Route = createFileRoute("/admin/projects/")({
  beforeLoad: ({ location }) => requireAdminBeforeLoad(location.pathname),
  loader: () => adminListProjects(),
  component: ProjectsList,
});

function ProjectsList() {
  const loaderProjects = Route.useLoaderData();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(loaderProjects);

  async function handleDelete(id: number, title: string) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    await adminDeleteProject({ data: { id } });
    router.invalidate();
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    const next = [...projects];
    [next[index], next[target]] = [next[target], next[index]];
    setProjects(next);
    await adminReorderProjects({ data: { orderedIds: next.map((p) => p.id) } });
    router.invalidate();
  }

  return (
    <AdminShell>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-heading-lg font-semibold text-ink-900">Projects</h1>
        <Link
          to="/admin/projects/new"
          className="rounded-md bg-signature-500 px-4 py-2 text-body-sm font-semibold text-[#fff8f4] no-underline hover:bg-signature-600"
        >
          New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-body-sm text-ink-500">No projects yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((p, i) => (
            <Card key={p.id} padding="md" className="flex items-center justify-between gap-4">
              <div className="flex shrink-0 flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Move up"
                  className="flex h-6 w-6 items-center justify-center rounded border border-line text-ink-700 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === projects.length - 1}
                  aria-label="Move down"
                  className="flex h-6 w-6 items-center justify-center rounded border border-line text-ink-700 disabled:opacity-30"
                >
                  ↓
                </button>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-display text-heading-sm font-semibold text-ink-900">{p.title}</span>
                  <Badge tone={p.published ? "success" : "neutral"}>{p.published ? "Published" : "Draft"}</Badge>
                </div>
                <div className="text-caption text-ink-500">
                  {p.client} · /work/{p.slug}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link
                  to="/admin/projects/$id"
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
    </AdminShell>
  );
}
