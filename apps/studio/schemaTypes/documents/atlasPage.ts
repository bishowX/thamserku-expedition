import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'atlasPage',
  title: 'Atlas Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
  ],
  fields: [
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Background Image', type: 'image', group: 'hero', options: { hotspot: true } }),
  ],
  preview: {
    prepare: () => ({ title: 'Atlas Page' }),
  },
})
