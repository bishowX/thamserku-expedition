// Responsive sources for the pre-generated hero variants.
// Files are emitted by scripts/optimize-hero-images.mjs; the width ladder below
// must stay in sync with it. Each base lists ONLY the widths that exist on disk
// — the script skips steps larger than the source, and a srcset descriptor
// pointing at a missing file would 404 when the browser picks it.

const HERO_WIDTHS: Record<string, number[]> = {
  'hero-cinematic-1': [640, 960, 1280, 1600, 1920, 2560],
  'home-hero-2': [640, 960, 1280, 1600, 1920, 2560, 3840],
}

// The heroes are full-bleed, so the intrinsic display width is the viewport.
export const HERO_SIZES = '100vw'

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
