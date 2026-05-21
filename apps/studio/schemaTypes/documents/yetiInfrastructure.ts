import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'yetiInfrastructure',
  title: 'Yeti Infrastructure',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      of: [{ type: 'yetiPillar' }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Yeti Infrastructure' }),
  },
})
