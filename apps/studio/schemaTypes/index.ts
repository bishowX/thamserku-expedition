import type { SchemaTypeDefinition } from 'sanity'
import enquiry from './documents/enquiry'
import booking from './documents/booking'
import edition from './documents/edition'
import editionsPage from './documents/editionsPage'
import expedition from './documents/expedition'
import fieldNote from './documents/fieldNote'
import atlasPage from './documents/atlasPage'
import homePage from './documents/homePage'
import legacyPage from './documents/legacyPage'
import chairmanLetter from './documents/chairmanLetter'
import consultationPage from './documents/consultationPage'
import siteSettings from './documents/siteSettings'
import yetiInfrastructurePage from './documents/yetiInfrastructurePage'
import sherpa from './documents/sherpa'
import fieldNotesPage from './documents/fieldNotesPage'
import faqPage from './documents/faqPage'
import archivePage from './documents/archivePage'
import safetyPage from './documents/safetyPage'
import archiveRecord from './documents/archiveRecord'
import teamPage from './documents/teamPage'
import sevenThousandMeterPage from './documents/sevenThousandMeterPage'
import privateExpeditionsPage from './documents/privateExpeditionsPage'
import achievementsPage from './documents/achievementsPage'
import timelineEra from './objects/timelineEra'
import consultationMoment from './objects/consultationMoment'
import consultationStep from './objects/consultationStep'
import consultationContactOption from './objects/consultationContactOption'
import audienceTile from './objects/audienceTile'
import routeWaypoint from './objects/routeWaypoint'
import faqItem from './objects/faqItem'
import inclusionCategory from './objects/inclusionCategory'
import archiveVerificationBlock from './objects/archiveVerificationBlock'
import configOption from './objects/configOption'
import configItem from './objects/configItem'
import oxygenEdition from './objects/oxygenEdition'
import editionConfig from './objects/editionConfig'
import designConfig from './objects/designConfig'
import statItem from './objects/statItem'
import legacyTimelineItem from './objects/legacyTimelineItem'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  atlasPage,
  homePage,
  editionsPage,
  legacyPage,
  yetiInfrastructurePage,
  consultationPage,
  siteSettings,
  fieldNotesPage,
  faqPage,
  archivePage,
  safetyPage,
  teamPage,
  sevenThousandMeterPage,
  privateExpeditionsPage,
  achievementsPage,
  // Collections
  expedition,
  edition,
  sherpa,
  fieldNote,
  archiveRecord,
  chairmanLetter,
  enquiry,
  booking,
  // Objects
  timelineEra,
  consultationMoment,
  consultationStep,
  consultationContactOption,
  audienceTile,
  routeWaypoint,
  faqItem,
  inclusionCategory,
  archiveVerificationBlock,
  configOption,
  configItem,
  oxygenEdition,
  editionConfig,
  designConfig,
  statItem,
  legacyTimelineItem,
]
