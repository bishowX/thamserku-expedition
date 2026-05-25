import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'inclusionCategory',
  title: 'Inclusion Category',
  type: 'object',
  fields: [
    defineField({ name: 'category', title: 'Category Label', type: 'string', description: 'e.g. EXPEDITION LEADERSHIP' }),
    defineField({ name: 'prefix', title: 'Item Prefix Letter', type: 'string', description: 'Single letter used for numbering, e.g. L → L.01, L.02' }),
    defineField({ name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: {
    select: { title: 'category', subtitle: 'prefix' },
  },
})
