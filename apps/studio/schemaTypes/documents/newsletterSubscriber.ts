import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'subscribedAt', title: 'Subscribed At', type: 'datetime', readOnly: true }),
  ],
  orderings: [
    { title: 'Newest first', name: 'subscribedAtDesc', by: [{ field: 'subscribedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'email', date: 'subscribedAt' },
    prepare: ({ title, date }: { title?: string; date?: string }) => ({
      title: title ?? 'Unknown',
      subtitle: date ? new Date(date).toLocaleDateString('en-GB', { dateStyle: 'medium' }) : undefined,
    }),
  },
})
