import type { SchemaTypeDefinition } from 'sanity'
import edition from './documents/edition'
import expedition from './documents/expedition'
import fieldNote from './documents/fieldNote'
import homePage from './documents/homePage'
import legacy from './documents/legacy'
import siteSettings from './documents/siteSettings'
import yetiInfrastructure from './documents/yetiInfrastructure'
import yetiPillar from './objects/yetiPillar'
import timelineEra from './objects/timelineEra'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  homePage,
  siteSettings,
  yetiInfrastructure,
  legacy,
  // Collections
  expedition,
  edition,
  fieldNote,
  // Objects
  yetiPillar,
  timelineEra,
]
