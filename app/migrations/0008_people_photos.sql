-- Additive: real photos + corrected names/roles for the 14 people who are
-- confirmed collaborators on the user's own agency site (gdigital.pk),
-- plus one new person found there (Alishba Anjum). Everyone else in the
-- list keeps the initials placeholder until real photos are provided.
UPDATE profile SET
  people = '[
    {"name":"Andrew Tate","role":"Businessman","photoUrl":""},
    {"name":"Mark Cuban","role":"Businessman","photoUrl":""},
    {"name":"Arslan Ash","role":"Digital Creator","photoUrl":"/api/media/45a64906-b55e-45e4-8b64-b3d03122eb62.jpg"},
    {"name":"Ryan Alford","role":"Entrepreneur","photoUrl":""},
    {"name":"Alba Bajwa","role":"Influencer / Model","photoUrl":"/api/media/8cff199d-2dc2-4499-adb7-d0017bbd17c0.jpg"},
    {"name":"Wajahat Rauf","role":"Film Director","photoUrl":"/api/media/c5c45373-9eef-4e71-8a8a-b80ed0d5f5da.jpg"},
    {"name":"Karim Luxx","role":"Financial Assessments","photoUrl":""},
    {"name":"Aryan Khan","role":"Actor","photoUrl":""},
    {"name":"Walid Siddiqui","role":"Influencer / Model","photoUrl":"/api/media/bebdbad2-717e-43e9-99d4-605b487cff4a.jpg"},
    {"name":"Aashir Wajahat","role":"Influencer / Model","photoUrl":"/api/media/68828521-a337-41b6-9896-abaaa9f9e3ec.jpg"},
    {"name":"Shubh","role":"Singer","photoUrl":""},
    {"name":"assala","role":"Musician","photoUrl":""},
    {"name":"Nayel Wajahat","role":"Musician","photoUrl":"/api/media/66baed70-b97e-42cf-8dea-dfe37ca0c8f8.jpg"},
    {"name":"Shahzad Sheikh","role":"Influencer / Actor","photoUrl":"/api/media/29660e7c-668a-4c5a-90c4-99db5e4fe8da.jpg"},
    {"name":"Melika Najafizadeh","role":"Influencer / Model","photoUrl":"/api/media/998a9f35-0b67-4f19-9440-e28764fb25a6.jpg"},
    {"name":"Romaisa Khan","role":"Influencer / Model","photoUrl":"/api/media/262cfc0b-e539-4360-b38f-1acc1b428316.jpg"},
    {"name":"Qudsia Ali","role":"Actor","photoUrl":""},
    {"name":"Zainab Baekartoot","role":"Influencer","photoUrl":""},
    {"name":"Aliza Rajan","role":"Financial Assessments","photoUrl":""},
    {"name":"Laiba khan","role":"Actor","photoUrl":""},
    {"name":"Shazia Wajahat","role":"Films Director","photoUrl":"/api/media/590e7e02-ae09-492d-8520-b89b9e1bbb2b.jpg"},
    {"name":"Ahmed Sarym","role":"Films Director","photoUrl":""},
    {"name":"Mustafa Taifoor","role":"Influencer / Model","photoUrl":"/api/media/7e4f00e4-c056-410a-9ca1-9fd9fd3c35be.jpg"},
    {"name":"Bisma Khan","role":"Influencer","photoUrl":""},
    {"name":"David W.","role":"Co-Founder of Anatomi","photoUrl":""},
    {"name":"Laiba Khurram","role":"Influencer / Model","photoUrl":"/api/media/879af537-fada-4cbf-8e45-a7600f2572e8.jpg"},
    {"name":"Adeel Chaudry","role":"Influencer","photoUrl":"/api/media/5e0f1395-3246-4503-add1-28d12816b75d.jpg"},
    {"name":"Syed Jibran","role":"Actor","photoUrl":""},
    {"name":"Naz I","role":"Businessman","photoUrl":""},
    {"name":"Karishma Mago","role":"Entrepreneur","photoUrl":""},
    {"name":"Alishba Anjum","role":"Influencer / Model","photoUrl":"/api/media/baf8d4a2-c25d-4452-ab04-198c710767a5.jpg"}
  ]',
  updated_at = datetime('now')
WHERE id = 1;
