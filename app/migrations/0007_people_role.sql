-- Additive: add a role/title line under each name in the "people we've
-- worked with" grid (e.g. "Businessman", "Films Director"), matching the
-- reference list the user shared. photoUrl stays blank until real photo
-- files are provided.
UPDATE profile SET
  people = '[
    {"name":"Andrew Tate","role":"Businessman","photoUrl":""},
    {"name":"Mark Cuban","role":"Businessman","photoUrl":""},
    {"name":"Arslan Ash","role":"Tekken World Champion","photoUrl":""},
    {"name":"Ryan Alford","role":"Entrepreneur","photoUrl":""},
    {"name":"Alba Bajwa","role":"Netflix Actor","photoUrl":""},
    {"name":"Wajahat Rauf","role":"Films Director","photoUrl":""},
    {"name":"Karim Luxx","role":"Financial Assessments","photoUrl":""},
    {"name":"Aryan Khan","role":"Actor","photoUrl":""},
    {"name":"Walid Sid","role":"Fashion Model","photoUrl":""},
    {"name":"Aashir Wajahat","role":"Actor & Singer","photoUrl":""},
    {"name":"Shubh","role":"Singer","photoUrl":""},
    {"name":"assala","role":"Musician","photoUrl":""},
    {"name":"Nayel","role":"Singer","photoUrl":""},
    {"name":"Shahzad Sheikh","role":"Actor","photoUrl":""},
    {"name":"Melika Naj","role":"Fashion Model","photoUrl":""},
    {"name":"Romaisa Khan","role":"Influencer","photoUrl":""},
    {"name":"Qudsia Ali","role":"Actor","photoUrl":""},
    {"name":"Zainab Baekartoot","role":"Influencer","photoUrl":""},
    {"name":"Aliza Rajan","role":"Financial Assessments","photoUrl":""},
    {"name":"Laiba khan","role":"Actor","photoUrl":""},
    {"name":"Shazia Wajahat","role":"Films Director","photoUrl":""},
    {"name":"Ahmed Sarym","role":"Films Director","photoUrl":""},
    {"name":"Mustafa Taifoor","role":"Model","photoUrl":""},
    {"name":"Bisma Khan","role":"Influencer","photoUrl":""},
    {"name":"David W.","role":"Co-Founder of Anatomi","photoUrl":""},
    {"name":"Laiba Khurram","role":"Influencer/Actor","photoUrl":""},
    {"name":"Adeel Chaudary","role":"Content creator","photoUrl":""},
    {"name":"Syed Jibran","role":"Actor","photoUrl":""},
    {"name":"Naz I","role":"Businessman","photoUrl":""},
    {"name":"Karishma Mago","role":"Entrepreneur","photoUrl":""}
  ]',
  updated_at = datetime('now')
WHERE id = 1;
