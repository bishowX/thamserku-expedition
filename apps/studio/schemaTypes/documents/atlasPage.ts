import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'atlasPage',
  title: 'Atlas Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'controls', title: 'Controls' },
  ],
  fields: [
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Background Image', type: 'image', group: 'hero', options: { hotspot: true } }),
    defineField({ name: 'controlsEyebrow', title: 'Eyebrow', type: 'string', group: 'controls', description: 'e.g. 02 — ATLAS CONTROLS' }),
    defineField({ name: 'controlsSubline', title: 'Subline', type: 'string', group: 'controls', description: 'e.g. INDEXED BY THE THAMSERKU DESK (the expedition count is prepended automatically)' }),
  ],
  preview: {
    prepare: () => ({ title: 'Atlas Page' }),
  },
})
