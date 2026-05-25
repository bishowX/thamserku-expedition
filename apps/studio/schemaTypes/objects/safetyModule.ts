import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'safetyModule',
  title: 'Safety Module',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. SHERPA LEADERSHIP' }),
    defineField({ name: 'title', title: 'Title', type: 'string', description: 'e.g. Sherpa Leadership' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
