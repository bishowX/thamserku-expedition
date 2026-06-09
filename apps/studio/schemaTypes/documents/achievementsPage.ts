import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'achievementsPage',
  title: 'Achievements Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'stats', title: '02 — Stats Bar' },
    { name: 'decades', title: '03 — Decades' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'text', rows: 2, group: 'hero', description: 'e.g. A history written in altitude.' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Background Image', type: 'image', options: { hotspot: true }, group: 'hero' }),

    // 02 — Stats Bar
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'stats',
      of: [{ type: 'statItem' }],
      description: 'e.g. 37+ Years, 800+ Expeditions, 66+ Peaks, 42+ Nations',
    }),

    // 03 — Decades
    defineField({
      name: 'decades',
      title: 'Decades',
      type: 'array',
      group: 'decades',
      of: [{
        type: 'object',
        name: 'achievementDecade',
        fields: [
          defineField({ name: 'years', title: 'Year Range', type: 'string', description: 'e.g. 1987 – 1992' }),
          defineField({ name: 'title', title: 'Title', type: 'string', description: 'e.g. Founding Years' }),
          defineField({ name: 'body', title: 'Body', type: 'text', rows: 8, description: 'Separate paragraphs with a blank line.' }),
          defineField({ name: 'meta', title: 'Meta Line', type: 'string', description: 'e.g. 17 expeditions · Dhaulagiri, Pumori, Everest' }),
        ],
        preview: { select: { title: 'title', subtitle: 'years' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Achievements Page' }) },
})
