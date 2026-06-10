import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool, defineLocations } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// Origin of the React Router app to preview. Override via SANITY_STUDIO_PREVIEW_ORIGIN.
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:5173'

// Static-location helper for the singleton page documents.
const pageLocation = (title: string, href: string) =>
  defineLocations({ resolve: () => ({ locations: [{ title, href }] }) })

const singletons = ['homePage', 'editionsPage', 'legacyPage', 'yetiInfrastructurePage', 'consultationPage', 'siteSettings', 'faqPage', 'safetyPage', 'achievementsPage']

export default defineConfig({
  name: 'thamserku-expedition',
  title: 'Thamserku Expedition',
  basePath: '/studio',

  projectId: 'ugjhuor8',
  dataset: 'production',

  plugins: [
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        preview: '/',
        previewMode: {
          enable: '/api/preview-mode/enable',
          disable: '/api/preview-mode/disable',
        },
      },
      resolve: {
        locations: {
          homePage: defineLocations({
            resolve: () => ({
              locations: [
                { title: 'Home', href: '/' },
                { title: 'Newsletter', href: '/newsletter' },
                { title: 'News & Field Reports', href: '/news-and-blogs' },
              ],
            }),
          }),
          editionsPage: pageLocation('Editions', '/editions'),
          legacyPage: pageLocation('Legacy', '/legacy'),
          consultationPage: pageLocation('Consultation', '/consultation'),
          yetiInfrastructurePage: pageLocation('Yeti Infrastructure', '/yeti-infrastructure'),
          faqPage: pageLocation('FAQ', '/faq'),
          safetyPage: pageLocation('Safety', '/safety'),
          achievementsPage: pageLocation('Heritage & Achievements', '/heritage-and-achievements'),
          expedition: defineLocations({
            select: { name: 'name', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [
                { title: doc?.name || 'Expedition', href: `/expeditions/${doc?.slug}` },
                { title: 'Design Your Expedition', href: '/design-your-expedition' },
              ],
            }),
          }),
          edition: defineLocations({
            select: { name: 'name' },
            resolve: (doc) => ({
              locations: [
                { title: doc?.name ? `${doc.name} · Editions` : 'Editions', href: '/editions' },
                { title: 'Home', href: '/' },
              ],
            }),
          }),
        },
      },
    }),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('Editions Page')
              .id('editionsPage')
              .child(S.document().schemaType('editionsPage').documentId('editionsPage')),
            S.listItem()
              .title('Legacy Page')
              .id('legacyPage')
              .child(S.document().schemaType('legacyPage').documentId('legacyPage')),
            S.listItem()
              .title('Yeti Infrastructure Page')
              .id('yetiInfrastructurePage')
              .child(S.document().schemaType('yetiInfrastructurePage').documentId('yetiInfrastructurePage')),
            S.listItem()
              .title('Consultation Page')
              .id('consultationPage')
              .child(S.document().schemaType('consultationPage').documentId('consultationPage')),
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('FAQ Page')
              .id('faqPage')
              .child(S.document().schemaType('faqPage').documentId('faqPage')),
            S.listItem()
              .title('Safety Page')
              .id('safetyPage')
              .child(S.document().schemaType('safetyPage').documentId('safetyPage')),
            S.listItem()
              .title('Achievements Page')
              .id('achievementsPage')
              .child(S.document().schemaType('achievementsPage').documentId('achievementsPage')),
            S.divider(),
            S.documentTypeListItem('expedition').title('Expeditions'),
            S.documentTypeListItem('edition').title('Editions'),
            S.divider(),
            S.documentTypeListItem('enquiry').title('Enquiries'),
            S.documentTypeListItem('newsletterSubscriber').title('Newsletter Subscribers'),
            S.divider(),
            S.documentTypeListItem('booking').title('Bookings'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Prevent creating new instances of singleton types
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },
})
