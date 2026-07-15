import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { ADMIN_SESSION_COOKIE, readCookie, verifySessionToken } from "./auth.server";

async function isAdminRequest(): Promise<boolean> {
  const request = getWebRequest();
  const cookieHeader = request?.headers.get("cookie") ?? null;
  const token = readCookie(cookieHeader, ADMIN_SESSION_COOKIE);
  return verifySessionToken(token);
}

/** Call from a route's `beforeLoad` to gate every `/admin/**` page server-side. */
export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  return { authorized: await isAdminRequest() };
});

/**
 * Defense-in-depth: every admin mutation/read server function calls this
 * FIRST. The route-level `beforeLoad` guard is for UX only — this is the
 * actual safety boundary, since server functions can be invoked directly.
 */
export async function assertAdmin(): Promise<void> {
  if (!(await isAdminRequest())) {
    throw new Error("unauthorized");
  }
}
