# Direct Connect Flight Academy — Website Overview & Handoff

A plain-English summary of the new website: what was built, why it's better than the
old site and the competition, how the team edits it themselves, and where to take it
next for SEO and marketing.

---

## 1. What the new website is

A modern, fast, mobile-first website built on **Astro + Tailwind CSS**, hosted on
**Cloudflare**, with a built-in **content editor (TinaCMS)** so the DCFA team can update
it themselves without a developer.

It replaces the old WordPress site at flydcfa.com — same substance (programs, pricing,
partnerships, VA/financing), but rebuilt to be faster, more professional, easier to find
on Google, and editable in-house.

---

## 2. Updates & enhancements we made

**Corrections & content (from Frank's feedback):**
- ATP program corrected to **Part 61**; Multi-Engine Commercial pricing rebuilt to **$6,605**.
- Transition course **$2,700** (deposit removed); Discovery Flight **$150** site-wide.
- ATP-CTP marked **VA approved** (sim time only; $650 ground-school out of pocket).
- Added **529 plan** info to financing; removed the dated masked/Key Lime photos.
- Standardized **"Examining Authority"** (the accurate FAA term).

**New pages & sections:**
- **Blog** — news/updates, owner-editable.
- **FAQ** — common questions, with Google rich-result markup.
- **Team & Graduate Spotlights** — instructor bios and graduate success stories.
- **Reviews / testimonials** — curated Google reviews with star ratings.
- **Partners** — Frontier, Key Lime, GoJet, and **MSU Denver** (R-ATP partnership).
- **Fleet** — aircraft with make/model, rates, and photos.
- **Follow-us** social section (Instagram / Facebook / TikTok).

**Platform & polish:**
- **Self-serve CMS** (TinaCMS) — see Section 4.
- **SEO foundation** — see Section 3.
- Light/dark mode, accessibility touches, faster load, removed ~4 MB of unused images.

---

## 3. How the site is optimized & why it beats the competition

### Speed & technology
The site is **pre-built static HTML** — there's no database to query on each visit like a
WordPress site, so pages load fast. Fast pages rank better on Google and convert more
visitors. It's mobile-first and works in light or dark mode.

### SEO (getting found on Google)
- Unique **page titles and descriptions** on every page.
- **Structured data** (schema.org) telling Google this is a Colorado Springs flight
  school — business name, address, phone, hours, and social profiles — plus **FAQ markup**
  that can earn "rich result" answer boxes in search.
- **Sitemap + robots.txt**, canonical URLs, and Open Graph/Twitter cards for clean
  social link previews.
- Clean, semantic, fast pages are **easier to rank than the competitor's WordPress build**.

### Trust & conversion
- **Transparent pricing** on every program (a proven differentiator).
- Clear calls to action funnel visitors to a **Discovery Flight** / contact.
- Built-in spots for **reviews, instructor faces, and graduate outcomes** — the exact
  trust signals that turn a $17k decision into a booking.

### Competitive advantage
Against the competitor (coloradospringsflightschool.com) and the old flydcfa.com:
- **More polished and modern** than either.
- **Real social proof capability** — the competitor has *zero* reviews and uses placeholder
  graphics instead of instructor photos. We win the trust battle.
- **Unique differentiators featured loudly:** airline partnerships (**Frontier F9 Cadet,
  Key Lime, GoJet**), **Examining Authority**, **VA approval**, **ATP-CTP with A320 sim**,
  and **Part 141** — advantages the competitor simply doesn't have.
- **Consistent pricing** from a single source (the competitor's prices conflict page to
  page, undercutting their own "transparency").
- **Self-serve editing** means the content stays fresh — the competitor's blog goes silent
  for months at a time.

---

## 4. The Tina editing process (share this with the team)

**What it is:** TinaCMS is a friendly editor for the website. You log in, change text or
photos in simple forms, hit Save, and the site updates — no code, no developer.

**How it works, start to finish:**
1. Go to **[your-website]/admin** and log in with your **email** (no GitHub account needed).
2. Pick what to edit from the left menu — **Blog, Home Page, Team & Graduates, Partners,
   Scholarships, Reviews, Fleet, FAQ, ATP-CTP Page**.
3. Edit the fields or upload photos (the **Media Manager** holds all the site's images —
   reuse one or upload a new one).
4. Click **Save**. Your change publishes and appears on the live site in **a few minutes**.

**Good to know:**
- **Draft toggle** (on blog posts) lets you save work without it going public yet.
- **Photos:** uploading a photo to the Media Manager stores it; it only appears on the site
  once you attach it to something (a post, a team member, a gallery slot).
- Changes take a few minutes (the site rebuilds itself) — that's normal, not a glitch.
- Inviting more editors: done in the TinaCloud dashboard → Collaborators (by email).

A detailed setup/troubleshooting reference lives in `docs/cms-setup.md`.

---

## 5. SEO & marketing roadmap (to become the #1 Colorado Springs flight school)

### Do before launch
- **Point the domain** to flydcfa.com (one config change makes all SEO URLs correct).
- **Turn on the contact form** (add the Web3Forms key in Cloudflare) so leads actually arrive.
- **Add real content:** 3–6 Google reviews, instructor headshots + bios, graduate spotlights,
  real fleet photos and makes/models. This is the single biggest conversion lever.
- **Claim/optimize the Google Business Profile** and link reviews — huge for local search.

### Marketing phase (next conversation)
- **Local landing pages** targeting high-intent searches: "flight training colorado springs,"
  "private pilot colorado springs," "instrument rating colorado springs," plus an
  airport-specific page — mirroring (and beating) the competitor's page structure.
- **Consistent blog cadence** — even 1–2 posts/month on cost, financing, timelines, and "how
  to become a pilot in Colorado Springs" captures search traffic the competitor lets lapse.
- **Reviews engine** — a simple habit of asking every graduate for a Google review; surface
  them on the site (the section is built and waiting).
- **Local citations & backlinks** — consistent name/address/phone across directories, plus
  links from partners (Frontier, MSU, etc.).

### Future development
- **ATP-CTP scheduling & booking system** (Frank's request) — owner-managed dates, student
  booking, automatic email confirmations, online payment, and auto-removing sold-out
  simulator slots. This is a real application (booking + payments + email) and is scoped as
  its own project.
- **Rotor Transition quote calculator** — rebuild the old site's interactive cost estimator.
- **Live social feed** — show actual Instagram/Facebook/TikTok posts on the site (widget).
- **Cloudflare Images** — automatic image optimization for owner-uploaded photos.
- **Analytics** — add Google Analytics 4 or Cloudflare Web Analytics to measure traffic and leads.

---

*This document reflects the site as built. Update it as the site evolves.*
