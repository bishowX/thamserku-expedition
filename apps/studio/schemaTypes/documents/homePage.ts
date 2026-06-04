import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'manifesto', title: 'Manifesto' },
    { name: 'stats', title: 'Stats' },
    { name: 'infrastructure', title: 'Yeti Infrastructure' },
    { name: 'atlas', title: 'Atlas' },
    { name: 'editions', title: 'Editions' },
    { name: 'legacy', title: 'Legacy' },
    { name: 'unclaimedPeaks', title: 'Unclaimed Peaks' },
    { name: 'fieldNotes', title: 'Field Notes' },
    { name: 'closing', title: 'Closing' },
  ],
  fields: [
    // Hero
    defineField({ name: 'heroImage', title: 'Background Image', type: 'image', group: 'hero', options: { hotspot: true } }),
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero' }),

    // Manifesto
    defineField({ name: 'manifestoEyebrow', title: 'Eyebrow', type: 'string', group: 'manifesto', description: 'e.g. 02 — MANIFESTO' }),
    defineField({
      name: 'manifestoHeading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      group: 'manifesto',
      description: 'The last sentence will render in italic blue.',
    }),
    defineField({ name: 'manifestoBody', title: 'Body', type: 'text', rows: 4, group: 'manifesto' }),
    defineField({
      name: 'manifestoStats',
      title: 'Stats',
      type: 'array',
      group: 'stats',
      of: [{ type: 'statItem' }],
      description: 'Stats shown in the dark bar below the manifesto (e.g. 37+ Years, 800+ Expeditions).',
    }),

    // Yeti Infrastructure
    defineField({ name: 'infrastructureEyebrow', title: 'Eyebrow', type: 'string', group: 'infrastructure', description: 'e.g. SECTION III — YETI INFRASTRUCTURE' }),
    defineField({ name: 'infrastructureHeading', title: 'Heading', type: 'string', group: 'infrastructure' }),
    defineField({ name: 'infrastructureIntro', title: 'Intro', type: 'text', rows: 3, group: 'infrastructure' }),
    defineField({ name: 'infrastructurePillars', title: 'Pillars', type: 'array', group: 'infrastructure', of: [{ type: 'yetiPillar' }] }),

    // Atlas
    defineField({ name: 'atlasEyebrow', title: 'Eyebrow', type: 'string', group: 'atlas', description: 'e.g. 03 — EXPEDITION ATLAS' }),
    defineField({ name: 'atlasHeading', title: 'Heading', type: 'string', group: 'atlas', description: 'e.g. Five mountains. Five different kinds of preparation.' }),
    defineField({ name: 'atlasIntro', title: 'Intro', type: 'text', rows: 2, group: 'atlas' }),
    defineField({
      name: 'featuredExpeditions',
      title: 'Featured Expeditions',
      type: 'array',
      group: 'atlas',
      of: [{ type: 'reference', to: [{ type: 'expedition' }] }],
      validation: (Rule) => Rule.max(5),
      description: 'Up to 5 expeditions shown in the homepage Atlas preview.',
    }),

    // Editions
    defineField({ name: 'editionsEyebrow', title: 'Eyebrow', type: 'string', group: 'editions', description: 'e.g. 04 — EDITIONS' }),
    defineField({ name: 'editionsHeading', title: 'Heading', type: 'string', group: 'editions' }),
    defineField({ name: 'editionsIntro', title: 'Intro', type: 'text', rows: 2, group: 'editions' }),

    // Legacy
    defineField({ name: 'legacyEyebrow', title: 'Eyebrow', type: 'string', group: 'legacy', description: 'e.g. 05 — LEGACY' }),
    defineField({ name: 'legacyHeading', title: 'Heading', type: 'text', rows: 2, group: 'legacy' }),
    defineField({ name: 'legacyIntro', title: 'Intro', type: 'text', rows: 3, group: 'legacy', description: 'Intro paragraph shown below the heading.' }),
    defineField({
      name: 'legacyTimelineItems',
      title: 'Timeline Items',
      type: 'array',
      group: 'legacy',
      of: [{ type: 'legacyTimelineItem' }],
      description: 'Historical milestone events shown on the timeline (year, title, description).',
    }),

    // Unclaimed Peaks
    defineField({ name: 'unclaimedPeaksEyebrow', title: 'Eyebrow', type: 'string', group: 'unclaimedPeaks', description: 'e.g. 06 — EXPLORE UNCLAIMED PEAKS' }),
    defineField({ name: 'unclaimedPeaksHeading', title: 'Heading', type: 'text', rows: 2, group: 'unclaimedPeaks', description: 'e.g. Five lenses through which to read the same mountain.' }),
    defineField({ name: 'unclaimedPeaksBody', title: 'Body', type: 'text', rows: 3, group: 'unclaimedPeaks' }),

    // Field Notes
    defineField({ name: 'fieldNotesEyebrow', title: 'Eyebrow', type: 'string', group: 'fieldNotes', description: 'e.g. 06 — FIELD NOTES' }),
    defineField({ name: 'fieldNotesHeading', title: 'Heading', type: 'string', group: 'fieldNotes' }),
    defineField({ name: 'newsletterEyebrow', title: 'Newsletter Eyebrow', type: 'string', group: 'fieldNotes', description: 'e.g. FIELD NOTES — NEWSLETTER' }),
    defineField({ name: 'newsletterHeading', title: 'Newsletter Heading', type: 'string', group: 'fieldNotes' }),
    defineField({ name: 'newsletterBody', title: 'Newsletter Body', type: 'text', rows: 2, group: 'fieldNotes' }),
    defineField({ name: 'newsletterCta', title: 'Newsletter CTA', type: 'string', group: 'fieldNotes', description: 'e.g. Subscribe →' }),
    defineField({ name: 'newsletterPrivacyNote', title: 'Newsletter Privacy Note', type: 'text', rows: 2, group: 'fieldNotes' }),
    defineField({
      name: 'featuredFieldNotes',
      title: 'Featured Field Notes',
      type: 'array',
      group: 'fieldNotes',
      of: [{ type: 'reference', to: [{ type: 'fieldNote' }] }],
      validation: (Rule) => Rule.max(4),
      description: 'Up to 4 field notes shown on the homepage preview.',
    }),

    // Closing
    defineField({ name: 'closingEyebrow', title: 'Eyebrow', type: 'string', group: 'closing', description: 'e.g. 07 — BEGIN PRIVATELY' }),
    defineField({ name: 'closingHeading', title: 'Heading', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Body', type: 'text', rows: 2, group: 'closing' }),
    defineField({ name: 'closingImage', title: 'Background Image', type: 'image', group: 'closing', options: { hotspot: true } }),
  ],
  preview: {
    select: { subtitle: 'heroHeadline' },
    prepare: ({ subtitle }: { subtitle: string }) => ({ title: 'Home Page', subtitle }),
  },
})
