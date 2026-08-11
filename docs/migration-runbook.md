# flydcfa.com Migration & Onboarding Runbook

Moving the new site to **flydcfa.com** and handing the keys to Direct Connect.

Two distinct jobs, in order:
1. **Cutover** — retire the old flydcfa.com site and serve this one there.
2. **Onboarding** — give DCFA ownership/access to every account the site depends on.

> ⚠️ **Highest-risk item, read first:** flydcfa.com already runs **email**
> (info@flydcfa.com, Ben.dwyer@…, etc.). Changing DNS/nameservers **will break their
> email** unless the mail records (MX + SPF/DKIM/DMARC) are copied over exactly. Do
> not touch DNS until you have the current records captured. See **Step C**.

---

## The first decision (determines everything else)

**Does DCFA want to OWN the accounts, or have DataCraft Cloud manage them for them?**

- **Own** → we *transfer* GitHub repo, Cloudflare project, TinaCloud project, and web3forms to accounts under their control. More setup now, but the site is fully theirs.
- **Managed** → we keep ownership and *invite* them as collaborators where they need access (mainly TinaCMS). Simpler, but they depend on us.

Recommendation: **own the domain + Cloudflare + email at minimum** (those are the business-critical, billable pieces), and either owning or being invited to the rest is fine. The steps below cover the "own" path and note the simpler "invite" alternative inline.

---

## PART 1 — What I need FROM Direct Connect

Gather all of this **before** starting the cutover.

### Domain & DNS
- [ ] **Domain registrar** for flydcfa.com — which company (GoDaddy, Namecheap, Google Domains, etc.) and **admin login**, or their agreement to change nameservers when asked.
- [ ] **Where the current site is hosted** (Wix, Squarespace, WordPress, GoDaddy Website Builder, etc.) and login — so it can be decommissioned and so we can see the existing DNS records.
- [ ] **Current email provider** for @flydcfa.com (Google Workspace, Microsoft 365, or registrar/host mailboxes) and access — needed to preserve mail during the DNS change. **This is the make-or-break item.**

### Accounts & identities
- [ ] **Email addresses** for everyone who needs access: Ben, Keith, Frank, Michelle, Karissa (have most already).
- [ ] Whether they have an existing **Cloudflare** account, or want a new one (recommend a shared ops account, e.g. it/admin@flydcfa.com).
- [ ] Whether they have a **GitHub** account/org (only needed if they want to own the code repo).
- [ ] A **billing card** in their name for: domain renewal, Cloudflare (site runs on the free tier today, but custom domains/registrar transfer may involve small charges), TinaCloud (check current plan/limits), web3forms (free tier today).

### Content & external presence
- [ ] **Google Business Profile** and **Google Search Console** for flydcfa.com — access, so the map listing keeps pointing correctly and we can submit the new sitemap.
- [ ] Confirm the **old site can be fully removed** (no pages/URLs they want preserved or redirected).
- [ ] Any **analytics** they want (Google Analytics / Cloudflare Web Analytics) — currently none is installed.

---

## PART 2 — Cutover steps (my side)

### A. Pre-flight (do while old site still lives — zero downtime)
- [ ] Confirm the site builds clean: `npm run tina:build` (needs the 4 GB flag, see below).
- [ ] Decide canonical host: **apex `flydcfa.com`** with `www` redirecting to it (recommended), or vice-versa.
- [ ] Capture **every existing DNS record** on flydcfa.com (A, AAAA, CNAME, **MX**, **TXT** for SPF/DKIM/DMARC, any subdomains). Screenshot the whole zone.

