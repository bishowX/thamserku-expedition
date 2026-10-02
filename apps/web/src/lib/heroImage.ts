// Responsive sources for the pre-generated hero variants.
// Files are emitted by scripts/optimize-hero-images.mjs; the width ladder below
// must stay in sync with it. Each base lists ONLY the widths that exist on disk
// — the script skips steps larger than the source, and a srcset descriptor
// pointing at a missing file would 404 when the browser picks it.

const HERO_WIDTHS: Record<string, number[]> = {
  // Capped at 2560: the 3840 AVIF is 1.5 MB, and as the LCP image it left the
  // intro black for seconds on desktop while it downloaded.
  'hero-cinematic-1': [640, 960, 1280, 1600, 1920, 2560],
  'home-hero-2': [640, 960, 1280, 1600, 1920, 2560, 3840],
}

// Scene 1 is a 16:9 photo under object-cover. In a tall phone portrait it is
// scaled to fill the HEIGHT, so only a narrow slice shows — advertise 200vw so
// the phone pulls a sharp 2560. On desktop the crop is slight; 100vw is enough.
export const HERO_SIZES_INTRO = '(max-width: 767px) 200vw, 100vw'

// The home hero photo is a near-2:1 landscape shown full-bleed. In a tall phone
// portrait, object-cover scales it to fill the HEIGHT, so its rendered width far
// exceeds the viewport (~2x+) and only a narrow horizontal band is visible —
// meaning 100vw badly under-selects and the crop looks low-res. Advertise a
// portrait-aware width so mobile grabs 3840 (~350KB); desktop, where the crop is
// slight, needs only a modest bump.
export const HERO_SIZES_HOME = '(max-width: 767px) 230vw, 130vw'

// ~150-byte blurred thumbnails, inlined as the <img> background so the hero
// paints a soft preview on the first frame instead of the dark page bg while
// the real photo downloads. Regenerate if the photo is swapped.
export const HERO_LQIP: Record<string, string> = {
  'hero-cinematic-1':
    'data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAAAQBQCdASogABIAPtFUpU2oJCMiMBgIAQAaCUAYmwZX1++BpBeYZ764Iv3OIlrXpMIAAP7R2Ve3we0wf2BbgB39q0IxanDdm1gzsDhXvrvvzamPoiY4+4oJYE90Dog9dghYUca2JKKgCvKmCwOecddGNpl5LW7YYG5xtWzdUq+wIAAA',
  'home-hero-2':
    'data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAQBACdASogABAAPtFYpEwoJSOiMAgBABoJbACdH8ADA1nf/tIvND/FAAD+uQI1fhsqw77sNwaIfSStaCEXnlk6jXfNzi2N2Wgbp3GWflHQ7F0p6NQx6DOI5XwskCH99IYbU8OYgHBAAA==',
}

/** Inline style that paints the blurred thumbnail behind a hero <img>. */
export function heroLqipStyle(src: string) {
  const lqip = HERO_LQIP[baseOf(src)]
  return lqip ? { backgroundImage: `url(${lqip})`, backgroundSize: 'cover' } : undefined
}

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
