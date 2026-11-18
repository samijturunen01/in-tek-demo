/**
 * Verified company facts – single source of truth.
 * Sources and open questions: docs/CONTENT_SOURCES.md
 */
const address = { street: 'Kuurnankatu 40', postalCode: '80130', city: 'Joensuu' }
const q = encodeURIComponent(`in-TEK Oy, ${address.street}, ${address.postalCode} ${address.city}`)
const dest = encodeURIComponent(`${address.street}, ${address.postalCode} ${address.city}`)

export const company = {
  name: 'in-TEK Oy',
  brand: 'in-TEK',
  businessId: '2233329-5',
  /** Registered as in-TEK Ky 1.12.2008, in-TEK Oy since 1.6.2021 (PRH). */
  foundedYear: 2008,
  foundedDate: '2008-12-01',
  phone: { display: '046 811 3566', href: 'tel:+358468113566', e164: '+358468113566' },
  email: 'info@in-tek.fi',
  address,
  geo: { lat: 62.61854, lon: 29.73852 },
  instagram: { handle: '@auton_avaimet', url: 'https://www.instagram.com/auton_avaimet' },
  keySite: 'https://www.auton-avaimet-joensuu.fi/',
  originalSite: 'https://www.in-tek.fi/',
  maps: {
    embed: `https://maps.google.com/maps?q=${q}&z=16&output=embed`,
    open: `https://www.google.com/maps/search/?api=1&query=${q}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${dest}`,
  },
} as const

export const fullAddress = `${address.street}, ${address.postalCode} ${address.city}`

/** Years in business, computed – never hard-coded. */
export const yearsInBusiness = (now = new Date()) => now.getFullYear() - company.foundedYear

/** Verified process facts (in-tek.fi etusivu + takuuehdot). */
export const terms = {
  typicalTurnaround: '1–3 arkipäivää',
  returnShipping: 'Korjattu yksikkö lähetetään takaisin korjausta seuraavana päivänä.',
  warrantyRange: '6–24 kk',
  inspectionFee: 40,
  storageMonths: 6,
  carriers: ['Matkahuolto', 'Posti'],
} as const
