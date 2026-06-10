import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'safetyPage',
  title: 'Safety Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'stats', title: '02 — Stats Bar' },
    { name: 'numbers', title: '03 — Numbers Meaning' },
    { name: 'architecture', title: '04 — Safety Architecture' },
    { name: 'foundation', title: '05 — Sherpa Foundation' },
    { name: 'communication', title: '06 — Communication' },
    { name: 'evacuation', title: '07 — Evacuation' },
    { name: 'closing', title: '08 — Closing' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubline', title: 'Subline', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroBgImage', title: 'Background Image', type: 'image', group: 'hero', options: { hotspot: true } }),

    // 02 — Stats Bar
    defineField({ name: 'statsLabel', title: 'Label', type: 'string', group: 'stats' }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'stats',
      of: [
        {
          type: 'object',
          name: 'safetyStat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),

    // 03 — Numbers Meaning
    defineField({ name: 'numbersHeading', title: 'Heading', type: 'string', group: 'numbers' }),
    defineField({
      name: 'numbersCards',
      title: 'Cards',
      type: 'array',
      group: 'numbers',
      of: [
        {
          type: 'object',
          name: 'safetyNumberCard',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 5 }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),

    // 04 — Safety Architecture
    defineField({ name: 'architectureEyebrow', title: 'Eyebrow', type: 'string', group: 'architecture' }),
    defineField({ name: 'architectureHeading', title: 'Heading', type: 'string', group: 'architecture' }),
    defineField({
      name: 'protocols',
      title: 'Protocol Rows',
      type: 'array',
      group: 'architecture',
      of: [
        {
          type: 'object',
          name: 'safetyProtocol',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'label', subtitle: 'description' } },
        },
      ],
    }),

    // 05 — Sherpa Foundation
    defineField({ name: 'foundationEyebrow', title: 'Eyebrow', type: 'string', group: 'foundation' }),
    defineField({ name: 'foundationHeading', title: 'Heading', type: 'string', group: 'foundation' }),
    defineField({ name: 'foundationBgImage', title: 'Background Image', type: 'image', group: 'foundation', options: { hotspot: true } }),
    defineField({
      name: 'foundationBody',
      title: 'Body Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      group: 'foundation',
    }),
    defineField({
      name: 'foundationSpecs',
      title: 'Spec Rows',
      type: 'array',
      group: 'foundation',
      of: [
        {
          type: 'object',
          name: 'safetySpec',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),

    // 06 — Communication
    defineField({ name: 'communicationEyebrow', title: 'Eyebrow', type: 'string', group: 'communication' }),
    defineField({ name: 'communicationHeading', title: 'Heading', type: 'string', group: 'communication' }),
    defineField({
      name: 'communicationItems',
      title: 'Items',
      type: 'array',
      group: 'communication',
      of: [
        {
          type: 'object',
          name: 'safetyCommItem',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        },
      ],
    }),

    // 07 — Evacuation
    defineField({ name: 'evacuationEyebrow', title: 'Eyebrow', type: 'string', group: 'evacuation' }),
    defineField({ name: 'evacuationHeading', title: 'Heading', type: 'string', group: 'evacuation' }),
    defineField({
      name: 'evacuationCards',
      title: 'Cards',
      type: 'array',
      group: 'evacuation',
      of: [
        {
          type: 'object',
          name: 'safetyEvacCard',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        },
      ],
    }),
    defineField({ name: 'evacuationQuote', title: 'Italic Quote', type: 'text', rows: 2, group: 'evacuation' }),
    defineField({
      name: 'evacuationBody',
      title: 'Closing Body Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      group: 'evacuation',
    }),

    // 08 — Closing
    defineField({ name: 'closingEyebrow', title: 'Eyebrow', type: 'string', group: 'closing' }),
    defineField({ name: 'closingHeadline', title: 'Headline', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Body', type: 'text', rows: 3, group: 'closing' }),
    defineField({ name: 'closingImage', title: 'Background Image', type: 'image', group: 'closing', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'Safety Page' }) },
})
