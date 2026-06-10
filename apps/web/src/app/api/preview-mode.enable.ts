import { validatePreviewUrl } from '@sanity/preview-url-secret'
import type { ClientPerspective } from '@sanity/client'
import { sanityClient } from '../../lib/sanity'
import { getSession, commitSession } from '../../lib/preview.server'

// Called by Presentation's "preview mode" toggle. Validates the secret it appends
// to the URL, then flips the preview cookie on so loaders fetch draft content.
export async function loader({ request }: { request: Request }) {
  const token = process.env.SANITY_API_READ_TOKEN
  if (!token) {
    throw new Response(
      'SANITY_API_READ_TOKEN is not set. Add a Sanity Viewer token to your .env.',
      { status: 500 },
    )
  }

  const clientWithToken = sanityClient.withConfig({ token })
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    clientWithToken,
    request.url,
  )

  if (!isValid) {
    return new Response('Invalid preview URL', { status: 401 })
  }

  const session = await getSession(request.headers.get('Cookie'))
  session.set('previewMode', true)

  const url = new URL(request.url)
  const perspective = url.searchParams.get('sanity-preview-perspective') as
    | ClientPerspective
    | null
  if (perspective) session.set('perspective', perspective)

  return new Response(null, {
    status: 307,
    headers: {
      Location: redirectTo,
      'Set-Cookie': await commitSession(session),
    },
  })
}
