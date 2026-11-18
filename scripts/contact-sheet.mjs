import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
const dir = process.argv[2], out = process.argv[3]
const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort()
const W = 360, H = 360, cols = 6
const tiles = []
for (const [i, f] of files.entries()) {
  const meta = await sharp(path.join(dir, f)).metadata()
  console.log(i, f, meta.width + 'x' + meta.height, meta.orientation || '')
  const buf = await sharp(path.join(dir, f)).rotate().resize(W, H, { fit: 'contain', background: '#222' }).toBuffer()
  const label = Buffer.from(`<svg width="${W}" height="28"><rect width="100%" height="100%" fill="#000"/><text x="6" y="20" font-size="18" fill="#ff0" font-family="Arial">${i}: ${f}</text></svg>`)
  tiles.push({ input: buf, left: (i % cols) * W, top: Math.floor(i / cols) * (H + 28) + 28 })
  tiles.push({ input: label, left: (i % cols) * W, top: Math.floor(i / cols) * (H + 28) })
}
const rows = Math.ceil(files.length / cols)
await sharp({ create: { width: cols * W, height: rows * (H + 28), channels: 3, background: '#111' } }).composite(tiles).jpeg({ quality: 80 }).toFile(out)
