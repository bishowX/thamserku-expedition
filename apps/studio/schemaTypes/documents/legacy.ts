import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legacy',
  title: 'Legacy',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      description: 'The last sentence will render in italic blue.',
    }),
    defineField({ name: 'body1', title: 'Body (first paragraph)', type: 'text', rows: 4 }),
    defineField({ name: 'body2', title: 'Body (second paragraph)', type: 'text', rows: 4 }),
    defineField({ name: 'quote', title: 'Quote Attribution', type: 'string', description: 'e.g. — The Chairman' }),
    defineField({ name: 'attribution', title: 'Attribution Line', type: 'string' }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'array',
      of: [{ type: 'timelineEra' }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Legacy' }),
  },
})
