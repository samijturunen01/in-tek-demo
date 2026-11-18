import type { Page } from '@playwright/test'

export const BASE = '/in-tek-demo/'
export const url = (p = '') => `${BASE}${p}`

export const routes = [
  { path: '', h1: /Auton elektroniikka ja avaimet kuntoon/ },
  { path: 'palvelut/', h1: /Autoelektroniikan korjaukset ja autonavaimet/ },
  { path: 'mittaristot/', h1: /Mittariston korjaus/ },
  { path: 'abs-yksikot/', h1: /ABS-ohjausyksikön korjaus/ },
  { path: 'airbag-yksikot/', h1: /Airbag-yksikön korjaus/ },
  { path: 'virtalukot-ja-rattilukot/', h1: /virtalukon ja rattilukon korjaus/ },
  { path: 'muu-auton-elektroniikan-korjaus/', h1: /Moottorinohjaus, vaihteisto/ },
  { path: 'autonavaimet/', h1: /Autonavaimet Joensuussa/ },
  { path: 'postikorjaus/', h1: /Lähetä yksikkö korjattavaksi/ },
  { path: 'takuuehdot/', h1: /Takuu, korjausaika ja säilytys/ },
  { path: 'yhteystiedot/', h1: /Soita, kirjoita tai pyydä hinta-arvio/ },
]

export const navLabels = ['Etusivu', 'Palvelut', 'Autonavaimet', 'Postikorjaus', 'Takuuehdot', 'Yhteystiedot']

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024

/** Wait until the app has hydrated. */
export const ready = (page: Page) => page.waitForFunction(() => (window as unknown as { __intekReady?: boolean }).__intekReady === true)

export async function openNav(page: Page) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Valikko' }).click()
    return page.getByRole('navigation', { name: 'Mobiilivalikko' })
  }
  return page.getByRole('navigation', { name: 'Päävalikko' })
}
