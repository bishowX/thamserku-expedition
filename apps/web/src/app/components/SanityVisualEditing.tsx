import { VisualEditing } from '@sanity/visual-editing/react-router'
import { useLiveMode } from '@sanity/react-loader'
import { sanityClient } from '../../lib/sanity'
import { DisablePreviewMode } from './DisablePreviewMode'

// Mounted only in preview mode. VisualEditing draws the click-to-edit overlays and
// talks to Presentation; useLiveMode wires react-loader's useQuery hooks to the
// live document stream so edits in the Studio reflect without a reload.
export function SanityVisualEditing() {
  useLiveMode({ client: sanityClient })

  return (
    <>
      <VisualEditing />
      <DisablePreviewMode />
    </>
  )
}
