import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'consultationStep',
  title: 'Consultation Step',
  type: 'object',
  fields: [
    defineField({ name: 'stepNumber', title: 'Step Number', type: 'string', description: 'e.g. 01' }),
    defineField({ name: 'marker', title: 'Marker', type: 'string', description: 'e.g. STEP 01 · REVIEW' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'marker' },
  },
})
