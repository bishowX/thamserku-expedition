import { loadQuery, setServerClient } from '@sanity/react-loader'
import { createClient } from '@sanity/client'

// Server-only client used by react-loader. Mirrors sanity.ts but with the read
// token (for drafts) and CDN disabled so previews always see fresh content.
const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? 'ugjhuor8',
  dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
  apiVersion: '2026-05-21',
  useCdn: false,
  stega: {
    studioUrl: import.meta.env.VITE_SANITY_STUDIO_URL ?? 'http://localhost:3333',
  },
})

setServerClient(client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }))

export { loadQuery }
