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

### Self-serve CMS (chosen direction: Git-based CMS)
- [ ] Stand up Sveltia/Decap admin at `/admin` (non-indexed) + GitHub OAuth via a small Cloudflare Worker → publishes to repo → auto-deploys

### Waiting on DCFA content
- [ ] Pic of the **Sim** with info / benefits
- [ ] DCFA student **grad pics + bios** (Carson, Stephen Mount, Cody, Alexa, Johnny, etc.)
- [ ] Pics + bios of **BJ, Keith, Frank, Michelle** (bio / vision / personal)
- [ ] **Aircraft names/types** under "Fleet" — need actual make/models from DCFA (+ pics)
- [ ] Pics of **A320 Sim** in the ATP-CTP section + past-client reviews
- [ ] Official **MSU Denver logo**, and the **7 scholarship org logos**
- [ ] Photos for all the image items above (owners said they'll provide)

---

## How this file is maintained
- Each new feedback email → saved as `.eml` in this folder, then parsed into the lists above.
- I keep the project memory pointer current; this file is the task source of truth.
