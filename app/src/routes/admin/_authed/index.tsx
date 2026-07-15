import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "../../../components/brand/Card";
import { adminListProjects, adminListBlogPosts, adminListMessages } from "../../../lib/api/admin.functions";

export const Route = createFileRoute("/admin/_authed/")({
  loader: async () => {
    const [projects, posts, messages] = await Promise.all([
      adminListProjects(),
      adminListBlogPosts(),
      adminListMessages(),
    ]);
    return {
      projectCount: projects.length,
      postCount: posts.length,
      unreadCount: messages.filter((m) => !m.read).length,
    };
  },
  component: AdminDashboard,
});

function AdminDashboard() {
  const { projectCount, postCount, unreadCount } = Route.useLoaderData();

  const cards = [
    { label: "Projects", value: projectCount, to: "/admin/projects" },
    { label: "Posts", value: postCount, to: "/admin/blog" },
    { label: "Unread messages", value: unreadCount, to: "/admin/messages" },
  ] as const;

  return (
    <div>
      <h1 className="mb-6 font-display text-heading-lg font-semibold text-ink-900">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="block text-inherit no-underline">
            <Card>
              <div className="mb-1 text-caption uppercase tracking-eyebrow text-ink-500">{c.label}</div>
              <div className="font-display text-heading-lg font-semibold text-ink-900">{c.value}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
