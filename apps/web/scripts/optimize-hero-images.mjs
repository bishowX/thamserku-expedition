// Pre-generate responsive AVIF + WebP variants for the homepage hero photos.
//
// The cinematic intro serves full-bleed local JPEGs (bypassing Sanity's CDN by
// design). Raw they are 0.7–2.1 MB each with no responsive/modern-format
// negotiation, so a phone downloads the full ~2560px JPEG for the LCP. This
// script emits width-stepped AVIF/WebP siblings next to each source; the
// components reference them through <picture> srcset. Originals are kept as the
// ultimate <img src> fallback.
//
// Run from apps/web:  node scripts/optimize-hero-images.mjs

import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { statSync, existsSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES = resolve(__dirname, '../public/images')

// Full-bleed heroes: cover common DPR×viewport combinations without shipping a
// 2560px file to a 390px phone. The largest step matches the source's useful
// resolution (retina desktop / 4K).
const WIDTHS = [640, 960, 1280, 1600, 1920, 2560, 3840]

// Quality tuned per format — AVIF holds up far lower than WebP at equal bytes.
const AVIF = { quality: 60, effort: 5 }
const WEBP = { quality: 82 }

const SOURCES = ['hero-cinematic-1.jpg', 'home-hero-2.jpg']

const kb = (p) => (statSync(p).size / 1024).toFixed(0)

// Run manually (`pnpm optimize:images`) after adding or swapping a hero photo,
// then commit the generated variants — they ship straight from the repo and are
// NOT regenerated at build time. Skip a variant that already exists and is newer
// than its source so unchanged images aren't reprocessed.
// (Note: this mtime check is unreliable on a fresh git clone, which is one
// reason this belongs in a local manual step rather than CI.)
const isFresh = (out, srcPath) =>
  existsSync(out) && statSync(out).mtimeMs >= statSync(srcPath).mtimeMs

for (const file of SOURCES) {
  const src = join(IMAGES, file)
  if (!existsSync(src)) {
    console.warn(`skip (missing): ${file}`)
    continue
  }
  const base = file.replace(/\.[^.]+$/, '')
  const meta = await sharp(src).metadata()
  console.log(`\n${file}  (${meta.width}×${meta.height}, ${kb(src)} KB)`) // eslint-disable-line no-console

  for (const w of WIDTHS) {
    if (meta.width && w > meta.width) continue // never upscale past the source
    for (const [ext, opts] of [['avif', AVIF], ['webp', WEBP]]) {
      const out = join(IMAGES, `${base}-${w}.${ext}`)
      if (isFresh(out, src)) {
        console.log(`  = ${base}-${w}.${ext}  (up to date)`) // eslint-disable-line no-console
        continue
      }
      await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        [ext](opts)
        .toFile(out)
      console.log(`  → ${base}-${w}.${ext}  ${kb(out)} KB`) // eslint-disable-line no-console
    }
  }
}

console.log('\ndone') // eslint-disable-line no-console
