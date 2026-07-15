import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { ProjectForm, type ProjectFormValues } from "../../../../components/admin/ProjectForm";
import { adminGetProject, adminUpdateProject } from "../../../../lib/api/admin.functions";

export const Route = createFileRoute("/admin/_authed/projects/$id")({
  loader: async ({ params }) => {
    const project = await adminGetProject({ data: { id: Number(params.id) } });
    if (!project) throw notFound();
    return project;
  },
  component: EditProject,
});

function EditProject() {
  const project = Route.useLoaderData();
  const navigate = useNavigate();

  async function handleSubmit(values: ProjectFormValues) {
    await adminUpdateProject({ data: { id: project.id, ...values } });
    navigate({ to: "/admin/projects" });
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-heading-lg font-semibold text-ink-900">Edit project</h1>
      <ProjectForm project={project} onSubmit={handleSubmit} submitLabel="Save changes" />
    </div>
  );
}
