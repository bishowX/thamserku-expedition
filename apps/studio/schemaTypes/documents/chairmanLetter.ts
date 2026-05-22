import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'chairmanLetter',
  title: "Chairman's Letter",
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'content', description: "e.g. THE CHAIRMAN'S LETTER" }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', group: 'content' }),
    defineField({
      name: 'body',
      title: 'Letter Body',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'signature', title: 'Signature', type: 'string', group: 'content', description: 'e.g. — The Chairman' }),
    defineField({ name: 'organization', title: 'Organization Label', type: 'string', group: 'content', description: 'e.g. THAMSERKU EXPEDITIONS · YETI GROUP' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, group: 'media' }),
    defineField({ name: 'imageCaption', title: 'Image Caption', type: 'string', group: 'media', description: 'e.g. MT. EVEREST · 8848M · MAHALANGUR HIMAL' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }: { title?: string }) => ({ title: title ?? "Chairman's Letter" }),
  },
})
