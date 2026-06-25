import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legacyTimelineItem',
  title: 'Legacy Timeline Item',
  type: 'object',
  fields: [
    defineField({ name: 'year', title: 'Year', type: 'string', description: 'e.g. 1988, 1993, 1996' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'year', media: 'image' },
    prepare: ({ title, subtitle, media }: { title: string; subtitle: string; media?: unknown }) => ({ title, subtitle, media }),
  },
})
