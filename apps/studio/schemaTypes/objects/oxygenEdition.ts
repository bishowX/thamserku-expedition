import { defineType, defineField } from 'sanity'

/**
 * Summit oxygen for one edition — a numeric quantity. The climber adjusts the
 * bottle count within [min, max]; extras above the default are charged.
 */
export default defineType({
  name: 'oxygenEdition',
  title: 'Oxygen',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({ name: 'defaultBottles', title: 'Default Bottles (×4L)', type: 'number', description: 'Pre-selected count, included in the base price.' }),
    defineField({ name: 'min', title: 'Min', type: 'number', initialValue: 0, description: '0 allows "No O₂".' }),
    defineField({ name: 'max', title: 'Max', type: 'number', initialValue: 16 }),
    defineField({ name: 'unlimitedThreshold', title: 'Unlimited Threshold', type: 'number', description: 'At/above this, show "Unlimited" (e.g. Definitive\'s "13+").' }),
    defineField({ name: 'pricePerBottle', title: 'Price Per Extra Bottle (USD)', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { d: 'defaultBottles', min: 'min', max: 'max' },
    prepare: ({ d, min, max }: { d?: number; min?: number; max?: number }) => ({
      title: `Summit Oxygen — default ${d ?? '?'} ×4L`,
      subtitle: `range ${min ?? 0}–${max ?? 16}`,
    }),
  },
})
