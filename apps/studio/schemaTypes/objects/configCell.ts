import { defineType, defineField } from 'sanity'

/**
 * A single cell in the per-peak configuration matrix: the value of one feature
 * for ONE edition (A–E).
 *
 * The same cell drives two surfaces:
 *   • Trek-details comparison tables → renders `summary` (verbatim text).
 *   • Design configurator (B/C/D only) → renders an interactive control when
 *     `state` is `choosable` or `addon`; otherwise the row is display-only.
 *
 * `state` decides behaviour:
 *   fixed     – part of the spec, shown read-only (A/E rows are usually this).
 *   choosable – user picks from `options` (or a range); `defaultValue` pre-selected.
 *   included  – bundled at no extra cost; shown as "Included".
 *   addon     – optional opt-in; off by default. Single price via `priceDelta`,
 *               or multiple priced variants via `options`.
 *   na        – not offered at this edition; hidden in the configurator, "N/A" in tables.
 */
export default defineType({
  name: 'configCell',
  title: 'Edition Cell',
  type: 'object',
  fields: [
    defineField({
      name: 'edition',
      title: 'Edition',
      type: 'string',
      options: {
        list: [
          { title: 'A — Alpine', value: 'A' },
          { title: 'B — Bespoke', value: 'B' },
          { title: 'C — Crafted', value: 'C' },
          { title: 'D — Definitive', value: 'D' },
          { title: 'E — Explorer', value: 'E' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
      description: 'Verbatim text shown in the comparison tables, e.g. "3★, B&B, Twin" or "Add-on". Falls back to the default option label if blank.',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      initialValue: 'fixed',
      options: {
        list: [
          { title: 'Fixed — display only', value: 'fixed' },
          { title: 'Choosable — user picks', value: 'choosable' },
          { title: 'Included — bundled, no charge', value: 'included' },
          { title: 'Add-on — optional opt-in', value: 'addon' },
          { title: 'N/A — not offered', value: 'na' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Options (choosable selects/multiselects, or multi-variant add-ons) ──────
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      description: 'Choices for select / multiselect controls, or priced add-on variants.',
      hidden: ({ parent }) => parent?.state !== 'choosable' && parent?.state !== 'addon',
      of: [
        {
          type: 'object',
          name: 'configOption',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'Stable key stored in the booking.', validation: (Rule) => Rule.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'priceDelta', title: 'Price Delta (USD)', type: 'number', initialValue: 0, description: 'Added to base price when selected. May be 0 or negative.' }),
          ],
          preview: { select: { title: 'label', subtitle: 'priceDelta' }, prepare: ({ title, subtitle }: { title?: string; subtitle?: number }) => ({ title, subtitle: subtitle ? `+$${subtitle}` : '—' }) },
        },
      ],
    }),
    defineField({
      name: 'defaultValue',
      title: 'Default Value',
      type: 'string',
      description: 'For a choosable select: the option `value` pre-selected. Leave blank to default to the first option.',
      hidden: ({ parent }) => parent?.state !== 'choosable',
    }),

    // ── Range control (numeric, e.g. oxygen bottles, luggage kg) ────────────────
    defineField({
      name: 'range',
      title: 'Range',
      type: 'object',
      description: 'Only used when the feature control is "range".',
      hidden: ({ parent }) => parent?.state !== 'choosable',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'min', title: 'Min', type: 'number' }),
        defineField({ name: 'max', title: 'Max', type: 'number' }),
        defineField({ name: 'step', title: 'Step', type: 'number', initialValue: 1 }),
        defineField({ name: 'defaultValue', title: 'Default', type: 'number' }),
        defineField({ name: 'unit', title: 'Unit Label', type: 'string', description: 'e.g. "× 4L bottles", "kg"' }),
        defineField({ name: 'unlimitedThreshold', title: 'Unlimited Threshold', type: 'number', description: 'At/above this value, show "Unlimited".' }),
        defineField({ name: 'includedUnits', title: 'Included Units', type: 'number', description: 'Units covered by the base price; extras are charged.' }),
        defineField({ name: 'pricePerUnit', title: 'Price Per Extra Unit (USD)', type: 'number' }),
      ],
    }),

    // ── Single price (toggle add-on) ────────────────────────────────────────────
    defineField({
      name: 'priceDelta',
      title: 'Price Delta (USD)',
      type: 'number',
      description: 'For a simple toggle add-on with one price. Added when the user opts in.',
      hidden: ({ parent }) => parent?.state !== 'addon',
    }),
  ],
  preview: {
    select: { edition: 'edition', summary: 'summary', state: 'state' },
    prepare: ({ edition, summary, state }: { edition?: string; summary?: string; state?: string }) => ({
      title: `${edition ?? '?'} · ${summary ?? '—'}`,
      subtitle: state,
    }),
  },
})
