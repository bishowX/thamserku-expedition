import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sevenThousandMeterPage',
  title: '7,000m Pathway Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'planning', title: '02 — Planning Context' },
    { name: 'pillars', title: '03 — Pillars' },
    { name: 'routes', title: '04 — Routes' },
    { name: 'explorer', title: '05 — Explorer Routes' },
    { name: 'closing', title: '06 — Closing' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubline', title: 'Subline', type: 'text', rows: 2, group: 'hero' }),

    // 02 — Planning Context
    defineField({ name: 'planningContextHeadline', title: 'Planning Context Headline', type: 'string', group: 'planning' }),
    defineField({ name: 'planningContextBody', title: 'Planning Context Body', type: 'text', rows: 6, group: 'planning' }),

    // 03 — Pillars
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      group: 'pillars',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),

    // 04 — Routes
    defineField({
      name: 'routes',
      title: 'Routes',
      type: 'array',
      group: 'routes',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'peakName', title: 'Peak Name', type: 'string' }),
          defineField({ name: 'altitude', title: 'Altitude', type: 'string', description: 'e.g. "7,134m"' }),
          defineField({ name: 'region', title: 'Region', type: 'string' }),
          defineField({ name: 'character', title: 'Character', type: 'string', description: 'e.g. "Technical"' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
        ],
        preview: { select: { title: 'peakName', subtitle: 'altitude' } },
      }],
    }),

    // 05 — Explorer Routes
    defineField({ name: 'explorerRoutesHeadline', title: 'Explorer Routes Headline', type: 'string', group: 'explorer' }),
    defineField({ name: 'explorerRoutesBody', title: 'Explorer Routes Body', type: 'text', rows: 4, group: 'explorer' }),

    // 06 — Closing
    defineField({ name: 'closingHeadline', title: 'Closing Headline', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 3, group: 'closing' }),
  ],
  preview: { prepare: () => ({ title: '7,000m Pathway Page' }) },
})
