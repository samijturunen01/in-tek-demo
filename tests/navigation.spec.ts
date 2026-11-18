import { expect, test } from '@playwright/test'
import { isMobile, navLabels, openNav, ready, url } from './helpers'

test('"Etusivu" is the first navigation item and the active item is marked', async ({ page }) => {
  await page.goto(url('takuuehdot/'))
  await ready(page)
  const nav = await openNav(page)
  const links = nav.getByRole('link')
  await expect(links.first()).toHaveText(/Etusivu/)
  for (const [i, label] of navLabels.entries()) await expect(links.nth(i)).toContainText(label)
  await expect(nav.getByRole('link', { name: /Takuuehdot/ })).toHaveAttribute('aria-current', 'page')
})

test('"Palvelut" is active on individual service pages', async ({ page }) => {
  test.skip(isMobile(page), 'desktop nav')
  await page.goto(url('airbag-yksikot/'))
  await ready(page)
  await expect(page.getByRole('navigation', { name: 'Päävalikko' }).getByRole('link', { name: 'Palvelut' })).toHaveAttribute('aria-current', 'page')
})

test('logo links to the homepage', async ({ page }) => {
  await page.goto(url('postikorjaus/'))
  await ready(page)
  await page.getByRole('link', { name: 'in-TEK – etusivu' }).first().click()
  await expect(page).toHaveURL(/in-tek-demo\/?$/)
  await expect(page.locator('h1')).toContainText('Auton elektroniikka')
})

test('navigation menu opens the destination page at the very top', async ({ page }) => {
  await page.goto(url('mittaristot/'))
  await ready(page)
  await page.evaluate(() => window.scrollTo(0, 1500))
  await page.waitForTimeout(150)
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Postikorjaus/ }).click()
  await expect(page).toHaveURL(/postikorjaus\/?$/)
  await expect(page.locator('h1')).toContainText('Lähetä yksikkö')
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
})

test('inquiry CTA lands on the form section, not the page top', async ({ page }) => {
  await page.goto(url('abs-yksikot/'))
  await ready(page)
  await page.getByRole('link', { name: /Kysy hintaa korjaukselle/ }).click()
  await expect(page).toHaveURL(/yhteystiedot\?palvelu=abs#kysely$/)
  await expect
    .poll(() => page.evaluate(() => Math.round(document.getElementById('kysely')!.getBoundingClientRect().top)), { timeout: 4000 })
    .toBeLessThan(160)
  // preselected service
  await expect(page.getByRole('radio', { name: 'ABS-yksikkö' })).toBeChecked()
})

test('back and forward restore the scroll position', async ({ page }) => {
  await page.goto(url('mittaristot/'))
  await ready(page)
  await page.evaluate(() => window.scrollTo(0, 1100))
  await page.waitForTimeout(250)
  // dispatchEvent = a plain user click without Playwright scrolling the sticky header into view
  await page.locator('header a[href$="/takuuehdot"]').first().dispatchEvent('click')
  await expect(page).toHaveURL(/takuuehdot\/?$/)
  await page.goBack()
  await expect(page).toHaveURL(/mittaristot\/$/)
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(1100)
  await page.goForward()
  await expect(page).toHaveURL(/takuuehdot\/?$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('anchor links land on their section', async ({ page }) => {
  await page.goto(url('autonavaimet/#avaintyot'))
  await ready(page)
  await expect
    .poll(() => page.evaluate(() => Math.round(document.getElementById('avaintyot')!.getBoundingClientRect().top)))
    .toBeLessThan(140)
})

test('direct deep links and refresh work on nested routes', async ({ page }) => {
  await page.goto(url('virtalukot-ja-rattilukot/'))
  await ready(page)
  await expect(page.locator('h1')).toContainText('virtalukon')
  await page.reload()
  await ready(page)
  await expect(page.locator('h1')).toContainText('virtalukon')
})

test('page transitions are immediate (no blocking overlay)', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const nav = await openNav(page)
  const t0 = Date.now()
  await nav.getByRole('link', { name: /Yhteystiedot/ }).click()
  await expect(page.locator('h1')).toContainText('Soita, kirjoita')
  expect(Date.now() - t0).toBeLessThan(1500)
  const covered = await page.evaluate(() => {
    const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
    return !!el?.closest('[class*="fixed"][class*="inset-0"], [class*="fixed"][class*="inset-x-0"][class*="top-"]')
  })
  expect(covered).toBe(false)
})

test('mobile menu opens, closes with Escape and navigates', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  await page.goto(url())
  await ready(page)
  const toggle = page.getByRole('button', { name: 'Valikko' })
  await toggle.click()
  const menu = page.getByRole('navigation', { name: 'Mobiilivalikko' })
  await expect(menu).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await expect(toggle).toBeFocused()
  await toggle.click()
  await menu.getByRole('link', { name: /Autonavaimet/ }).first().click()
  await expect(page).toHaveURL(/autonavaimet\/?$/)
  await expect(menu).toBeHidden()
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
})

test('mobile action bar offers call and inquiry', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  await page.goto(url('mittaristot/'))
  await ready(page)
  const bar = page.locator('div.fixed.bottom-0')
  await expect(bar.getByRole('link', { name: 'Soita' })).toHaveAttribute('href', 'tel:+358468113566')
  await expect(bar.getByRole('link', { name: 'Pyydä hinta-arvio' })).toBeVisible()
})
