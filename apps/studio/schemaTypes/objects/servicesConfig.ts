import { defineType, defineField } from 'sanity'

/**
 * The per-peak Services & Add-ons content — edition-major, all five editions.
 * Purely for display: each row's `category` (service/addon) picks which tab
 * of the dossier page's comparison table it renders in. This is the SOLE
 * source for both tabs — designConfig never feeds the comparison table, only
 * the configurator (which stays B/C/D-only). Kept as a separate field/
 * pipeline from designConfig on purpose — see lib/servicesConfig.ts.
 */
export default defineType({
  name: 'servicesConfig',
  title: 'Services & Add-ons',
  type: 'object',
  fields: [
    defineField({
      name: 'a',
      title: 'Alpine (A)',
      type: 'array',
      of: [{ type: 'servicesConfigRow' }],
      options: { collapsible: true, collapsed: true },
    }),
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
    defineField({
      name: 'e',
      title: 'Explorer (E)',
      type: 'array',
      of: [{ type: 'servicesConfigRow' }],
      options: { collapsible: true, collapsed: true },
    }),
  ],
})
