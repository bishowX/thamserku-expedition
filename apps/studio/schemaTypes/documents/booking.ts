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
    // Frozen snapshot of what the customer configured & was quoted. Written at
    // submission time so the record never shifts if the matrix is edited later.
    defineField({
      name: 'selections',
      title: 'Selections',
      type: 'array',
      group: 'config',
      readOnly: true,
      of: [
        {
          type: 'object',
          name: 'bookingSelection',
          fields: [
            defineField({ name: 'key', title: 'Feature Key', type: 'string' }),
            defineField({ name: 'label', title: 'Feature Label', type: 'string' }),
            defineField({ name: 'group', title: 'Group', type: 'string' }),
            defineField({ name: 'chosenLabel', title: 'Chosen', type: 'string', description: 'Human-readable selected value at submission time.' }),
            defineField({ name: 'priceDelta', title: 'Price Delta (USD)', type: 'number' }),
          ],
          preview: { select: { title: 'label', subtitle: 'chosenLabel' } },
        },
      ],
    }),
    defineField({ name: 'basePrice', title: 'Base Price (USD)', type: 'number', group: 'config', readOnly: true }),
    defineField({ name: 'estimatedTotal', title: 'Estimated Total (USD)', type: 'number', group: 'config', readOnly: true, description: 'Indicative quote = base + deltas. Null when no base price (A/E → price on request).' }),
    defineField({ name: 'currency', title: 'Currency', type: 'string', group: 'config', readOnly: true, initialValue: 'USD' }),
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
