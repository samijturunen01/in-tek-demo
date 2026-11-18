export interface NavItem {
  to: string
  label: string
}

/** Main navigation – "Etusivu" is always first (desktop and mobile). */
export const mainNav: NavItem[] = [
  { to: '/', label: 'Etusivu' },
  { to: '/palvelut', label: 'Palvelut' },
  { to: '/autonavaimet', label: 'Autonavaimet' },
  { to: '/postikorjaus', label: 'Postikorjaus' },
  { to: '/takuuehdot', label: 'Takuuehdot' },
  { to: '/yhteystiedot', label: 'Yhteystiedot' },
]

/** Primary CTA destination – the repair inquiry form. */
export const inquiryHref = (service?: string) => `/yhteystiedot${service ? `?palvelu=${service}` : ''}#kysely`
