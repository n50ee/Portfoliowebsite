import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  createMessage,
  getBlogPostBySlug,
  getProfile,
  getProjectBySlug,
  listBlogPosts,
  listProjects,
} from "../db.server";

export const getHomeProjects = createServerFn({ method: "GET" }).handler(async () => {
  return listProjects({ publishedOnly: true });
});

export const getProjectDetail = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    return getProjectBySlug(data.slug);
  });

export const getAboutData = createServerFn({ method: "GET" }).handler(async () => {
  return getProfile();
});

export const getPublishedBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  return listBlogPosts({ publishedOnly: true });
});

export const getBlogPostDetail = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    return getBlogPostBySlug(data.slug);
  });

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    await createMessage(data);
    return { ok: true as const };
  });
