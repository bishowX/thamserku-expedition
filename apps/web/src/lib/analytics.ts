// gtag is defined by the inline snippet in root.tsx; calls queue in dataLayer
// until gtag.js loads. Page views (including client-side route changes) are
// sent automatically by GA4 enhanced measurement — only journey milestones
// are tracked by hand.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: string, params?: Record<string, unknown>) {
  window.gtag?.('event', event, params)
}
