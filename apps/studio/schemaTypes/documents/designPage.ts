import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'designPage',
  title: 'Design Your Expedition Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
  ],
  fields: [
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroBgImage', title: 'Background Image', type: 'image', group: 'hero', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'Design Your Expedition Page' }) },
})
