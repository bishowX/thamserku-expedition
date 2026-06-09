import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'editionsPage',
  title: 'Editions Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'manifesto', title: 'Manifesto' },
    { name: 'comparison', title: 'Comparison' },
    { name: 'availability', title: 'Availability' },
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

    // Availability
    defineField({ name: 'availabilityEyebrow', title: 'Eyebrow', type: 'string', group: 'availability', description: 'e.g. 05 — AVAILABILITY ATLAS' }),
    defineField({ name: 'availabilityHeadline', title: 'Headline', type: 'string', group: 'availability' }),
    defineField({ name: 'availabilityNote', title: 'Note', type: 'text', rows: 2, group: 'availability', description: 'Italic note shown below the availability table' }),

    // Closing
    defineField({ name: 'closingEyebrow', title: 'Eyebrow', type: 'string', group: 'closing', description: 'e.g. 06 — BEGIN PRIVATELY' }),
    defineField({ name: 'closingHeading', title: 'Heading', type: 'text', rows: 2, group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Body', type: 'text', rows: 2, group: 'closing' }),
    defineField({ name: 'closingFootnote', title: 'Footnote', type: 'string', group: 'closing', description: 'e.g. RESPONSE WITHIN 48 HOURS · HANDLED BY SENIOR EXPEDITION STAFF' }),
    defineField({ name: 'closingImage', title: 'Background Image', type: 'image', group: 'closing', options: { hotspot: true } }),
  ],
  preview: {
    prepare: () => ({ title: 'Editions Page' }),
  },
})
