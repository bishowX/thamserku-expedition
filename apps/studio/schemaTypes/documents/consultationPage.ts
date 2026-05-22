import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'consultationPage',
  title: 'Consultation Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'invitation', title: 'Invitation' },
    { name: 'trust', title: 'Trust Statement' },
    { name: 'callCovers', title: 'What the Call Covers' },
    { name: 'form', title: 'Enquiry Form' },
    { name: 'process', title: 'Process' },
    { name: 'alternative', title: 'Alternative Contact' },
    { name: 'closing', title: 'Closing' },
  ],
  fields: [
    // Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 2, group: 'hero' }),
    defineField({
      name: 'heroImage',
      title: 'Background Image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),
    defineField({ name: 'heroMetaResponse', title: 'Meta · Response Time', type: 'string', group: 'hero', description: 'e.g. WITHIN 48 HOURS' }),
    defineField({ name: 'heroMetaHandledBy', title: 'Meta · Handled By', type: 'string', group: 'hero', description: 'e.g. SENIOR EXPEDITION STAFF' }),
    defineField({ name: 'heroMetaLanguages', title: 'Meta · Languages', type: 'string', group: 'hero', description: 'e.g. ENGLISH · NEPALI' }),
    defineField({ name: 'heroMetaConfidentiality', title: 'Meta · Confidentiality', type: 'string', group: 'hero', description: 'e.g. ASSURED' }),

    // Invitation
    defineField({
      name: 'invitationHeading',
      title: 'Heading',
      type: 'text',
      rows: 3,
      group: 'invitation',
      description: 'The last sentence renders in italic blue.',
    }),
    defineField({ name: 'invitationBody', title: 'Body', type: 'text', rows: 4, group: 'invitation' }),

    // Trust Statement
    defineField({ name: 'trustQuote', title: 'Quote', type: 'text', rows: 3, group: 'trust' }),
    defineField({ name: 'trustBody', title: 'Body', type: 'text', rows: 3, group: 'trust' }),

    // What the Call Covers
    defineField({
      name: 'callCoversHeading',
      title: 'Heading',
      type: 'string',
      group: 'callCovers',
      description: 'Rendered wrapped in quotes, e.g. "Forty-five minutes, read carefully."',
    }),
    defineField({ name: 'callCoversSubheading', title: 'Subheading', type: 'text', rows: 2, group: 'callCovers' }),
    defineField({
      name: 'callCoversMoments',
      title: 'Moments',
      type: 'array',
      group: 'callCovers',
      of: [{ type: 'consultationMoment' }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({ name: 'callCoversFootnote', title: 'Footnote', type: 'text', rows: 2, group: 'callCovers' }),

    // Enquiry Form — copy and option lists
    defineField({ name: 'formSectionLabel', title: 'Section Label', type: 'string', group: 'form', description: 'e.g. 03 — THE REQUEST' }),
    defineField({ name: 'formHeading', title: 'Heading', type: 'text', rows: 2, group: 'form' }),
    defineField({ name: 'formSubheading', title: 'Subheading', type: 'text', rows: 2, group: 'form', description: 'e.g. Six chapters. Fewer questions, asked carefully.' }),
    defineField({ name: 'formAlternativeLabel', title: 'Alternative Path Label', type: 'string', group: 'form', description: 'e.g. OR WRITE TO US — PATH II' }),
    defineField({ name: 'formAlternativeSubheading', title: 'Alternative Path Subheading', type: 'text', rows: 2, group: 'form' }),
    defineField({ name: 'formChapterATitle', title: 'Chapter A — Title', type: 'string', group: 'form', description: 'e.g. Who you are.' }),
    defineField({ name: 'formChapterBTitle', title: 'Chapter B — Title', type: 'string', group: 'form', description: 'e.g. The mountain you have in mind.' }),
    defineField({ name: 'formChapterCTitle', title: 'Chapter C — Title', type: 'string', group: 'form', description: 'e.g. The edition you have in mind.' }),
    defineField({ name: 'formChapterDTitle', title: 'Chapter D — Title', type: 'string', group: 'form', description: 'e.g. Your background in altitude.' }),
    defineField({ name: 'formChapterDSubheading', title: 'Chapter D — Subheading', type: 'text', rows: 2, group: 'form', description: 'Context note shown beneath the chapter title.' }),
    defineField({ name: 'formChapterETitle', title: 'Chapter E — Title', type: 'string', group: 'form', description: 'e.g. Travel preferences.' }),
    defineField({ name: 'formChapterFTitle', title: 'Chapter F — Title', type: 'string', group: 'form', description: 'e.g. Anything you would like us to know.' }),
    defineField({
      name: 'formEditionOptions',
      title: 'Edition Options',
      type: 'array',
      group: 'form',
      of: [{ type: 'string' }],
      description: 'Toggle button options for edition selection, e.g. "A — ALPINE". Mountains are pulled from expedition documents.',
    }),
    defineField({
      name: 'formSeasonOptions',
      title: 'Season Options',
      type: 'array',
      group: 'form',
      of: [{ type: 'string' }],
      description: 'e.g. SPRING, AUTUMN, OPEN',
    }),
    defineField({
      name: 'formGroupOptions',
      title: 'Group Preference Options',
      type: 'array',
      group: 'form',
      of: [{ type: 'string' }],
      description: 'e.g. PRIVATE, SMALL GROUP, OPEN',
    }),
    defineField({
      name: 'formPrivacyOptions',
      title: 'Privacy Level Options',
      type: 'array',
      group: 'form',
      of: [{ type: 'string' }],
      description: 'e.g. STANDARD, HIGH, MAXIMUM',
    }),
    defineField({
      name: 'formContactOptions',
      title: 'Contact Method Options',
      type: 'array',
      group: 'form',
      of: [{ type: 'string' }],
      description: 'e.g. EMAIL, PHONE, WHATSAPP',
    }),
    defineField({
      name: 'formTrekkingOptions',
      title: 'Trekking Experience Options',
      type: 'array',
      group: 'form',
      of: [{ type: 'string' }],
      description: 'e.g. LIMITED, INTERMEDIATE, EXTENSIVE',
    }),
    defineField({
      name: 'formAltitudeOptions',
      title: 'Altitude Experience Options',
      type: 'array',
      group: 'form',
      of: [{ type: 'string' }],
      description: 'e.g. BELOW 4,000 M, 4,000 — 6,000 M, 6,000 — 7,000 M',
    }),

    // Process
    defineField({ name: 'processHeading', title: 'Heading', type: 'text', rows: 2, group: 'process' }),
    defineField({
      name: 'processSteps',
      title: 'Steps',
      type: 'array',
      group: 'process',
      of: [{ type: 'consultationStep' }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({ name: 'processFootnote', title: 'Footnote', type: 'text', rows: 2, group: 'process' }),

    // Alternative Contact
    defineField({ name: 'alternativeHeading', title: 'Heading', type: 'text', rows: 2, group: 'alternative' }),
    defineField({
      name: 'alternativeOptions',
      title: 'Contact Options',
      type: 'array',
      group: 'alternative',
      of: [{ type: 'consultationContactOption' }],
    }),

    // Closing
    defineField({ name: 'closingLabel', title: 'Label', type: 'string', group: 'closing', description: 'e.g. 06 — A QUIET CLOSING' }),
    defineField({
      name: 'closingHeading',
      title: 'Heading',
      type: 'text',
      rows: 3,
      group: 'closing',
      description: 'The last sentence renders in italic.',
    }),
    defineField({ name: 'closingBody', title: 'Body', type: 'text', rows: 3, group: 'closing' }),
  ],
  preview: {
    prepare: () => ({ title: 'Consultation Page' }),
  },
})
