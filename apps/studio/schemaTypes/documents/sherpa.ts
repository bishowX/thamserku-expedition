import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sherpa',
  title: 'Sherpa',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
      description: 'No AI-generated images. Client to provide authentic portrait.',
    }),
    defineField({ name: 'region', title: 'Region', type: 'string', description: 'e.g. Khumbu, Solukhumbu' }),
    defineField({ name: 'yearsActive', title: 'Years Active', type: 'string', description: 'e.g. 22 seasons' }),
    defineField({ name: 'mountainsSupported', title: 'Mountains Supported', type: 'string', description: 'e.g. Everest · Manaslu · Lhotse' }),
    defineField({ name: 'philosophyLine', title: 'Philosophy Line', type: 'text', rows: 3, description: 'Short quote from the Sherpa' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'region' },
  },
})
