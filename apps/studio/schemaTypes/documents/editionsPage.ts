import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'editionsPage',
  title: 'Editions Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'text', rows: 3 }),
    defineField({
      name: 'manifestoHeading',
      title: 'Manifesto Heading',
      type: 'text',
      rows: 2,
      description: 'The last sentence will render in italic blue.',
    }),
    defineField({ name: 'manifestoBody', title: 'Manifesto Body', type: 'text', rows: 4 }),
    defineField({ name: 'closingHeading', title: 'Closing Heading', type: 'text', rows: 2 }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 2 }),
  ],
  preview: {
    prepare: () => ({ title: 'Editions Page' }),
  },
})
