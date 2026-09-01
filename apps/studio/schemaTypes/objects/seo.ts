import { defineType, defineField } from 'sanity'

// Per-page search/social overrides. Every field is optional — anything left
// blank falls back to the page's own hero content, then to the site-wide
// defaults in Site Settings (see lib/seo.ts on the web side).
export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Browser tab and Google result title. Aim for 50–60 characters. Leave blank to use the page headline.',
      validation: (Rule) => Rule.max(70).warning('Titles over ~60 characters get truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'The snippet under the title in Google. Aim for 140–155 characters. Leave blank to use the page subheading.',
      validation: (Rule) => Rule.max(180).warning('Descriptions over ~155 characters get truncated in search results.'),
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
      description: 'Adds a noindex tag so Google and AI crawlers drop this page from their results. Use for pages that should stay reachable by link but never rank — not for pages you simply want to rewrite.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Shown when the page is shared on WhatsApp, Facebook, LinkedIn or X. Cropped to 1200×630. Leave blank to use the page hero image.',
    }),
  ],
  preview: {
    select: { title: 'metaTitle', subtitle: 'metaDescription' },
    prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
      title: title || 'SEO',
      subtitle,
    }),
  },
})
