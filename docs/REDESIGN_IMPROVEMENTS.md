# Audit of the current in-tek.fi and redesign improvements

Audited 2026-11-18 (desktop 1440 px and mobile 390 px screenshots, page source, all 9 pages).

| Area | Current site | Redesign |
|---|---|---|
| First impression | Blue-tinted stock engine photo; generic H1; orange "In-Tek" text as the only header element | Dark "instrument cluster" hero with a concrete H1, services, trust strip and a signature ignition self-test animation |
| Brand identity | No logo; the name appears in three spellings (In-Tek, in-TEK, In-TEK); blue buttons, an orange title | Consistent "in-TEK" wordmark; brand blue kept as the "all clear" backlight colour |
| Navigation | **No menu**; subpages reachable only from homepage tiles; no footer | Header nav (Etusivu first), mobile menu, full footer, breadcrumbs, related services |
| Value proposition | "Joensuussa toimiva autoelektroniikkaa huoltava yritys" | All makes, specific units, turnaround, warranty, local + mail-in |
| Service presentation | One short paragraph per service, stock images | Symptoms, examples, what to send, turnaround, warranty, FAQ and CTA per service |
| Process | Mail-in steps at the bottom of the homepage; PDF from 2019 with the old company form | Postikorjaus page with steps and a printable service form generated in the browser |
| Trust | Warranty info hidden on a terms page | Warranty + refund rule + since 2008 shown near CTAs; authentic photos of work |
| Contact | Contact page only; phone not linked on the homepage | Click-to-call everywhere, sticky mobile bar, structured inquiry, map with directions |
| Content accuracy | Placeholder "Lisää otsikkotekstisi tähän"; typos ("dianostiikka", "Korjaammme"); outdated "Ky" | Placeholders removed, typos fixed, current company form |
| Images | 100 % stock (Shutterstock, Pixabay, Unsplash, Pexels) | Authentic company photos + custom SVG graphics; no stock |
| Mobile | No menu, no contact access in the first view | Mobile-first layout, sticky call/CTA bar, 44 px+ touch targets |
| Accessibility | Missing alt texts (alt=None everywhere), weak heading structure | Semantic landmarks, alt text, focus styles, reduced motion support |
| Performance | WordPress + Elementor + jQuery, several CSS/JS files | Static prerendered React, optimised WebP images, 3 self-hosted variable fonts |
| SEO | Decent page titles, no structured data | Unique titles and descriptions, LocalBusiness + Service + FAQ + Breadcrumb JSON-LD, preserved URL slugs |
| Security | HTTPS works; WordPress with XML-RPC exposed (`xmlrpc.php` linked) | Static hosting; production migration note: disable XML-RPC if WordPress stays |

## URL continuity

The old slugs are kept so that production needs no redirects: `/mittaristot/`, `/abs-yksikot/`, `/airbag-yksikot/`, `/virtalukot-ja-rattilukot/`, `/muu-auton-elektroniikan-korjaus/`, `/autonavaimet/`, `/takuuehdot/`, `/yhteystiedot/`. The new pages are `/palvelut/` and `/postikorjaus/`.
