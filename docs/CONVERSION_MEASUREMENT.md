# Conversion measurement plan – in-TEK Oy (future production)

**Status in the demo:** no analytics, no cookies, no tracking requests. `src/lib/analytics.ts` exposes `track(event, params)`, which only logs to the console in development. Hook it to GA4/GTM or a privacy-friendly tool **after** a consent solution is approved. Never send personal data (names, phone numbers, emails, free-text descriptions).

## Primary conversion metric

**Qualified repair inquiries per week** = submitted inquiry forms (`form_submit_success`) + answered calls from the website. Calls need call tracking or manual tagging ("where did you find us?"). Clicks are only intent signals.

## Event definitions (already wired in the code)

| Event | Fires when | Params | Type |
|---|---|---|---|
| `cta_click` | Any "Pyydä hinta-arvio" / "Lähetä yksikkö" CTA | `cta`, `location`, `service?` | Micro |
| `phone_click` | tel: link clicked (header, hero, bar, footer, pages) | `location` | Micro (strong intent) |
| `email_click` | mailto: link clicked | `location` | Micro |
| `form_start` | First edit in the inquiry form | `form` | Micro |
| `form_validation_error` | Submit with errors | `form`, `count` | Diagnostic |
| `form_submit_success` | Inquiry accepted by the backend | `form`, `service`, `delivery`, `demo` | **Lead** |
| `huoltolahete_print` | Service form printed (mail-in intent) | `unit` | Strong micro |
| `symptom_select` | Symptom finder tab chosen | `symptom` | Engagement |
| `service_interest` | Service row opened from the index | `service`, `location` | Engagement |
| `directions_click` | Route link opened | `location` | Visit intent |
| `map_load` | Map loaded on request | – | Engagement |
| `gallery_open` | Key photo opened | `brand` | Engagement |

Keep these levels separate: micro-conversions ≠ qualified inquiries ≠ booked repairs ≠ revenue. Booked repairs and revenue come from in-TEK's own records (for example a monthly count of jobs that started from a web inquiry).

## Baseline (before launch)

The current site has no measurable funnel. Before launch, record for 4–8 weeks: number of web-originated calls and emails per week (manual tally), share of mail-in units, and the most common services asked about. This becomes the comparison baseline.

## Implementation requirements

1. Consent management (CMP) before any analytics cookies, or a cookieless tool.
2. Privacy notice (rekisteriseloste/tietosuojaseloste) covering the form and analytics.
3. Form backend: Google Apps Script + reCAPTCHA v3 verified server-side (see `src/lib/forms/submit.ts`). Fire `form_submit_success` only after the backend confirms.
4. Optional: call tracking number or "how did you find us" field.

## Optimisation hypotheses to test after launch

1. Hero headline: current ("Auton elektroniikka ja avaimet kuntoon – merkistä riippumatta") vs. a symptom-led alternative ("Merkkivalo palaa? …").
2. Primary CTA wording: "Pyydä hinta-arvio" vs. "Kysy korjauksesta".
3. Symptom finder usage → inquiry rate compared with visitors who don't use it.
4. Mail-in page: printable form usage vs. inquiries marked "Lähetän postitse".
5. Mobile: call-bar clicks vs. form submissions by time of day.
