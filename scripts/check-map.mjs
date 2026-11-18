/** Dev helper: load the contact page map and screenshot it. Usage: node scripts/check-map.mjs <url> <out.png> */
import { chromium } from '@playwright/test'
const [url, out] = process.argv.slice(2)
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1280, height: 900 } })
await p.goto(url, { waitUntil: 'networkidle' })
await p.getByRole('button', { name: 'Näytä kartta' }).click()
const frame = p.locator('iframe')
await frame.scrollIntoViewIfNeeded()
await p.waitForTimeout(6000)
await frame.screenshot({ path: out })
await b.close()
