import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'statItem',
  title: 'Stat Item',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. 37+, 800+, 87%' }),
    defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. Years, Expeditions, Success Rate' }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
    prepare: ({ title, subtitle }: { title: string; subtitle: string }) => ({ title, subtitle }),
  },
})
