import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'foundingYear', title: 'Founding Year', type: 'number' }),
    defineField({ name: 'copyrightLine', title: 'Copyright Line', type: 'string' }),
    defineField({ name: 'newsletterHeading', title: 'Newsletter Heading', type: 'string' }),
    defineField({ name: 'newsletterBody', title: 'Newsletter Body', type: 'text', rows: 3 }),
    defineField({
      name: 'newsletterCadence',
      title: 'Newsletter Cadence',
      type: 'string',
      description: 'e.g. quarterly',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
