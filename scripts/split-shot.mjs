/** Dev helper: split a tall screenshot into parts for review. Usage: node scripts/split-shot.mjs <png> [partHeight] [outWidth] */
import sharp from 'sharp'
const [file, ph = '2400', ow = '900'] = process.argv.slice(2)
const m = await sharp(file).metadata()
const n = Math.ceil(m.height / +ph)
for (let i = 0; i < n; i++) {
  const top = i * +ph
  const h = Math.min(+ph, m.height - top)
  await sharp(file).extract({ left: 0, top, width: m.width, height: h }).resize({ width: Math.min(+ow, m.width) }).toFile(file.replace(/\.png$/, `-p${i}.png`))
}
console.log(m.width, m.height, n)
