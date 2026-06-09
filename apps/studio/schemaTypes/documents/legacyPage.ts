import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legacyPage',
  title: 'Legacy Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'timeline', title: '02 — Timeline' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Background Image', type: 'image', options: { hotspot: true }, group: 'hero' }),

    // 02 — Timeline
    defineField({ name: 'timelineEyebrow', title: 'Eyebrow', type: 'string', group: 'timeline', description: 'e.g. 01 — TIMELINE' }),
    defineField({ name: 'timelineHeading', title: 'Heading', type: 'string', group: 'timeline' }),
    defineField({ name: 'timelineFooterNote', title: 'Footer Note', type: 'text', rows: 2, group: 'timeline' }),
    defineField({
      name: 'timelineChapters',
      title: 'Chapters',
      type: 'array',
      group: 'timeline',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'roman', title: 'Roman Numeral', type: 'string', description: 'e.g. I, II, III' }),
          defineField({ name: 'years', title: 'Year Range', type: 'string', description: 'e.g. 1988, 1987 — 1995' }),
          defineField({ name: 'title', title: 'Chapter Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
        ],
        preview: { select: { title: 'title', subtitle: 'years', media: 'image' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Legacy Page' }) },
})
