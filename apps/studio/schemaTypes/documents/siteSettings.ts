import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'site', title: 'Site' },
    { name: 'contact', title: 'Contact' },
    { name: 'enquiry', title: 'Enquiry' },
    { name: 'newsletter', title: 'Newsletter' },
  ],
  fields: [
    // Site
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'site' }),
    defineField({ name: 'foundingYear', title: 'Founding Year', type: 'number', group: 'site' }),
    defineField({ name: 'copyrightLine', title: 'Copyright Line', type: 'string', group: 'site' }),
    // Contact
    defineField({ name: 'contactEmail', title: 'Primary Contact Email', type: 'string', group: 'contact', description: 'Shown in the footer and confirmation emails (e.g. info@thamserkuexpedition.com).' }),
    defineField({ name: 'contactEmailKushal', title: 'Secondary Contact Email', type: 'string', group: 'contact', description: 'Second email shown in the footer.' }),
    defineField({ name: 'contactWhatsApp', title: 'WhatsApp Number (digits only)', type: 'string', group: 'contact', description: 'Raw digits used for the wa.me link — no spaces or symbols (e.g. 97797052216623).' }),
    defineField({ name: 'contactWhatsAppDisplay', title: 'WhatsApp Display Text', type: 'string', group: 'contact', description: 'Human-readable number shown in emails (e.g. +977 9705221662).' }),
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
