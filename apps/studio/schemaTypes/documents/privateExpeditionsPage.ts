import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'privateExpeditionsPage',
  title: 'Private Expeditions Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'philosophy', title: '02 — Philosophy' },
    { name: 'audiences', title: '03 — Audiences' },
    { name: 'consultationSteps', title: '04 — Consultation Steps' },
    { name: 'closing', title: '05 — Closing' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubline', title: 'Subline', type: 'text', rows: 2, group: 'hero' }),

    // 02 — Philosophy
    defineField({ name: 'philosophyHeadline', title: 'Philosophy Headline', type: 'string', group: 'philosophy' }),
    defineField({ name: 'philosophyTagline', title: 'Philosophy Tagline', type: 'string', group: 'philosophy' }),
    defineField({ name: 'philosophyBody', title: 'Philosophy Body', type: 'text', rows: 6, group: 'philosophy' }),

    // 03 — Audiences
    defineField({
      name: 'audiences',
      title: 'Audiences',
      type: 'array',
      group: 'audiences',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
          defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
        ],
        preview: { select: { title: 'title', subtitle: 'subtitle' } },
      }],
    }),

    // 04 — Consultation Steps
    defineField({
      name: 'consultationSteps',
      title: 'Consultation Steps',
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

    // 05 — Closing
    defineField({ name: 'closingHeadline', title: 'Closing Headline', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 3, group: 'closing' }),
  ],
  preview: { prepare: () => ({ title: 'Private Expeditions Page' }) },
})
