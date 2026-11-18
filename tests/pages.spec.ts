import { expect, test } from '@playwright/test'
import { ready, routes, url } from './helpers'

for (const r of routes) {
  test(`renders /${r.path} without errors, overflow or broken images`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(String(e)))
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    const res = await page.goto(url(r.path))
    expect(res?.status()).toBe(200)
    await ready(page)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toContainText(r.h1)
    // demo must never be indexed – and robots.txt must not hide that directive
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
    expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy()
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0)
    // scroll through so lazy images load, then check every rendered image decoded
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 40))
      }
    })
    await expect
      .poll(
        () =>
          page.evaluate(() =>
            Array.from(document.images)
              .filter((i) => i.getBoundingClientRect().width > 0)
              .filter((i) => !i.complete || i.naturalWidth === 0)
              .map((i) => i.src),
          ),
        { timeout: 15000 },
      )
      .toEqual([])
    expect(errors).toEqual([])
  })
}

test('page titles are unique', async ({ page }) => {
  const titles = new Set<string>()
  for (const r of routes) {
    await page.goto(url(r.path))
    titles.add(await page.title())
  }
  expect(titles.size).toBe(routes.length)
})

test('unknown URLs get the branded 404 page with status 404', async ({ page }) => {
  const res = await page.goto(url('ei-tallaista-sivua/'))
  expect(res?.status()).toBe(404)
  await ready(page)
  await expect(page.locator('h1')).toContainText('Tätä sivua ei löytynyt')
  await expect(page.getByRole('link', { name: /Etusivulle/ })).toBeVisible()
})

test('robots.txt allows crawling so the noindex directive can be read', async ({ request }) => {
  const res = await request.get(url('robots.txt'))
  expect(res.status()).toBe(200)
  const body = await res.text()
  expect(body).toContain('Allow: /')
  expect(body).not.toMatch(/Disallow: \/\s*$/m)
})

test('structured data is valid JSON and contains verified business facts', async ({ page }) => {
  await page.goto(url())
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents()
  const parsed = blocks.map((b) => JSON.parse(b))
  const biz = parsed.find((p) => p['@type'] === 'AutoRepair')
  expect(biz.telephone).toBe('+358468113566')
  expect(biz.address.streetAddress).toBe('Kuurnankatu 40')
  expect(biz.identifier.value).toBe('2233329-5')
  expect(JSON.stringify(parsed)).not.toMatch(/aggregateRating|review/i)
})
