import { createFileRoute } from "@tanstack/react-router";
import { bindings } from "../../../lib/bindings.server";
import { ADMIN_SESSION_COOKIE, readCookie, verifySessionToken } from "../../../lib/auth.server";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export const Route = createFileRoute("/api/admin/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = readCookie(request.headers.get("cookie"), ADMIN_SESSION_COOKIE);
        if (!(await verifySessionToken(token))) {
          return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }

        const { STORAGE } = bindings();
        if (!STORAGE) {
          return Response.json({ ok: false, error: "Storage isn't configured" }, { status: 503 });
        }

        const form = await request.formData();
        const file = form.get("file");
        if (!(file instanceof File)) {
          return Response.json({ ok: false, error: "No file provided" }, { status: 400 });
        }
        const ext = ALLOWED_TYPES[file.type];
        if (!ext) {
          return Response.json(
            { ok: false, error: "Only JPEG, PNG, WEBP, or GIF images are allowed" },
            { status: 400 },
          );
        }
        if (file.size > MAX_BYTES) {
          return Response.json({ ok: false, error: "Image is larger than 8MB" }, { status: 400 });
        }

        const key = `${crypto.randomUUID()}.${ext}`;
        await STORAGE.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });

        return Response.json({ ok: true, url: `/api/media/${key}` });
      },
    },
  },
});
