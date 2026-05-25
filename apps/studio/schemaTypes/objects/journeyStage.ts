import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'journeyStage',
  title: 'Journey Stage',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
