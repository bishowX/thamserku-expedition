import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'designSettings',
  title: 'Design Your Expedition — Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'ktmHotelOptions',
      title: 'KTM Hotel Options',
      type: 'array',
      of: [{ type: 'designOption' }],
      description: 'Accommodation options for Kathmandu — shown on Step 2',
    }),
    defineField({
      name: 'trekGuideOptions',
      title: 'Trek Guide Options',
      type: 'array',
      of: [{ type: 'designOption' }],
      description: 'Guiding options during trek — shown on Step 3',
    }),
    defineField({
      name: 'climbGuideOptions',
      title: 'Climb Guide Options',
      type: 'array',
      of: [{ type: 'designOption' }],
      description: 'Guiding options during climb — shown on Step 3',
    }),
    defineField({
      name: 'sherpaRatioOptions',
      title: 'Sherpa Ratio Options',
      type: 'array',
      of: [{ type: 'designOption' }],
      description: 'Member:Sherpa ratio options — shown on Step 3',
    }),
    defineField({ name: 'oxygenMin', title: 'Oxygen — Min Bottles', type: 'number', initialValue: 6 }),
    defineField({ name: 'oxygenMax', title: 'Oxygen — Max Bottles', type: 'number', initialValue: 20 }),
    defineField({ name: 'oxygenStep', title: 'Oxygen — Step', type: 'number', initialValue: 1 }),
    defineField({
      name: 'oxygenUnlimitedThreshold',
      title: 'Oxygen — Unlimited Threshold',
      type: 'number',
      initialValue: 20,
      description: 'At this value, show "Unlimited" instead of a number',
    }),
    defineField({ name: 'oxygenUnit', title: 'Oxygen — Unit Label', type: 'string', initialValue: '× 4L bottles' }),
  ],
  preview: {
    prepare: () => ({ title: 'Design Settings' }),
  },
})
