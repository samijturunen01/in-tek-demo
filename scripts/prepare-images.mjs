/**
 * Converts the authentic in-TEK photos (source-assets/photos, downloaded from the
 * company's own site auton-avaimet-joensuu.fi – see docs/ASSET_PROVENANCE.md)
 * into responsive WebP files and writes a size manifest for layout-stable <img>s.
 * Also renders the Open Graph image. Usage: node scripts/prepare-images.mjs
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const SRC = 'source-assets/photos'
const OUT = 'public/images/work'
const WIDTHS = [480, 960, 1440]

// id → source file (selection documented in docs/ASSET_PROVENANCE.md)
const photos = {
  'volvo-avaimet-kasi': 'IMG_2473.jpeg',
  'bmw-avaimet-etupenkki': 'IMG_2545.jpeg',
  'volvo-avaimet-ohjauspyora': 'IMG_2581.jpeg',
  'volvo-avaimet-konsoli': 'IMG_2666.jpeg',
  'audi-avaimet': 'IMG_3660.jpeg',
  'audi-ohjelmointi': 'IMG_3664-9.jpeg',
  'nissan-ohjelmointi': 'IMG_3684.jpeg',
  'nissan-avaimet-konepelti': 'IMG_3686.jpeg',
  'kia-avaimet': 'IMG_3724.jpeg',
  'volvo-avaimet-korjaamo': 'IMG_3909.jpeg',
  'bmw-avaimet': 'IMG_3998.jpeg',
  'vw-avaimet': 'IMG_4037.jpeg',
  'vw-avaimet-vaihteisto': 'IMG_4040.jpeg',
  'kia-avaimet-alusta': 'iPhone-16-Maxim-1203.jpeg',
  'kia-ohjelmointi': 'iPhone-16-Maxim-1205.jpeg',
  'volvo-avaimet-punainen': 'iPhone-16-Maxim-1257.jpeg',
  'volvo-avaimet-oranssi': 'iPhone-16-Maxim-1337.jpeg',
  'mercedes-avain-konsoli': 'iPhone-16-Maxim-1396.jpeg',
  'mercedes-avain': 'iPhone-16-Maxim-1397.jpeg',
}

await fs.mkdir(OUT, { recursive: true })
const manifest = {}

for (const [id, file] of Object.entries(photos)) {
  const input = sharp(path.join(SRC, file)).rotate()
  const meta = await input.metadata()
  const w0 = meta.autoOrient?.width ?? meta.width
  const h0 = meta.autoOrient?.height ?? meta.height
  manifest[id] = { w: w0, h: h0, widths: [] }
  for (const w of WIDTHS) {
    if (w > w0 && w !== WIDTHS[0]) continue
    await sharp(path.join(SRC, file))
      .rotate()
      .resize({ width: Math.min(w, w0) })
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(OUT, `${id}-${w}.webp`))
    manifest[id].widths.push(w)
  }
}

await fs.writeFile('src/data/photoManifest.json', JSON.stringify(manifest, null, 2) + '\n')

// Open Graph image (1200×630): authentic photo + typographic wordmark.
const bg = await sharp(path.join(SRC, photos['audi-ohjelmointi']))
  .rotate()
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .modulate({ brightness: 0.55, saturation: 0.8 })
  .toBuffer()
const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#091017" stop-opacity=".96"/><stop offset=".62" stop-color="#091017" stop-opacity=".7"/><stop offset="1" stop-color="#091017" stop-opacity=".1"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="72" y="190" font-family="Arial, Helvetica, sans-serif" font-size="104" font-weight="700" fill="#ffffff" letter-spacing="-2">in-<tspan fill="#2ca7e0">TEK</tspan></text>
  <text x="76" y="300" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" fill="#ffffff">Autoelektroniikan ja autonavainten</text>
  <text x="76" y="356" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" fill="#ffffff">korjaus – merkistä riippumatta</text>
  <text x="76" y="440" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#b9c6d1">Mittaristot · ABS · Airbag · Virtalukot · Avaimet</text>
  <text x="76" y="540" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#2ca7e0">Kuurnankatu 40, Joensuu · postikorjaus koko Suomeen</text>
</svg>`)
await fs.mkdir('public/images', { recursive: true })
await sharp(bg).composite([{ input: overlay }]).jpeg({ quality: 84, mozjpeg: true }).toFile('public/images/og-in-tek.jpg')

console.log(`Prepared ${Object.keys(photos).length} photos → ${OUT}`)
