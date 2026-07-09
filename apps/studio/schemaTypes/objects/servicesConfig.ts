import { defineType, defineField } from 'sanity'

/**
 * The per-peak Services & Add-ons content — edition-major, B/C/D only (A/E
 * are "Project Dependent", same scope as designConfig). Purely for display:
 * each row's `category` (service/addon) picks which tab of the dossier page's
 * comparison table it renders in. This is the SOLE source for both tabs —
 * designConfig never feeds the comparison table, only the configurator. Kept
 * as a separate field/pipeline from designConfig on purpose — see
 * lib/servicesConfig.ts.
 */
export default defineType({
  name: 'servicesConfig',
  title: 'Services & Add-ons',
  type: 'object',
  fields: [
    defineField({
      name: 'b',
      title: 'Bespoke (B)',
      type: 'array',
      of: [{ type: 'servicesConfigRow' }],
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'c',
      title: 'Crafted (C)',
      type: 'array',
      of: [{ type: 'servicesConfigRow' }],
      options: { collapsible: true, collapsed: true },
    }),
    defineField({
      name: 'd',
      title: 'Definitive (D)',
      type: 'array',
      of: [{ type: 'servicesConfigRow' }],
      options: { collapsible: true, collapsed: true },
    }),
  ],
})
