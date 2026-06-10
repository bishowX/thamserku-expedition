import { createClient } from '@sanity/client'

export const serverClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? 'dh94bf5m',
  dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
  apiVersion: '2026-05-21',
  useCdn: false,
  perspective: 'published',
})
