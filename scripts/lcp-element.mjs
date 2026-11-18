/** Dev helper: print LCP entries (time + element) for a URL under mobile throttling. */
import { chromium } from '@playwright/test'
const [url] = process.argv.slice(2)
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true })
const page = await ctx.newPage()
const cdp = await ctx.newCDPSession(page)
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: 96000 })
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
await page.addInitScript(() => {
  window.__l = []
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) window.__l.push({ t: Math.round(e.startTime), size: e.size, el: e.element ? e.element.tagName + '.' + String(e.element.className).slice(0, 60) + ' «' + (e.element.textContent || '').slice(0, 40) + '»' : e.url })
  }).observe({ type: 'largest-contentful-paint', buffered: true })
})
await page.goto(url, { waitUntil: 'load' })
await page.waitForTimeout(4000)
console.log(JSON.stringify(await page.evaluate(() => window.__l), null, 1))
await b.close()
