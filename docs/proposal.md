# DCFA Rebuild — Stack & Folder Proposal

## Recommended stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro 5** | Static-by-default, content-collections built in, ships zero JS unless you opt in. Perfect for a content-heavy marketing site. Best Lighthouse scores in this category, and easy to learn. |
| Styling | **Tailwind CSS** | Mobile-first by default, fast iteration, no CSS file sprawl. Works great with Astro. |
| UI primitives | Hand-rolled components + a few **shadcn/ui** patterns ported to Astro | Avoids a heavy component library; keeps the site lean. |
| Language | **TypeScript** | Catches errors early on the small amount of JS we'll write (form handler, mobile nav). |
| Content | Astro Content Collections (Markdown/MDX) | Programs, aircraft, instructors, blog posts each live as front-mattered `.md` files. Easy for your friend to edit later if he wants. |
| Forms | **Web3Forms** or **Formspree** (no backend), with email forwarded to info@flydcfa.com | No server to maintain. Drop-in `<form action>`. Free tier covers expected volume. |
| Image optimization | Astro's built-in `<Image />` (Sharp) | Auto-generates responsive `srcset`, AVIF/WebP, lazy-loading. |
| Analytics | **Cloudflare Web Analytics** (free, privacy-friendly, no cookie banner) | Lightweight; no GDPR overhead. |
| Hosting | **Cloudflare Pages** | Free tier, global CDN, automatic HTTPS, instant preview deploy on every push, custom domain support when ready to go live. |
| Source control | **GitHub** under a new org you own | Lets you share `*.pages.dev` preview URL with your friend; transfer to him later. |
| CI | Cloudflare Pages auto-builds on push — no separate CI needed at this stage | Less to maintain. |

### Why Astro over Next.js / WordPress

- **vs. WordPress (current):** No CMS to maintain, no plugin updates, no security patching, no DB. Faster, cheaper, and the site is just files on a CDN.
- **vs. Next.js:** Next is overkill for a brochure site. Astro produces ~40 kB of HTML+CSS for a homepage where Next ships hundreds of kB of JS by default. We don't need React's runtime to render a flight school site.

### Why Cloudflare Pages over GitHub Pages

GitHub Pages works, but it doesn't run a build step the same way and has no serverless functions. Cloudflare Pages: builds Astro automatically, gives you `https://dcfa-rebuild.pages.dev`, supports the contact-form redirect, and a custom domain swap is one DNS record when your friend approves.

---

## Folder layout

```
DirectConnect/
├── .gitignore
├── README.md                       # local dev instructions
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
│
├── docs/                           # planning docs (this file, inventory)
│   ├── site-inventory.md
│   └── proposal.md
│
├── public/                         # served as-is
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml                 # generated at build
│   └── og-image.jpg                # social-share preview
│
└── src/
    ├── assets/                     # images processed by Astro
    │   ├── logo.svg
    │   ├── hero/
    │   ├── aircraft/               # one per tail number
    │   ├── instructors/
    │   ├── hangar/
    │   └── partners/               # GoJet, Frontier, Key Lime logos
    │
    ├── components/
    │   ├── ui/                     # Button, Card, Section, Stat, Badge
    │   ├── layout/                 # Header, Footer, MobileNav, StickyCTA
    │   ├── home/                   # Hero, Differentiators, ProgramGrid, PartnersStrip, Testimonials
    │   ├── programs/               # ProgramCard, ProgramHoursTable, AircraftCard
    │   ├── forms/                  # ContactForm, RTPQuoteForm, DiscoveryFlightForm
    │   └── seo/                    # SEOHead, JsonLd
    │
    ├── content/                    # Astro Content Collections — typed front-matter
    │   ├── config.ts               # collection schemas (zod)
    │   ├── programs/               # private-pilot.md, instrument.md, commercial.md, ...
    │   ├── aircraft/               # n342t.md, n7206c.md, ...
    │   ├── instructors/            # one per CFI / chief pilot
    │   ├── partners/               # gojet.md, frontier.md, key-lime.md
    │   ├── testimonials/           # student quotes
    │   └── posts/                  # blog/news entries (MDX)
    │
    ├── layouts/
    │   ├── BaseLayout.astro        # html, head, header/footer slot
    │   └── ProgramLayout.astro     # shared chrome for /training/[slug]
    │
    ├── pages/
    │   ├── index.astro                       # /
    │   ├── training/
    │   │   ├── index.astro                   # /training (overview + grid)
    │   │   └── [slug].astro                  # /training/private-pilot, etc.
    │   ├── atp-ctp.astro                     # /atp-ctp
    │   ├── rotor-transition.astro            # /rotor-transition
    │   ├── financing/
    │   │   ├── index.astro                   # /financing
    │   │   ├── scholarships.astro
    │   │   └── va-benefits.astro
    │   ├── fleet.astro                       # /fleet
    │   ├── instructors.astro                 # /instructors
    │   ├── about.astro                       # /about
    │   ├── contact.astro                     # /contact (replaces /contact-2/)
    │   ├── blog/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   └── 404.astro
    │
    ├── styles/
    │   └── global.css              # Tailwind base + custom CSS vars (brand colors)
    │
    └── lib/
        └── utils.ts                # small helpers (formatPrice, etc.)
```

