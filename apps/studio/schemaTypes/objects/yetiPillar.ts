import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'yetiPillar',
  title: 'Yeti Pillar',
  type: 'object',
  fields: [
    defineField({ name: 'number', title: 'Pillar Number', type: 'string', description: 'e.g. I, II, III, IV' }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'number' },
    prepare: ({ title, subtitle }: { title: string; subtitle: string }) => ({
      title,
      subtitle: `Pillar ${subtitle}`,
    }),
  },
})
