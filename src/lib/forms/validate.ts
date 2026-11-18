import type { FieldErrors, RepairInquiry } from './types'

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE = /^\+?[0-9 ()-]{6,20}$/

/** Client-side validation. A future backend must validate again server-side. */
export function validate(d: RepairInquiry): FieldErrors {
  const e: FieldErrors = {}
  if (!d.service) e.service = 'Valitse, mitä korjataan – tai "En ole varma".'
  if (d.vehicle.trim().length < 2) e.vehicle = 'Kerro ajoneuvon merkki ja malli (esim. Volvo V70).'
  if (d.year.trim() && !/^(19|20)\d{2}$/.test(d.year.trim())) e.year = 'Kirjoita vuosimalli neljällä numerolla (esim. 2012).'
  if (d.description.trim().length < 10) e.description = 'Kuvaile vika tai oireet lyhyesti (vähintään 10 merkkiä).'
  if (d.description.length > 2000) e.description = 'Kuvaus on liian pitkä (enintään 2000 merkkiä).'
  if (d.name.trim().length < 2) e.name = 'Kirjoita nimesi.'
  if (!d.email.trim() && !d.phone.trim()) e.phone = 'Anna puhelinnumero tai sähköpostiosoite, jotta voimme vastata.'
  if (d.phone.trim() && !PHONE.test(d.phone.trim())) e.phone = 'Tarkista puhelinnumero (esim. 040 123 4567).'
  if (d.email.trim() && !EMAIL.test(d.email.trim())) e.email = 'Tarkista sähköpostiosoite (esim. nimi@esimerkki.fi).'
  if (d.isCompany && d.company.trim().length < 2) e.company = 'Kirjoita yrityksen nimi.'
  if (!d.consent) e.consent = 'Hyväksy tietojen käyttö yhteydenottoa varten.'
  return e
}