### B. Bring flydcfa.com onto Cloudflare
The site is a **Cloudflare Worker** (the `*.workers.dev` URL confirms it — not Pages). Attaching a custom domain to a Worker is easiest when the domain is a **zone in the same Cloudflare account**.
- [ ] Add **flydcfa.com as a zone** in the target Cloudflare account (the client's, on the "own" path).
- [ ] Cloudflare will **import the existing DNS records** — carefully verify the **MX and TXT (SPF/DKIM/DMARC)** records came across intact against the screenshot from Step A. **Fix any that didn't before proceeding.**

### C. Preserve email (do NOT skip)
- [ ] Re-confirm MX records match the mail provider exactly.
- [ ] Re-confirm SPF (`TXT v=spf1…`), DKIM (provider's selector CNAME/TXT), and DMARC (`_dmarc` TXT) are present.
- [ ] Send a test email to and from info@flydcfa.com **after** DNS propagates.

### D. Point the domain
- [ ] At the **registrar**, change **nameservers** to the two Cloudflare assigns (full setup — cleanest for Worker custom domains).
- [ ] Wait for the zone to go **Active** in Cloudflare (minutes to a few hours).

### E. Attach the domain to the Worker
- [ ] Cloudflare → **Workers & Pages → dcfa-site → Settings → Domains & Routes** → add custom domain **flydcfa.com** and **www.flydcfa.com**.
- [ ] Cloudflare auto-provisions the **SSL/TLS certificate** (verify HTTPS is valid on both).
- [ ] Set the **www → apex redirect** (Cloudflare Redirect Rule) so both resolve to the canonical host.

### F. Flip the site's own URLs (code — 2 changes, then push)
- [ ] `astro.config.mjs` → `site: 'https://flydcfa.com'` (this alone fixes canonical, og:url, og:image, twitter:image, and JSON-LD — they all derive from it).
- [ ] `public/robots.txt` → `Sitemap: https://flydcfa.com/sitemap-index.xml`.
- [ ] Commit + push → Cloudflare rebuilds automatically.
- [ ] (QR codes and the email signature already point to flydcfa.com — no change needed.)

### G. Update TinaCloud for the new origin
- [ ] app.tina.io → project `dcfa-site` → add **https://flydcfa.com** to the allowed site URLs.
- [ ] Load **https://flydcfa.com/admin**, log in, confirm editing + save/deploy works on the new domain.

### H. Retire the old site
- [ ] Once flydcfa.com serves the new site and email is verified, **decommission the old host** (cancel/disable the Wix/Squarespace/etc. site).
- [ ] The **old stale VA page** (listed only 2 programs) disappears with it — no longer a contradiction.

### I. SEO / discovery
- [ ] **Google Search Console** → confirm flydcfa.com ownership, submit `https://flydcfa.com/sitemap-index.xml`.
- [ ] If any old URL paths differ from the new ones, add **301 redirects** (Cloudflare Redirect Rules) so old links/bookmarks don't 404.
- [ ] Confirm **Google Business Profile** website link points to flydcfa.com.

---

## PART 3 — Onboarding / access handover

Give DCFA the keys to each dependency. "Transfer" = they own it; "Invite" = simpler fallback.

### GitHub (the code)
- [ ] **Transfer** repo `jasonglenn77/dcfa-site` to their GitHub account/org — *or* **invite** them as collaborators.
- [ ] ⚠️ Transferring the repo **breaks the TinaCloud and Cloudflare GitHub connections** — you must **reconnect both** to the new repo location afterward. Do this deliberately, not by surprise.

### Cloudflare (hosting + DNS + domain)
- [ ] **Transfer** the Worker project + zone to their Cloudflare account — *or* add them as **account members**.
- [ ] Confirm the **build config** carries over: build command `npm run tina:build`; build vars `TINA_PUBLIC_CLIENT_ID`, `TINA_TOKEN` (secret), `TINA_BRANCH=main`, `NODE_OPTIONS=--max-old-space-size=4096`.

### TinaCloud (the CMS)
- [ ] **Transfer** project ownership to a DCFA email, *or* add them under **Collaborators** (already partly done — verify Ben/Keith/Frank/Michelle have logins).
- [ ] Confirm `main` stays **indexed**.

### web3forms (the contact form email)
- [ ] The form's `PUBLIC_WEB3FORMS_KEY` belongs to a web3forms account. To hand it over cleanly, **create a web3forms account under a DCFA email**, generate a new access key, set it as `PUBLIC_WEB3FORMS_KEY` in Cloudflare, and confirm recipients (Karissa + Michelle already added on the current key).
- [ ] Verify a test submission lands in their inboxes.

### Credentials & docs
- [ ] Hand over all logins via a **password manager** or secure share — never plaintext email.
- [ ] Point them at the repo docs: [cms-setup.md](cms-setup.md) (how to edit), this runbook, and the [brand toolkit](../src/pages/brand.astro) at `/brand` (passcode `flydcfa-team`).
- [ ] Confirm **auto-renew** is on for the domain, under their billing.

---

## PART 4 — Post-cutover verification checklist

- [ ] `https://flydcfa.com` and `https://www.flydcfa.com` both load the new site over valid HTTPS; www redirects to apex.
- [ ] **Email** to/from info@flydcfa.com works.
- [ ] **Contact form** submits and emails Karissa + Michelle.
- [ ] **/admin** login works; a test edit rebuilds and goes live.
- [ ] View-source shows `<link rel="canonical" href="https://flydcfa.com/…">` and the sitemap/robots reference flydcfa.com.
- [ ] The four **QR codes** (and the flier's) resolve to flydcfa.com.
- [ ] Old site is gone; no important old URL 404s (301s in place where needed).
- [ ] Search Console has the new sitemap.

---

## Reference — current setup (as-is, pre-cutover)

| Piece | Value |
|---|---|
| Repo | `jasonglenn77/dcfa-site` (GitHub), branch `main` |
| Host | Cloudflare **Worker** `dcfa-site` → `https://dcfa-site.jason-glenn7.workers.dev` |
| Build | `npm run tina:build`; `NODE_OPTIONS=--max-old-space-size=4096` (bump to 8192 if OOM) |
| Build vars | `TINA_PUBLIC_CLIENT_ID`, `TINA_TOKEN` (secret), `TINA_BRANCH=main`, `PUBLIC_WEB3FORMS_KEY` |
| CMS | TinaCloud project `dcfa-site`, GitHub-connected, `main` indexed; `/admin` login |
| Form | web3forms (AJAX POST); recipients Karissa + Michelle |
| Domain refs in code | only `astro.config.mjs` (`site`) + `public/robots.txt` (sitemap) |

> Note: `.env.example` documents the Tina vars but **not** `PUBLIC_WEB3FORMS_KEY` — worth adding so the form's requirement is discoverable on any fresh clone/deploy.
