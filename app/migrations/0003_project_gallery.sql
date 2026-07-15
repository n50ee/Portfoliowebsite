-- Additive: each project gets an optional photo gallery (JSON array of
-- /api/media/{key} URLs) shown below the hero image on its case study page.
ALTER TABLE projects ADD COLUMN gallery TEXT NOT NULL DEFAULT '[]';
