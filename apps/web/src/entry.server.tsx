import { isbot } from 'isbot'
// @ts-expect-error — no types for the browser sub-entry but it ships renderToReadableStream
import { renderToReadableStream } from 'react-dom/server.browser'
import { ServerRouter } from 'react-router'
import type { EntryContext } from 'react-router'

export const streamTimeout = 5_000

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  let shellRendered = false
  const userAgent = request.headers.get('user-agent')

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      onError(error: unknown) {
        responseStatusCode = 500
        if (shellRendered) {
          console.error(error)
        }
      },
    },
  )
  shellRendered = true

  if (isbot(userAgent)) {
    await body.allReady
  }

  responseHeaders.set('Content-Type', 'text/html')

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  })
}
