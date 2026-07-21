# DCFA Website — Feedback Backlog

Living task list parsed from owner feedback. Raw source emails live alongside this file (`*.eml`).
Check items off as they ship. Newest feedback appended to the bottom of each section.

---

## Priority 1 — launch blockers (close down the old site)

Source: Frank Schultz, 2026-06-15 (`DCFA website requests.eml`)

### Copy / pricing corrections
- [x] ATP program is **Part 61** (not Part 141) — `programs.ts` (ATP Multi-Engine)
- [x] ATP-CTP: note it is **VA approved**; asterisk "*Simulator time only*" — **$650 out of pocket** for VA ground-school portion — `atp-ctp.astro` price card + added to VA-approved list in `financing.ts`
- [x] ATP-CTP edit: "Ground school offered typically the first week of every month" — `atp-ctp.astro`
- [x] "**Examining Authority**" for the Private and Instrument ratings — standardized site-wide from "Self-Examining Authority" (⚠️ confirm wording with owner — see note below)
- [x] Discovery flight is **$150** — updated everywhere ($190 → $150)
- [x] Transition course is **$2,700** — removed the $1,000 deposit — `programs.ts`
- [x] Remove statement: "...Satisfies the 25 hours of actual multi-engine time required for the ATP certificate." — reworded Multi-Engine description in `programs.ts`
- [x] Add **529 Plan** info to the financing section — `financing.astro`

### Multi-Engine Commercial add-on (new/updated pricing block)
- [x] **Total — $6,605\*** (10.5 hrs aircraft, 2.0 hrs sim) — `programs.ts` + homepage summary card
  - [x] 10.5 hrs in DA-42 — $4,200
  - [x] 2 hrs DA-42 sim — $200
  - [x] 19 hrs ground school — $1,330
  - [x] 12.5 hrs flight instruction — $875

### Images
- [x] Remove old Frontier (F9) pic with masks — removed from `about.astro` + homepage photo grid (partner *logo* kept)
- [x] Remove Key Lime pic — removed from `about.astro` (partner *logo* kept)

> ⚠️ **Confirm with owner:** I read "Examining Authority" as a wording correction and changed the site-wide branding term from "Self-Examining Authority" → "Examining Authority" (the accurate FAA term). If they actually meant something else, easy to revert.

### ATP-CTP scheduling calendar (feature — needs discussion, likely backend work)
Owner needs to manage this themselves. Requirements:
- [ ] Owner can easily change/manipulate ground-school & simulator dates
- [ ] On a student date request: owners are **notified**
- [ ] **Auto-reply** email to the student
- [ ] **Pay-now** option from the website
- [ ] After both slots sold (2 slots per sim date), **remove that sim date from inventory**; ground-school dates stay (unlimited capacity per month)

> Note: this is the one item that goes beyond static-site edits — it implies booking/notification/payment plumbing. Flag for a scoping conversation before building.

---

## Priority 2 — add when time permits

Source: Frank Schultz, 2026-06-15

### Buildable now (in progress)
- [x] Add "**Our Partners**" with emblems (incl. **MSU**) — rebuilt About "Partnerships in action" as a 4-card logo grid (Frontier, Key Lime, GoJet, MSU). MSU card shows accurate R-ATP partnership detail. ⏳ *needs official MSU logo at `public/images/partners/msu-denver.png`* (currently a styled wordmark fallback)
- [x] Create a **blog page** — Astro content collection + `/blog` listing + post pages + nav link. Owner self-serve editing via Git-based CMS = next step (see below).
- [x] **Scholarship logos** (extra request) — added optional `logo` field + monogram fallback on each card. ⏳ *needs the 7 org logos in `public/images/scholarships/`*
- [ ] Add some **Google reviews / comments** — decide: live (Google Places API) vs curated quotes
- [ ] Add **social media feed** — IG / FB / TikTok; decide: live embeds vs curated

### Self-serve CMS (TinaCMS — LIVE)
- [x] TinaCMS at `/admin` with email logins (TinaCloud), publishing to repo → auto-deploys. See [cms-setup.md](../cms-setup.md). Owners invited via TinaCloud → Collaborators.
- [x] **Owner-editable sections** (Tina collections): **Blog**, **Home Page** (hero backgrounds + bottom photo gallery), **Partners** (home strip + About grid, incl. MSU), **Scholarships** (incl. owner-uploadable logos).
- [x] Tina media scope widened to all of `public/images` so existing site images are selectable in the media manager.
- Logos still need actual image files (owners can now upload them in Tina): **MSU Denver**, the **7 scholarship orgs**.

