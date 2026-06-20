# Self-serve CMS setup (TinaCMS)

The blog is editable through **TinaCMS** — owners log in with **email** (no GitHub
account needed), edit posts in a friendly form/visual editor at `/admin`, and hit
publish. Tina commits the change to this repo, and the existing Cloudflare
auto-deploy ships it live in ~1–2 minutes.

## What's already done (in the repo)
- `tina/config.ts` — Tina schema for the **Blog Posts** collection (mirrors
  `src/content.config.ts`). Editors get fields for title, description, publish
  date, author, hero image, draft toggle, and a rich-text body.
- `package.json` scripts:
  - `npm run tina:dev` — local editing (`/admin`) while running the site.
  - `npm run tina:build` — production build that also generates the `/admin` app.
- Image uploads land in `public/images/uploads/`.
- `/admin` is excluded from search engines via `public/robots.txt`.

## Phase 2 — steps only you can do (one-time, ~15 min)

### 1. Create the TinaCloud project
1. Go to https://app.tina.io and sign in.
2. **Create a project** → connect GitHub → pick the `jasonglenn77/dcfa-site` repo.
3. Set the **branch** to `main`.
4. From the project settings, copy the **Client ID** and create a **read/write Token**.

### 2. Test it locally
1. Copy `.env.example` to `.env` and paste in the two values:
   ```
   TINA_PUBLIC_CLIENT_ID=<your client id>
   TINA_TOKEN=<your token>
   ```
2. Run `npm run tina:dev`, then open the printed local URL + `/admin`
   (e.g. http://localhost:4321/admin). Try editing the welcome post.

### 3. Invite the owners
In the TinaCloud project → **Collaborators**, invite Frank/BJ/Keith/Michelle by
email. They'll get email-based logins — no GitHub account required.

### 4. Wire up production (Cloudflare)
In the Cloudflare dashboard → Workers & Pages → **dcfa-site** → Settings → Build:
1. Add two **environment variables**: `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN`
   (same values as `.env`). Optionally `TINA_BRANCH=main`.
2. Change the **build command** from `astro build` (or `npm run build`) to:
   ```
   npm run tina:build
   ```
3. Save, then push to `main` (or trigger a redeploy). The build now generates the
   `/admin` editor and deploys it.

### 5. Done — how owners use it
- Go to `https://<your-domain>/admin`, log in with email.
- Edit or create a post, upload photos, hit **Publish**.
- The change commits to the repo → Cloudflare rebuilds → live in ~1–2 min.

## Notes
- Keep `tina/config.ts` and `src/content.config.ts` in sync if you add/rename a
  blog field.
- High photo volume over time: consider moving media to Cloudflare R2/Images later
  so the git repo stays lean. Not needed to start.
