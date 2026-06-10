import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faqPage',
  title: 'FAQ Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'faqs', title: '02 — FAQs' },
    { name: 'quickFaqs', title: '03 — Quick FAQs' },
    { name: 'relatedPages', title: '04 — Related Pages' },
    { name: 'newsletter', title: '05 — Newsletter Banner' },
    { name: 'closing', title: '06 — Closing' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubline', title: 'Subline', type: 'text', rows: 2, group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Background Image', type: 'image', group: 'hero', options: { hotspot: true } }),

    // 02 — FAQs
    defineField({ name: 'categoryNavEyebrow', title: 'Category Nav Eyebrow', type: 'string', group: 'faqs', description: 'e.g. "JUMP TO A CATEGORY — § I"' }),
    defineField({ name: 'categoryNavHeadline', title: 'Category Nav Headline', type: 'string', group: 'faqs', description: 'e.g. "Seven categories of question."' }),
    defineField({ name: 'listEyebrow', title: 'FAQ List Eyebrow', type: 'string', group: 'faqs', description: 'e.g. "FIFTEEN QUIET ANSWERS"' }),
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

    // 03 — Quick FAQs
    defineField({ name: 'quickFaqEyebrow', title: 'Eyebrow', type: 'string', group: 'quickFaqs', description: 'e.g. "FREQUENTLY ASKED — THAMSERKU"' }),
    defineField({ name: 'quickFaqHeadline', title: 'Headline', type: 'string', group: 'quickFaqs' }),
    defineField({ name: 'quickFaqSubheading', title: 'Subheading', type: 'string', group: 'quickFaqs' }),
    defineField({
      name: 'quickFaqs',
      title: 'Quick FAQ Items',
      type: 'array',
      group: 'quickFaqs',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4 }),
        ],
        preview: { select: { title: 'question' } },
      }],
    }),

    // 04 — Related Pages
    defineField({ name: 'relatedPagesEyebrow', title: 'Eyebrow', type: 'string', group: 'relatedPages', description: 'e.g. "READ THE PAGES — § II"' }),
    defineField({ name: 'relatedPagesHeadline', title: 'Headline', type: 'string', group: 'relatedPages', description: 'e.g. "Each question links to a page."' }),
    defineField({
      name: 'relatedPages',
      title: 'Related Pages',
      type: 'array',
      group: 'relatedPages',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'e.g. "RELATED PAGE — ABOUT"' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'string' }),
          defineField({ name: 'linkText', title: 'Link Text', type: 'string' }),
          defineField({ name: 'linkTo', title: 'Link To', type: 'string', description: 'e.g. "/legacy"' }),
        ],
        preview: { select: { title: 'title', subtitle: 'eyebrow' } },
      }],
    }),

    // 04 — Newsletter Banner
    defineField({ name: 'newsletterEyebrow', title: 'Eyebrow', type: 'string', group: 'newsletter', description: 'e.g. "FIELD NOTES — NEWSLETTER"' }),
    defineField({ name: 'newsletterHeadline', title: 'Headline', type: 'string', group: 'newsletter' }),
    defineField({ name: 'newsletterBody', title: 'Body', type: 'text', rows: 3, group: 'newsletter' }),
    defineField({ name: 'newsletterPrivacyLine', title: 'Privacy Line', type: 'string', group: 'newsletter' }),
    defineField({ name: 'newsletterBottomNote', title: 'Bottom Note', type: 'string', group: 'newsletter', description: 'Text before the Field Notes link' }),

    // 05 — Closing
    defineField({ name: 'closingHeadline', title: 'Closing Headline', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 3, group: 'closing' }),
    defineField({ name: 'closingDisclaimerLine', title: 'Disclaimer Line', type: 'string', group: 'closing', description: 'e.g. "ALL ENQUIRIES ARE HANDLED DISCREETLY BY SENIOR EXPEDITION STAFF."' }),
    defineField({ name: 'closingImage', title: 'Background Image', type: 'image', group: 'closing', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'FAQ Page' }) },
})
