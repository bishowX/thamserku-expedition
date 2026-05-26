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
    { name: 'diagram', title: '06 — Two-Expedition Diagram' },
    { name: 'caution', title: '07 — Regulatory Caution' },
    { name: 'faq', title: '08 — FAQs' },
    { name: 'closing', title: '09 — Closing' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubline', title: 'Subline', type: 'text', rows: 2, group: 'hero' }),

    // 02 — Planning Context
    defineField({ name: 'planningContextEyebrow', title: 'Section Eyebrow', type: 'string', group: 'planning', description: 'e.g. "THE PLANNING CONTEXT — § I"' }),
    defineField({ name: 'planningContextHeadline', title: 'Headline', type: 'string', group: 'planning' }),
    defineField({ name: 'planningContextSubtitle', title: 'Italic Subtitle', type: 'string', group: 'planning', description: 'Italic line below the headline in the left column' }),
    defineField({ name: 'planningContextBody', title: 'Body', type: 'text', rows: 8, group: 'planning', description: 'Main body paragraphs (right column). Separate paragraphs with a blank line.' }),
    defineField({ name: 'planningContextNote', title: 'Italic Note', type: 'text', rows: 3, group: 'planning', description: 'Italic note at the bottom of the right column' }),

    // 03 — Pillars
    defineField({ name: 'pillarsEyebrow', title: 'Section Eyebrow', type: 'string', group: 'pillars', description: 'e.g. "WHY IT MATTERS — § II"' }),
    defineField({ name: 'pillarsHeading', title: 'Section Heading', type: 'string', group: 'pillars' }),
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      group: 'pillars',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', description: 'e.g. "REASON I — ALTITUDE"' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),

    // 04 — Routes
    defineField({ name: 'routesSectionEyebrow', title: 'Section Eyebrow', type: 'string', group: 'routes', description: 'e.g. "THE FIVE ROUTES — § III"' }),
    defineField({ name: 'routesSectionHeadline', title: 'Section Headline', type: 'string', group: 'routes' }),
    defineField({ name: 'routesSectionSubtitle', title: 'Section Subtitle', type: 'string', group: 'routes', description: 'Italic line below the headline' }),
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

    // 06 — Two-Expedition Diagram
    defineField({ name: 'diagramEyebrow', title: 'Section Eyebrow', type: 'string', group: 'diagram', description: 'e.g. "THE TWO-EXPEDITION PATHWAY — § V"' }),
    defineField({ name: 'diagramHeadline', title: 'Headline', type: 'string', group: 'diagram' }),
    defineField({ name: 'diagramSubheading', title: 'Subheading', type: 'text', rows: 2, group: 'diagram' }),
    defineField({
      name: 'diagramSteps',
      title: 'Pathway Steps',
      type: 'array',
      group: 'diagram',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'altitudeLabel', title: 'Altitude Label', type: 'string', description: 'e.g. "7,000 M" or "RECOVERY · KATHMANDU"' }),
          defineField({ name: 'stepLabel', title: 'Step Label', type: 'string', description: 'e.g. "STEP I — QUALIFYING ASCENT"' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title', subtitle: 'stepLabel' } },
      }],
    }),
    defineField({
      name: 'diagramTimingNotes',
      title: 'Timing Notes',
      type: 'array',
      group: 'diagram',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "TIMING I · 6 — 12 months apart"' }),
          defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'label' } },
      }],
    }),

    // 07 — Regulatory Caution
    defineField({ name: 'cautionEyebrow', title: 'Section Eyebrow', type: 'string', group: 'caution', description: 'e.g. "A NOTE ON REGULATION — § VI"' }),
    defineField({ name: 'cautionHeadline', title: 'Headline', type: 'string', group: 'caution' }),
    defineField({ name: 'cautionBody', title: 'Body', type: 'text', rows: 4, group: 'caution' }),
    defineField({ name: 'cautionNote', title: 'Italic Note', type: 'text', rows: 3, group: 'caution' }),
    defineField({ name: 'cautionFootnote', title: 'Footnote', type: 'string', group: 'caution', description: 'Small caps line at the bottom' }),

    // 08 — FAQs
    defineField({ name: 'faqEyebrow', title: 'Eyebrow', type: 'string', group: 'faq', description: 'e.g. "FREQUENTLY ASKED — 7,000M PATHWAY"' }),
    defineField({ name: 'faqHeadline', title: 'Headline', type: 'string', group: 'faq' }),
    defineField({ name: 'faqSubheading', title: 'Subheading', type: 'string', group: 'faq' }),
    defineField({ name: 'faqCtaLabel', title: 'CTA Label', type: 'string', group: 'faq', description: 'e.g. "READ ALL FAQS ON THE MAIN FAQ PAGE"' }),
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

    // 09 — Closing
    defineField({ name: 'closingEyebrow', title: 'Section Eyebrow', type: 'string', group: 'closing', description: 'e.g. "BEGIN THE PATHWAY — § VII"' }),
    defineField({ name: 'closingHeadline', title: 'Closing Headline', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 3, group: 'closing' }),
  ],
  preview: { prepare: () => ({ title: '7,000m Pathway Page' }) },
})
