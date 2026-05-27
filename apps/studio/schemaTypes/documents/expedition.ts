import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'expedition',
  title: 'Expedition',
  type: 'document',
  groups: [
    { name: 'identity',        title: 'Identity' },
    { name: 'hero',            title: 'Hero' },
    { name: 'content',         title: 'Content' },
    { name: 'safety',          title: 'Safety & Support' },
    { name: 'infrastructure',  title: 'Infrastructure' },
    { name: 'preparation',     title: 'Preparation' },
    { name: 'commercial',      title: 'Commercial' },
    { name: 'closing',         title: 'Closing' },
  ],
  fields: [
    // ── Identity ─────────────────────────────────────────────────────────────
    defineField({ group: 'identity', name: 'number', title: 'Number', type: 'string', description: 'e.g. 01, 02' }),
    defineField({
      group: 'identity',
      name: 'code',
      title: 'Code',
      type: 'string',
      description: 'e.g. EVR, MAN, DHA',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ group: 'identity', name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ group: 'identity', name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ group: 'identity', name: 'altitude', title: 'Altitude', type: 'string', description: 'e.g. 8,848.86 m' }),
    defineField({ group: 'identity', name: 'region', title: 'Region', type: 'string' }),
    defineField({ group: 'identity', name: 'season', title: 'Season', type: 'string', description: 'e.g. Spring · Autumn' }),
    defineField({ group: 'identity', name: 'style', title: 'Style', type: 'string', description: 'Atlas card label e.g. Disciplined passage' }),
    defineField({ group: 'identity', name: 'bestFor', title: 'Best For', type: 'string', description: 'Short phrase for the comparison table e.g. Disciplined 8,000m aspirants' }),
    defineField({ group: 'identity', name: 'positioning', title: 'Positioning Tagline', type: 'text', rows: 3 }),
    defineField({
      group: 'identity',
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image shown on the expedition atlas card.',
    }),
    defineField({
      group: 'identity',
      name: 'editions',
      title: 'Editions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'edition' }] }],
    }),

    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({ group: 'hero', name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, description: 'Full-width hero background image.' }),
    defineField({ group: 'hero', name: 'heroTagline', title: 'Hero Tagline', type: 'string', description: 'Large h1 text.' }),
    defineField({ group: 'hero', name: 'heroSubtext', title: 'Hero Subtext', type: 'text', rows: 3, description: 'Paragraph below the h1.' }),
    defineField({ group: 'hero', name: 'duration', title: 'Duration', type: 'string', description: 'e.g. 60–65 days' }),
    defineField({ group: 'hero', name: 'expeditionStyleFact', title: 'Expedition Style (Quick Facts)', type: 'string', description: 'e.g. Sherpa-led, oxygen-supported.' }),
    defineField({ group: 'hero', name: 'pricing', title: 'Pricing', type: 'string', description: 'e.g. By private consultation' }),

    // ── Content ───────────────────────────────────────────────────────────────
    defineField({ group: 'content', name: 'overviewHeadline', title: 'Overview Headline', type: 'text', rows: 3 }),
    defineField({ group: 'content', name: 'overviewBody', title: 'Overview Body', type: 'text', rows: 5 }),
    defineField({ group: 'content', name: 'overviewSideImage', title: 'Overview Side Image', type: 'image', options: { hotspot: true }, description: 'Small marginal photograph.' }),
    defineField({ group: 'content', name: 'whoItIsForHeadline', title: 'Who It Is For — Headline', type: 'string' }),
    defineField({
      group: 'content',
      name: 'audienceTiles',
      title: 'Audience Tiles',
      type: 'array',
      of: [{ type: 'audienceTile' }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      group: 'content',
      name: 'journeyStages',
      title: 'Journey Stages',
      type: 'array',
      of: [{ type: 'journeyStage' }],
    }),
    defineField({
      group: 'content',
      name: 'routeWaypoints',
      title: 'Route Waypoints',
      type: 'array',
      of: [{ type: 'routeWaypoint' }],
      description: 'Ordered list of waypoints for the elevation diagram.',
    }),
    defineField({ group: 'content', name: 'routePhilosophy', title: 'Route Philosophy', type: 'text', rows: 3 }),
    defineField({ group: 'content', name: 'acclimatisationNote', title: 'Acclimatisation Cycle Note', type: 'text', rows: 3 }),
    defineField({ group: 'content', name: 'summitWindowNote', title: 'Summit Window Note', type: 'text', rows: 3 }),

    // ── Safety & Support ─────────────────────────────────────────────────────
    defineField({ group: 'safety', name: 'safetySupportHeadline', title: 'Safety & Support — Headline', type: 'string' }),
    defineField({
      group: 'safety',
      name: 'safetyModules',
      title: 'Safety Modules',
      type: 'array',
      of: [{ type: 'safetyModule' }],
      description: '6 safety modules shown in the Safety & Support section.',
    }),

    // ── Infrastructure ────────────────────────────────────────────────────────
    defineField({ group: 'infrastructure', name: 'yetiAirNote', title: 'Yeti — Air Support Note', type: 'text', rows: 2 }),
    defineField({ group: 'infrastructure', name: 'yetiLodgesNote', title: 'Yeti — Mountain Lodges Note', type: 'text', rows: 2 }),
    defineField({ group: 'infrastructure', name: 'yetiAccessNote', title: 'Yeti — Regional Access Note', type: 'text', rows: 2 }),
    defineField({ group: 'infrastructure', name: 'yetiContinuityNote', title: 'Yeti — Field Continuity Note', type: 'text', rows: 2 }),

    // ── Preparation ───────────────────────────────────────────────────────────
    defineField({ group: 'preparation', name: 'preparationHeadline', title: 'Preparation — Headline', type: 'string' }),
    defineField({
      group: 'preparation',
      name: 'preparationColumns',
      title: 'Preparation Columns',
      type: 'array',
      of: [{ type: 'preparationColumn' }],
      description: 'Typically 3 columns: Body, Time, Mind.',
    }),
    // ── Commercial ────────────────────────────────────────────────────────────
    defineField({
      group: 'commercial',
      name: 'availableSeasons',
      title: 'Available Seasons',
      type: 'array',
      of: [{ type: 'availableSeason' }],
    }),
    defineField({
      group: 'commercial',
      name: 'inclusionCategories',
      title: 'Inclusion Categories',
      type: 'array',
      of: [{ type: 'inclusionCategory' }],
      description: 'Typically 3 categories: Expedition Leadership, Logistics & Support, Hospitality & Care.',
    }),
    defineField({
      group: 'commercial',
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'faqItem' }],
    }),

    // ── Closing ───────────────────────────────────────────────────────────────
    defineField({ group: 'closing', name: 'closingImage', title: 'Closing Image', type: 'image', options: { hotspot: true }, description: 'Silhouette/twilight background.' }),
    defineField({ group: 'closing', name: 'closingStatement', title: 'Closing Statement', type: 'text', rows: 3 }),
  ],
  orderings: [
    { title: 'Number', name: 'numberAsc', by: [{ field: 'number', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'code' },
    prepare: ({ title, subtitle }: { title: string; subtitle: string }) => ({
      title,
      subtitle: `EXP / ${subtitle}`,
    }),
  },
})
