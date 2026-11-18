import { photoSize, type PhotoId } from '../data/photos'

/** Prefix a public/ path with the deployment base path. */
export const asset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`

export const photoSrc = (id: PhotoId, w = 960) => asset(`images/work/${id}-${w}.webp`)

export const photoSrcSet = (id: PhotoId) => {
  const m = photoSize(id)
  return m.widths.map((w) => `${asset(`images/work/${id}-${w}.webp`)} ${Math.min(w, m.w)}w`).join(', ')
}
