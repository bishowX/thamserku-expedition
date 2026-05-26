import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'archivePage',
  title: 'Archive Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '01 — Hero' },
    { name: 'intro', title: '02 — Intro' },
    { name: 'filters', title: '03 — Filters' },
    { name: 'grid', title: '04 — Grid' },
    { name: 'featured', title: '05 — Featured' },
    { name: 'detail', title: '06 — Record Detail' },
    { name: 'verification', title: '07 — Verification' },
    { name: 'closing', title: '08 — Closing' },
  ],
  fields: [
    // 01 — Hero
    defineField({ name: 'heroHeadline', title: 'Headline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubline', title: 'Subline', type: 'text', rows: 2, group: 'hero' }),

    // 02 — Intro
    defineField({ name: 'introEyebrow', title: 'Eyebrow', type: 'string', group: 'intro' }),
    defineField({ name: 'introTitle', title: 'Title', type: 'string', group: 'intro' }),
    defineField({ name: 'introSubtitle', title: 'Subtitle (italic)', type: 'string', group: 'intro' }),
    defineField({ name: 'introBody1', title: 'Body Paragraph 1', type: 'text', rows: 4, group: 'intro' }),
    defineField({ name: 'introBody2', title: 'Body Paragraph 2', type: 'text', rows: 4, group: 'intro' }),
    defineField({ name: 'introBody3', title: 'Body Paragraph 3', type: 'text', rows: 4, group: 'intro' }),

    // 03 — Filters
    defineField({ name: 'filterPeakLabel', title: 'Peak Filter Label', type: 'string', group: 'filters' }),
    defineField({ name: 'filterPeakDefault', title: 'Peak Filter Default', type: 'string', group: 'filters' }),
    defineField({ name: 'filterYearLabel', title: 'Year Filter Label', type: 'string', group: 'filters' }),
    defineField({ name: 'filterYearDefault', title: 'Year Filter Default', type: 'string', group: 'filters' }),
    defineField({ name: 'filterTypeLabel', title: 'Type Filter Label', type: 'string', group: 'filters' }),
    defineField({ name: 'filterTypeDefault', title: 'Type Filter Default', type: 'string', group: 'filters' }),
    defineField({ name: 'filterSortLabel', title: 'Sort Label', type: 'string', group: 'filters' }),
    defineField({ name: 'filterSortDefault', title: 'Sort Default', type: 'string', group: 'filters' }),
    defineField({ name: 'filterResetLabel', title: 'Reset Filters Label', type: 'string', group: 'filters' }),

    // 04 — Grid
    defineField({ name: 'gridRegionLabel', title: 'Region Field Label', type: 'string', group: 'grid' }),
    defineField({ name: 'gridRegionSuffix', title: 'Region Suffix (e.g. ", NEPAL")', type: 'string', group: 'grid' }),
    defineField({ name: 'gridEditionTypeLabel', title: 'Edition Type Label', type: 'string', group: 'grid' }),
    defineField({ name: 'gridNoteLabel', title: 'Note Label', type: 'string', group: 'grid' }),
    defineField({ name: 'gridLoadMoreLabel', title: 'Load More Button Label', type: 'string', group: 'grid' }),
    defineField({ name: 'gridDisclaimer', title: 'Grid Disclaimer', type: 'text', rows: 2, group: 'grid' }),
    defineField({ name: 'statusVerifiedLabel', title: 'Status: Verified Label', type: 'string', group: 'grid' }),
    defineField({ name: 'statusPermissionLabel', title: 'Status: Permission Required Label', type: 'string', group: 'grid' }),
    defineField({ name: 'statusPrivateLabel', title: 'Status: Private Label', type: 'string', group: 'grid' }),

    // 05 — Featured
    defineField({ name: 'featuredEyebrow', title: 'Eyebrow', type: 'string', group: 'featured' }),
    defineField({ name: 'featuredHeading', title: 'Heading', type: 'string', group: 'featured' }),
    defineField({ name: 'featuredSubline', title: 'Subline', type: 'string', group: 'featured' }),
    defineField({ name: 'featuredCardLabel', title: 'Card Label (e.g. "FEATURED")', type: 'string', group: 'featured' }),
    defineField({ name: 'featuredButtonLabel', title: 'Button Label', type: 'string', group: 'featured' }),

    // 06 — Record Detail
    defineField({ name: 'detailEyebrow', title: 'Eyebrow', type: 'string', group: 'detail' }),
    defineField({ name: 'detailHeading', title: 'Heading', type: 'string', group: 'detail' }),
    defineField({ name: 'detailSubline', title: 'Subline', type: 'string', group: 'detail' }),
    defineField({
      name: 'detailRecord',
      title: 'Featured Record',
      type: 'reference',
      to: [{ type: 'archiveRecord' }],
      group: 'detail',
    }),
    defineField({ name: 'detailYearLabel', title: 'Year Label', type: 'string', group: 'detail' }),
    defineField({ name: 'detailPeakLabel', title: 'Peak Label', type: 'string', group: 'detail' }),
    defineField({ name: 'detailRouteLabel', title: 'Route / Region Label', type: 'string', group: 'detail' }),
    defineField({ name: 'detailTypeLabel', title: 'Expedition Type Label', type: 'string', group: 'detail' }),
    defineField({ name: 'detailNotableLabel', title: 'Notable Detail Label', type: 'string', group: 'detail' }),
    defineField({ name: 'detailSourceLabel', title: 'Source Label', type: 'string', group: 'detail' }),
    defineField({ name: 'detailPermissionLabel', title: 'Permission Status Label', type: 'string', group: 'detail' }),
    defineField({ name: 'detailRelatedLabel', title: 'Related Expedition Label', type: 'string', group: 'detail' }),
    defineField({ name: 'detailFooter', title: 'Footer Text', type: 'text', rows: 3, group: 'detail' }),

    // 07 — Verification
    defineField({ name: 'verificationEyebrow', title: 'Eyebrow', type: 'string', group: 'verification' }),
    defineField({ name: 'verificationHeading', title: 'Heading', type: 'string', group: 'verification' }),
    defineField({
      name: 'verificationBlocks',
      title: 'Verification Blocks',
      type: 'array',
      of: [{ type: 'archiveVerificationBlock' }],
      group: 'verification',
    }),
    defineField({ name: 'verificationFooter', title: 'Footer Text', type: 'text', rows: 2, group: 'verification' }),

    // 08 — Closing
    defineField({ name: 'closingEyebrow', title: 'Eyebrow', type: 'string', group: 'closing' }),
    defineField({ name: 'closingHeadline', title: 'Headline', type: 'string', group: 'closing' }),
    defineField({ name: 'closingBody', title: 'Body', type: 'text', rows: 3, group: 'closing' }),
    defineField({ name: 'closingPrimaryButtonLabel', title: 'Primary Button Label', type: 'string', group: 'closing' }),
    defineField({ name: 'closingPrimaryButtonHref', title: 'Primary Button Link', type: 'string', group: 'closing' }),
    defineField({ name: 'closingSecondaryButtonLabel', title: 'Secondary Button Label', type: 'string', group: 'closing' }),
    defineField({ name: 'closingSecondaryButtonHref', title: 'Secondary Button Link', type: 'string', group: 'closing' }),
  ],
  preview: { prepare: () => ({ title: 'Archive Page' }) },
})
