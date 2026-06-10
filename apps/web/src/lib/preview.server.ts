import { createCookieSessionStorage } from 'react-router'
import type { loadQuery } from '@sanity/react-loader'

// Signed cookie that records whether the visitor is in Presentation/Visual Editing
// preview mode and which perspective they're viewing. Server-only — never import
// this from client components.
const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    name: '__sanity_preview',
    path: '/',
    // Presentation embeds the app in an iframe, so the cookie must be cross-site
    // in production; lax keeps local dev working without HTTPS.
    sameSite: !import.meta.env.DEV ? 'none' : 'lax',
    secrets: [process.env.SESSION_SECRET ?? 'sanity-preview-session-secret'],
    secure: !import.meta.env.DEV,
  },
})

type PreviewData = {
  preview: boolean
  options: Parameters<typeof loadQuery>[2]
}

async function getPreviewData(request: Request): Promise<PreviewData> {
  const session = await getSession(request.headers.get('Cookie'))
  const preview: boolean = session.get('previewMode') || false

  return {
    preview,
    options: preview
      ? {
          perspective: session.has('perspective')
            ? session.get('perspective').split(',')
            : 'drafts',
          stega: true,
        }
      : {
          perspective: 'published',
          stega: false,
        },
  }
}

export { commitSession, destroySession, getSession, getPreviewData }
