import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'consultationContactOption',
  title: 'Contact Option',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. EXPEDITION DESK' }),
    defineField({ name: 'title', title: 'Title', type: 'string', description: 'e.g. Write directly to our desk.' }),
    defineField({ name: 'value', title: 'Contact Value', type: 'string', description: 'Email address, phone number, or link' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'label' },
  },
})
