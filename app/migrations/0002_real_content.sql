-- Replace placeholder seed content with the real bio/projects pulled from
-- the user's existing Google Sites portfolio (sites.google.com/view/ameermoavia).
-- Additive in effect (UPDATE only, no DROP) — this is the user's own request
-- to fill in their real content over the placeholders seeded in 0001.

UPDATE profile SET
  bio = 'I''m a media operations and marketing specialist based in Islamabad/Rawalpindi, Pakistan. I''ve spent the last several years building partnerships, running social media operations, and organizing community events: from managing government-scale social media systems, to co-founding a talent operations agency, to leading partnerships for Google Developer Groups Islamabad.

Along the way I''ve organized 50+ events, delivered 20+ workshops for over 16,000 attendees, and mentored 50+ students one-on-one, connecting more than 100 CVs directly with hiring companies.

Find me on LinkedIn: linkedin.com/in/n50e',
  skills = '["Media Operations","Digital Marketing","Brand Strategy","Partnerships","Social Media Strategy","Event Management","Community Building","Public Relations"]',
  experience = '[
    {"role":"Head of Partnerships & Digital Media","place":"Google Developer Groups Islamabad","years":"Jul 2024-Present"},
    {"role":"Co-Founder","place":"Stellars Media","years":"Apr 2017-Present"},
    {"role":"Mentor","place":"Google Developer Group on SZABIST","years":"Aug 2024-Present"},
    {"role":"Digital Marketing Specialist","place":"NextTier","years":"Feb 2024 (5 mos)"},
    {"role":"Strategic Advisor","place":"IUHT","years":"Dec 2023 (1 yr)"},
    {"role":"Member","place":"Youth General Assembly","years":"Dec 2023 (1 yr)"},
    {"role":"Lead","place":"Google Developer Group on SZABIST","years":"Aug 2023 (1 yr)"},
    {"role":"Chief Operating Officer","place":"Freestyle eSports","years":"Apr 2021 (3 yrs)"},
    {"role":"Media Operations Head, Isb/Rwp","place":"Government of Pakistan","years":"Jun 2021 (11 mo)"},
    {"role":"Operations Specialist","place":"Showcase Films","years":"Mar 2021 (3 yrs)"}
  ]',
  updated_at = datetime('now')
WHERE id = 1;

UPDATE projects SET
  slug = 'government-media-operations',
  title = 'Standing up a government''s social media operations',
  client = 'Government of Pakistan',
  description = 'Facilitated Meta partnerships, resolved account-impersonation issues, and built a tagging system that let police departments respond to social media in real time.',
  body = 'As Media Operations Head for Islamabad/Rawalpindi, I ran point on government-facing social media for close to a year.

Meta GPA partnerships: facilitated a government partnership with Meta''s GPA (Government Politics and Advocacy) support team, resolving platform-level issues government accounts couldn''t fix on their own.

Department account support: helped police departments stand up official accounts and resolved impersonation problems as they came up.

The @tag system: built a social media tagging system that let police departments respond quickly when they were tagged in videos, turning a slow, manual escalation into something close to real time.',
  tags = '["Media Operations","Government","Meta Partnerships"]',
  theme_accent = '#2757A8',
  theme_tint = '#E8F0FB',
  role = 'Media Operations Head',
  timeline = '2021 (11 months)',
  team = 'Government partnerships team',
  status = 'Shipped',
  sort_order = 1,
  updated_at = datetime('now')
WHERE slug = 'redesigning-checkout';

UPDATE projects SET
  slug = 'freestyle-esports',
  title = 'Growing an esports org''s brand and sponsorships',
  client = 'Freestyle eSports',
  description = 'Led partnerships and brand strategy as COO, securing sponsorships and shaping the team''s visual identity over three years.',
  body = 'As Chief Operating Officer at Freestyle eSports, I worked across partnerships, brand, and operations for three years.

Partnerships and sponsorships: built relationships with sponsors and platforms, including appearances at Gamers Galaxy events with Galaxy Racer, securing the deals that keep a competitive team funded.

Brand strategy: guided the team''s graphic design and brand direction so it read consistently across events, socials, and sponsor decks.

Operations: kept the day-to-day running so the team could focus on competing, not logistics.',
  tags = '["Esports","Partnerships","Brand strategy"]',
  theme_accent = '#E08A1E',
  theme_tint = '#FDF1E2',
  role = 'Chief Operating Officer',
  timeline = '2021-2024 (3 years)',
  team = 'Freestyle eSports',
  status = 'Shipped',
  sort_order = 2,
  updated_at = datetime('now')
WHERE slug = 'a-calmer-editor';

UPDATE projects SET
  slug = 'google-developer-groups-islamabad',
  title = 'Building a 200+ person tech community from scratch',
  client = 'Google Developer Groups Islamabad',
  description = 'Organized 50+ events and 20+ workshops for 16,000+ attendees as Head of Partnerships & Digital Media.',
  body = 'Since mid-2024 I''ve led partnerships and digital media for Google Developer Groups Islamabad, and I''ve been part of the wider GDG community since 2023 through SZABIST.

The numbers: 50+ events organized, 20+ workshops delivered, and over 16,000 total attendees across both.

Beyond the events themselves, I''ve mentored 50+ students one-on-one and helped connect 100+ CVs directly with hiring companies: the part of the work I''m proudest of, honestly.',
  tags = '["Community","Events","Partnerships"]',
  theme_accent = '#4285F4',
  theme_tint = '#EAF1FE',
  role = 'Head of Partnerships & Digital Media',
  timeline = '2024-Present',
  team = 'GDG Islamabad',
  status = 'Ongoing',
  sort_order = 3,
  updated_at = datetime('now')
WHERE slug = 'a-faster-command-palette';
