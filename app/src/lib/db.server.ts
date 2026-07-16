import { bindings } from "./bindings.server";
import type { BlogPost, ContactMessage, Profile, Project } from "./types";

function db() {
  const { DB } = bindings();
  if (!DB) throw new Error("D1 binding (DB) is not available");
  return DB;
}

function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// ---- Projects ----

type ProjectRow = {
  id: number;
  slug: string;
  title: string;
  client: string;
  description: string;
  body: string;
  tags: string;
  theme_accent: string | null;
  theme_tint: string | null;
  image_url: string | null;
  gallery: string;
  role: string | null;
  timeline: string | null;
  team: string | null;
  status: string;
  sort_order: number;
  published: number;
  created_at: string;
  updated_at: string;
};

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    client: row.client,
    description: row.description,
    body: row.body,
    tags: parseJsonArray(row.tags),
    themeAccent: row.theme_accent,
    themeTint: row.theme_tint,
    imageUrl: row.image_url,
    gallery: parseJsonArray(row.gallery),
    role: row.role,
    timeline: row.timeline,
    team: row.team,
    status: row.status,
    sortOrder: row.sort_order,
    published: row.published === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listProjects(opts: { publishedOnly: boolean }): Promise<Project[]> {
  const query = opts.publishedOnly
    ? "SELECT * FROM projects WHERE published = 1 ORDER BY sort_order ASC, id ASC"
    : "SELECT * FROM projects ORDER BY sort_order ASC, id ASC";
  const { results } = await db().prepare(query).all<ProjectRow>();
  return results.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const row = await db()
    .prepare("SELECT * FROM projects WHERE slug = ?1 AND published = 1")
    .bind(slug)
    .first<ProjectRow>();
  return row ? mapProject(row) : null;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const row = await db().prepare("SELECT * FROM projects WHERE id = ?1").bind(id).first<ProjectRow>();
  return row ? mapProject(row) : null;
}

export interface ProjectInput {
  slug: string;
  title: string;
  client: string;
  description: string;
  body: string;
  tags: string[];
  themeAccent: string | null;
  themeTint: string | null;
  imageUrl: string | null;
  gallery: string[];
  role: string | null;
  timeline: string | null;
  team: string | null;
  status: string;
  sortOrder: number;
  published: boolean;
}

export async function createProject(input: ProjectInput): Promise<number> {
  const res = await db()
    .prepare(
      `INSERT INTO projects (slug, title, client, description, body, tags, theme_accent, theme_tint, image_url, gallery, role, timeline, team, status, sort_order, published, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, datetime('now'))`,
    )
    .bind(
      input.slug,
      input.title,
      input.client,
      input.description,
      input.body,
      JSON.stringify(input.tags),
      input.themeAccent,
      input.themeTint,
      input.imageUrl,
      JSON.stringify(input.gallery),
      input.role,
      input.timeline,
      input.team,
      input.status,
      input.sortOrder,
      input.published ? 1 : 0,
    )
    .run();
  return Number(res.meta.last_row_id);
}

export async function updateProject(id: number, input: ProjectInput): Promise<void> {
  await db()
    .prepare(
      `UPDATE projects SET slug=?1, title=?2, client=?3, description=?4, body=?5, tags=?6, theme_accent=?7, theme_tint=?8, image_url=?9, gallery=?10, role=?11, timeline=?12, team=?13, status=?14, sort_order=?15, published=?16, updated_at=datetime('now')
       WHERE id=?17`,
    )
    .bind(
      input.slug,
      input.title,
      input.client,
      input.description,
      input.body,
      JSON.stringify(input.tags),
      input.themeAccent,
      input.themeTint,
      input.imageUrl,
      JSON.stringify(input.gallery),
      input.role,
      input.timeline,
      input.team,
      input.status,
      input.sortOrder,
      input.published ? 1 : 0,
      id,
    )
    .run();
}

export async function deleteProject(id: number): Promise<void> {
  await db().prepare("DELETE FROM projects WHERE id = ?1").bind(id).run();
}

// ---- Blog posts ----

type BlogPostRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image_url: string | null;
  published: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

function mapBlogPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    coverImageUrl: row.cover_image_url,
    published: row.published === 1,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listBlogPosts(opts: { publishedOnly: boolean }): Promise<BlogPost[]> {
  const query = opts.publishedOnly
    ? "SELECT * FROM blog_posts WHERE published = 1 ORDER BY published_at DESC, id DESC"
    : "SELECT * FROM blog_posts ORDER BY created_at DESC, id DESC";
  const { results } = await db().prepare(query).all<BlogPostRow>();
  return results.map(mapBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const row = await db()
    .prepare("SELECT * FROM blog_posts WHERE slug = ?1 AND published = 1")
    .bind(slug)
    .first<BlogPostRow>();
  return row ? mapBlogPost(row) : null;
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  const row = await db().prepare("SELECT * FROM blog_posts WHERE id = ?1").bind(id).first<BlogPostRow>();
  return row ? mapBlogPost(row) : null;
}

export interface BlogPostInput {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImageUrl: string | null;
  published: boolean;
}

export async function createBlogPost(input: BlogPostInput): Promise<number> {
  const res = await db()
    .prepare(
      `INSERT INTO blog_posts (slug, title, excerpt, body, cover_image_url, published, published_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, datetime('now'))`,
    )
    .bind(
      input.slug,
      input.title,
      input.excerpt,
      input.body,
      input.coverImageUrl,
      input.published ? 1 : 0,
      input.published ? new Date().toISOString() : null,
    )
    .run();
  return Number(res.meta.last_row_id);
}

export async function updateBlogPost(id: number, input: BlogPostInput, wasPublished: boolean): Promise<void> {
  const justPublished = input.published && !wasPublished;
  await db()
    .prepare(
      `UPDATE blog_posts SET slug=?1, title=?2, excerpt=?3, body=?4, cover_image_url=?5, published=?6, published_at=COALESCE(?7, published_at), updated_at=datetime('now')
       WHERE id=?8`,
    )
    .bind(
      input.slug,
      input.title,
      input.excerpt,
      input.body,
      input.coverImageUrl,
      input.published ? 1 : 0,
      justPublished ? new Date().toISOString() : null,
      id,
    )
    .run();
}

export async function deleteBlogPost(id: number): Promise<void> {
  await db().prepare("DELETE FROM blog_posts WHERE id = ?1").bind(id).run();
}

// ---- Contact messages ----

type ContactMessageRow = {
  id: number;
  name: string;
  email: string;
  message: string;
  read: number;
  created_at: string;
};

function mapMessage(row: ContactMessageRow): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    read: row.read === 1,
    createdAt: row.created_at,
  };
}

export async function listMessages(): Promise<ContactMessage[]> {
  const { results } = await db()
    .prepare("SELECT * FROM contact_messages ORDER BY created_at DESC, id DESC")
    .all<ContactMessageRow>();
  return results.map(mapMessage);
}

export async function createMessage(input: { name: string; email: string; message: string }): Promise<void> {
  await db()
    .prepare("INSERT INTO contact_messages (name, email, message) VALUES (?1, ?2, ?3)")
    .bind(input.name, input.email, input.message)
    .run();
}

export async function markMessageRead(id: number, read: boolean): Promise<void> {
  await db()
    .prepare("UPDATE contact_messages SET read = ?1 WHERE id = ?2")
    .bind(read ? 1 : 0, id)
    .run();
}

export async function deleteMessage(id: number): Promise<void> {
  await db().prepare("DELETE FROM contact_messages WHERE id = ?1").bind(id).run();
}

// ---- Profile (singleton) ----

type ProfileRow = {
  bio: string;
  skills: string;
  experience: string;
  resume_url: string | null;
};

export async function getProfile(): Promise<Profile> {
  const row = await db()
    .prepare("SELECT bio, skills, experience, resume_url FROM profile WHERE id = 1")
    .first<ProfileRow>();
  if (!row) return { bio: "", skills: [], experience: [], resumeUrl: null };
  let experience: Profile["experience"] = [];
  try {
    const parsed = JSON.parse(row.experience);
    if (Array.isArray(parsed)) experience = parsed;
  } catch {
    experience = [];
  }
  return {
    bio: row.bio,
    skills: parseJsonArray(row.skills),
    experience,
    resumeUrl: row.resume_url,
  };
}

export async function updateProfile(input: Profile): Promise<void> {
  await db()
    .prepare(
      `UPDATE profile SET bio=?1, skills=?2, experience=?3, resume_url=?4, updated_at=datetime('now') WHERE id=1`,
    )
    .bind(input.bio, JSON.stringify(input.skills), JSON.stringify(input.experience), input.resumeUrl)
    .run();
}

// ---- Login throttle (brute-force protection for /api/admin/login) ----

const MAX_FAILED_ATTEMPTS = 8;
const LOCKOUT_MINUTES = 15;

export async function checkLoginThrottle(): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const row = await db()
    .prepare("SELECT locked_until FROM login_throttle WHERE id = 1")
    .first<{ locked_until: string | null }>();
  if (!row?.locked_until) return { allowed: true, retryAfterSeconds: 0 };

  const lockedUntil = new Date(row.locked_until.replace(" ", "T") + "Z").getTime();
  const now = Date.now();
  if (now >= lockedUntil) return { allowed: true, retryAfterSeconds: 0 };
  return { allowed: false, retryAfterSeconds: Math.ceil((lockedUntil - now) / 1000) };
}

export async function recordFailedLogin(): Promise<void> {
  const row = await db()
    .prepare("SELECT failed_count FROM login_throttle WHERE id = 1")
    .first<{ failed_count: number }>();
  const failedCount = (row?.failed_count ?? 0) + 1;

  if (failedCount >= MAX_FAILED_ATTEMPTS) {
    await db()
      .prepare(
        `UPDATE login_throttle SET failed_count = 0, locked_until = datetime('now', '+${LOCKOUT_MINUTES} minutes') WHERE id = 1`,
      )
      .run();
  } else {
    await db().prepare("UPDATE login_throttle SET failed_count = ?1 WHERE id = 1").bind(failedCount).run();
  }
}

export async function resetLoginThrottle(): Promise<void> {
  await db()
    .prepare("UPDATE login_throttle SET failed_count = 0, locked_until = NULL WHERE id = 1")
    .run();
}
