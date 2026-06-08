import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import './styles/index.css'
import { FloatingContactPrompt } from './app/components/FloatingContactPrompt'

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
      <body className="bg-[#1A1A1A] min-h-screen text-white font-['Lexend'] selection:bg-[#2E353C] selection:text-white">
        {children}
        <FloatingContactPrompt />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return <Outlet />
}
