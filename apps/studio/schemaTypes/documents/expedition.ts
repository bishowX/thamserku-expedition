import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'expedition',
  title: 'Expedition',
  type: 'document',
  groups: [
    { name: 'identity',        title: 'Identity' },
    { name: 'hero',            title: 'Hero' },
    { name: 'overview',        title: 'Overview' },
    { name: 'whoItIsFor',      title: 'Expedition Highlights' },
    { name: 'itinerary',       title: 'Itinerary' },
    { name: 'route',           title: 'Route' },
    { name: 'inclusions',      title: 'Inclusions' },
    { name: 'exclusions',      title: 'Exclusions' },
    { name: 'prerequisite',    title: 'Mandatory Prerequisite' },
    { name: 'faqs',            title: 'FAQs' },
    { name: 'closing',         title: 'Closing' },
    { name: 'designConfig',    title: 'Design Config' },
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
    defineField({ group: 'hero', name: 'duration', title: 'Duration', type: 'string', description: 'e.g. 38 Days' }),
    defineField({ group: 'hero', name: 'difficulty', title: 'Difficulty', type: 'string', description: 'e.g. Extreme' }),
    defineField({ group: 'hero', name: 'groupSize', title: 'Group Size', type: 'string', description: 'e.g. 4–12' }),
    defineField({ group: 'hero', name: 'baseCamp', title: 'Base Camp', type: 'string', description: 'e.g. 5,345m' }),
    defineField({ group: 'hero', name: 'leadGuide', title: 'Lead Guide', type: 'string', description: 'e.g. IFMGA' }),
    defineField({ group: 'hero', name: 'expeditionStyleFact', title: 'Expedition Style (Quick Facts)', type: 'string', description: 'e.g. Sherpa-led, oxygen-supported.' }),
    defineField({ group: 'hero', name: 'pricing', title: 'Pricing', type: 'string', description: 'e.g. By private consultation' }),

    // ── Overview ──────────────────────────────────────────────────────────────
    defineField({ group: 'overview', name: 'overviewHeadline', title: 'Overview Headline', type: 'text', rows: 3, description: 'Leading part of the headline (rendered upright).' }),
    defineField({ group: 'overview', name: 'overviewHeadlineEmphasis', title: 'Overview Headline — Emphasis', type: 'text', rows: 2, description: 'Trailing part of the headline, rendered italic in accent blue.' }),
    defineField({ group: 'overview', name: 'overviewBody', title: 'Overview Body', type: 'text', rows: 5 }),
    defineField({ group: 'overview', name: 'overviewSpecsHeading', title: 'Overview Specs — Heading', type: 'string', description: 'Heading above the spec table, e.g. "2027 Departure".' }),
    defineField({
      group: 'overview',
      name: 'overviewSpecs',
      title: 'Overview Specs',
      type: 'array',
      description: 'Label / value rows shown in the right-hand spec table.',
      of: [
        {
          type: 'object',
          name: 'overviewSpec',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
    }),

    // ── Expedition Highlights (Who It Is For) ─────────────────────────────────
    defineField({ group: 'whoItIsFor', name: 'whoItIsForHeadline', title: 'Highlights — Heading', type: 'string', description: 'e.g. "Expedition Highlights"' }),
    defineField({
      group: 'whoItIsFor',
      name: 'audienceTiles',
      title: 'Highlights',
      type: 'array',
      description: 'Each highlight: a label and an italic body line.',
      of: [{ type: 'audienceTile' }],
    }),

    // ── Itinerary ─────────────────────────────────────────────────────────────
    defineField({ group: 'itinerary', name: 'itineraryHeading', title: 'Itinerary — Heading', type: 'string', description: 'e.g. "Standard Itinerary"' }),
    defineField({
      group: 'itinerary',
      name: 'itinerary',
      title: 'Itinerary Days',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'itineraryDay',
          fields: [
            defineField({ name: 'days', title: 'Day(s)', type: 'string', description: 'e.g. "01" or "10-11"' }),
            defineField({ name: 'activity', title: 'Activity', type: 'string' }),
            defineField({ name: 'accommodation', title: 'Accommodation', type: 'string', description: 'e.g. "5-star Hotel", "MLN"' }),
            defineField({ name: 'meals', title: 'Meals', type: 'string', description: 'e.g. "B", "B/L/D"' }),
          ],
          preview: { select: { title: 'activity', subtitle: 'days' } },
        },
      ],
    }),

    // ── Route ─────────────────────────────────────────────────────────────────
    defineField({
      group: 'route',
      name: 'routeWaypoints',
      title: 'Route Waypoints',
      type: 'array',
      of: [{ type: 'routeWaypoint' }],
      description: 'Ordered list of waypoints for the elevation diagram.',
    }),
    defineField({ group: 'route', name: 'routePhilosophy', title: 'Route Philosophy', type: 'text', rows: 3 }),
    defineField({ group: 'route', name: 'acclimatisationNote', title: 'Acclimatisation Cycle Note', type: 'text', rows: 3 }),
    defineField({ group: 'route', name: 'summitWindowNote', title: 'Summit Window Note', type: 'text', rows: 3 }),

    // ── Inclusions ────────────────────────────────────────────────────────────
    defineField({
      group: 'inclusions',
      name: 'inclusionCategories',
      title: 'Inclusion Categories',
      type: 'array',
      of: [{ type: 'inclusionCategory' }],
      description: 'Each category has a heading and a body paragraph, e.g. Government Services, Kathmandu, Trekking, Base Camp, Higher Camps (C1-C4), Included Bonuses.',
    }),

    // ── Exclusions ────────────────────────────────────────────────────────────
    defineField({
      group: 'exclusions',
      name: 'exclusions',
      title: 'Exclusions',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Items not covered by the expedition fee, e.g. International Airfare & Nepal Visa.',
    }),
    // ── Mandatory Prerequisite ────────────────────────────────────────────────
    defineField({
      group: 'prerequisite',
      name: 'mandatoryPrerequisite',
      title: 'Mandatory Prerequisite',
      type: 'text',
      rows: 6,
      description: 'Shown beside the exclusions list. Line breaks are preserved.',
    }),

    // ── FAQs ──────────────────────────────────────────────────────────────────
    defineField({
      group: 'faqs',
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'faqItem' }],
    }),

    // ── Closing ───────────────────────────────────────────────────────────────
    defineField({ group: 'closing', name: 'closingImage', title: 'Closing Image', type: 'image', options: { hotspot: true }, description: 'Silhouette/twilight background.' }),
    defineField({ group: 'closing', name: 'closingStatement', title: 'Closing Statement', type: 'text', rows: 3 }),

    // ── Design Config ─────────────────────────────────────────────────────────
    // The per-peak Design-Your-Expedition configuration. Single source of truth
    // for BOTH the trek-details comparison tables and the configurator (B/C/D).
    // Organised by fixed named categories — see objects/designConfig.
    defineField({
      group: 'designConfig',
      name: 'designConfig',
      title: 'Design Configuration',
      type: 'designConfig',
    }),
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
