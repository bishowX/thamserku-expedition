import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faqPage',
  title: 'FAQ Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'faqs', title: '02 — FAQs' },
    { name: 'closing', title: '03 — Closing' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubline', title: 'Subline', type: 'text', rows: 2, group: 'hero' }),

    // 02 — FAQs
    defineField({
      name: 'categories',
      title: 'FAQ Categories',
      type: 'array',
      group: 'faqs',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "ABOUT"' }),
          defineField({ name: 'title', title: 'Title', type: 'string', description: 'e.g. "About Thamserku."' }),
          defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
          defineField({
            name: 'items',
            title: 'FAQ Items',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({ name: 'question', title: 'Question', type: 'string' }),
                defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4 }),
                defineField({ name: 'linkText', title: 'Link Text', type: 'string' }),
                defineField({ name: 'linkTo', title: 'Link To', type: 'string', description: 'e.g. "/legacy"' }),
              ],
              preview: { select: { title: 'question' } },
            }],
          }),
        ],
        preview: { select: { title: 'title', subtitle: 'label' } },
      }],
    }),

    // 03 — Closing
    defineField({ name: 'closingHeadline', title: 'Closing Headline', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 3, group: 'closing' }),
  ],
  preview: { prepare: () => ({ title: 'FAQ Page' }) },
})
