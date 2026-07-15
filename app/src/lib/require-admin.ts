import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

// This file is reachable from client-side code (imported by admin-guard.ts,
// used in route `beforeLoad`s) so it must never import a `*.server.*` module
// — the platform's import-protection plugin blocks that at the file-name
// level, even inside a createServerFn handler. So the cookie/session check
// is self-contained here rather than shared with auth.server.ts.

const ADMIN_SESSION_COOKIE = "admin_session";

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function readCookie(cookieHeader: string | null, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  for (const part of cookieHeader.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return undefined;
}

async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return false;
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(sigB64) as BufferSource,
      new TextEncoder().encode(payloadB64),
    );
    if (!valid) return false;
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64))) as { exp: number };
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

// Wrapped with createServerOnlyFn (not a plain function): this keeps the
// function body — and its `@tanstack/react-start/server` import — out of the
// client bundle even though this module is reachable from client-side code
// (admin-guard.ts calls `checkAdminSession` directly). A plain async function
// here would leave the import-protection plugin unable to prove it's dead
// code on the client side.
const isAdminRequest = createServerOnlyFn(async (): Promise<boolean> => {
  const request = getRequest();
  const cookieHeader = request?.headers.get("cookie") ?? null;
  const token = readCookie(cookieHeader, ADMIN_SESSION_COOKIE);
  return verifySessionToken(token);
});

/** Call from a route's `beforeLoad` to gate every `/admin/**` page server-side. */
export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  return { authorized: await isAdminRequest() };
});

/**
 * Defense-in-depth: every admin mutation/read server function calls this
 * FIRST. The route-level `beforeLoad` guard is for UX only — this is the
 * actual safety boundary, since server functions can be invoked directly.
 */
export const assertAdmin = createServerOnlyFn(async (): Promise<void> => {
  if (!(await isAdminRequest())) {
    throw new Error("unauthorized");
  }
});
