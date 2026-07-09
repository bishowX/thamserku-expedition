import { defineType, defineField } from 'sanity'

/**
 * A single named service/add-on line for one edition (e.g. "Expedition
 * Consultation", "Standby Rescue", "Summit Bonus & Tips"). Display-only —
 * rendered in the dossier page's comparison table (Services or Add-on tab,
 * per `category`), never in the configurator. No pricing: these don't affect
 * the booking estimate.
 */
export default defineType({
  name: 'servicesConfigRow',
  title: 'Service / Add-on Line',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. "Expedition Consultation", "Standby Rescue", "Summit Bonus & Tips".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Service', value: 'service' },
          { title: 'Add-on', value: 'addon' },
        ],
        layout: 'radio',
      },
      initialValue: 'service',
      validation: (Rule) => Rule.required(),
      description: 'Which comparison-table tab this row appears in.',
    }),
    defineField({
      name: 'text',
      title: 'Description',
      type: 'string',
      description: 'What this edition provides, e.g. "24/7 satellite comms" or "Included".',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { name: 'name', text: 'text', category: 'category' },
    prepare: ({ name, text, category }: { name?: string; text?: string; category?: string }) => ({
      title: name,
      subtitle: [category === 'addon' ? 'Add-on' : 'Service', text].filter(Boolean).join('  ·  '),
    }),
  },
})
