import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'fieldNotesPage',
  title: 'Field Notes Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'categories', title: '02 — Categories' },
    { name: 'featured', title: '03 — Featured' },
    { name: 'archive', title: '04 — Archive' },
    { name: 'newsletter', title: '05 — Newsletter' },
    { name: 'closing', title: '06 — Closing' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubline', title: 'Subline', type: 'text', rows: 2, group: 'hero' }),

    // 02 — Categories
    defineField({ name: 'categoriesEyebrow', title: 'Eyebrow', type: 'string', group: 'categories' }),
    defineField({ name: 'categoriesHeadline', title: 'Headline', type: 'string', group: 'categories' }),
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

    // 03 — Featured
    defineField({ name: 'featuredEyebrow', title: 'Eyebrow', type: 'string', group: 'featured' }),
    defineField({ name: 'featuredHeadline', title: 'Headline', type: 'string', group: 'featured' }),
    defineField({ name: 'featuredSubline', title: 'Subline', type: 'string', group: 'featured' }),

    // 04 — Archive
    defineField({ name: 'archiveEyebrow', title: 'Eyebrow', type: 'string', group: 'archive' }),
    defineField({ name: 'archiveHeadline', title: 'Headline', type: 'string', group: 'archive' }),
    defineField({ name: 'archiveSubline', title: 'Subline', type: 'string', group: 'archive' }),

    // 05 — Newsletter
    defineField({ name: 'newsletterEyebrow', title: 'Eyebrow', type: 'string', group: 'newsletter' }),
    defineField({ name: 'newsletterHeadline', title: 'Headline', type: 'string', group: 'newsletter' }),
    defineField({ name: 'newsletterHeadlineAccent', title: 'Headline Accent', type: 'string', group: 'newsletter', description: 'Second line in muted color' }),
    defineField({ name: 'newsletterBody', title: 'Body', type: 'text', rows: 3, group: 'newsletter' }),
    defineField({ name: 'newsletterBodySecondary', title: 'Body Secondary', type: 'string', group: 'newsletter' }),
    defineField({ name: 'newsletterInputPlaceholder', title: 'Input Placeholder', type: 'string', group: 'newsletter' }),
    defineField({ name: 'newsletterPrivacyLine', title: 'Privacy Line', type: 'string', group: 'newsletter' }),
    defineField({ name: 'newsletterBottomNote', title: 'Bottom Note', type: 'string', group: 'newsletter' }),

    // 06 — Closing
    defineField({ name: 'closingEyebrow', title: 'Eyebrow', type: 'string', group: 'closing' }),
    defineField({ name: 'closingHeadline', title: 'Closing Headline', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 3, group: 'closing' }),
  ],
  preview: { prepare: () => ({ title: 'Field Notes Page' }) },
})
