import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'inclusionCategory',
  title: 'Inclusion Category',
  type: 'object',
  fields: [
    defineField({ name: 'category', title: 'Category', type: 'string', description: 'e.g. Government & Related Services, Services in Kathmandu' }),
    defineField({ name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }], description: 'One inclusion per line, e.g. "Airport Transfers: Private vehicle for all arrivals/departures".' }),
  ],
  preview: {
    select: { title: 'category', items: 'items' },
    prepare: ({ title, items }: { title: string; items?: string[] }) => ({
      title,
      subtitle: items?.length ? `${items.length} item${items.length === 1 ? '' : 's'}` : 'No items',
    }),
  },
})
