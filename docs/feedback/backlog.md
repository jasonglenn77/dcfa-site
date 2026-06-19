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

## Priority 2 — add when time permits (most need photos from DCFA)

Source: Frank Schultz, 2026-06-15

- [ ] Add pic of the Sim with info / benefits
- [ ] Add DCFA student **grad pics + bios** (Carson, Stephen Mount, Cody, Alexa, Johnny, etc.)
- [ ] Add pics of **BJ, Keith, Frank, Michelle** with bio / vision / personal notes
- [ ] Add **aircraft names/types** under "Fleet" (pics if available)
- [ ] Add pics of **A320 Sim** in the ATP-CTP section + reviews from past clients
- [ ] Add some **Google reviews / comments**
- [ ] Add "**Our Partners**" (incl. **MSU**) — first page or under About; show emblems/brands
- [ ] Add **social media feed** — current posts from IG / FB / TikTok
- [ ] Create a **blog page** for news and industry info

### Waiting on DCFA
- [ ] Photos for all Priority-2 image items (owners said they'll take and provide these)

---

## How this file is maintained
- Each new feedback email → saved as `.eml` in this folder, then parsed into the lists above.
- I keep the project memory pointer current; this file is the task source of truth.
