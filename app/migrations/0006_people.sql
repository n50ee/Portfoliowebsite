-- Additive: a "people we've worked with" list for the homepage, shown as a
-- grid of circular avatars + names below Focus areas. Seeded from the
-- user's own network list; photoUrl left blank so the admin UI falls back
-- to an initials placeholder until real photos are uploaded per person.
ALTER TABLE profile ADD COLUMN people TEXT NOT NULL DEFAULT '[]';

UPDATE profile SET
  people = '[
    {"name":"David W.","photoUrl":""},
    {"name":"Laiba Khurram","photoUrl":""},
    {"name":"Adeel Chaudary","photoUrl":""},
    {"name":"Syed Jibran","photoUrl":""},
    {"name":"Naz I","photoUrl":""},
    {"name":"Karishma Mago","photoUrl":""},
    {"name":"Nayel","photoUrl":""},
    {"name":"Shahzad Sheikh","photoUrl":""},
    {"name":"Melika Naj","photoUrl":""},
    {"name":"Romaisa Khan","photoUrl":""},
    {"name":"Qudsia Ali","photoUrl":""},
    {"name":"Zainab Baekartoot","photoUrl":""},
    {"name":"Aliza Rajan","photoUrl":""},
    {"name":"Laiba khan","photoUrl":""},
    {"name":"Shazia Wajahat","photoUrl":""},
    {"name":"Ahmed Sarym","photoUrl":""},
    {"name":"Mustafa Taifoor","photoUrl":""},
    {"name":"Bisma Khan","photoUrl":""},
    {"name":"Andrew Tate","photoUrl":""},
    {"name":"Mark Cuban","photoUrl":""},
    {"name":"Arslan Ash","photoUrl":""},
    {"name":"Ryan Alford","photoUrl":""},
    {"name":"Alba Bajwa","photoUrl":""},
    {"name":"Wajahat Rauf","photoUrl":""},
    {"name":"Karim Luxx","photoUrl":""},
    {"name":"Aryan Khan","photoUrl":""},
    {"name":"Walid Sid","photoUrl":""},
    {"name":"Aashir Wajahat","photoUrl":""},
    {"name":"Shubh","photoUrl":""},
    {"name":"assala","photoUrl":""}
  ]',
  updated_at = datetime('now')
WHERE id = 1;
