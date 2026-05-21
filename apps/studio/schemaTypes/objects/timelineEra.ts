import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'timelineEra',
  title: 'Timeline Era',
  type: 'object',
  fields: [
    defineField({ name: 'decade', title: 'Decade / Label', type: 'string', description: 'e.g. 1980s, Today' }),
    defineField({ name: 'era', title: 'Era Name', type: 'string' }),
  ],
  preview: {
    select: { title: 'era', subtitle: 'decade' },
  },
})
