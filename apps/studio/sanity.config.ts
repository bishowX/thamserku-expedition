import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

const singletons = ['homePage', 'editionsPage', 'legacyPage', 'yetiInfrastructurePage', 'consultationPage', 'siteSettings']

export default defineConfig({
  name: 'thamserku-expedition',
  title: 'Thamserku Expedition',

  projectId: 'ugjhuor8',
  dataset: 'production',

  plugins: [
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
            S.divider(),
            S.documentTypeListItem('expedition').title('Expeditions'),
            S.documentTypeListItem('edition').title('Editions'),
            S.documentTypeListItem('fieldNote').title('Field Notes'),
            S.documentTypeListItem('chairmanLetter').title("Chairman's Letters"),
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
