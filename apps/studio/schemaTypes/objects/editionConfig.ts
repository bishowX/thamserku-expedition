import { defineType, defineField } from 'sanity'

/**
 * One edition's full configuration for a peak — the five fixed categories and
 * their options. Authored independently per edition (B/C/D), because the
 * available options and defaults genuinely differ by edition.
 *
 *   Acclimatisation & Helicopter        → pick-many (each option is its own opt-in).
 *   Accommodation, Guiding & Support    → named pick-one items (Kathmandu, Lead Guide, Standby Rescue…).
 *   Oxygen                              → a numeric quantity.
 */
export default defineType({
  name: 'editionConfig',
  title: 'Edition Configuration',
  type: 'object',
  fields: [
    defineField({
      name: 'acclimatisation',
      title: 'Acclimatisation & Additional Climb',
      type: 'array',
      of: [{ type: 'configOption' }],
      description: 'Pick-many. Each climb/objective is an option — mark "Included" if bundled at this edition, else it\'s a paid add-on.',
    }),
    defineField({
      name: 'accommodation',
      title: 'Accommodation Preferences',
      type: 'array',
      of: [{ type: 'configItem' }],
      description: 'Named lodging lines (Kathmandu, During Trekking …), each a pick-one chooser.',
    }),
    defineField({
      name: 'guiding',
      title: 'Guiding Configurations',
      type: 'array',
      of: [{ type: 'configItem' }],
      description: 'Named guiding lines (Trekking, Lead Climbing Guide, Support Sherpa, Camera Person …), each a pick-one chooser.',
    }),
    defineField({
      name: 'support',
      title: 'Support & Safety',
      type: 'array',
      of: [{ type: 'configItem' }],
      description: 'Named support/safety lines (Expedition Consultation, Communication, Oxygen Mask & Regulator, Standby Rescue, Summit Bonus and Tips …), each a pick-one chooser. Mostly single-option/fixed per edition — mark that one option "Included" with no alternatives.',
    }),
    defineField({ name: 'oxygen', title: 'Oxygen Preferences', type: 'oxygenEdition' }),
    defineField({
      name: 'helicopter',
      title: 'Helicopter Inclusion',
      type: 'array',
      of: [{ type: 'configOption' }],
      description: 'Pick-many. Each segment/package is an option — mark "Included" if bundled at this edition, else it\'s a paid add-on.',
    }),
  ],
})
