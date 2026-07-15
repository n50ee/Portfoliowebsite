import { createFileRoute } from "@tanstack/react-router";
import { clearSessionCookieHeader } from "../../../lib/auth.server";

export const Route = createFileRoute("/api/admin/logout")({
  server: {
    handlers: {
      POST: async () => {
        return Response.json(
          { ok: true },
          { headers: { "Set-Cookie": clearSessionCookieHeader() } },
        );
      },
    },
  },
});
