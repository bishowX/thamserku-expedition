import { defineType, defineField } from 'sanity'

/**
 * One selectable option inside a category/item for a single edition.
 *
 * `included` = the standard for this edition: pre-selected, no surcharge.
 *   • In a pick-one item (Accommodation, Guiding) exactly one option is included
 *     — it's the default; the others are paid swaps/upgrades.
 *   • In a pick-many category (Acclimatisation, Helicopter) any number can be
 *     included (bundled); the rest are optional paid add-ons.
 */
export default defineType({
  name: 'configOption',
  title: 'Option',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'included',
      title: 'Included as standard',
      type: 'boolean',
      initialValue: false,
      description: 'On = bundled at this edition (pre-selected, no surcharge). Off = optional paid choice.',
    }),
    defineField({
      name: 'priceDelta',
      title: 'Price Delta (USD)',
      type: 'number',
      initialValue: 0,
      description:
        'Optional option → surcharge added when the climber picks it. Included option → the change if they REMOVE it (use a negative number to credit them; 0 = no price change).',
    }),
  ],
  preview: {
    select: { label: 'label', included: 'included', priceDelta: 'priceDelta' },
    prepare: ({ label, included, priceDelta }: { label?: string; included?: boolean; priceDelta?: number }) => ({
      title: label,
      subtitle: included ? 'Included (standard)' : priceDelta ? `Add-on · +$${priceDelta}` : 'Add-on',
    }),
  },
})
