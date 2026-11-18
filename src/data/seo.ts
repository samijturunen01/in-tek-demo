import { services } from './services'

export interface RouteMeta {
  path: string
  label: string
  title: string
  description: string
}

const servicePages: RouteMeta[] = services.map((s) => ({
  path: `/${s.slug}`,
  label: s.name,
  title: s.seo.title,
  description: s.seo.description,
}))

/** Every prerendered route with unique metadata (scripts/prerender.mjs). */
export const routes: RouteMeta[] = [
  {
    path: '/',
    label: 'Etusivu',
    title: 'Autoelektroniikan ja autonavainten korjaus Joensuu | in-TEK',
    description:
      'in-TEK korjaa mittaristot, ABS- ja airbag-yksiköt, sähköiset virtalukot ja autonavaimet merkistä riippumatta – Joensuussa ja postitse. Vuodesta 2008, takuu 6–24 kk.',
  },
  {
    path: '/palvelut',
    label: 'Palvelut',
    title: 'Palvelut – autoelektroniikan korjaus ja autonavaimet | in-TEK',
    description:
      'Mikä merkkivalo palaa? Mittaristot, ABS, airbag, virta- ja rattilukot, ohjausyksiköt ja autonavaimet. Korjausajat ja takuut palveluittain.',
  },
  ...servicePages,
  {
    path: '/postikorjaus',
    label: 'Postikorjaus',
    title: 'Lähetä yksikkö korjattavaksi postitse – huoltolähete | in-TEK',
    description:
      'Näin lähetät mittariston, ABS-, airbag- tai muun ohjausyksikön korjattavaksi Matkahuollon tai Postin kautta. Tee ja tulosta huoltolähete suoraan selaimessa.',
  },
  {
    path: '/takuuehdot',
    label: 'Takuuehdot',
    title: 'Takuu- ja toimitusehdot | in-TEK',
    description:
      'in-TEK Oy:n korjauspalveluiden takuu 6–24 kk, korjausaika ja toimitus sekä säilytysehdot. Jos yksikkö ei tule kuntoon, korjaushinta palautetaan (tarkistusmaksu 40 €).',
  },
  {
    path: '/yhteystiedot',
    label: 'Yhteystiedot',
    title: 'Yhteystiedot ja hinta-arvio – Kuurnankatu 40, Joensuu | in-TEK',
    description:
      'Soita 046 811 3566, lähetä sähköpostia info@in-tek.fi tai pyydä hinta-arvio lomakkeella. Toimipiste Kuurnankatu 40, 80130 Joensuu.',
  },
  {
    path: '/404',
    label: 'Sivua ei löytynyt',
    title: 'Sivua ei löytynyt | in-TEK',
    description: 'Etsimääsi sivua ei löytynyt. Palaa etusivulle tai valitse palvelu.',
  },
]

export const metaFor = (pathname: string): RouteMeta => {
  const p = pathname.replace(/\/+$/, '') || '/'
  return routes.find((r) => r.path === p) ?? routes.find((r) => r.path === '/404')!
}
