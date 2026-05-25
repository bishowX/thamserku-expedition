import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'atlasPage',
  title: 'Atlas Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'controls', title: 'Controls' },
    { name: 'comparison', title: 'Comparison' },
  ],
  fields: [
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Background Image', type: 'image', group: 'hero', options: { hotspot: true } }),
    defineField({ name: 'controlsEyebrow', title: 'Eyebrow', type: 'string', group: 'controls', description: 'e.g. 02 — ATLAS CONTROLS' }),
    defineField({ name: 'controlsSubline', title: 'Subline', type: 'string', group: 'controls', description: 'e.g. INDEXED BY THE THAMSERKU DESK (the expedition count is prepended automatically)' }),
    defineField({ name: 'comparisonEyebrow', title: 'Eyebrow', type: 'string', group: 'comparison', description: 'e.g. 04 — AT A GLANCE' }),
    defineField({ name: 'comparisonHeadline', title: 'Headline', type: 'string', group: 'comparison', description: 'e.g. Five mountains, read side by side.' }),
    defineField({ name: 'comparisonNote', title: 'Footer Note', type: 'text', rows: 2, group: 'comparison', description: 'Italic note shown below the comparison table' }),
  ],
  preview: {
    prepare: () => ({ title: 'Atlas Page' }),
  },
})
