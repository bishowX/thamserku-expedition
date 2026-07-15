import { defineType, defineField } from 'sanity'

/**
 * The per-peak Design-Your-Expedition configuration, organised EDITION-MAJOR:
 * each edition (Bespoke / Crafted / Definitive) is laid out with the five fixed
 * categories and its own options. This matches how the form behaves — the
 * options a climber can pick depend on the edition they selected.
 *
 * Scope: B / C / D only. Alpine (A) & Explorer (E) are "Project Dependent"
 * (contact-only), with no per-edition configuration.
 *
 * Drives BOTH surfaces (configurator + comparison tables) via a normalizer on
 * the web side (lib/configMatrix.ts → normalizeDesignConfig).
 */
export default defineType({
  name: 'designConfig',
  title: 'Design Configuration',
  type: 'object',
  fields: [
    defineField({
      name: 'defaultSeason',
      title: 'Default Season',
      type: 'string',
      description:
        'Preselected in the configurator when a climber picks this peak. They can still change it. Leave blank for no preselection. Separate from the free-text "Season" on the Identity tab, which is the Atlas card label.',
      options: {
        list: [
          { title: 'Spring (Mar–May)', value: 'spring' },
          { title: 'Autumn (Sep–Nov)', value: 'autumn' },
          { title: 'Winter (Dec–Feb)', value: 'winter' },
          { title: 'Summer (Jun–Aug)', value: 'summer' },
        ],
      },
    }),
    defineField({
      name: 'basePrices',
      title: 'Base Prices (USD)',
      type: 'object',
      description: 'Starting price per edition. Base + selected add-on/upgrade deltas = the email estimate. Leave blank for "Price on request".',
      options: { columns: 3 },
      fields: [
        defineField({ name: 'B', title: 'Bespoke (B)', type: 'number' }),
        defineField({ name: 'C', title: 'Crafted (C)', type: 'number' }),
        defineField({ name: 'D', title: 'Definitive (D)', type: 'number' }),
      ],
    }),
    defineField({ name: 'b', title: 'Bespoke (B)', type: 'editionConfig', options: { collapsible: true, collapsed: true } }),
    defineField({ name: 'c', title: 'Crafted (C)', type: 'editionConfig', options: { collapsible: true, collapsed: true } }),
    defineField({ name: 'd', title: 'Definitive (D)', type: 'editionConfig', options: { collapsible: true, collapsed: true } }),
  ],
})
