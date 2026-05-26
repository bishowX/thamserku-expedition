import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'archivePage',
  title: 'Archive Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'intro', title: '02 — Intro' },
    { name: 'closing', title: '03 — Closing' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubline', title: 'Subline', type: 'text', rows: 2, group: 'hero' }),

    // 02 — Intro
    defineField({ name: 'introTitle', title: 'Intro Title', type: 'string', group: 'intro' }),
    defineField({ name: 'introBody', title: 'Intro Body', type: 'text', rows: 6, group: 'intro' }),

    // 03 — Closing
    defineField({ name: 'closingHeadline', title: 'Closing Headline', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 3, group: 'closing' }),
  ],
  preview: { prepare: () => ({ title: 'Archive Page' }) },
})
