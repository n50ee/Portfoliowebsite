import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { assertAdmin } from "../require-admin";
import * as db from "../db.server";

// ---- Projects ----

export const adminListProjects = createServerFn({ method: "GET" }).handler(async () => {
  await assertAdmin();
  return db.listProjects({ publishedOnly: false });
});

export const adminGetProject = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    await assertAdmin();
    return db.getProjectById(data.id);
  });

const projectInputSchema = z.object({
  slug: z.string().trim().min(1).max(200),
  title: z.string().trim().min(1).max(300),
  client: z.string().trim().max(200),
  description: z.string().trim().max(2000),
  body: z.string().max(20000),
  tags: z.array(z.string().trim().min(1)).max(20),
  themeAccent: z.string().trim().max(20).nullable(),
  themeTint: z.string().trim().max(20).nullable(),
  imageUrl: z.string().trim().max(2000).nullable(),
  gallery: z.array(z.string().trim().min(1)).max(60),
  role: z.string().trim().max(200).nullable(),
  timeline: z.string().trim().max(200).nullable(),
  team: z.string().trim().max(200).nullable(),
  status: z.string().trim().max(50),
  sortOrder: z.number(),
  published: z.boolean(),
});

export const adminCreateProject = createServerFn({ method: "POST" })
  .validator(projectInputSchema)
  .handler(async ({ data }) => {
    await assertAdmin();
    const id = await db.createProject(data);
    return { id };
  });

export const adminUpdateProject = createServerFn({ method: "POST" })
  .validator(projectInputSchema.extend({ id: z.number() }))
  .handler(async ({ data }) => {
    await assertAdmin();
    const { id, ...rest } = data;
    await db.updateProject(id, rest);
    return { ok: true as const };
  });

export const adminDeleteProject = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    await assertAdmin();
    await db.deleteProject(data.id);
    return { ok: true as const };
  });

export const adminReorderProjects = createServerFn({ method: "POST" })
  .validator(z.object({ orderedIds: z.array(z.number()) }))
  .handler(async ({ data }) => {
    await assertAdmin();
    await db.reorderProjects(data.orderedIds);
    return { ok: true as const };
  });

// ---- Blog posts ----

export const adminListBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  await assertAdmin();
  return db.listBlogPosts({ publishedOnly: false });
});

export const adminGetBlogPost = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    await assertAdmin();
    return db.getBlogPostById(data.id);
  });

const blogPostInputSchema = z.object({
  slug: z.string().trim().min(1).max(200),
  title: z.string().trim().min(1).max(300),
  excerpt: z.string().trim().max(500),
  body: z.string().max(50000),
  coverImageUrl: z.string().trim().max(2000).nullable(),
  published: z.boolean(),
});

export const adminCreateBlogPost = createServerFn({ method: "POST" })
  .validator(blogPostInputSchema)
  .handler(async ({ data }) => {
    await assertAdmin();
    const id = await db.createBlogPost(data);
    return { id };
  });

export const adminUpdateBlogPost = createServerFn({ method: "POST" })
  .validator(blogPostInputSchema.extend({ id: z.number() }))
  .handler(async ({ data }) => {
    await assertAdmin();
    const existing = await db.getBlogPostById(data.id);
    const { id, ...rest } = data;
    await db.updateBlogPost(id, rest, existing?.published ?? false);
    return { ok: true as const };
  });

export const adminDeleteBlogPost = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    await assertAdmin();
    await db.deleteBlogPost(data.id);
    return { ok: true as const };
  });

// ---- Messages ----

export const adminListMessages = createServerFn({ method: "GET" }).handler(async () => {
  await assertAdmin();
  return db.listMessages();
});

export const adminMarkMessageRead = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number(), read: z.boolean() }))
  .handler(async ({ data }) => {
    await assertAdmin();
    await db.markMessageRead(data.id, data.read);
    return { ok: true as const };
  });

export const adminDeleteMessage = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    await assertAdmin();
    await db.deleteMessage(data.id);
    return { ok: true as const };
  });

// ---- Profile ----

export const adminGetProfile = createServerFn({ method: "GET" }).handler(async () => {
  await assertAdmin();
  return db.getProfile();
});

const profileInputSchema = z.object({
  bio: z.string().max(10000),
  skills: z.array(z.string().trim().min(1)).max(40),
  experience: z
    .array(
      z.object({
        role: z.string().trim().max(200),
        place: z.string().trim().max(200),
        years: z.string().trim().max(100),
        description: z.string().trim().max(1000),
        workType: z.string().trim().max(50),
        duration: z.string().trim().max(50),
        logoUrl: z.string().trim().max(2000),
      }),
    )
    .max(50),
  resumeUrl: z.string().trim().max(2000).nullable(),
});

export const adminUpdateProfile = createServerFn({ method: "POST" })
  .validator(profileInputSchema)
  .handler(async ({ data }) => {
    await assertAdmin();
    await db.updateProfile(data);
    return { ok: true as const };
  });
