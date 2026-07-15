export interface Project {
  id: number;
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
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImageUrl: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ExperienceEntry {
  role: string;
  place: string;
  years: string;
  description: string;
  workType: string;
  duration: string;
  logoUrl: string;
}

export interface Profile {
  bio: string;
  skills: string[];
  experience: ExperienceEntry[];
  resumeUrl: string | null;
}
