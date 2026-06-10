import { useEffect, useState } from 'react'

// Renders a "leave preview" link only when the app is viewed standalone (not
// inside Presentation's iframe), where there's no Studio toggle to fall back on.
export function DisablePreviewMode() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(window === window.parent && !window.opener)
  }, [])

  if (!show) return null

  return (
    <a
      href="/api/preview-mode/disable"
      className="fixed bottom-4 left-4 z-[9999] rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-lg"
    >
      Disable Preview Mode
    </a>
  )
}
