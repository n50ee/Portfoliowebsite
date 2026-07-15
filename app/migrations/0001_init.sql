-- D1 schema for the Ameer Moavia portfolio CMS. Applied by the platform on
-- deploy (app.manifest.json sets "db": true). ONE database shared by preview +
-- prod — keep every change additive. Bound as env.DB.

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  client TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  tags TEXT NOT NULL DEFAULT '[]',
  theme_accent TEXT,
  theme_tint TEXT,
  image_url TEXT,
  role TEXT,
  timeline TEXT,
  team TEXT,
  status TEXT NOT NULL DEFAULT 'Shipped',
  sort_order INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  published INTEGER NOT NULL DEFAULT 0,
  published_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Singleton row (id = 1) holding the About page content.
CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  bio TEXT NOT NULL DEFAULT '',
  skills TEXT NOT NULL DEFAULT '[]',
  experience TEXT NOT NULL DEFAULT '[]',
  resume_url TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO profile (id, bio, skills, experience)
SELECT 1, '', '[]', '[]'
WHERE NOT EXISTS (SELECT 1 FROM profile WHERE id = 1);

INSERT INTO projects (slug, title, client, description, body, tags, theme_accent, theme_tint, role, timeline, team, status, sort_order, published)
SELECT 'redesigning-checkout', 'Redesigning checkout', 'Google',
  'Cut cart abandonment by rethinking the payment step end to end.',
  'Placeholder case study body. Replace from the admin dashboard with the real project narrative, process, and outcomes.',
  '["Product design","Research"]', '#4285F4', '#EAF1FE', 'Product designer', '2024', '4 designers, 2 PMs', 'Shipped', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'redesigning-checkout');

INSERT INTO projects (slug, title, client, description, body, tags, theme_accent, theme_tint, role, timeline, team, status, sort_order, published)
SELECT 'a-calmer-editor', 'A calmer editor', 'Canva',
  'Simplified the multi-page editing flow for first-time users.',
  'Placeholder case study body. Replace from the admin dashboard with the real project narrative, process, and outcomes.',
  '["Interaction","0→1"]', '#8B3DFF', '#F3EAFF', 'Interaction designer', '2023', '3 designers', 'Shipped', 2, 1
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'a-calmer-editor');

INSERT INTO projects (slug, title, client, description, body, tags, theme_accent, theme_tint, role, timeline, team, status, sort_order, published)
SELECT 'a-faster-command-palette', 'A faster command palette', 'Independent',
  'Prototype exploring keyboard-first navigation for a design tool.',
  'Placeholder case study body. Replace from the admin dashboard with the real project narrative, process, and outcomes.',
  '["Prototype","Interaction"]', '#1F9D6D', '#E7F7EF', 'Designer & builder', '2024', 'Solo', 'Concept', 3, 1
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'a-faster-command-palette');
