import { createFileRoute } from "@tanstack/react-router";
import { createSessionToken, getAdminPassword, safeEqual, sessionCookieHeader } from "../../../lib/auth.server";
import { checkLoginThrottle, recordFailedLogin, resetLoginThrottle } from "../../../lib/db.server";

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const throttle = await checkLoginThrottle();
        if (!throttle.allowed) {
          return Response.json(
            {
              ok: false,
              error: `Too many failed attempts. Try again in ${Math.ceil(throttle.retryAfterSeconds / 60)} minute(s).`,
            },
            { status: 429 },
          );
        }

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
          await recordFailedLogin();
          return Response.json({ ok: false, error: "Incorrect code." }, { status: 401 });
        }

        await resetLoginThrottle();
        const token = await createSessionToken();
        return Response.json(
          { ok: true },
          { headers: { "Set-Cookie": sessionCookieHeader(token) } },
        );
      },
    },
  },
});
