import type { SchemaTypeDefinition } from 'sanity'
import edition from './documents/edition'
import editionsPage from './documents/editionsPage'
import expedition from './documents/expedition'
import fieldNote from './documents/fieldNote'
import homePage from './documents/homePage'
import legacyPage from './documents/legacyPage'
import chairmanLetter from './documents/chairmanLetter'
import siteSettings from './documents/siteSettings'
import yetiInfrastructurePage from './documents/yetiInfrastructurePage'
import yetiPillar from './objects/yetiPillar'
import timelineEra from './objects/timelineEra'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  homePage,
  editionsPage,
  legacyPage,
  yetiInfrastructurePage,
  siteSettings,
  // Collections
  expedition,
  edition,
  fieldNote,
  chairmanLetter,
  // Objects
  yetiPillar,
  timelineEra,
]
