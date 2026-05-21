import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'expedition',
  title: 'Expedition',
  type: 'document',
  fields: [
    defineField({ name: 'number', title: 'Number', type: 'string', description: 'e.g. 01, 02' }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      description: 'e.g. EVR, MAN, DHA',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'altitude', title: 'Altitude', type: 'string', description: 'e.g. 8,848.86 m' }),
    defineField({ name: 'region', title: 'Region', type: 'string' }),
    defineField({ name: 'season', title: 'Season', type: 'string', description: 'e.g. Spring · Autumn' }),
    defineField({ name: 'style', title: 'Style', type: 'string', description: 'e.g. Disciplined passage' }),
    defineField({ name: 'positioning', title: 'Positioning Tagline', type: 'text', rows: 3 }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image shown on the expedition atlas card.',
    }),
    defineField({
      name: 'editions',
      title: 'Editions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'edition' }] }],
    }),
  ],
  orderings: [
    { title: 'Number', name: 'numberAsc', by: [{ field: 'number', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'code' },
    prepare: ({ title, subtitle }: { title: string; subtitle: string }) => ({
      title,
      subtitle: `EXP / ${subtitle}`,
    }),
  },
})
