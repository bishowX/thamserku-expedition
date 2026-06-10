import { getSession, destroySession } from '../../lib/preview.server'

// Clears the preview cookie and returns to published content.
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url)
  const redirectTo = url.searchParams.get('redirect') || '/'

  const session = await getSession(request.headers.get('Cookie'))

  return new Response(null, {
    status: 307,
    headers: {
      Location: redirectTo,
      'Set-Cookie': await destroySession(session),
    },
  })
}
