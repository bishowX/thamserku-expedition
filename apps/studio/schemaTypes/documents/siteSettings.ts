import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'site', title: 'Site' },
    { name: 'enquiry', title: 'Enquiry' },
    { name: 'newsletter', title: 'Newsletter' },
  ],
  fields: [
    // Site
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'site' }),
    defineField({ name: 'foundingYear', title: 'Founding Year', type: 'number', group: 'site' }),
    defineField({ name: 'copyrightLine', title: 'Copyright Line', type: 'string', group: 'site' }),
    // Enquiry
    defineField({ name: 'enquiryEmail', title: 'Enquiry Notification Email', type: 'string', group: 'enquiry', description: 'Submission notifications are sent to this address.' }),

    // Newsletter
    defineField({ name: 'newsletterHeading', title: 'Heading', type: 'string', group: 'newsletter' }),
    defineField({ name: 'newsletterBody', title: 'Body', type: 'text', rows: 3, group: 'newsletter' }),
    defineField({ name: 'newsletterCadence', title: 'Cadence', type: 'string', group: 'newsletter', description: 'e.g. quarterly' }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
