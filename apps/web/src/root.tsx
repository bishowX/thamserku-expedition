import { lazy, Suspense } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useLoaderData, useLocation, useRouteError, useRouteLoaderData } from 'react-router'
import './styles/index.css'
import 'lenis/dist/lenis.css'
import { FloatingContactPrompt } from './app/components/FloatingContactPrompt'
import { useLenis } from './app/hooks/useLenis'

// The visual-editing overlay pulls in ~600 KB of @sanity/visual-editing +
// useLiveMode. It only ever renders in preview mode (editors), so lazy-load it
// — a static import would drag that weight into every normal visitor's bundle.
const SanityVisualEditing = lazy(() =>
  import('./app/components/SanityVisualEditing').then((m) => ({
    default: m.SanityVisualEditing,
  })),
)
import { getPreviewData } from './lib/preview.server'
import { getRootData } from './lib/queries.server'
import { pageMeta } from './lib/seo'
import { siteJsonLd, breadcrumbJsonLd, jsonLdGraph } from './lib/jsonld'
import { routeLabel } from './lib/siteRoutes'
import { JsonLd } from './app/components/JsonLd'
import { NotFound } from './app/pages/NotFound'
import type { Route } from './+types/root'

export async function loader({ request }: { request: Request }) {
  const { preview } = await getPreviewData(request)
  const { settings, expeditions } = await getRootData()
  return { preview, settings, expeditions }
}

/**
 * Fallback tags for routes that export no meta of their own. A route whose
 * loader throws never runs its own meta, so the 404 and error screens land here
 * — hence the error check. The HTTP status already keeps them out of the index;
 * the noindex tag is belt and braces.
 */
export function meta({ matches, error }: Route.MetaArgs) {
  const failed = error ?? matches?.some((m) => m && 'error' in m && m.error)
  if (failed) {
    return pageMeta({ seo: { noIndex: true }, title: 'Page not found', matches })
  }
  return pageMeta({ matches })
}

/**
 * Organization, WebSite and the breadcrumb trail, emitted from the layout so
 * every route carries them without touching thirteen page files. Routes that
 * need richer markup (an expedition dossier, the FAQ) render their own graph on
 * top of this one.
 *
 * Rendered inside Layout, which React Router also uses for the ErrorBoundary —
 * so this must tolerate the root loader never having run.
 */
function SiteStructuredData() {
  const root = useRouteLoaderData<typeof loader>('root')
  const { pathname } = useLocation()
  const label = routeLabel(pathname)
  // The home page is the breadcrumb root, so it gets no trail of its own.
  // Dynamic routes are skipped here and emit their own, with the real title.
  const breadcrumb =
    label && pathname !== '/' ? breadcrumbJsonLd([{ name: label, path: pathname }]) : undefined

  return <JsonLd graph={jsonLdGraph([...siteJsonLd(root?.settings), breadcrumb])} />
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Warm the font-CDN connections before the stylesheet request, and load
            fonts via a single <link> instead of a nested CSS @import chain. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,100..900,0..100;1,9..144,100..900,0..100&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap"
        />
        <Meta />
        <Links />
        {/* Analytics is deferred off the critical path: gtag() calls queue into
            dataLayer immediately, but the gtag.js network request waits for the
            browser to go idle or the visitor's first interaction — so it never
            competes with the LCP image for bandwidth. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-RMBQH3J4HV');var __gaLoaded=false;function __loadGA(){if(__gaLoaded)return;__gaLoaded=true;var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-RMBQH3J4HV';document.head.appendChild(s)}if('requestIdleCallback'in window){requestIdleCallback(__loadGA,{timeout:6000})}else{setTimeout(__loadGA,4000)}['pointerdown','keydown','scroll','touchstart'].forEach(function(e){window.addEventListener(e,__loadGA,{once:true,passive:true})});`,
          }}
        />
        <SiteStructuredData />
      </head>
      <body className="bg-[#1A1A1A] min-h-screen text-white font-['DM_Sans'] selection:bg-[#2E353C] selection:text-white overflow-x-clip">
        {children}
        <FloatingContactPrompt />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  const { preview } = useLoaderData<typeof loader>()
  useLenis()
  return (
    <>
      <Outlet />
      {preview && (
        <Suspense fallback={null}>
          <SanityVisualEditing />
        </Suspense>
      )}
    </>
  )
}

/**
 * Catches everything the app throws: the splat route's 404, an expedition slug
 * that no longer exists, and unhandled loader errors. Without this React Router
 * renders its own bare stack-trace screen. Layout still wraps this, so the page
 * keeps its fonts, meta and structured data.
 */
export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />
  }

  console.error('[root] unhandled route error:', error)
  return (
    <NotFound
      status={isRouteErrorResponse(error) ? String(error.status) : '500'}
      title="Something went wrong at our end."
      body="This one is on us, not you. Try again in a moment — if it keeps happening, our desk will pick it up directly."
    />
  )
}
