// Responsive sources for the pre-generated hero variants.
// Files are emitted by scripts/optimize-hero-images.mjs; the width ladder below
// must stay in sync with it. Each base lists ONLY the widths that exist on disk
// — the script skips steps larger than the source, and a srcset descriptor
// pointing at a missing file would 404 when the browser picks it.

const HERO_WIDTHS: Record<string, number[]> = {
  'hero-cinematic-1': [640, 960, 1280, 1600, 1920, 2560, 3840],
  'home-hero-2': [640, 960, 1280, 1600, 1920, 2560, 3840],
}

// The cinematic intro zooms its photo to 1.65x and, on a narrow phone, shows
// only a cropped slice of it — so the browser must select a far larger
// candidate than the viewport width implies, or the visible crop reads as
// upscaled mush. 200vw pulls the 2560 variant on a phone (sharp, downscaled
// from the 5120 master) and 3840 on desktop.
export const HERO_SIZES_INTRO = '200vw'

// The home hero photo is a near-2:1 landscape shown full-bleed. In a tall phone
// portrait, object-cover scales it to fill the HEIGHT, so its rendered width far
// exceeds the viewport (~2x+) and only a narrow horizontal band is visible —
// meaning 100vw badly under-selects and the crop looks low-res. Advertise a
// portrait-aware width so mobile grabs 3840 (~350KB); desktop, where the crop is
// slight, needs only a modest bump.
export const HERO_SIZES_HOME = '(max-width: 767px) 230vw, 130vw'

function baseOf(src: string): string {
  return src.replace(/^.*\//, '').replace(/\.[^.]+$/, '')
}

/** srcset string for one modern format, or undefined if the src has no
 *  pre-generated variants (falls back to the plain <img src>). */
export function heroSrcSet(src: string, ext: 'avif' | 'webp'): string | undefined {
  const widths = HERO_WIDTHS[baseOf(src)]
  if (!widths) return undefined
  return widths.map((w) => `/images/${baseOf(src)}-${w}.${ext} ${w}w`).join(', ')
}