### Waiting on DCFA content
- [ ] Pic of the **Sim** with info / benefits
- [ ] DCFA student **grad pics + bios** (Carson, Stephen Mount, Cody, Alexa, Johnny, etc.)
- [ ] Pics + bios of **BJ, Keith, Frank, Michelle** (bio / vision / personal)
- [ ] **Aircraft names/types** under "Fleet" — need actual make/models from DCFA (+ pics)
- [ ] Pics of **A320 Sim** in the ATP-CTP section + past-client reviews
- [ ] Official **MSU Denver logo**, and the **7 scholarship org logos**
- [ ] Photos for all the image items above (owners said they'll provide)

---

## Round 2 — Michelle Dwyer (2026-06-22)

Source: `DCFA website requests-6.22.2026.eml`

### Done
- [x] **Renter's Insurance Requirements** page (`/insurance`) from the insurance doc — minimums ($50k single / $75k multi), recommended liability/medical, provider list. Linked from footer + Fleet.

### Pricing & prerequisite changes — applied (confirmed override of Frank's earlier numbers)
- [x] **Deposits removed** ($1,000, Private + ATP) → replaced with a "required course training materials" prerequisite line.
- [x] **Private Pilot:** price **$16,644.50**; **Pre/Post 27 hrs**; removed Discovery-required prerequisite; added enrollment-requirements list.
- [x] **Transition Course:** **$1,700**.
- [x] **Multi-Engine Commercial Add-On:** **$6,980–$7,905** range; removed cost breakdown; added VA-approved; insurance prereq.
- [x] Per-course **Enrollment Requirements** lists rendered on program cards. Homepage price previews updated.

### Still pending from Michelle
- [ ] **"Course Training Fee $…"** dollar amounts per course — awaiting her finalized materials/cost list (currently worded as "required course training materials, due before enrollment" with no figure).
- [ ] **Instrument Rating** was not addressed in her email — no enrollment-requirements list added; confirm whether it should get one.
- [ ] Michelle will "go through the rest of the site" and send more.

---

## Round 3 — BJ (relayed by Michelle, 2026-06-24)

Source: `emailfeedback_BJ_6.24.26.txt`

### Done
- [x] Fleet: $70 instruction rate now notes "applies to CFI, CFII & MEI"; added **Elite Simulator** rate ($150/hr, instructor included).
- [x] About: added the **FAA Examining Authority disclaimer** paragraph.
- [x] VA/GI page: added **Multi-Engine Commercial Add-On** as a VA-approved program (training order).
- [x] **Instrument Rating** enrollment requirements (course materials + $50k single-engine insurance).

### Pending — needs input / Teams discussion
- [ ] **Fleet aircraft make/model** — confirm the model for each single-engine tail number (BJ suggests "Piper Warrior" / framing as "our Piper fleet and the Diamond fleet"). Need per-tail models or the chosen framing.
- [ ] **ATP Multi-Engine** enrollment requirements — BJ/Frank to provide the regulatory requirements before the course; offered to draft standard FAA ATP prerequisites for review.
- [x] **Medical class for military benefits** — RESOLVED by the 2026-07 VA doc: **Class II** required at enrollment. Site updated from "Class I or II" to Class II.
- [ ] **Student books/supplies cost model** — Teams meeting (replacing the one-time deposit with per-course materials + finalized amounts).

---

## Round 4 — post-Teams feedback (2026-07)

### Done
- [x] Hero carousel; fleet photo cards + hover specs (Tina `specs`); course→contact prefill; TikTok footer link; Bryan Harrington Google review.
- [x] ATP-CTP **Upcoming dates** — Tina-editable ground school + simulator dates with slots-left/Full badges. Real Aug/Sept dates loaded.
- [x] Fleet: avionics/engine specs for all six tails; **Elite Simulator** (DA-40/42) now Tina-editable (`fleet.simulator`).
- [x] Home: **"We love our VETERANS!"** band + above-the-fold hero chip linking to it (`#veterans`).
- [x] Karissa + Michelle added as web3forms recipients (every signup) — done by Jason in the dashboard.

### ✅ RESOLVED — VA program list (DCFA doc, 2026-07)
Source: `docs/feedback/VA Programs listed out for Website.docx`.
**Four** VA-approved programs confirmed, each with its own approved TCO:
Instrument Rating, Commercial Single-Engine, Multi-Engine Add-On, ATP-CTP.
This matches what was already on the site — flydcfa.com (2 programs) was the stale source.
Shipped: VR&E (Ch. 31) added, Class II medical, WEAMS/38 CFR/non-reimbursable notes,
per-program VA detail, GI Bill(R) trademark attribution, hard count restored to "four".

### Open — other
- [ ] **Garmin unit:** team sent "Garmin GNS 650 XL" (N29230, N8650E) — no such product. Published as
      **"Garmin GTN 650"** (650 exists only in the GTN line). Confirm whether it is the newer **GTN 650Xi**.
- [ ] **Aircraft photos + make/model** for the five single-engine tails — specs received, photos not.
- [ ] Online **payments/booking** — scoping questions sent; needs processor, merchant account, refund policy.

---

## Pre-launch audit (2026-07) — before the flydcfa.com cutover

Full audit run across IA/flow, messaging vs. competitor, mobile, and consistency.
Mobile verified at a true 390px emulated viewport via `scripts/mobile-audit.mjs`
(**no page overflows**; tap targets fixed). Fixes shipped in one commit — see it for detail.

### ⛔ Blocking launch — needs DCFA content
These render as visible gaps or unsupported claims. Ranked by damage.
- [ ] **Instructor bios + credentials.** 3 of 4 have no role/photo/bio; BJ's is a joke bio with no
      flight credentials. The homepage sells *"mentored by airline pilots — active Part 121 pilots"*;
      About is where a prospect verifies that, and it currently can't. Need: airline, aircraft, hours.
      *(Sections now auto-hide while empty, so the site no longer looks broken — but the claim is unsupported.)*
- [ ] **Graduate outcomes.** All 5 are name-only. One line each ("Carson — First Officer, Key Lime Air, 2024").
- [ ] **A320 simulator photos.** `simPhotos: []` — the hero asset of the $4,995 product is invisible.
- [ ] **Aircraft photos + make/model** for the 5 single-engine tails (see above). These are the aircraft a
      Private Pilot student actually flies; only the DA-42 has a photo.
- [ ] **Primary-training reviews.** All 3 reviews are ATP-CTP; a Private Pilot prospect gets zero social proof.

### ⚠️ Needs a decision from DCFA
- [ ] **VA doc prices/hours differ from the published site figures — needs reconciliation.**
      Verified: every price in the VA doc equals *minimum TCO hours x the doc's own hourly rates*
      (Instrument $16,960 / Commercial $36,590 / Multi $7,905 / ATP-CTP $4,995 — all four match to
      the dollar). So these read as VA-minimum floor costs, not retail. The site currently shows
      $17,628 and $36,738 from Michelle's Round 2 pricing, and different hour breakdowns
      (e.g. Instrument pre/post 27.5 on site vs 15.0 in the doc).
      **Deliberately did NOT publish the doc's prices/hours** — two different figures for the same
      program on one site is the exact contradiction the audit set out to remove. Ask DCFA which is
      authoritative, then update the single source (`programs.ts`).
- [ ] **ATP-CTP "simulator time only"** — the doc presents ATP-CTP as a full VA program page, but
      Frank previously said VA covers sim time only with ~$650 ground school out of pocket. The doc's
      own ground line (30 hrs @ $20 = $600) is close to that, so the caveat is probably still right.
      Confirm before removing it from `financing.ts` / the ATP-CTP price card.
- [ ] **Per-tail aircraft models.** The doc gives fleet-level framing ("Piper Cherokee / Warrior /
      Archer") but not which model each tail number is. Still need per-tail make/model for the five
      single-engine aircraft.
- [ ] **Is the in-house checkride included in program price?** Needed before we can make the strongest
      version of the Examining Authority argument (see below).
- [ ] **Do you offer CFI/CFII?** `programs.ts` stops at ATP Multi-Engine. Competitor's flagship is
      "Zero to CFII, $43,555". A career prospect can't see how they get from Commercial (~250 hrs) to
      ATP (1,500). Either add the program or state how partners/MSU close the gap.
- [ ] **Safety statement** — no safety/maintenance content anywhere. Competitor leads with "Safety first."
      and screens schools for "questionable safety records". Silence doesn't help.

### 💡 Messaging opportunities (my recommendation; needs sign-off)
- [ ] **Argue Examining Authority in dollars, not just time.** Zero mentions of checkride/DPE fees on the
      whole site; the competitor publishes ~$900/checkride. We eliminate a fee we never mention.
- [ ] **Promote the MSU R-ATP partnership.** R-ATP at 1,000 hrs instead of 1,500 ≈ a year saved — bigger
      than the checkride-wait saving, and it currently exists only as a blurb in `partners.json`.
- [ ] **Answer the price gap.** Zero-to-commercial ≈ $71k here vs. competitor's "under $45,000 to CFII"
      marketing. We publish prices honestly but never justify them.
- [ ] **Audience router below the hero** — hero says "Your airline career" but both CTAs sell a $150
      Discovery Flight. Hobbyists/MSU students have nowhere to self-identify.
- [ ] Competitor's SEO article ranks DCFA positively *and* cites an FAA study implying examiner type
      doesn't affect safety — a direct shot at our central claim. EA is a time/cost claim, not a safety
      claim; worth owning that comparison in a blog post.

### Domain cutover checklist (when DNS is ready)
- [ ] `astro.config.mjs` → `site: 'https://flydcfa.com'`
- [ ] Re-check `public/robots.txt` + sitemap output
- [ ] Update the QR code and email-signature URLs
- [ ] Point TinaCloud / Cloudflare custom domain; verify `/admin` still authenticates
- [ ] Old flydcfa.com VA page is stale (lists 2 programs) — update or retire it so it stops
      contradicting the new site.

---

## How this file is maintained
- Each new feedback email → saved as `.eml` in this folder, then parsed into the lists above.
- I keep the project memory pointer current; this file is the task source of truth.
