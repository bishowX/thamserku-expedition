import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('./app/pages/Home.tsx'),
  route('everest', './app/pages/Everest.tsx'),
  route('expeditions/:slug', './app/pages/ExpeditionDossier.tsx'),
  route('atlas', './app/pages/AtlasPage.tsx'),
  route('editions', './app/pages/EditionsPage.tsx'),
  route('legacy', './app/pages/LegacyPage.tsx'),
  route('team', './app/pages/TeamPage.tsx'),
  route('consultation', './app/pages/EnquiryPage.tsx'),
  route('archive', './app/pages/ExpeditionArchive.tsx'),
  route('yeti-infrastructure', './app/pages/YetiInfrastructure.tsx'),
  route('7000m', './app/pages/SevenThousandMeterPathway.tsx'),
  route('private', './app/pages/PrivateExpeditions.tsx'),
  route('field-notes', './app/pages/FieldNotes.tsx'),
  route('faq', './app/pages/MainFAQ.tsx'),
  route('api/upload-cv', './app/api/upload-cv.ts'),
] satisfies RouteConfig
