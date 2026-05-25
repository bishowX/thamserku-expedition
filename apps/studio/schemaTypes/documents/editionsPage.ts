import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'editionsPage',
  title: 'Editions Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'manifesto', title: 'Manifesto' },
    { name: 'closing', title: 'Closing' },
  ],
  fields: [
    // Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Background Image', type: 'image', group: 'hero', options: { hotspot: true } }),

    // Manifesto
    defineField({ name: 'manifestoEyebrow', title: 'Eyebrow', type: 'string', group: 'manifesto', description: 'e.g. 02 — THE READING' }),
    defineField({
      name: 'manifestoHeading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      group: 'manifesto',
      description: 'The last sentence will render in italic blue.',
    }),
    defineField({ name: 'manifestoBody', title: 'Body', type: 'text', rows: 4, group: 'manifesto' }),

    // Closing
    defineField({ name: 'closingHeading', title: 'Heading', type: 'text', rows: 2, group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Body', type: 'text', rows: 2, group: 'closing' }),
  ],
  preview: {
    prepare: () => ({ title: 'Editions Page' }),
  },
})
