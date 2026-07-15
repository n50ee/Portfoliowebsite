import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Card } from "../../../../components/brand/Card";
import { Badge } from "../../../../components/brand/Badge";
import { adminDeleteMessage, adminListMessages, adminMarkMessageRead } from "../../../../lib/api/admin.functions";

export const Route = createFileRoute("/admin/_authed/messages/")({
  loader: () => adminListMessages(),
  component: MessagesList,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

function MessagesList() {
  const messages = Route.useLoaderData();
  const router = useRouter();

  async function toggleRead(id: number, read: boolean) {
    await adminMarkMessageRead({ data: { id, read: !read } });
    router.invalidate();
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this message?")) return;
    await adminDeleteMessage({ data: { id } });
    router.invalidate();
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-heading-lg font-semibold text-ink-900">Messages</h1>

      {messages.length === 0 ? (
        <p className="text-body-sm text-ink-500">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <Card key={m.id} padding="md">
              <div className="mb-2 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink-900">{m.name}</span>
                    {!m.read && <Badge tone="accent">New</Badge>}
                  </div>
                  <a href={`mailto:${m.email}`} className="text-caption text-ink-500">
                    {m.email}
                  </a>
                </div>
                <span className="shrink-0 text-caption text-ink-300">{formatDate(m.createdAt)}</span>
              </div>
              <p className="mb-3 whitespace-pre-line text-body-sm text-ink-700">{m.message}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleRead(m.id, m.read)}
                  className="rounded-md border border-ink-900 px-3 py-1.5 text-caption font-semibold text-ink-900"
                >
                  Mark as {m.read ? "unread" : "read"}
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
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
