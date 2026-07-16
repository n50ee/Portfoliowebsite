-- Additive: brute-force protection for /api/admin/login. A single-row
-- counter (this is a single-admin site, no per-IP tracking needed) that
-- locks out further attempts for a cooldown window after repeated failures.
CREATE TABLE IF NOT EXISTS login_throttle (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  failed_count INTEGER NOT NULL DEFAULT 0,
  locked_until TEXT
);

INSERT INTO login_throttle (id, failed_count, locked_until)
SELECT 1, 0, NULL
WHERE NOT EXISTS (SELECT 1 FROM login_throttle WHERE id = 1);
