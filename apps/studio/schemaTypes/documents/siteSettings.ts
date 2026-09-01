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
    { name: 'seo', title: 'SEO' },
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

    // SEO — site-wide fallbacks used by every page when its own SEO fields and
    // hero content are blank. `siteName` is appended to every page title.
    defineField({ name: 'address', title: 'Office Address', type: 'postalAddress', group: 'seo', description: 'Published as Organization / LocalBusiness structured data. Match your Google Business Profile exactly.' }),
    defineField({
      name: 'socialProfiles',
      title: 'Social Profile URLs',
      type: 'array',
      of: [{ type: 'url' }],
      group: 'seo',
      description: 'Full URLs to your Instagram, Facebook, X, LinkedIn and YouTube profiles. Published as Organization.sameAs so Google can link the brand to its accounts.',
    }),
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', group: 'seo', description: 'Appended to every page title, e.g. "Ama Dablam Expedition | Thamserku Expedition".' }),
    defineField({ name: 'seo', title: 'Site Defaults', type: 'seo', group: 'seo', description: 'Used on the homepage and as the fallback for any page missing its own title, description or share image.' }),
    defineField({ name: 'newsletterSeo', title: 'Newsletter Page', type: 'seo', group: 'seo', description: 'SEO for /newsletter, which has no page document of its own.' }),
    defineField({ name: 'newsAndBlogsSeo', title: 'News & Field Reports Page', type: 'seo', group: 'seo', description: 'SEO for /news-and-blogs, which has no page document of its own.' }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
