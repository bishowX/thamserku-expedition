import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'yetiInfrastructurePage',
  title: 'Yeti Infrastructure Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'definition', title: 'Definition §I' },
    { name: 'airSupport', title: 'Pillar I — Air Support' },
    { name: 'mountainLodges', title: 'Pillar II — Mountain Lodges' },
    { name: 'regionalAccess', title: 'Pillar III — Regional Access' },
    { name: 'fieldContinuity', title: 'Pillar IV — Field Continuity' },
    { name: 'peakSection', title: 'Peak Section §II' },
    { name: 'faq', title: 'FAQ' },
    { name: 'closing', title: 'Closing' },
  ],
  fields: [
    // Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroStatOperations', title: 'Stat — Operations (value)', type: 'string', group: 'hero', description: 'e.g. KATHMANDU' }),
    defineField({ name: 'heroStatRegions', title: 'Stat — Regions (value)', type: 'string', group: 'hero', description: 'e.g. 5 HIMALAYAN' }),
    defineField({ name: 'heroStatContinuity', title: 'Stat — Continuity (value)', type: 'string', group: 'hero', description: 'e.g. MULTI-GENERATIONAL' }),
    defineField({ name: 'heroStatStatus', title: 'Stat — Status (value)', type: 'string', group: 'hero', description: 'e.g. UHNI-LEVEL ASSURANCE' }),

    // Definition §I
    defineField({ name: 'definitionHeading', title: 'Heading', type: 'string', group: 'definition' }),
    defineField({ name: 'definitionTagline', title: 'Italic Tagline', type: 'string', group: 'definition' }),
    defineField({ name: 'definitionBody1', title: 'Body Paragraph 1', type: 'text', rows: 4, group: 'definition' }),
    defineField({ name: 'definitionBody2', title: 'Body Paragraph 2', type: 'text', rows: 4, group: 'definition' }),
    defineField({ name: 'definitionBody3', title: 'Body Paragraph 3', type: 'text', rows: 4, group: 'definition' }),

    // Pillar I — Air Support
    defineField({ name: 'airHeading', title: 'Heading', type: 'string', group: 'airSupport' }),
    defineField({ name: 'airTagline', title: 'Italic Tagline', type: 'string', group: 'airSupport' }),
    defineField({ name: 'airBody', title: 'Body', type: 'text', rows: 4, group: 'airSupport' }),
    defineField({ name: 'airImage', title: 'Image', type: 'image', options: { hotspot: true }, group: 'airSupport' }),
    defineField({ name: 'airChannels', title: 'Spec — Channels', type: 'string', group: 'airSupport', description: 'e.g. KATHMANDU · LUKLA · HIMALAYAN VALLEYS' }),
    defineField({ name: 'airUseCases', title: 'Spec — Use Cases', type: 'string', group: 'airSupport', description: 'e.g. ACCESS · STAGING · RESCUE' }),
    defineField({ name: 'airAvailability', title: 'Spec — Availability', type: 'string', group: 'airSupport', description: 'e.g. SEASONAL' }),
    defineField({ name: 'airCoordination', title: 'Spec — Coordination', type: 'string', group: 'airSupport', description: 'e.g. YETI GROUP AVIATION' }),

    // Pillar II — Mountain Lodges
    defineField({ name: 'lodgesHeading', title: 'Heading', type: 'string', group: 'mountainLodges' }),
    defineField({ name: 'lodgesTagline', title: 'Italic Tagline', type: 'string', group: 'mountainLodges' }),
    defineField({ name: 'lodgesBody', title: 'Body', type: 'text', rows: 4, group: 'mountainLodges' }),
    defineField({ name: 'lodgesImage', title: 'Image', type: 'image', options: { hotspot: true }, group: 'mountainLodges' }),
    defineField({ name: 'lodgesRegions', title: 'Spec — Regions', type: 'string', group: 'mountainLodges', description: 'e.g. KHUMBU · GORKHA · ANNAPURNA' }),
    defineField({ name: 'lodgesUseCases', title: 'Spec — Use Cases', type: 'string', group: 'mountainLodges', description: 'e.g. APPROACH · ACCLIMATISATION · RECOVERY' }),
    defineField({ name: 'lodgesStandard', title: 'Spec — Standard', type: 'string', group: 'mountainLodges', description: 'e.g. OPERATIONAL · DISCREET' }),
    defineField({ name: 'lodgesStaffing', title: 'Spec — Staffing', type: 'string', group: 'mountainLodges', description: 'e.g. YEAR-ROUND TEAMS' }),

    // Pillar III — Regional Access
    defineField({ name: 'accessHeading', title: 'Heading', type: 'string', group: 'regionalAccess' }),
    defineField({ name: 'accessTagline', title: 'Italic Tagline', type: 'string', group: 'regionalAccess' }),
    defineField({ name: 'accessBody', title: 'Body', type: 'text', rows: 4, group: 'regionalAccess' }),
    defineField({ name: 'accessImage', title: 'Image', type: 'image', options: { hotspot: true }, group: 'regionalAccess' }),
    defineField({ name: 'accessRegions', title: 'Spec — Regions', type: 'string', group: 'regionalAccess', description: 'e.g. KHUMBU · GORKHA · DHAULAGIRI · MAHALANGUR · ANNAPURNA' }),
    defineField({ name: 'accessUseCases', title: 'Spec — Use Cases', type: 'string', group: 'regionalAccess', description: 'e.g. PERMITS · PARTNERSHIPS · ACCESS' }),
    defineField({ name: 'accessContinuity', title: 'Spec — Continuity', type: 'string', group: 'regionalAccess', description: 'e.g. NEARLY FOUR DECADES' }),
    defineField({ name: 'accessHandling', title: 'Spec — Handling', type: 'string', group: 'regionalAccess', description: 'e.g. KATHMANDU OPERATIONS' }),

    // Pillar IV — Field Continuity
    defineField({ name: 'continuityHeading', title: 'Heading', type: 'string', group: 'fieldContinuity' }),
    defineField({ name: 'continuityTagline', title: 'Italic Tagline', type: 'string', group: 'fieldContinuity' }),
    defineField({ name: 'continuityBody1', title: 'Body Paragraph 1', type: 'text', rows: 4, group: 'fieldContinuity' }),
    defineField({ name: 'continuityBody2', title: 'Body Paragraph 2', type: 'text', rows: 4, group: 'fieldContinuity' }),
    defineField({ name: 'continuityImage', title: 'Image', type: 'image', options: { hotspot: true }, group: 'fieldContinuity' }),

    // Peak Section §II
    defineField({ name: 'peakSectionHeading', title: 'Section Heading', type: 'string', group: 'peakSection', description: 'e.g. How the infrastructure applies, peak by peak.' }),
    defineField({ name: 'peakSectionTagline', title: 'Section Tagline', type: 'string', group: 'peakSection', description: 'e.g. Five mountains. Same operational foundation. Different operational shapes.' }),

    // FAQ
    defineField({ name: 'faqHeading', title: 'Section Heading', type: 'string', group: 'faq' }),
    defineField({ name: 'faqTagline', title: 'Section Tagline', type: 'string', group: 'faq' }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4 }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),

    // Closing
    defineField({ name: 'closingHeading', title: 'Closing Heading', type: 'text', rows: 2, group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 3, group: 'closing' }),
  ],
  preview: { prepare: () => ({ title: 'Yeti Infrastructure Page' }) },
})
