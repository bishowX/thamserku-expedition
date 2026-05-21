import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import './styles/index.css'
import { FloatingContactPrompt } from './app/components/FloatingContactPrompt'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Thamserku Expedition</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-[#1A1A1A] min-h-screen text-white font-['Lexend'] selection:bg-[#0A3A77] selection:text-white">
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
