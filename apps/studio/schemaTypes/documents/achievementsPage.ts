import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'achievementsPage',
  title: 'Achievements Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'stats', title: '02 — Stats Bar' },
    { name: 'decades', title: '03 — Decades' },
    { name: 'seo', title: 'SEO' },
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
    defineField({ name: 'decadesHeading', title: 'Section Heading', type: 'string', group: 'decades', description: 'e.g. Four decades on the mountains.' }),
    defineField({ name: 'decadesSubtitle', title: 'Section Subtitle', type: 'text', rows: 3, group: 'decades' }),
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
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
        ],
        preview: { select: { title: 'title', subtitle: 'years' } },
      }],
    }),

    // Search & social overrides. Blank fields fall back to this page's hero
    // content, then to Site Settings → SEO.
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Achievements Page' }) },
})
