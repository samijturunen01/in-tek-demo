/**
 * Authentic photos of in-TEK's own work, from the company's key-service site
 * auton-avaimet-joensuu.fi (provenance: docs/ASSET_PROVENANCE.md).
 * Captions describe only what is visible – no invented project details.
 */
import manifest from './photoManifest.json'

export type PhotoId = keyof typeof manifest
export type PhotoBrand = 'Volvo' | 'BMW' | 'Audi' | 'Volkswagen' | 'Kia' | 'Nissan' | 'Mercedes-Benz'

export interface Photo {
  id: PhotoId
  brand: PhotoBrand
  alt: string
  kind: 'avain' | 'tyo'
}

export const photos: Photo[] = [
  { id: 'volvo-avaimet-kasi', brand: 'Volvo', kind: 'avain', alt: 'Kaksi Volvon kauko-ohjainavainta kädessä Volvon ohjauspyörän ja mittariston edessä.' },
  { id: 'audi-avaimet', brand: 'Audi', kind: 'avain', alt: 'Kaksi Audin avainta kädessä Audin ohjauspyörän edessä, digitaalinen mittaristo taustalla.' },
  { id: 'bmw-avaimet', brand: 'BMW', kind: 'avain', alt: 'Kaksi BMW:n avainta kädessä BMW:n ohjauspyörän edessä.' },
  { id: 'volvo-avaimet-korjaamo', brand: 'Volvo', kind: 'avain', alt: 'Oranssi ja musta Volvon avain mustan Volvon konepellillä korjaamohallissa.' },
  { id: 'kia-avaimet', brand: 'Kia', kind: 'avain', alt: 'Kaksi Kian taittoavainta kädessä Kian ohjaamossa.' },
  { id: 'audi-ohjelmointi', brand: 'Audi', kind: 'tyo', alt: 'Diagnostiikka- ja ohjelmointilaite kytkettynä Audiin, taustalla korjaamon työpöytä.' },
  { id: 'vw-avaimet', brand: 'Volkswagen', kind: 'avain', alt: 'Kaksi Volkswagenin avainta kädessä Volkswagenin ohjauspyörän edessä.' },
  { id: 'nissan-avaimet-konepelti', brand: 'Nissan', kind: 'avain', alt: 'Valkoinen Nissan korjaamohallissa, kaksi avainta konepellin päällä.' },
  { id: 'volvo-avaimet-oranssi', brand: 'Volvo', kind: 'avain', alt: 'Oranssi ja musta Volvon avain kädessä Volvon ohjauspyörän vieressä.' },
  { id: 'mercedes-avain', brand: 'Mercedes-Benz', kind: 'avain', alt: 'Mercedes-Benzin avain kädessä Mercedes-Benzin ohjauspyörän vieressä.' },
  { id: 'kia-ohjelmointi', brand: 'Kia', kind: 'tyo', alt: 'Kian ohjaamo, jossa diagnostiikkalaite etupenkillä.' },
  { id: 'volvo-avaimet-punainen', brand: 'Volvo', kind: 'avain', alt: 'Punainen ja musta Volvon avain kädessä Volvon ohjaamossa.' },
  { id: 'bmw-avaimet-etupenkki', brand: 'BMW', kind: 'avain', alt: 'Kaksi BMW:n avainta kädessä BMW:n ohjaamossa.' },
  { id: 'vw-avaimet-vaihteisto', brand: 'Volkswagen', kind: 'avain', alt: 'Kaksi Volkswagenin avainta vaihteenvalitsimen vieressä.' },
  { id: 'nissan-ohjelmointi', brand: 'Nissan', kind: 'tyo', alt: 'Nissanin ohjaamo, jossa diagnostiikkalaite etupenkillä.' },
  { id: 'volvo-avaimet-ohjauspyora', brand: 'Volvo', kind: 'avain', alt: 'Volvon avaimet kädessä vaalean Volvon ohjauspyörän yläpuolella.' },
  { id: 'kia-avaimet-alusta', brand: 'Kia', kind: 'avain', alt: 'Kaksi Kian taittoavainta tummalla alustalla korjaamon valojen alla.' },
  { id: 'mercedes-avain-konsoli', brand: 'Mercedes-Benz', kind: 'avain', alt: 'Mercedes-Benzin avain keskikonsolissa vaihteenvalitsimen vieressä.' },
  { id: 'volvo-avaimet-konsoli', brand: 'Volvo', kind: 'avain', alt: 'Kaksi Volvon avainta keskikonsolin päällä.' },
]

export const photoById = (id: PhotoId) => photos.find((p) => p.id === id)!
export const photoSize = (id: PhotoId) => manifest[id]
export const photoBrands: PhotoBrand[] = ['Volvo', 'BMW', 'Audi', 'Volkswagen', 'Kia', 'Mercedes-Benz', 'Nissan']
