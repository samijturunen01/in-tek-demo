import { expect, test } from '@playwright/test'
import { ready, url } from './helpers'

test('symptom finder switches panels by click and arrow keys', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const finder = page.locator('#merkkivalot')
  await finder.getByRole('tab', { name: /Airbag-valo palaa/ }).click()
  await expect(finder.getByRole('tabpanel')).toContainText('Airbag-valo palaa eikä koodi poistu')
  await page.keyboard.press('ArrowDown')
  await expect(finder.getByRole('tab', { name: /Mittari heittelee/ })).toBeFocused()
  await expect(finder.getByRole('tabpanel')).toContainText('Mittarit heittelevät')
  await finder.getByRole('tabpanel').getByRole('link', { name: /Pyydä hinta-arvio/ }).click()
  await expect(page).toHaveURL(/palvelu=mittaristot#kysely/)
  await expect(page.getByRole('radio', { name: 'Mittaristo' })).toBeChecked()
})

test('inquiry form validates, keeps input and shows the demo message without sending anything', async ({ page }) => {
  const external: string[] = []
  page.on('request', (r) => {
    const u = new URL(r.url())
    if (!['127.0.0.1', 'localhost', 'samijturunen01.github.io'].includes(u.hostname)) external.push(r.url())
    if (r.method() === 'POST') external.push(`POST ${r.url()}`)
  })
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  const form = page.locator('#kysely form')
  await form.getByLabel(/Merkki ja malli/).fill('Volvo V70')
  await form.getByRole('button', { name: /Lähetä hinta-arviopyyntö/ }).click()
  const alert = form.getByRole('alert')
  await expect(alert).toBeVisible()
  await expect(alert).toContainText('Valitse, mitä korjataan')
  await expect(alert).toContainText('Kirjoita nimesi')
  // input is preserved after a failed validation
  await expect(form.getByLabel(/Merkki ja malli/)).toHaveValue('Volvo V70')
  await form.getByRole('radio', { name: 'ABS-yksikkö' }).check()
  await form.getByLabel(/Vian kuvaus/).fill('ABS-valo palaa ja nopeusmittari jää välillä nollaan.')
  await form.getByLabel(/^Nimi/).fill('Testi Asiakas')
  await form.getByLabel(/Puhelinnumero/).fill('040 123 4567')
  await form.getByLabel(/Annan luvan/).check()
  await form.getByRole('button', { name: /Lähetä hinta-arviopyyntö/ }).click()
  await expect(page.getByRole('status')).toContainText('Demoversio – viestiä ei lähetetty.')
  expect(external).toEqual([])
  const storage = await page.evaluate(() => localStorage.length + sessionStorage.length + document.cookie.length)
  expect(storage).toBe(0)
})

test('company field appears only when needed (progressive disclosure)', async ({ page }) => {
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  await expect(page.getByLabel(/Yrityksen nimi/)).toBeHidden()
  await page.getByLabel('Pyydän hinta-arviota yritykselle').check()
  await expect(page.getByLabel(/Yrityksen nimi/)).toBeVisible()
})

test('service slip validates and opens the print dialog with the filled slip', async ({ page }) => {
  await page.goto(url('postikorjaus/'))
  await ready(page)
  await page.evaluate(() => {
    ;(window as unknown as { __printed: number }).__printed = 0
    window.print = () => {
      ;(window as unknown as { __printed: number }).__printed++
    }
  })
  const form = page.locator('#huoltolahete form')
  await form.getByRole('button', { name: /Tulosta huoltolähete/ }).click()
  await expect(form.getByRole('alert')).toContainText('Täydennä')
  await form.getByLabel(/^Nimi/).fill('Testi Asiakas')
  await form.getByLabel(/Katuosoite/).fill('Testikatu 1')
  await form.getByLabel(/Postinumero/).fill('80100')
  await form.getByLabel(/Postitoimipaikka/).fill('Joensuu')
  await form.getByLabel(/^Puhelin/).fill('0401234567')
  await form.getByLabel(/Korjattava yksikkö/).selectOption({ label: 'Mittaristo' })
  await form.getByLabel(/Ajoneuvo ja rekisteritunnus/).fill('Audi A6 2007, ABC-123')
  await form.getByLabel(/Vian kuvaus/).fill('Nopeusmittari toimii satunnaisesti.')
  await form.getByLabel(/Olen tutustunut/).check()
  await form.getByRole('button', { name: /Tulosta huoltolähete/ }).click()
  await expect.poll(() => page.evaluate(() => (window as unknown as { __printed: number }).__printed)).toBe(1)
  const sheet = page.locator('.print-sheet')
  await expect(sheet).toContainText('in-TEK huoltolähete')
  await expect(sheet).toContainText('Audi A6 2007, ABC-123')
  await expect(sheet).toContainText('Takuu- ja toimitusehdot')
})

test('key gallery filters by brand and opens an accessible viewer', async ({ page }) => {
  await page.goto(url('autonavaimet/'))
  await ready(page)
  const gallery = page.locator('#avaintyot')
  await gallery.getByRole('button', { name: /^BMW/ }).click()
  await expect(gallery.getByRole('button', { name: /^BMW/ })).toHaveAttribute('aria-pressed', 'true')
  const items = gallery.locator('ul li button')
  await expect(items).toHaveCount(2)
  await items.first().click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog).toContainText('BMW')
  await page.keyboard.press('ArrowRight')
  await expect(dialog).toContainText('2 / 2')
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
})

test('map loads only on request and points to Kuurnankatu 40; directions link works', async ({ page }) => {
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  await expect(page.locator('iframe')).toHaveCount(0)
  const directions = page.getByRole('link', { name: /Katso reittiohjeet/ })
  await expect(directions).toHaveAttribute('href', /google\.com\/maps\/dir\/\?api=1&destination=Kuurnankatu%2040%2C%2080130%20Joensuu/)
  await page.getByRole('button', { name: 'Näytä kartta' }).click()
  await expect(page.locator('iframe')).toHaveAttribute('src', /maps\.google\.com\/maps\?q=in-TEK%20Oy%2C%20Kuurnankatu%2040%2C%2080130%20Joensuu.*output=embed/)
})

test('click-to-call and email links use the verified contact details', async ({ page }) => {
  await page.goto(url('yhteystiedot/'))
  const tel = await page.locator('a[href^="tel:"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))])
  const mail = await page.locator('a[href^="mailto:"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))])
  expect(tel).toEqual(['tel:+358468113566'])
  expect(mail).toEqual(['mailto:info@in-tek.fi'])
})

test('no analytics, tracking pixels or cookies are active', async ({ page }) => {
  const trackers: string[] = []
  page.on('request', (r) => {
    if (/google-analytics|googletagmanager|facebook\.net|doubleclick|hotjar|clarity\.ms/.test(r.url())) trackers.push(r.url())
  })
  await page.goto(url())
  await ready(page)
  await page.waitForTimeout(500)
  expect(trackers).toEqual([])
  expect(await page.context().cookies()).toEqual([])
})

test('FAQ answers expand natively', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const q = page.getByText('Mitä jos yksikkö ei korjauksen jälkeen toimi?')
  await q.click()
  await expect(page.getByText('veloitamme silloin vain 40 euron tarkistusmaksun', { exact: false })).toBeVisible()
})
