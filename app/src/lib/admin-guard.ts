import { redirect } from "@tanstack/react-router";
import { checkAdminSession } from "./require-admin";

/** Call from every `/admin/**` route's `beforeLoad` (except /admin/login itself). */
export async function requireAdminBeforeLoad(pathname: string): Promise<void> {
  const { authorized } = await checkAdminSession();
  if (!authorized) {
    throw redirect({ to: "/admin/login", search: { redirect: pathname } });
  }
}
