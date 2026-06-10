import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? 'ugjhuor8',
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
  return builder.image(source)
}
