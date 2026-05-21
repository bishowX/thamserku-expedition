import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'edition',
  title: 'Edition',
  type: 'document',
  fields: [
    defineField({
      name: 'letter',
      title: 'Letter',
      type: 'string',
      description: 'A, B, C, D, or E',
      validation: (Rule) => Rule.required().max(1),
    }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'positioning', title: 'Positioning', type: 'text', rows: 3 }),
    defineField({ name: 'targetAudience', title: 'Target Audience', type: 'text', rows: 2 }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
  ],
  orderings: [
    { title: 'Letter', name: 'letterAsc', by: [{ field: 'letter', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'letter' },
    prepare: ({ title, subtitle }: { title: string; subtitle: string }) => ({
      title,
      subtitle: `Edition ${subtitle}`,
    }),
  },
})
