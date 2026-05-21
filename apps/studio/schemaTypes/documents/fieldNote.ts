import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'fieldNote',
  title: 'Field Note',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      description: 'e.g. FN / 01 — APPROACH',
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({
      name: 'byline',
      title: 'Byline',
      type: 'string',
      description: 'e.g. EXPEDITION DESK',
    }),
    defineField({ name: 'readTime', title: 'Read Time (minutes)', type: 'number' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  orderings: [
    { title: 'Published Date, New', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'code' },
  },
})
