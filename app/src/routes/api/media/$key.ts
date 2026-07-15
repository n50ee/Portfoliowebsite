import { createFileRoute } from "@tanstack/react-router";
import { bindings } from "../../../lib/bindings.server";

export const Route = createFileRoute("/api/media/$key")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { STORAGE } = bindings();
        if (!STORAGE) return new Response("Not found", { status: 404 });

        const object = await STORAGE.get(params.key);
        if (!object) return new Response("Not found", { status: 404 });

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);
        headers.set("Cache-Control", "public, max-age=31536000, immutable");
        return new Response(object.body, { headers });
      },
    },
  },
});
