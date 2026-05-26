import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'privateExpeditionsPage',
  title: 'Private Expeditions Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'philosophy', title: '02 — Philosophy' },
    { name: 'audiences', title: '03 — Audiences' },
    { name: 'availableEditions', title: '04 — Available Editions' },
    { name: 'consultationSteps', title: '05 — Consultation Steps' },
    { name: 'faq', title: '06 — FAQ' },
    { name: 'closing', title: '07 — Closing' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubline', title: 'Subline', type: 'text', rows: 2, group: 'hero' }),

    // 02 — Philosophy
    defineField({ name: 'philosophyEyebrow', title: 'Eyebrow', type: 'string', group: 'philosophy', description: 'e.g. "THE PHILOSOPHY — § I"' }),
    defineField({ name: 'philosophyHeadline', title: 'Headline', type: 'string', group: 'philosophy' }),
    defineField({ name: 'philosophyTagline', title: 'Tagline', type: 'string', group: 'philosophy' }),
    defineField({ name: 'philosophyBody', title: 'Body', type: 'text', rows: 6, group: 'philosophy', description: 'Separate paragraphs with a blank line.' }),
    defineField({ name: 'philosophyFootnote', title: 'Footnote', type: 'string', group: 'philosophy' }),

    // 03 — Audiences
    defineField({ name: 'audiencesEyebrow', title: 'Eyebrow', type: 'string', group: 'audiences' }),
    defineField({ name: 'audiencesHeadline', title: 'Headline', type: 'string', group: 'audiences' }),
    defineField({ name: 'audiencesTagline', title: 'Tagline', type: 'string', group: 'audiences' }),
    defineField({
      name: 'audiences',
      title: 'Audience Cards',
      type: 'array',
      group: 'audiences',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title (Eyebrow)', type: 'string' }),
          defineField({ name: 'subtitle', title: 'Subtitle (Heading)', type: 'string' }),
          defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
        ],
        preview: { select: { title: 'title', subtitle: 'subtitle' } },
      }],
    }),

    // 04 — Available Editions
    defineField({ name: 'availableEditionsEyebrow', title: 'Eyebrow', type: 'string', group: 'availableEditions' }),
    defineField({ name: 'availableEditionsHeadline', title: 'Headline', type: 'string', group: 'availableEditions' }),
    defineField({ name: 'availableEditionsTagline', title: 'Tagline', type: 'string', group: 'availableEditions' }),
    defineField({
      name: 'availableEditions',
      title: 'Editions',
      type: 'array',
      group: 'availableEditions',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'letter', title: 'Letter', type: 'string', description: 'Single capital letter: C, D, or E' }),
          defineField({ name: 'pullQuote', title: 'Pull Quote', type: 'string' }),
          defineField({ name: 'headline', title: 'Headline', type: 'string' }),
          defineField({ name: 'body', title: 'Body', type: 'text', rows: 5, description: 'Separate paragraphs with a blank line.' }),
          defineField({ name: 'whoItIsFor', title: 'Who It Is For', type: 'text', rows: 2 }),
          defineField({ name: 'bestReadOn', title: 'Best Read On', type: 'string', description: 'e.g. EVEREST · MANASLU · DHAULAGIRI' }),
          defineField({
            name: 'specs',
            title: 'Specs Grid (optional)',
            type: 'array',
            description: 'Optional 4-cell grid — used for the Definitive edition.',
            of: [{
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'value', title: 'Value', type: 'string' }),
              ],
              preview: { select: { title: 'label', subtitle: 'value' } },
            }],
          }),
        ],
        preview: { select: { title: 'headline', subtitle: 'letter' } },
      }],
    }),

    // 05 — Consultation Steps
    defineField({ name: 'consultationEyebrow', title: 'Eyebrow', type: 'string', group: 'consultationSteps' }),
    defineField({ name: 'consultationHeadline', title: 'Headline', type: 'string', group: 'consultationSteps' }),
    defineField({ name: 'consultationTagline', title: 'Tagline', type: 'string', group: 'consultationSteps' }),
    defineField({ name: 'consultationNote', title: 'Bottom Note', type: 'string', group: 'consultationSteps', description: 'Small italic note below the steps.' }),
    defineField({
      name: 'consultationSteps',
      title: 'Steps',
      type: 'array',
      group: 'consultationSteps',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'step', title: 'Step Label', type: 'string', description: 'e.g. "STEP I"' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
        ],
        preview: { select: { title: 'title', subtitle: 'step' } },
      }],
    }),

    // 06 — FAQ
    defineField({ name: 'faqEyebrow', title: 'Eyebrow', type: 'string', group: 'faq', description: 'e.g. FREQUENTLY ASKED — PRIVATE EXPEDITIONS' }),
    defineField({ name: 'faqHeadline', title: 'Headline', type: 'string', group: 'faq' }),
    defineField({ name: 'faqSubheading', title: 'Subheading', type: 'string', group: 'faq' }),
    defineField({ name: 'faqCtaLabel', title: 'CTA Label', type: 'string', group: 'faq' }),
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      group: 'faq',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4 }),
        ],
        preview: { select: { title: 'question' } },
      }],
    }),

    // 07 — Closing
    defineField({ name: 'closingEyebrow', title: 'Closing Eyebrow', type: 'string', group: 'closing' }),
    defineField({ name: 'closingHeadline', title: 'Closing Headline', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 3, group: 'closing' }),
    defineField({ name: 'closingNote', title: 'Closing Note', type: 'string', group: 'closing', description: 'Small text at the very bottom.' }),
  ],
  preview: { prepare: () => ({ title: 'Private Expeditions Page' }) },
})
