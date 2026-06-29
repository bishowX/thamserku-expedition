import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router'
import './styles/index.css'
import 'lenis/dist/lenis.css'
import { FloatingContactPrompt } from './app/components/FloatingContactPrompt'
import { SanityVisualEditing } from './app/components/SanityVisualEditing'
import { useLenis } from './app/hooks/useLenis'
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
        <Meta />
        <Links />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RMBQH3J4HV" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-RMBQH3J4HV');`,
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
      {preview && <SanityVisualEditing />}
    </>
  )
}
