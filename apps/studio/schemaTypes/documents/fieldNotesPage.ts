import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'fieldNotesPage',
  title: 'Field Notes Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'categories', title: '02 — Categories' },
    { name: 'closing', title: '03 — Closing' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubline', title: 'Subline', type: 'text', rows: 2, group: 'hero' }),

    // 02 — Categories
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'categories',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'string' }),
          defineField({ name: 'articleCount', title: 'Article Count', type: 'string', description: 'e.g. "12 PIECES"' }),
        ],
        preview: { select: { title: 'name', subtitle: 'articleCount' } },
      }],
    }),

    // 03 — Closing
    defineField({ name: 'closingHeadline', title: 'Closing Headline', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 3, group: 'closing' }),
  ],
  preview: { prepare: () => ({ title: 'Field Notes Page' }) },
})
