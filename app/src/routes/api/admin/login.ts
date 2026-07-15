import { createFileRoute } from "@tanstack/react-router";
import { createSessionToken, getAdminPassword, safeEqual, sessionCookieHeader } from "../../../lib/auth.server";

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null);
        const password = typeof body?.password === "string" ? body.password : "";

        const adminPassword = getAdminPassword();
        if (!adminPassword) {
          return Response.json(
            { ok: false, error: "Admin login isn't configured yet." },
            { status: 503 },
          );
        }

        if (!password || !safeEqual(password, adminPassword)) {
          return Response.json({ ok: false, error: "Incorrect password." }, { status: 401 });
        }

        const token = await createSessionToken();
        return Response.json(
          { ok: true },
          { headers: { "Set-Cookie": sessionCookieHeader(token) } },
        );
      },
    },
  },
});
