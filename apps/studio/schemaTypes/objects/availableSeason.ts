import { defineType, defineField } from 'sanity'

const STATUS_OPTIONS = [
  { title: 'Open', value: 'OPEN' },
  { title: 'Limited', value: 'LIMITED' },
  { title: 'Consultation Only', value: 'CONSULTATION_ONLY' },
  { title: 'Closed', value: 'CLOSED' },
]

export default defineType({
  name: 'availableSeason',
  title: 'Available Season',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', description: 'e.g. SPRING 2026' }),
    defineField({ name: 'dates', title: 'Dates', type: 'string', description: 'e.g. (Apr–May)' }),
    defineField({ name: 'statusAlpine', title: 'Status — A: Alpine', type: 'string', options: { list: STATUS_OPTIONS } }),
    defineField({ name: 'statusBespoke', title: 'Status — B: Bespoke', type: 'string', options: { list: STATUS_OPTIONS } }),
    defineField({ name: 'statusCrafted', title: 'Status — C: Crafted', type: 'string', options: { list: STATUS_OPTIONS } }),
    defineField({ name: 'statusDefinitive', title: 'Status — D: Definitive', type: 'string', options: { list: STATUS_OPTIONS } }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'dates' },
  },
})
