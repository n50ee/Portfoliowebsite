export interface TournamentResult {
  date: string;
  place: string;
  tier: string;
  tournament: string;
  prize: string;
}

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
  results: TournamentResult[];
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

export interface PersonEntry {
  name: string;
  role: string;
  photoUrl: string;
  /** Focal point within the card, 0-100. Defaults to centered (50/50). */
  photoX?: number;
  photoY?: number;
  /** Zoom percentage, 100 = no zoom. */
  photoZoom?: number;
  photoFit?: "cover" | "contain";
}

export interface Profile {
  bio: string;
  skills: string[];
  experience: ExperienceEntry[];
  people: PersonEntry[];
  resumeUrl: string | null;
}
