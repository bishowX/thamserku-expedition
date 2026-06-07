import { defineType, defineField } from 'sanity'

/**
 * A named pick-one line within Accommodation or Guiding (e.g. "Kathmandu",
 * "During Trekking", "Lead Climbing Guide"). The climber picks exactly one
 * option; the option marked "Included" is the pre-selected standard.
 */
export default defineType({
  name: 'configItem',
  title: 'Item',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. "Kathmandu", "During Trekking", "Trekking", "Lead Climbing Guide".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{ type: 'configOption' }],
      description: 'The choices. Mark exactly one as "Included" — that\'s the default standard for this edition.',
      validation: (Rule) =>
        Rule.min(1).custom((opts?: { included?: boolean }[]) => {
          const inc = (opts ?? []).filter((o) => o?.included).length
          if (inc > 1) return 'Only one option can be the included standard.'
          return true
        }),
    }),
  ],
  preview: {
    select: { name: 'name', options: 'options' },
    prepare: ({ name, options }: { name?: string; options?: { label?: string; included?: boolean }[] }) => {
      const def = (options ?? []).find((o) => o?.included)?.label
      const count = (options ?? []).length
      return { title: name, subtitle: [def ? `default: ${def}` : null, `${count} option${count === 1 ? '' : 's'}`].filter(Boolean).join('  ·  ') }
    },
  },
})
