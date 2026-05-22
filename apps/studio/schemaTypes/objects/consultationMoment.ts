import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'consultationMoment',
  title: 'Consultation Moment',
  type: 'object',
  fields: [
    defineField({ name: 'marker', title: 'Marker', type: 'string', description: 'e.g. MOMENT I — UNDERSTANDING' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'marker' },
  },
})
