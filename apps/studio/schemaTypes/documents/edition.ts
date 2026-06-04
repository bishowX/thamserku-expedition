import { defineType, defineField } from "sanity";

export default defineType({
  name: "edition",
  title: "Edition",
  type: "document",
  fields: [
    defineField({
      name: "letter",
      title: "Letter",
      type: "string",
      description: "A, B, C, D, or E",
      validation: (Rule) => Rule.required().max(1),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Signature",
      type: "string",
      description: "e.g. The essential expedition.",
    }),
    defineField({
      name: "positioning",
      title: "Positioning",
      type: "text",
      rows: 3,
      description: "Short description used on the homepage atlas card chips.",
    }),
    defineField({
      name: "targetAudience",
      title: "Target Audience",
      type: "text",
      rows: 2,
      description: "Displayed in the WHO IT IS FOR row on the homepage.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "isStandard",
      title: "Standard Edition",
      type: "boolean",
      initialValue: false,
      description: "Marks this as the standard edition. Shows a 'STANDARD EDITION' badge on the edition band.",
    }),

    // Band display
    defineField({
      name: "tag",
      title: "Band Tag",
      type: "string",
      description: "e.g. THE DISCIPLINED CLIMB — shown above the large letter.",
    }),
    defineField({
      name: "body1",
      title: "Body — Paragraph 1",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "body2",
      title: "Body — Paragraph 2",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Band Image",
      type: "image",
      options: { hotspot: true },
      description: "Background image used in the edition band.",
    }),
    defineField({
      name: "colorVariant",
      title: "Colour Variant",
      type: "string",
      options: {
        list: [
          { title: "Dark (#1A1A1A)", value: "dark" },
          { title: "Light (#F4F2EC)", value: "light" },
          { title: "Blue (#2E353C)", value: "blue" },
        ],
        layout: "radio",
      },
    }),
    // Comparison table
    defineField({
      name: "character",
      title: "Character",
      type: "string",
      description: "e.g. Disciplined",
    }),
    defineField({
      name: "privacyLevel",
      title: "Privacy Level",
      type: "string",
      description: "e.g. Standard",
    }),
    defineField({
      name: "comfortLevel",
      title: "Comfort Level",
      type: "string",
      description: "e.g. Essential",
    }),
    defineField({
      name: "comparisonStyle",
      title: "Style (comparison table)",
      type: "string",
      description: "e.g. Disciplined climb",
    }),
    defineField({
      name: "bestFor",
      title: "Best For",
      type: "string",
      description: "e.g. Experienced climbers",
    }),
    defineField({
      name: "designDefaults",
      title: "Design Defaults",
      type: "object",
      description: "Default selections pre-populated when this edition is chosen in the Design Your Expedition configurator",
      fields: [
        defineField({ name: "ktmHotel", title: "KTM Hotel", type: "string", description: "Must match a value key in Design Settings" }),
        defineField({ name: "trekLodge", title: "Trek Lodge", type: "string" }),
        defineField({ name: "trekGuide", title: "Trek Guide", type: "string" }),
        defineField({ name: "climbGuide", title: "Climb Guide", type: "string" }),
        defineField({ name: "sherpaRatio", title: "Sherpa Ratio", type: "string" }),
        defineField({ name: "oxygenBottles", title: "Oxygen Bottles", type: "number" }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Letter",
      name: "letterAsc",
      by: [{ field: "letter", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "letter" },
    prepare: ({ title, subtitle }: { title: string; subtitle: string }) => ({
      title,
      subtitle: `Edition ${subtitle}`,
    }),
  },
});
