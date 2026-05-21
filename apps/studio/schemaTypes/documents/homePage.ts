import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'text', rows: 3 }),
    defineField({
      name: 'manifestoHeading',
      title: 'Manifesto Heading',
      type: 'text',
      rows: 2,
      description: 'The last sentence will render in italic blue.',
    }),
    defineField({ name: 'manifestoBody', title: 'Manifesto Body', type: 'text', rows: 4 }),
    defineField({ name: 'closingHeading', title: 'Closing Heading', type: 'string' }),
    defineField({ name: 'closingBody', title: 'Closing Body', type: 'text', rows: 2 }),
    defineField({
      name: 'featuredFieldNotes',
      title: 'Featured Field Notes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'fieldNote' }] }],
      validation: (Rule) => Rule.max(4),
      description: 'Up to 4 field notes shown on the homepage preview.',
    }),
  ],
  preview: {
    select: { subtitle: 'heroHeadline' },
    prepare: ({ subtitle }: { subtitle: string }) => ({ title: 'Home Page', subtitle }),
  },
})
