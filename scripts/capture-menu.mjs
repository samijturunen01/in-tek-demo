/** Dev helper: screenshot the open mobile menu. Usage: node scripts/capture-menu.mjs <url> <out.png> */
import { chromium } from '@playwright/test'
const [url, out] = process.argv.slice(2)
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 390, height: 844 } })
await p.goto(url, { waitUntil: 'networkidle' })
await p.getByRole('button', { name: 'Valikko' }).click()
await p.waitForTimeout(300)
await p.screenshot({ path: out })
await b.close()
