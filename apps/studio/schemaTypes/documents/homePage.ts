import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'atlas', title: 'Atlas' },
    { name: 'editions', title: 'Editions' },
    { name: 'fieldNotes', title: 'Field Notes' },
    { name: 'manifesto', title: 'Manifesto' },
    { name: 'legacy', title: 'Legacy' },
    { name: 'infrastructure', title: 'Yeti Infrastructure' },
    { name: 'closing', title: 'Closing' },
  ],
  fields: [
    // Hero
    defineField({ name: 'heroImage', title: 'Background Image', type: 'image', group: 'hero', options: { hotspot: true } }),
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero' }),

    // Atlas
    defineField({ name: 'atlasHeading', title: 'Heading', type: 'string', group: 'atlas', description: 'e.g. Five mountains. Five different kinds of preparation.' }),
    defineField({ name: 'atlasIntro', title: 'Intro', type: 'text', rows: 2, group: 'atlas' }),

    // Editions
    defineField({ name: 'editionsHeading', title: 'Heading', type: 'string', group: 'editions' }),
    defineField({ name: 'editionsIntro', title: 'Intro', type: 'text', rows: 2, group: 'editions' }),

    // Field Notes
    defineField({
      name: 'featuredFieldNotes',
      title: 'Featured Field Notes',
      type: 'array',
      group: 'fieldNotes',
      of: [{ type: 'reference', to: [{ type: 'fieldNote' }] }],
      validation: (Rule) => Rule.max(4),
      description: 'Up to 4 field notes shown on the homepage preview.',
    }),

    // Manifesto
    defineField({
      name: 'manifestoHeading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      group: 'manifesto',
      description: 'The last sentence will render in italic blue.',
    }),
    defineField({ name: 'manifestoBody', title: 'Body', type: 'text', rows: 4, group: 'manifesto' }),

    // Legacy
    defineField({
      name: 'chairmanLetter',
      title: "Chairman's Letter",
      type: 'reference',
      to: [{ type: 'chairmanLetter' }],
      group: 'legacy',
      description: 'Provides the image, quote, and attribution for the Legacy section.',
    }),
    defineField({
      name: 'legacyHeading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      group: 'legacy',
      description: 'The last sentence will render in italic blue.',
    }),
    defineField({ name: 'legacyTimeline', title: 'Timeline', type: 'array', group: 'legacy', of: [{ type: 'timelineEra' }] }),

    // Yeti Infrastructure
    defineField({ name: 'infrastructureHeading', title: 'Heading', type: 'string', group: 'infrastructure' }),
    defineField({ name: 'infrastructureIntro', title: 'Intro', type: 'text', rows: 3, group: 'infrastructure' }),
    defineField({ name: 'infrastructurePillars', title: 'Pillars', type: 'array', group: 'infrastructure', of: [{ type: 'yetiPillar' }] }),

    // Closing
    defineField({ name: 'closingHeading', title: 'Heading', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Body', type: 'text', rows: 2, group: 'closing' }),
  ],
  preview: {
    select: { subtitle: 'heroHeadline' },
    prepare: ({ subtitle }: { subtitle: string }) => ({ title: 'Home Page', subtitle }),
  },
})
