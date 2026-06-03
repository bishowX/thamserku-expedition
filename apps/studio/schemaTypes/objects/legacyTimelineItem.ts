import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legacyTimelineItem',
  title: 'Legacy Timeline Item',
  type: 'object',
  fields: [
    defineField({ name: 'year', title: 'Year', type: 'string', description: 'e.g. 1988, 1993, 1996' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'year' },
    prepare: ({ title, subtitle }: { title: string; subtitle: string }) => ({ title, subtitle }),
  },
})
