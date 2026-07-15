-- Additive: enrich each profile.experience entry with a description, work
-- type (Remote/On-site/Hybrid), duration badge, and start date, matching the
-- level of detail from the user's original Google Sites work history.
UPDATE profile SET
  experience = '[
    {"role":"Media Operations Head, Isb/Rwp","place":"Government of Pakistan","years":"Jun 2021 (11 mo)","description":"Facilitated Government partnerships with Meta, resolved impersonation issues, and established a police social media tag system.","workType":"","duration":"11 Mo","logoUrl":""},
    {"role":"Co-Founder","place":"Stellars Media","years":"Apr 2017-Present","description":"Managed partnerships, client outreach, deep operations, username claims, verifications, account recoveries, and a Global A+ celebrity network.","workType":"Remote","duration":"current","logoUrl":""},
    {"role":"Chief Operating Officer","place":"Freestyle eSports","years":"Apr 2021 (3 yrs)","description":"Enabled partnerships, developed brand strategy, guided graphic design, and secured sponsorships.","workType":"Hybrid","duration":"3 yrs","logoUrl":""},
    {"role":"Digital Marketing Specialist","place":"NextTier","years":"Feb 2024 (5 mos)","description":"Oversaw branding, social media design and strategy, client outreach, and photoshoots.","workType":"On-Site","duration":"5 mos","logoUrl":""},
    {"role":"Operations Specialist","place":"Showcase Films","years":"Mar 2021 (3 yrs)","description":"Handled deep social media operations, content strategy, and resolved platform issues.","workType":"Remote","duration":"3 yrs","logoUrl":""},
    {"role":"Head of Partnerships & Digital Media","place":"Google Developer Groups Islamabad","years":"Jul 2024-Present","description":"Enabled partnerships, sponsorships, team strategy, hosted events, and built tech communities.","workType":"On-site","duration":"Present","logoUrl":""},
    {"role":"Lead","place":"Google Developer Group on SZABIST","years":"Aug 2023 (1 yr)","description":"Built tech communities, empowered students, hosted events and skills development programs, managed partnerships, strategic planning, branding, and social media.","workType":"On-Site","duration":"1 yr","logoUrl":""},
    {"role":"Member","place":"Youth General Assembly","years":"Dec 2023 (1 yr)","description":"Managed partnerships, youth initiatives, tech outreach, and collaboration efforts.","workType":"","duration":"1 yr","logoUrl":""},
    {"role":"Mentor","place":"Google Developer Group on SZABIST","years":"Aug 2024-Present","description":"Mentored students in community management, branding, event operations, and impactful activities to transform peers'' lives.","workType":"Hybrid","duration":"Present","logoUrl":""},
    {"role":"Strategic Advisor","place":"IUHT","years":"Dec 2023 (1 yr)","description":"End-to-end lead of university development, executing strategy, partnerships, and institutional growth from the ground up.","workType":"","duration":"1 yr","logoUrl":""}
  ]',
  updated_at = datetime('now')
WHERE id = 1;
