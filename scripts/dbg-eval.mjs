/** Dev helper: load a page, scroll to a selector and print diagnostics. Usage: node scripts/dbg-eval.mjs <url> <selector> */
import { chromium } from '@playwright/test'
const [url, sel] = process.argv.slice(2)
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
await p.goto(url, { waitUntil: 'networkidle' })
await p.locator(sel).first().scrollIntoViewIfNeeded()
await p.waitForTimeout(1500)
const info = await p.$$eval(sel, (els) =>
  els.map((el) => {
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    const img = el.querySelector('img')
    return { cls: el.className, h: Math.round(r.height), w: Math.round(r.width), clip: cs.clipPath, op: cs.opacity, tr: cs.transform, img: img && { complete: img.complete, nw: img.naturalWidth, h: Math.round(img.getBoundingClientRect().height), cur: img.currentSrc.slice(-40) } }
  }),
)
console.log(JSON.stringify(info, null, 1))
await b.close()
