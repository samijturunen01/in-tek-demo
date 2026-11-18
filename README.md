# in-TEK Oy – website redesign concept (Hades Design)

Speculative, conversion-focused redesign of [in-tek.fi](https://www.in-tek.fi/) for **in-TEK Oy** (Joensuu): car electronics repair and car keys.
**Not the official website.** All pages carry `noindex`; forms run in demo mode and send nothing.

- Live demo: https://samijturunen01.github.io/in-tek-demo/
- Concept: "Sytytystesti" (ignition self-test). Night-time instrument cluster, warning lights that go out, in-TEK blue as the "all clear" light.
- Docs: `docs/` (status, strategy, sources, assets, measurement)

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · React Router 7 · GSAP + ScrollTrigger · lucide-react · Playwright + axe-core.
Every route is prerendered to static HTML (`scripts/prerender.mjs`) with page-specific meta, JSON-LD, sitemap and a branded `404.html`, so GitHub Pages serves direct links and refreshes without SPA hacks.

## Commands

```bash
npm install
npm run dev          # http://127.0.0.1:5173/in-tek-demo/
npm run build        # typecheck + build + prerender → dist/
npm run preview      # serve dist like GitHub Pages: http://127.0.0.1:4318/in-tek-demo/
npm run lint
npm test             # Playwright (desktop + mobile), needs a build first
npm run assets       # regenerate WebP photos + OG image from source-assets/photos
node scripts/perf-lab.mjs http://127.0.0.1:4318/in-tek-demo/   # lab LCP/CLS (not field data)
LIVE_URL=https://samijturunen01.github.io npx playwright test   # run the suite against the live demo
```

## Configuration (`.env.example`)

| Variable | Demo | Production |
|---|---|---|
| `VITE_BASE_PATH` | `/in-tek-demo/` | `/` |
| `SITE_URL` | GitHub Pages URL | `https://www.in-tek.fi/` |
| `VITE_FORM_MODE` | `demo` | `apps-script` |
| `VITE_FORM_ENDPOINT` | – | Apps Script web app URL |
| `VITE_RECAPTCHA_SITE_KEY` | – | public site key (secret stays in Apps Script) |
| `VITE_ALLOW_INDEXING` | `false` | `true` after approval |

## Structure

```
src/data/        company facts, services, symptoms, FAQ, terms, photos, SEO (single source of truth)
src/components/  brand (wordmark, telltales, cluster), home, layout, forms, ui, service, contact
src/pages/       Home, Services, ServicePage (template), Keys, MailIn, Warranty, Contact, NotFound
src/lib/         forms (validation + adapters), analytics stub, intro state, motion, assets
scripts/         prerender, dist server, image pipeline, QA helpers
tests/           pages, navigation, intro, features, a11y
```

The URL slugs of the original site are kept (`/mittaristot/`, `/abs-yksikot/`, `/airbag-yksikot/`, `/virtalukot-ja-rattilukot/`, `/muu-auton-elektroniikan-korjaus/`, `/autonavaimet/`, `/takuuehdot/`, `/yhteystiedot/`).
