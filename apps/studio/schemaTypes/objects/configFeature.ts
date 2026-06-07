import { defineType, defineField } from 'sanity'

/**
 * One row of the per-peak configuration matrix — a single feature or add-on,
 * with a cell for each edition it applies to.
 *
 * Feature-major: author the row once (label / group / control), then fill the
 * per-edition cells. Omit an edition's cell to hide the feature there (this is
 * how "Definitive has the most" expresses itself — premium-only rows simply
 * don't carry A/B/C cells).
 */
export default defineType({
  name: 'configFeature',
  title: 'Feature',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Stable identifier stored in the booking snapshot, e.g. "sherpa-ratio". Lowercase-hyphenated.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Row label shown in the comparison table and configurator, e.g. "Personal Sherpa Ratio".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'core',
      description: 'Core features and add-on services render in separate tables.',
      options: {
        list: [
          { title: 'Core feature', value: 'core' },
          { title: 'Add-on service', value: 'addon' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'string',
      description: 'Section heading that clusters features in the configurator, e.g. "Guiding", "Accommodation", "Climbing Support", "Logistics". Free text — keep consistent across peaks.',
    }),
    defineField({
      name: 'control',
      title: 'Control',
      type: 'string',
      initialValue: 'display',
      description: 'How a choosable/add-on cell renders in the configurator.',
      options: {
        list: [
          { title: 'Display only (no input)', value: 'display' },
          { title: 'Select (single choice)', value: 'select' },
          { title: 'Multi-select (many choices)', value: 'multiselect' },
          { title: 'Range (numeric slider)', value: 'range' },
          { title: 'Toggle (on / off)', value: 'toggle' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'helpText',
      title: 'Help Text',
      type: 'string',
      description: 'Optional hint shown under the control in the configurator.',
    }),
    defineField({
      name: 'editions',
      title: 'Edition Cells',
      type: 'array',
      of: [{ type: 'configCell' }],
      description: 'One cell per edition this feature applies to (A–E). Omit an edition to hide the feature there.',
      validation: (Rule) =>
        Rule.custom((cells?: { edition?: string }[]) => {
          if (!cells) return true
          const seen = cells.map((c) => c?.edition).filter(Boolean)
          const dupes = seen.filter((e, i) => seen.indexOf(e) !== i)
          return dupes.length ? `Duplicate edition cell(s): ${[...new Set(dupes)].join(', ')}` : true
        }),
    }),
  ],
  preview: {
    select: { title: 'label', category: 'category', group: 'group', control: 'control' },
    prepare: ({ title, category, group, control }: { title?: string; category?: string; group?: string; control?: string }) => ({
      title,
      subtitle: [category === 'addon' ? 'Add-on' : group, control].filter(Boolean).join(' · '),
    }),
  },
})
