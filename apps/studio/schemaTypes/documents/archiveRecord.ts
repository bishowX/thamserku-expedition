import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'archiveRecord',
  title: 'Archive Record',
  type: 'document',
  fields: [
    defineField({ name: 'code', title: 'Code', type: 'string', description: 'e.g. "AR.01"' }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'peak', title: 'Peak', type: 'string' }),
    defineField({ name: 'altitude', title: 'Altitude', type: 'string', description: 'e.g. "8,167 m"' }),
    defineField({ name: 'route', title: 'Route', type: 'string' }),
    defineField({ name: 'region', title: 'Region', type: 'string' }),
    defineField({ name: 'editionType', title: 'Edition Type', type: 'string', description: 'e.g. "HISTORIC", "RECONNAISSANCE", "ALPINE"' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Verified', value: 'verified' },
          { title: 'Permission Required', value: 'permissionRequired' },
          { title: 'Private', value: 'private' },
        ],
      },
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'notableDetail', title: 'Notable Detail', type: 'string' }),
    defineField({ name: 'source', title: 'Source', type: 'string', description: 'e.g. "Internal expedition log — verified"' }),
    defineField({
      name: 'relatedRecord',
      title: 'Related Record',
      type: 'reference',
      to: [{ type: 'archiveRecord' }],
    }),
    defineField({ name: 'isFeatured', title: 'Is Featured', type: 'boolean' }),
  ],
  preview: {
    select: { year: 'year', peak: 'peak' },
    prepare: ({ year, peak }: { year?: number; peak?: string }) => ({
      title: [year, peak].filter(Boolean).join(' — '),
    }),
  },
})
