import { lazy, Suspense } from 'react'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router'
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
import { getSiteSettings } from './lib/queries.server'

export async function loader({ request }: { request: Request }) {
  const { preview } = await getPreviewData(request)
  const settings = await getSiteSettings()
  return { preview, settings }
}

export function meta() {
  return [
    { title: "Thamserku Expedition | World-Leading Himalayan Expeditions" },
    { name: "description", content: "World-leading high-altitude expeditions across Nepal, Tibet & Pakistan — guided by expert Sherpa teams." },
  ];
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
