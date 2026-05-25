import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'audienceTile',
  title: 'Audience Tile',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'subline', title: 'Subline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'string' }),
  ],
})