---

## Information architecture (the new sitemap)

```
/                                   Home — hero, differentiators, programs preview, partners, CTA
/training                           All programs grid with pricing
/training/private-pilot             Per-program detail (hours table, prereqs, CTA)
/training/instrument
/training/commercial
/training/multi-engine
/training/atp                       ATP Multi-Engine
/atp-ctp                            ATP-CTP — own page (high-value lead source)
/rotor-transition                   RTP — own page
/fleet                              Aircraft + rates  ← NEW
/instructors                        Bios + headshots  ← NEW
/about                              Story, Self-Examining Authority, Part 141  ← NEW
/financing                          Stratus, AOPA, payment overview
/financing/scholarships             Scholarship list
/financing/va-benefits              GI Bill chapters + steps
/contact                            Form + map + Discovery Flight CTA
/blog                               Partnership announcements + news
/blog/[slug]                        Individual posts
```

**Removed from current site:** `/contact-2/` (renamed to `/contact/`), `?page_id=41` (Student Resources — currently 404).

**Outbound link kept:** Shop → advancedimpressionsinc.com (no need to rebuild).

---

## Beat-the-competitor feature list

Things competitor has that we'll match:
1. Per-program pricing visible in the program grid (we have the numbers)
2. **Cost estimator** — pick a starting point + end goal, see total cost (small JS island, ~5 kB)
3. FAQ accordion with structured data (Schema.org → rich Google results)
4. Mobile-friendly navigation with sticky "Book a Discovery Flight" button

Things only DCFA can offer (lean hard on these):
5. **Self-Examining Authority** — call out badge in the hero, mention on every program page
6. **Airline partner logos** above the fold (GoJet, Frontier, Key Lime)
7. **Active airline pilot instructors** with airline + aircraft type in each bio
8. **ATP-CTP with A320 full-motion sim** — own landing page already planned
9. **VA-eligibility mini-wizard** — 3 yes/no questions → tells veteran which programs are VA-funded
10. **Pathway visualizer** — Discovery Flight → PPL → IR → CR → ME → ATP timeline graphic

Plus baseline modern-site essentials:
11. Schema.org JSON-LD: `LocalBusiness`, `Course` per program, `Organization`
12. Open Graph + Twitter Card images
13. Auto sitemap.xml + robots.txt
14. Lighthouse target: 95+ on all four categories
15. Click-to-call phone number (already standard on mobile)

---

## Hosting & preview workflow

1. Initialize a GitHub org you own (e.g. `dcfa-web`) — free, takes 2 min
2. Push this repo to `dcfa-web/dcfa-site`
3. Connect the repo to Cloudflare Pages — auto-detects Astro
4. Every push to `main` deploys to `https://dcfa-site.pages.dev` (shareable with your friend)
5. Every PR gets its own preview URL (`https://abc123.dcfa-site.pages.dev`) — useful for "look at this version" rounds with him
6. When approved, point `flydcfa.com` at Cloudflare Pages via DNS — no code changes needed

---

## Suggested build order

1. **Phase 1 (1–2 days):** Scaffold Astro + Tailwind, set up layout/header/footer, get a placeholder homepage live on Cloudflare Pages. Goal: shareable URL by end of day 2.
2. **Phase 2 (2–3 days):** Build all program pages + content collections from inventory data. Real pricing, real hours, placeholder photos.
3. **Phase 3 (1–2 days):** Build /atp-ctp, /rotor-transition, /financing tree, /va-benefits.
4. **Phase 4 (1 day):** Contact form + Web3Forms wiring + map embed.
5. **Phase 5 (1–2 days):** Fleet page, instructors page, about page (need client photos by now).
6. **Phase 6 (1 day):** Polish — SEO meta, Open Graph, JSON-LD, sitemap, FAQ, cost estimator.
7. **Phase 7:** Client review → revisions → DNS cutover.

Total: ~2 weeks of focused work to a production-ready site, assuming client provides photos and bios in week 1.

---

## Decisions confirmed (2026-04-27)

- ✅ Stack: Astro 5 + Tailwind v4 + TypeScript
- ✅ Hosting: Cloudflare Pages
- ✅ Form provider: **Web3Forms**
- ✅ Self-Examining Authority featured prominently in hero with explanation of *why* it's a unique advantage
- ✅ Pricing transparency throughout — per-program pricing visible on /training and each detail page
- ✅ Student Resources page kept as a placeholder; client will decide on the actual design later

## Still TBD

- GitHub org/repo name (suggest `dcfa-web/dcfa-site` once you create the org)
- Client-provided assets (photos, instructor bios, testimonials, SVG logo)

What I'll ask your friend for in parallel (so it's not blocking):
- Vector logo + any brand colors
- Hi-res photos (hangar, planes, cockpits)
- Instructor bios + headshots
- 3–5 testimonials
- Confirmation that pricing on the current site is current
