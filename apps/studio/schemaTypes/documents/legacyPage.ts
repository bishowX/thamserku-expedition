import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legacyPage',
  title: 'Legacy Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'origin', title: '02 — Origin' },
    { name: 'chairman', title: "03 — Chairman's Letter" },
    { name: 'timeline', title: '04 — Timeline' },
    { name: 'lineage', title: '05 — Lineage' },
    { name: 'newsletter', title: '07 — Newsletter' },
    { name: 'closing', title: '08 — Continue Reading' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', description: 'e.g. 01 — THE LEGACY' }),
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 2, group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Background Image', type: 'image', options: { hotspot: true }, group: 'hero' }),
    defineField({ name: 'heroMetaFeature', title: 'Meta Strip — Feature', type: 'string', group: 'hero', description: 'e.g. FEATURE · LEGACY' }),
    defineField({ name: 'heroMetaAtlas', title: 'Meta Strip — Atlas', type: 'string', group: 'hero', description: 'e.g. THE HIMALAYAN ATLAS' }),
    defineField({ name: 'heroMetaReadTime', title: 'Meta Strip — Read Time', type: 'string', group: 'hero', description: 'e.g. READ TIME · 12 MIN' }),
    defineField({ name: 'heroMetaEra', title: 'Meta Strip — Era', type: 'string', group: 'hero', description: 'e.g. NEPAL · 1987 — TODAY' }),

    // 02 — Origin
    defineField({ name: 'originEyebrow', title: 'Eyebrow', type: 'string', group: 'origin', description: 'e.g. 02 — ORIGIN' }),
    defineField({ name: 'originYears', title: 'Year Range', type: 'string', group: 'origin', description: 'e.g. 1987 — 1995' }),
    defineField({ name: 'originSideNote', title: 'Sidebar Note', type: 'string', group: 'origin' }),
    defineField({ name: 'originBody1', title: 'Body Paragraph 1 (Drop Cap)', type: 'text', rows: 5, group: 'origin' }),
    defineField({ name: 'originBody2', title: 'Body Paragraph 2', type: 'text', rows: 3, group: 'origin' }),
    defineField({ name: 'originPullQuote', title: 'Pull Quote', type: 'text', rows: 2, group: 'origin' }),
    defineField({ name: 'originImage', title: 'Side Image', type: 'image', options: { hotspot: true }, group: 'origin' }),
    defineField({ name: 'originImageCaption', title: 'Image Caption', type: 'string', group: 'origin', description: 'e.g. KHUMBU APPROACH · ARCHIVAL' }),

    // 03 — Chairman's Letter
    defineField({
      name: 'chairmanLetter',
      title: "Chairman's Letter",
      type: 'reference',
      to: [{ type: 'chairmanLetter' }],
      group: 'chairman',
    }),

    // 04 — Timeline
    defineField({ name: 'timelineEyebrow', title: 'Eyebrow', type: 'string', group: 'timeline', description: 'e.g. 04 — TIMELINE' }),
    defineField({ name: 'timelineHeading', title: 'Heading', type: 'string', group: 'timeline' }),
    defineField({ name: 'timelineFooterNote', title: 'Footer Note', type: 'text', rows: 2, group: 'timeline' }),
    defineField({
      name: 'timelineChapters',
      title: 'Chapters',
      type: 'array',
      group: 'timeline',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'roman', title: 'Roman Numeral', type: 'string', description: 'e.g. I, II, III' }),
          defineField({ name: 'years', title: 'Year Range', type: 'string', description: 'e.g. 1987 — 1995' }),
          defineField({ name: 'title', title: 'Chapter Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
        ],
        preview: { select: { title: 'title', subtitle: 'years', media: 'image' } },
      }],
    }),

    // 05 — Lineage
    defineField({ name: 'lineageEyebrow', title: 'Eyebrow', type: 'string', group: 'lineage', description: 'e.g. 05 — LINEAGE' }),
    defineField({ name: 'lineageHeading', title: 'Heading', type: 'string', group: 'lineage' }),
    defineField({ name: 'lineageBody1', title: 'Body Paragraph 1', type: 'text', rows: 4, group: 'lineage' }),
    defineField({ name: 'lineageBody2', title: 'Body Paragraph 2', type: 'text', rows: 4, group: 'lineage' }),
    defineField({
      name: 'lineageDataTiles',
      title: 'Data Tiles',
      type: 'array',
      group: 'lineage',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. HOUSE' }),
          defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. THAMSERKU EXPEDITIONS' }),
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
    }),

    // 07 — Newsletter
    defineField({ name: 'newsletterEyebrow', title: 'Eyebrow', type: 'string', group: 'newsletter' }),
    defineField({ name: 'newsletterHeading', title: 'Heading / Quote', type: 'string', group: 'newsletter', description: 'Rendered wrapped in quotes' }),
    defineField({ name: 'newsletterBody', title: 'Body', type: 'text', rows: 3, group: 'newsletter' }),
    defineField({ name: 'newsletterPrivacyNote', title: 'Privacy Note', type: 'string', group: 'newsletter' }),

    // 08 — Continue Reading
    defineField({ name: 'closingEyebrow', title: 'Eyebrow', type: 'string', group: 'closing', description: 'e.g. 08 — CONTINUE READING' }),
    defineField({ name: 'closingHeading', title: 'Heading', type: 'string', group: 'closing' }),
    defineField({ name: 'closingImage', title: 'Background Image', type: 'image', options: { hotspot: true }, group: 'closing' }),
  ],
  preview: { prepare: () => ({ title: 'Legacy Page' }) },
})
