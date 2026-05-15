# agentguard-web

The AgentGuard marketing site — Next.js 15 (App Router), React 19, static export, deploys to Cloudflare Pages.

## Live

- Production (when DNS cut over): https://agentguard.tech
- Staging (Cloudflare Pages): https://staging.agentguard.tech
- Preview (Perplexity Computer, for review only): see `sprintA2-website-report.md`

## Stack

- Next.js 15 (App Router)
- React 19
- Plain CSS (no Tailwind) — design tokens in `app/globals.css`
- `output: 'export'` — static HTML, deploys anywhere

## Pages

- `/` — homepage (hero, integrations, why, how, OpenClaw, Tribunal pair, pricing snapshot)
- `/openclaw` — OpenClaw fleet governance
- `/compliance` — CPS 230, EU AI Act, ISO 42001 evidence pack
- `/pricing` — full feature comparison
- `/self-hosted` — Docker + Helm
- `/blog` — coming soon placeholder
- `/docs` — meta-refresh redirect to docs.agentguard.tech

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build (production)

```bash
npm run build        # output: ./out
```

The `out/` directory is what you upload to Cloudflare Pages (or any static host).

## Build (preview)

Use this when serving the bundle from a sub-path (e.g. the Perplexity Computer
preview URL). It rewrites `/_next/...` references to relative paths.

```bash
npm run build:preview
```

## Deploy targets

### Cloudflare Pages (primary)

1. In Cloudflare, create a Pages project, connect this GitHub repo
   (`thebotclub/agentguard-web`).
2. Set:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node version: 20
3. Add a custom domain `staging.agentguard.tech` (CNAME → `*.pages.dev`).
4. Once verified, promote to `agentguard.tech` apex (CNAME flattening on
   Cloudflare or `ALIAS` on registrar).

### Direct static upload

```bash
npm run build
# upload ./out to your CDN of choice
```

## Brand & company

- The Bot Club Pty Ltd · ABN 99 695 980 226
- Sister product: https://tribunal.dev (coding agents)
