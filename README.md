# Direct Connect Flight Academy — Website Rebuild

Modern replacement for [flydcfa.com](https://flydcfa.com).

**Stack:** Astro 5 · Tailwind v4 · TypeScript · Cloudflare Pages

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:4321 in your browser.

## Build

```bash
npm run build      # outputs to ./dist
npm run preview    # serves the built site locally
```

## Project docs

- [`docs/site-inventory.md`](docs/site-inventory.md) — content audit of the existing flydcfa.com
- [`docs/proposal.md`](docs/proposal.md) — stack and folder layout

## Deploying

Pushes to `main` auto-deploy to Cloudflare Pages once the repo is connected.
PR branches get their own preview URLs.
