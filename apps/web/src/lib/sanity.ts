import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? 'dh94bf5m',
  dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
  apiVersion: '2026-05-21',
  useCdn: true,
  // studioUrl lets stega-encoded content resolve click-to-edit links back to the
  // Studio. Encoding itself is gated per-request (only on during preview), so this
  // is inert for normal published reads. Also used by useLiveMode on the client.
  stega: {
    studioUrl: import.meta.env.VITE_SANITY_STUDIO_URL ?? 'http://localhost:3333',
  },
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  // auto('format') lets Sanity's CDN negotiate AVIF/WebP by Accept header
  // instead of always serving the original JPEG/PNG — a large sitewide byte
  // saving on every CMS image. Callers still chain .width()/.height()/etc.
  return builder.image(source).auto('format')
}
