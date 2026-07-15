import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminShell } from "../../../components/admin/AdminShell";
import { ProjectForm, type ProjectFormValues } from "../../../components/admin/ProjectForm";
import { requireAdminBeforeLoad } from "../../../lib/admin-guard";
import { adminCreateProject } from "../../../lib/api/admin.functions";

export const Route = createFileRoute("/admin/projects/new")({
  beforeLoad: ({ location }) => requireAdminBeforeLoad(location.pathname),
  component: NewProject,
});

function NewProject() {
  const navigate = useNavigate();

  async function handleSubmit(values: ProjectFormValues) {
    await adminCreateProject({ data: values });
    navigate({ to: "/admin/projects" });
  }

  return (
    <AdminShell>
      <h1 className="mb-6 font-display text-heading-lg font-semibold text-ink-900">New project</h1>
      <ProjectForm onSubmit={handleSubmit} submitLabel="Create project" />
    </AdminShell>
  );
}
