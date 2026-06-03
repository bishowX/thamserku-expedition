import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'designOption',
  title: 'Design Option',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Unique key stored in booking record and URL params',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Short subtitle shown below the label on the option card',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'value' },
  },
})
