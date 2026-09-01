import { defineType, defineField } from 'sanity'

// Feeds Organization / LocalBusiness JSON-LD. Google reads a physical address
// as a trust signal on transactional sites; without one the Organization markup
// is thin. Keep it identical to the address on Google Business Profile.
export default defineType({
  name: 'postalAddress',
  title: 'Address',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: 'streetAddress', title: 'Street Address', type: 'string' }),
    defineField({ name: 'addressLocality', title: 'City', type: 'string', description: 'e.g. Kathmandu' }),
    defineField({ name: 'addressRegion', title: 'Region / Province', type: 'string' }),
    defineField({ name: 'postalCode', title: 'Postal Code', type: 'string' }),
    defineField({
      name: 'addressCountry',
      title: 'Country Code',
      type: 'string',
      description: 'Two-letter ISO code, e.g. NP for Nepal.',
      validation: (Rule) => Rule.length(2).warning('Use the two-letter ISO country code, e.g. NP.'),
    }),
    defineField({ name: 'latitude', title: 'Latitude', type: 'number', description: 'Optional. Only used if both latitude and longitude are set.' }),
    defineField({ name: 'longitude', title: 'Longitude', type: 'number' }),
  ],
})
