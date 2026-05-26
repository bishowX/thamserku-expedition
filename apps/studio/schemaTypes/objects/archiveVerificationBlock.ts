import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'archiveVerificationBlock',
  title: 'Verification Block',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
  ],
})
