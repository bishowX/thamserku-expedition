import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'editionsPage',
  title: 'Editions Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'manifesto', title: 'Manifesto' },
    { name: 'comparison', title: 'Comparison' },
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

    // Comparison
    defineField({ name: 'comparisonEyebrow', title: 'Eyebrow', type: 'string', group: 'comparison', description: 'e.g. 04 — AT A GLANCE' }),
    defineField({ name: 'comparisonHeadline', title: 'Headline', type: 'string', group: 'comparison' }),
    defineField({ name: 'comparisonNote', title: 'Note', type: 'text', rows: 2, group: 'comparison', description: 'Italic note shown below the comparison table' }),

    // Closing
    defineField({ name: 'closingHeading', title: 'Heading', type: 'text', rows: 2, group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Body', type: 'text', rows: 2, group: 'closing' }),
  ],
  preview: {
    prepare: () => ({ title: 'Editions Page' }),
  },
})
