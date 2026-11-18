import { expect, test, type Page } from '@playwright/test'
import { isMobile, openNav, ready, url } from './helpers'

/** Colour of the first cluster telltale (amber while the ignition test runs, dark afterwards). */
const telltaleColor = (page: Page) => page.evaluate(() => getComputedStyle(document.querySelector('.cl-telltale')!).color)
const AMBER = 'rgb(245, 165, 36)'

test('ignition self-test plays on a full homepage load – copy and CTA are visible immediately', async ({ page }) => {
  await page.goto(url(), { waitUntil: 'commit' })
  await page.waitForSelector('h1')
  // Before the animation finishes: warning lights are on, but the value proposition is already readable.
  expect(await page.evaluate(() => document.documentElement.classList.contains('intro-pending'))).toBe(true)
  expect(await telltaleColor(page)).toBe(AMBER)
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.getByRole('link', { name: /Pyydä hinta-arvio/ }).first()).toBeVisible()
  await ready(page)
  // …and it completes: lights out, wordmark lit, hold released.
  await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains('intro-pending')), { timeout: 6000 }).toBe(false)
  expect(await telltaleColor(page)).not.toBe(AMBER)
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.cl-wordmark')!).opacity)).toBe('1')
})

test('intro plays again after a browser refresh (no storage suppression)', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains('intro-pending')), { timeout: 6000 }).toBe(false)
  await page.reload({ waitUntil: 'commit' })
  await page.waitForSelector('.cl-telltale')
  expect(await page.evaluate(() => document.documentElement.classList.contains('intro-pending'))).toBe(true)
  const storage = await page.evaluate(() => localStorage.length + sessionStorage.length + document.cookie.length)
  expect(storage).toBe(0)
})

test('intro does not replay when returning home through the menu', async ({ page }) => {
  await page.goto(url('takuuehdot/'))
  await ready(page)
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Etusivu/ }).click()
  await expect(page).toHaveURL(/in-tek-demo\/?$/)
  await page.waitForTimeout(100)
  expect(await page.evaluate(() => document.documentElement.classList.contains('intro-pending'))).toBe(false)
  expect(await telltaleColor(page)).not.toBe(AMBER)
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.cl-wordmark')!).opacity)).toBe('1')
})

test('intro does not replay on browser back to the homepage', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains('intro-pending')), { timeout: 6000 }).toBe(false)
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Palvelut/ }).click()
  await expect(page).toHaveURL(/palvelut\/?$/)
  await page.goBack()
  await page.waitForTimeout(100)
  expect(await telltaleColor(page)).not.toBe(AMBER)
})

test('the hero cluster fits the first screen without layout shift', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const before = await page.locator('.cluster').boundingBox()
  await page.waitForTimeout(2800)
  const after = await page.locator('.cluster').boundingBox()
  expect(Math.abs((before?.y ?? 0) - (after?.y ?? 0))).toBeLessThan(1)
  expect(Math.abs((before?.height ?? 0) - (after?.height ?? 0))).toBeLessThan(1)
  if (!isMobile(page)) await expect(page.getByText('Vuodesta', { exact: true })).toBeInViewport()
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test('no intro and all content immediately in its final state', async ({ page }) => {
    await page.goto(url())
    expect(await page.evaluate(() => document.documentElement.classList.contains('intro-pending'))).toBe(false)
    await ready(page)
    await expect(page.locator('h1')).toBeVisible()
    expect(await telltaleColor(page)).not.toBe(AMBER)
    const reveal = await page.evaluate(() => getComputedStyle(document.querySelector('[data-reveal]')!).opacity)
    expect(reveal).toBe('1')
  })
})
