import type { SchemaTypeDefinition } from 'sanity'
import enquiry from './documents/enquiry'
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
import archiveRecord from './documents/archiveRecord'
import teamPage from './documents/teamPage'
import sevenThousandMeterPage from './documents/sevenThousandMeterPage'
import privateExpeditionsPage from './documents/privateExpeditionsPage'
import yetiPillar from './objects/yetiPillar'
import timelineEra from './objects/timelineEra'
import consultationMoment from './objects/consultationMoment'
import consultationStep from './objects/consultationStep'
import consultationContactOption from './objects/consultationContactOption'
import audienceTile from './objects/audienceTile'
import journeyStage from './objects/journeyStage'
import routeWaypoint from './objects/routeWaypoint'
import availableSeason from './objects/availableSeason'
import faqItem from './objects/faqItem'
import safetyModule from './objects/safetyModule'
import preparationColumn from './objects/preparationColumn'
import inclusionCategory from './objects/inclusionCategory'
import archiveVerificationBlock from './objects/archiveVerificationBlock'

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
  teamPage,
  sevenThousandMeterPage,
  privateExpeditionsPage,
  // Collections
  expedition,
  edition,
  sherpa,
  fieldNote,
  archiveRecord,
  chairmanLetter,
  enquiry,
  // Objects
  yetiPillar,
  timelineEra,
  consultationMoment,
  consultationStep,
  consultationContactOption,
  audienceTile,
  journeyStage,
  routeWaypoint,
  availableSeason,
  faqItem,
  safetyModule,
  preparationColumn,
  inclusionCategory,
  archiveVerificationBlock,
]
