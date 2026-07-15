import { createFileRoute, Outlet, Link, redirect, useNavigate, useRouterState } from "@tanstack/react-router";
import { clsx } from "clsx";
import { checkAdminSession } from "../../lib/require-admin.server";

export const Route = createFileRoute("/admin/_authed")({
  beforeLoad: async ({ location }) => {
    const { authorized } = await checkAdminSession();
    if (!authorized) {
      throw redirect({ to: "/admin/login", search: { redirect: location.pathname } });
    }
  },
  component: AdminLayout,
});

const navItems = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/blog", label: "Writing" },
  { to: "/admin/messages", label: "Messages" },
  { to: "/admin/profile", label: "Profile" },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    navigate({ to: "/admin/login" });
  }

  return (
    <div className="min-h-dvh bg-paper font-body">
      <div className="mx-auto flex max-w-[1200px] gap-10 px-6 py-8">
        <aside className="w-48 shrink-0">
          <div className="mb-6 font-display text-base font-semibold text-ink-900">Admin</div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={clsx(
                    "rounded-md px-3 py-2 text-body-sm font-semibold no-underline",
                    active ? "bg-paper-sunken text-ink-900" : "text-ink-500 hover:text-ink-900",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={handleLogout}
            className="mt-6 rounded-md px-3 py-2 text-left text-body-sm font-semibold text-ink-500 hover:text-critical"
          >
            Sign out
          </button>
          <Link
            to="/"
            className="mt-1 block rounded-md px-3 py-2 text-body-sm text-ink-300 no-underline hover:text-ink-500"
          >
            ← View site
          </Link>
        </aside>
        <main className="min-w-0 flex-1 pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
