import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'yetiInfrastructurePage',
  title: 'Yeti Infrastructure Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'definition', title: 'Definition §I' },
    { name: 'closing', title: 'Closing' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero' }),
    defineField({
      name: 'heroPartners',
      title: 'Partner Logos',
      type: 'array',
      group: 'hero',
      description: 'The logos that float in the hero constellation. Order determines position. Leave empty to use built-in defaults.',
      of: [{
        type: 'object',
        name: 'partner',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: false }, description: 'Upload an SVG or PNG with a transparent background.' }),
          defineField({ name: 'label', title: 'Category Chip', type: 'string', description: 'e.g. Travel, Airlines, Hotel. Leave blank to hide the chip.' }),
          defineField({ name: 'href', title: 'Website URL', type: 'url', description: 'Opens in a new tab when the card is clicked.' }),
        ],
        preview: { select: { title: 'name', media: 'logo', subtitle: 'label' } },
      }],
    }),

    // Definition §I
    defineField({ name: 'definitionHeading', title: 'Heading', type: 'string', group: 'definition' }),
    defineField({ name: 'definitionTagline', title: 'Italic Tagline', type: 'string', group: 'definition' }),
    defineField({ name: 'definitionBody', title: 'Body', type: 'text', rows: 6, group: 'definition' }),

    // Closing
    defineField({ name: 'closingEyebrow', title: 'Eyebrow', type: 'string', group: 'closing', description: 'e.g. YETI GROUP' }),
    defineField({ name: 'closingHeading', title: 'Closing Heading', type: 'text', rows: 2, group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 3, group: 'closing' }),
    defineField({ name: 'closingImage', title: 'Background Image', type: 'image', group: 'closing', options: { hotspot: true } }),
    defineField({ name: 'closingPrimaryCtaLabel', title: 'Primary Button Label', type: 'string', group: 'closing', description: 'e.g. DESIGN YOUR EXPEDITION →' }),
    defineField({ name: 'closingPrimaryCtaPath', title: 'Primary Button Link', type: 'string', group: 'closing', description: 'Internal path, e.g. /design-your-expedition' }),
    defineField({ name: 'closingSecondaryCtaLabel', title: 'Secondary Button Label', type: 'string', group: 'closing', description: 'e.g. EXPLORE EDITIONS →' }),
    defineField({ name: 'closingSecondaryCtaPath', title: 'Secondary Button Link', type: 'string', group: 'closing', description: 'Internal path, e.g. /editions' }),

    // Search & social overrides. Blank fields fall back to this page's hero
    // content, then to Site Settings → SEO.
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Yeti Infrastructure Page' }) },
})
