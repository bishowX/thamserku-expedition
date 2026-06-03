import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contact' },
    { name: 'config', title: 'Configuration' },
    { name: 'message', title: 'Message' },
  ],
  fields: [
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime', readOnly: true }),
    // Contact
    defineField({ name: 'fullName', title: 'Full Name', type: 'string', group: 'contact' }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact' }),
    defineField({ name: 'phone', title: 'Phone / WhatsApp', type: 'string', group: 'contact' }),
    // Configuration
    defineField({
      name: 'expedition',
      title: 'Peak',
      type: 'reference',
      to: [{ type: 'expedition' }],
      group: 'config',
    }),
    defineField({
      name: 'edition',
      title: 'Edition',
      type: 'reference',
      to: [{ type: 'edition' }],
      group: 'config',
    }),
    defineField({ name: 'ktmHotel', title: 'KTM Hotel', type: 'string', group: 'config' }),
    defineField({ name: 'trekLodge', title: 'Trek Lodge', type: 'string', group: 'config' }),
    defineField({ name: 'trekGuide', title: 'Trek Guide', type: 'string', group: 'config' }),
    defineField({ name: 'climbGuide', title: 'Climb Guide', type: 'string', group: 'config' }),
    defineField({ name: 'sherpaRatio', title: 'Sherpa Ratio', type: 'string', group: 'config' }),
    defineField({ name: 'oxygenBottles', title: 'Oxygen Bottles', type: 'number', group: 'config' }),
    defineField({
      name: 'helicopterInclusions',
      title: 'Helicopter Inclusions',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'config',
    }),
    // Message
    defineField({ name: 'message', title: 'Message', type: 'text', group: 'message' }),
  ],
  orderings: [
    { title: 'Newest first', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'fullName', subtitle: 'email', date: 'submittedAt' },
    prepare: ({ title, subtitle, date }: { title?: string; subtitle?: string; date?: string }) => ({
      title: title ?? 'Unknown',
      subtitle: date ? `${subtitle} · ${new Date(date).toLocaleDateString('en-GB')}` : subtitle,
    }),
  },
})
