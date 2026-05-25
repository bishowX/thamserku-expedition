import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'preparationColumn',
  title: 'Preparation Column',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Column Title', type: 'string', description: 'e.g. Body, Time, Mind' }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
