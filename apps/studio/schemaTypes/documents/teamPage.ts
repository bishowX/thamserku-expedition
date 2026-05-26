import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamPage',
  title: 'Team Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'manifesto', title: '02 — Manifesto' },
    { name: 'leadership', title: '03 — Leadership' },
    { name: 'closing', title: '04 — Closing' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroImage', title: 'Background Image', type: 'image', options: { hotspot: true }, group: 'hero' }),
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubline', title: 'Subline', type: 'text', rows: 2, group: 'hero' }),

    // 02 — Manifesto
    defineField({ name: 'manifestoPullQuote', title: 'Pull Quote', type: 'text', rows: 3, group: 'manifesto' }),
    defineField({ name: 'manifestoBody1', title: 'Body Paragraph 1', type: 'text', rows: 5, group: 'manifesto' }),
    defineField({ name: 'manifestoBody2', title: 'Body Paragraph 2', type: 'text', rows: 5, group: 'manifesto' }),

    // 03 — Leadership
    defineField({
      name: 'leadership',
      title: 'Leadership Members',
      type: 'array',
      group: 'leadership',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g. "Chairman"' }),
          defineField({ name: 'portrait', title: 'Portrait', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'basedIn', title: 'Based In', type: 'string', description: 'e.g. "Kathmandu"' }),
          defineField({ name: 'yearsWithHouse', title: 'Years With House', type: 'string', description: 'e.g. "35+"' }),
          defineField({ name: 'expertise', title: 'Expertise', type: 'string' }),
          defineField({ name: 'languages', title: 'Languages', type: 'string' }),
        ],
        preview: { select: { title: 'name', subtitle: 'role' } },
      }],
    }),

    // 04 — Closing
    defineField({ name: 'closingHeadline', title: 'Closing Headline', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 3, group: 'closing' }),
  ],
  preview: { prepare: () => ({ title: 'Team Page' }) },
})
