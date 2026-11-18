# Project status – in-TEK Oy redesign demo

_Last updated: 2026-11-18_

## Basics

- **Target company:** in-TEK Oy (business ID 2233329-5), Kuurnankatu 40, 80130 Joensuu. Car electronics repair and car keys, since 2008.
- **Original website:** https://www.in-tek.fi/ (+ company key site https://www.auton-avaimet-joensuu.fi/)
- **Master prompt:** `C:\VERKKOSIVUT\Prompt.md` (Hades Design Conversion First v2.0). The example URL there is overridden by in-tek.fi.
- **User instructions for this project:** follow the master prompt fully and autonomously, including GitHub Pages deployment. Do not modify the master prompt.
- **Repository:** https://github.com/samijturunen01/in-tek-demo
- **Live demo:** https://samijturunen01.github.io/in-tek-demo/

## Strategy (details: CONVERSION_STRATEGY.md)

- Primary conversion: qualified repair inquiry ("Pyydä hinta-arvio") or a phone call.
- Secondary: mail-in service form print, directions, email, warranty terms, key gallery.
- Segments: local key customers (urgent), nationwide mail-in module repair, workshops/businesses, other vehicle types (clusters).

## Creative direction

**"Sytytystesti" (ignition self-test).** Night-time instrument cluster: ink surfaces (#091017), amber/red telltales for faults, in-TEK blue (#2CA7E0, from the original site) as the "all clear" backlight. Type: Saira (variable width, condensed headlines), Instrument Sans (body), JetBrains Mono (readouts, fault codes). Graphic language: telltale glyphs, gauge ticks, PCB traces, mono readouts. Light "paper" sections alternate with dark ones for rhythm.

**Signature animation:** the homepage hero cluster runs an ignition self-test on every full load or refresh: telltales light up, needles sweep, warning lights go out one by one, and the in-TEK display lights up with "EI VIKAKOODEJA". About 2.4 s. Copy and CTAs are visible immediately. It does not replay on in-app return to the homepage, and it is skipped with reduced motion. It uses no storage or cookies.

## Pages (12 routes incl. 404, old URL slugs preserved)

`/` · `/palvelut/` · `/mittaristot/` · `/abs-yksikot/` · `/airbag-yksikot/` · `/virtalukot-ja-rattilukot/` · `/muu-auton-elektroniikan-korjaus/` · `/autonavaimet/` · `/postikorjaus/` · `/takuuehdot/` · `/yhteystiedot/` · `404.html`

## Completed features

- Hero with signature cluster intro, trust status bar, dated Google rating
- "Mikä valo palaa?" symptom finder (ARIA tabs, keyboard), links to a preselected inquiry
- Editorial service index; service page template (facts, symptoms, illustration/photo, needs, FAQ, related, CTA)
- Key page: situations, services, 12 brand families, filterable gallery of 19 authentic photos with a `<dialog>` viewer
- Mail-in page: 4 steps + online service form ("huoltolähete") generator → print/PDF, client-side only
- Warranty page with verified terms and service-specific warranties
- Contact: tiles, structured inquiry form (validation, error summary, preselection via `?palvelu=`, progressive company field, demo submit "Demoversio – viestiä ei lähetetty."), click-to-load Google Map, directions
- Mobile: sticky call + inquiry bar, full-screen menu (Escape, focus trap), 44 px+ targets
- SEO: unique titles and descriptions, OG image, AutoRepair/Service/FAQ/Breadcrumb JSON-LD (no ratings), sitemap, robots allows crawling, noindex on every page
- Analytics stub (no tracking), form adapter ready for Apps Script + reCAPTCHA

## Testing status (local, 2026-11-18)

- `tsc -b` ✔, `eslint .` ✔, `npm run build` ✔ (12 routes prerendered)
- Playwright: **101 passed, 3 skipped** (desktop 1440 + Pixel 7). Covers all pages (no console errors, no overflow, images load), navigation (Etusivu first, active item, top-of-page on menu navigation, back/forward restore, anchors, deep links, 404), intro (plays on load and refresh, not on in-app return or back, reduced motion, no CLS), forms, slip print, gallery, map, tel/mailto, no trackers or cookies, and axe WCAG 2.2 AA (no serious or critical issues).
- Visual review at 360 / 390 / 768 / 1024 / 1440 px.
- Lab performance (`scripts/perf-lab.mjs`, uncompressed local server, 4× CPU + ~1.6 Mbps): CLS ≤ 0.003; LCP about 2.0–2.6 s on subpages and about 2.6 s on the homepage with mobile throttling. These are lab numbers, not field data.

## Known issues / notes

- Saira variable font (wdth axis) is about 99 kB (latin); acceptable, but it could be subset further.
- Chrome reports SVG text in the hero cluster as an LCP candidate. It paints at first render, so this has no impact.
- Google rating (4.4 / 69, 11/2026) must be refreshed or removed before production.

## Asset permissions

Authentic photos from the company's own key site are used under the customer authorisation in the master prompt. All stock images from in-tek.fi are excluded. See ASSET_PROVENANCE.md.

## Deployment status

See the bottom of this file (updated after deployment).

## Next recommended actions

1. Customer review of the items marked CONFIRM in CONTENT_SOURCES.md (warranty ranges, shipping address, opening hours, logo).
2. Production: domain, Apps Script + reCAPTCHA, privacy notice, consent + analytics, `VITE_ALLOW_INDEXING=true`, `VITE_BASE_PATH=/`.
3. Optional: real bench photos (IMAGE_REPLACEMENT_LIST.md), English version, consolidating auton-avaimet-joensuu.fi.
