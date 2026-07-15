# Design brief — Ameer Moavia portfolio

## Design read
Personal product-design portfolio for Ameer Moavia; audience is hiring
managers/clients evaluating craft — register is quiet, confident, typographic.

## Brand constraints
**Existing brand honored, not invented.** The user supplied a finished design
system (Claude Design project "Ameer Moavia Design System") with locked
tokens, components, and four screen designs (Home/Case Study/About/Contact).
This brief adapts that system into the TanStack Start stack verbatim — no new
palette/type was generated. Where this diverges from the default pipeline, the
reason is the user's own prior brand work, which is exactly the override this
pipeline permits.

## Concept spine
"A quiet studio dossier" — the site reads like a well-kept case-study archive:
warm paper canvas, one signature coral rule that marks the personal brand, and
a thin per-project accent tint that nods to each client without borrowing
their UI.

## Delivery tier
**Editorial.** The source design system explicitly specifies flat shadows
(reserved for exactly one raised panel), no gradients, no illustration, quiet
120–320ms transitions only, no bounce, no infinite loops — an intentional
calm/typographic register the user already committed to. This is a documented
deviation from the "cinema" default, justified by the pre-existing brand
voice rather than invented here. Motion is limited to on-mount fades/slides
and hover-state deepening of the accent — no scroll-scrub, no GSAP/Lenis.

## Locked palette
- Canvas: `oklch(98.5% 0.003 90)` warm off-white ("paper"), raised
  `oklch(96.5% 0.004 90)`, sunken `oklch(94% 0.005 90)`.
- Ink: `oklch(20% 0.012 260)` / `34%` / `50%` / `68%` (900/700/500/300).
- Signature accent: warm coral `oklch(64% 0.19 35)` (CTAs, links, active nav).
- Per-project theme tints (Google blue, Canva purple, plus a neutral
  "independent" default) — thin wayfinding only, scoped to their own case
  study, never the nav/home.
Defense: monochrome neutral + exactly one signature accent is the user's own
prior design decision (readme.md "Color usage philosophy"); not a palette
family on the banned list.

## Locked type
Sora (display/headings) + Manrope (body/UI), IBM Plex Mono for tech-spec
microcopy only — an original pairing already chosen by the user's design
system, loaded via Google Fonts CDN. No serif.

## Tier-1 technique
None required at editorial tier beyond motivated on-mount reveals and
accent-deepening hover/press states — per design-recipe.md §6, "if motion
can't be finished properly in scope, ship a clean static page," and the
brand's own voice explicitly prefers quiet restraint over a signature effect.

## Section plan
- **Home:** nav -> hero (eyebrow + headline + subtext + 2 CTAs) -> selected
  work grid (3 ProjectTiles, CMS-driven) -> footer.
- **Case study (`/work/$slug`):** nav -> back link -> header (client eyebrow +
  status badge + title + tags) -> hero image well -> two-column body (problem
  / approach markdown + "at a glance" raised card) -> footer.
- **About:** nav -> two-column (bio + skill tags + CTA / experience card,
  CMS-driven) -> footer.
- **Blog index:** nav -> heading -> list of published posts (title, excerpt,
  date) -> footer.
- **Blog post:** nav -> back link -> title/date -> markdown body -> footer.
- **Contact:** nav -> centered raised card with working form -> footer.
- **Admin (`/admin/**`):** unstyled-brand-adjacent utility UI, password
  gated, CRUD for projects/posts/profile + message inbox. Not part of the
  public brand surface; kept plain/functional.
No consecutive repeats; ≥4 distinct families across the public pages combined
(hero, grid, two-column split, list, centered card).

## Asset plan
- Favicon/monogram: typographic "AM" mark in ink-900 on paper, generated once
  (`app/public/assets/favicon`), used as OG cover base too.
- Project/case-study imagery: **intentional placeholder tint rectangles**
  (the design system's own choice — "photography rectangles are placeholders
  for real project screenshots"), each with an upload slot in the CMS so the
  user can drop in real screenshots later. No stock/AI imagery generated in
  their place, per the source system's explicit intent.
- OG/cover image: generated 1200x630 card, ink-on-paper, wordmark + role line.

## CTA inventory
- Hero primary: "Get in touch" -> /contact.
- Hero secondary: "About me" -> /about.
- Case study back: "Back to work" text link (not a button).
- About: "Get in touch" -> /contact (same CTA identity as hero primary,
  intentionally reused as the single site-wide contact intent per
  design-recipe.md §5 "one label per CTA intent").
- Contact form submit: "Send message".

## CMS scope (backend)
D1-backed: `projects` (case studies, shown on Home + `/work/$slug`),
`blog_posts`, `contact_messages`, `profile` (About bio/experience/resume
link, singleton row). Admin owns full CRUD via a password-gated `/admin`
area; no Higgsfield/Quanta/fnf involvement anywhere (this is `type: website`).
