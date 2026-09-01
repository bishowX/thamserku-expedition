import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'termsPage',
  title: 'Terms & Conditions Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'body', title: '02 — Body' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero' }),
    defineField({ name: 'heroTitle', title: 'Title', type: 'string', group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Background Image', type: 'image', options: { hotspot: true }, group: 'hero' }),
    defineField({
      name: 'heroIntro',
      title: 'Intro',
      type: 'blockContent',
      description: 'Lead paragraph(s) below the title.',
      group: 'hero',
    }),
    defineField({ name: 'heroNote', title: 'Sub-note', type: 'text', rows: 2, group: 'hero' }),

    // 02 — Body (everything: terms, contact, gear checklists, documentation)
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description:
        'The entire document. Use Heading 2 for numbered sections (type the number, e.g. "1. Booking…"), Heading 3 for sub-sections, Subheading for small labels, plus bullet/numbered lists, bold, and links.',
      group: 'body',
    }),

    // Search & social overrides. Blank fields fall back to this page's hero
    // content, then to Site Settings → SEO.
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Terms & Conditions Page' }) },
})
