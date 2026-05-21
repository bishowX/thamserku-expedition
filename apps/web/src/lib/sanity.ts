import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? 'ugjhuor8',
  dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
  apiVersion: '2026-05-21',
  useCdn: true,
})
