import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'yetiInfrastructurePage',
  title: 'Yeti Infrastructure Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'definition', title: 'Definition §I' },
    { name: 'closing', title: 'Closing' },
  ],
  fields: [
    // Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero' }),

    // Definition §I
    defineField({ name: 'definitionHeading', title: 'Heading', type: 'string', group: 'definition' }),
    defineField({ name: 'definitionTagline', title: 'Italic Tagline', type: 'string', group: 'definition' }),
    defineField({ name: 'definitionBody', title: 'Body', type: 'text', rows: 6, group: 'definition' }),

    // Closing
    defineField({ name: 'closingHeading', title: 'Closing Heading', type: 'text', rows: 2, group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 3, group: 'closing' }),
    defineField({ name: 'closingImage', title: 'Background Image', type: 'image', group: 'closing', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'Yeti Infrastructure Page' }) },
})
