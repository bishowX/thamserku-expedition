import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'designPage',
  title: 'Design Your Expedition Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroBgImage', title: 'Background Image', type: 'image', group: 'hero', options: { hotspot: true } }),

    // Search & social overrides. Blank fields fall back to this page's hero
    // content, then to Site Settings → SEO.
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Design Your Expedition Page' }) },
})
