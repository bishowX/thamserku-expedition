import { createClient } from '@sanity/client'

// Server-only — do not import from client-side code.
export const writeClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? 'dh94bf5m',
  dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
  apiVersion: '2026-05-21',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})
