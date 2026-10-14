// Resize originals in assets-src/ to web sizes in public/img/. Originals are never modified.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const jobs = [
  { src: 'assets-src/ray-working.jpg', out: 'ray-hero.jpg', long: 1800 },
  { src: 'assets-src/photo6.jpg', out: 'stage-1-bloque.jpg', long: 1600 },
  { src: 'assets-src/photo4.jpg', out: 'stage-2-aplanado.jpg', long: 1600 },
  { src: 'assets-src/photo10.jpg', out: 'stage-3-acabado.jpg', long: 1600 },
  { src: 'assets-src/photo2.jpg', out: 'detalle-muro.jpg', long: 1600 },
  { src: 'assets-src/photo1.jpg', out: 'detalle-plafon.jpg', long: 1600 },
]

await mkdir('public/img', { recursive: true })
for (const j of jobs) {
  const info = await sharp(j.src)
    .rotate()
    .resize({ width: j.long, height: j.long, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`public/img/${j.out}`)
  console.log(j.out, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} KB`)
}

// Social preview 1200x630: Ray's photo cropped around the subject, no overlay text.
await sharp('assets-src/ray-working.jpg')
  .rotate()
  .resize(1200, 630, { fit: 'cover', position: sharp.strategy.attention })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og.jpg')
console.log('og.jpg done')
