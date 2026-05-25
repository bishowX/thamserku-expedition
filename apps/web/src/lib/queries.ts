import { serverClient } from "./sanity.server";

export type SanityEditionRef = {
  _id: string;
  letter: string;
  name: string;
  slug: { current: string };
};

export type SanityExpedition = {
  _id: string;
  number: string;
  code: string;
  name: string;
  slug: { current: string };
  altitude: string;
  region: string;
  season: string;
  style: string;
  positioning: string;
  image?: { asset: { _ref: string } } | null;
  editions: SanityEditionRef[];
};

export type SanityEdition = {
  _id: string;
  letter: string;
  name: string;
  subtitle: string;
  positioning: string;
  targetAudience: string;
  slug: { current: string };
};

export type SanityEditionFull = SanityEdition & {
  tag?: string;
  body1?: string;
  body2?: string;
  image?: { asset: { _ref: string } } | null;
  colorVariant?: 'dark' | 'light' | 'blue';
  isFlagship?: boolean;
  character?: string;
  privacyLevel?: string;
  comfortLevel?: string;
  comparisonStyle?: string;
  bestFor?: string;
  mountainNames?: string[];
};

export type SanityExpeditionForMatrix = {
  _id: string;
  name: string;
  altitude: string;
  editionLetters: string[];
};

export type SanityExpeditionForYeti = {
  _id: string;
  code: string;
  name: string;
  altitude: string;
  region: string;
  yetiAirNote?: string;
  yetiLodgesNote?: string;
  yetiAccessNote?: string;
  yetiContinuityNote?: string;
};

export type YetiPageData = {
  yetiPage: {
    heroHeadline?: string;
    heroSubheading?: string;
    heroStatOperations?: string;
    heroStatRegions?: string;
    heroStatContinuity?: string;
    heroStatStatus?: string;
    definitionHeading?: string;
    definitionTagline?: string;
    definitionBody1?: string;
    definitionBody2?: string;
    definitionBody3?: string;
    airHeading?: string;
    airTagline?: string;
    airBody?: string;
    airImage?: { asset: { _ref: string } } | null;
    airChannels?: string;
    airUseCases?: string;
    airAvailability?: string;
    airCoordination?: string;
    lodgesHeading?: string;
    lodgesTagline?: string;
    lodgesBody?: string;
    lodgesImage?: { asset: { _ref: string } } | null;
    lodgesRegions?: string;
    lodgesUseCases?: string;
    lodgesStandard?: string;
    lodgesStaffing?: string;
    accessHeading?: string;
    accessTagline?: string;
    accessBody?: string;
    accessImage?: { asset: { _ref: string } } | null;
    accessRegions?: string;
    accessUseCases?: string;
    accessContinuity?: string;
    accessHandling?: string;
    continuityHeading?: string;
    continuityTagline?: string;
    continuityBody1?: string;
    continuityBody2?: string;
    continuityImage?: { asset: { _ref: string } } | null;
    peakSectionHeading?: string;
    peakSectionTagline?: string;
    faqHeading?: string;
    faqTagline?: string;
    faqs?: Array<{ _key: string; question: string; answer: string }>;
    closingHeading?: string;
    closingBody?: string;
  } | null;
  expeditions: SanityExpeditionForYeti[];
};

export type SanityFieldNote = {
  _id: string;
  code: string;
  title: string;
  excerpt: string;
  byline: string;
  readTime: number;
  slug: { current: string };
};

export type SanityYetiPillar = {
  number: string;
  name: string;
  subtitle: string;
  body: string;
};


export type HomePageData = {
  homePage: {
    heroHeadline: string;
    heroSubheading: string;
    heroImage?: { asset: { _ref: string } } | null;
    atlasEyebrow: string;
    atlasHeading: string;
    atlasIntro: string;
    editionsEyebrow: string;
    editionsHeading: string;
    editionsIntro: string;
    manifestoEyebrow: string;
    manifestoHeading: string;
    manifestoBody: string;
    fieldNotesEyebrow: string;
    fieldNotesHeading: string;
    newsletterEyebrow: string;
    newsletterHeading: string;
    newsletterBody: string;
    newsletterCta: string;
    newsletterPrivacyNote: string;
    closingHeading: string;
    closingBody: string;
    featuredFieldNotes: SanityFieldNote[];
    chairmanLetter?: ChairmanLetterData | null;
    legacyEyebrow: string;
    legacyHeading: string;
    infrastructureEyebrow: string;
    infrastructureHeading: string;
    infrastructureIntro: string;
    infrastructurePillars: SanityYetiPillar[];
  } | null;
  expeditions: SanityExpedition[];
  editions: SanityEdition[];
};

export type EditionsPageData = {
  editionsPage: {
    heroHeadline?: string;
    heroSubheading?: string;
    manifestoHeading?: string;
    manifestoBody?: string;
    closingHeading?: string;
    closingBody?: string;
  } | null;
  editions: SanityEditionFull[];
  expeditions: SanityExpeditionForMatrix[];
};

export async function getHomePageData(): Promise<HomePageData> {
  return serverClient.fetch(`{
    "homePage": *[_type == "homePage"][0] {
      heroHeadline, heroSubheading, heroImage, atlasEyebrow, atlasHeading, atlasIntro, editionsEyebrow, editionsHeading, editionsIntro, manifestoEyebrow, manifestoHeading, manifestoBody,
      fieldNotesEyebrow, fieldNotesHeading,
      newsletterEyebrow, newsletterHeading, newsletterBody, newsletterCta, newsletterPrivacyNote,
      closingHeading, closingBody,
      featuredFieldNotes[]->{ _id, code, title, excerpt, byline, readTime, slug },
      chairmanLetter->{ eyebrow, heading, body, signature, organization, image, imageCaption },
      legacyEyebrow, legacyHeading,
      infrastructureEyebrow, infrastructureHeading, infrastructureIntro, infrastructurePillars
    },
    "expeditions": *[_type == "expedition"] | order(number asc) {
      _id, number, code, name, slug, altitude, region, season, style, positioning, image,
      editions[]->{ _id, letter, name, slug }
    },
    "editions": *[_type == "edition"] | order(letter asc) {
      _id, letter, name, subtitle, positioning, targetAudience, slug
    }
  }`);
}

export async function getYetiPageData(): Promise<YetiPageData> {
  return serverClient.fetch(`{
    "yetiPage": *[_type == "yetiInfrastructurePage"][0] {
      heroHeadline, heroSubheading,
      heroStatOperations, heroStatRegions, heroStatContinuity, heroStatStatus,
      definitionHeading, definitionTagline, definitionBody1, definitionBody2, definitionBody3,
      airHeading, airTagline, airBody, airImage, airChannels, airUseCases, airAvailability, airCoordination,
      lodgesHeading, lodgesTagline, lodgesBody, lodgesImage, lodgesRegions, lodgesUseCases, lodgesStandard, lodgesStaffing,
      accessHeading, accessTagline, accessBody, accessImage, accessRegions, accessUseCases, accessContinuity, accessHandling,
      continuityHeading, continuityTagline, continuityBody1, continuityBody2, continuityImage,
      peakSectionHeading, peakSectionTagline,
      faqHeading, faqTagline,
      faqs[] { _key, question, answer },
      closingHeading, closingBody
    },
    "expeditions": *[_type == "expedition"] | order(number asc) {
      _id, code, name, altitude, region,
      yetiAirNote, yetiLodgesNote, yetiAccessNote, yetiContinuityNote
    }
  }`);
}

export type LegacyTimelineChapter = {
  _key: string;
  roman: string;
  years: string;
  title: string;
  description: string;
  image?: { asset: { _ref: string } } | null;
};

export type LegacyRevivalPillar = {
  _key: string;
  label: string;
  quote: string;
};

export type LegacyLineageDataTile = {
  _key: string;
  label: string;
  value: string;
};

export type LegacyChairmanParagraph = {
  _key: string;
  text: string;
};

export type ChairmanLetterData = {
  eyebrow?: string;
  heading?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  signature?: string;
  organization?: string;
  image?: { asset: { _ref: string } } | null;
  imageCaption?: string;
};

export type LegacyPageData = {
  legacyPage: {
    heroEyebrow?: string;
    heroHeadline?: string;
    heroSubheading?: string;
    heroImage?: { asset: { _ref: string } } | null;
    heroMetaFeature?: string;
    heroMetaAtlas?: string;
    heroMetaReadTime?: string;
    heroMetaEra?: string;
    originEyebrow?: string;
    originYears?: string;
    originSideNote?: string;
    originBody1?: string;
    originBody2?: string;
    originPullQuote?: string;
    originImage?: { asset: { _ref: string } } | null;
    originImageCaption?: string;
    chairmanLetter?: ChairmanLetterData | null;
    timelineEyebrow?: string;
    timelineHeading?: string;
    timelineFooterNote?: string;
    timelineChapters?: LegacyTimelineChapter[];
    lineageEyebrow?: string;
    lineageHeading?: string;
    lineageBody1?: string;
    lineageBody2?: string;
    lineageDataTiles?: LegacyLineageDataTile[];
    revivalEyebrow?: string;
    revivalHeading?: string;
    revivalLeftQuote?: string;
    revivalLeftParagraph1?: string;
    revivalLeftParagraph2?: string;
    revivalLeftParagraph3?: string;
    revivalPillars?: LegacyRevivalPillar[];
    philosophyEyebrow?: string;
    philosophyHeadlinePart1?: string;
    philosophyHeadlinePart2?: string;
    philosophySubline?: string;
    newsletterEyebrow?: string;
    newsletterHeading?: string;
    newsletterBody?: string;
    newsletterPrivacyNote?: string;
  } | null;
};

export async function getLegacyPageData(): Promise<LegacyPageData> {
  return serverClient.fetch(`{
    "legacyPage": *[_type == "legacyPage"][0] {
      heroEyebrow, heroHeadline, heroSubheading, heroImage,
      heroMetaFeature, heroMetaAtlas, heroMetaReadTime, heroMetaEra,
      originEyebrow, originYears, originSideNote, originBody1, originBody2,
      originPullQuote, originImage, originImageCaption,
      chairmanLetter->{ eyebrow, heading, body, signature, organization, image, imageCaption },
      timelineEyebrow, timelineHeading, timelineFooterNote,
      timelineChapters[] { _key, roman, years, title, description, image },
      lineageEyebrow, lineageHeading, lineageBody1, lineageBody2,
      lineageDataTiles[] { _key, label, value },
      revivalEyebrow, revivalHeading, revivalLeftQuote,
      revivalLeftParagraph1, revivalLeftParagraph2, revivalLeftParagraph3,
      revivalPillars[] { _key, label, quote },
      philosophyEyebrow, philosophyHeadlinePart1, philosophyHeadlinePart2, philosophySubline,
      newsletterEyebrow, newsletterHeading, newsletterBody, newsletterPrivacyNote
    }
  }`);
}

export async function getEditionsPageData(): Promise<EditionsPageData> {
  return serverClient.fetch(`{
    "editionsPage": *[_type == "editionsPage"][0] {
      heroHeadline, heroSubheading, manifestoHeading, manifestoBody, closingHeading, closingBody
    },
    "editions": *[_type == "edition"] | order(letter asc) {
      _id, letter, name, subtitle, positioning, targetAudience, slug,
      tag, body1, body2, image, colorVariant, isFlagship,
      character, privacyLevel, comfortLevel, comparisonStyle, bestFor,
      "mountainNames": *[_type == "expedition" && references(^._id)] | order(number asc).name
    },
    "expeditions": *[_type == "expedition"] | order(number asc) {
      _id, name, altitude,
      "editionLetters": editions[]->letter
    }
  }`);
}

export type ConsultationMoment = {
  _key: string;
  marker?: string;
  title?: string;
  description?: string;
};

export type ConsultationStep = {
  _key: string;
  stepNumber?: string;
  marker?: string;
  title?: string;
  description?: string;
};

export type ConsultationContactOption = {
  _key: string;
  label?: string;
  title?: string;
  value?: string;
};

export type ConsultationPage = {
  heroHeadline?: string;
  heroSubheading?: string;
  heroImage?: { asset: { _ref: string } } | null;
  heroMetaResponse?: string;
  heroMetaHandledBy?: string;
  heroMetaLanguages?: string;
  heroMetaConfidentiality?: string;
  invitationHeading?: string;
  invitationBody?: string;
  trustQuote?: string;
  trustBody?: string;
  callCoversHeading?: string;
  callCoversSubheading?: string;
  callCoversMoments?: ConsultationMoment[];
  callCoversFootnote?: string;
  formSectionLabel?: string;
  formHeading?: string;
  formSubheading?: string;
  formAlternativeLabel?: string;
  formAlternativeSubheading?: string;
  formChapterATitle?: string;
  formChapterBTitle?: string;
  formChapterCTitle?: string;
  formChapterDTitle?: string;
  formChapterDSubheading?: string;
  formChapterETitle?: string;
  formChapterFTitle?: string;
  formEditionOptions?: string[];
  formSeasonOptions?: string[];
  formGroupOptions?: string[];
  formPrivacyOptions?: string[];
  formContactOptions?: string[];
  formTrekkingOptions?: string[];
  formAltitudeOptions?: string[];
  processHeading?: string;
  processSteps?: ConsultationStep[];
  processFootnote?: string;
  alternativeHeading?: string;
  alternativeOptions?: ConsultationContactOption[];
  closingLabel?: string;
  closingHeading?: string;
  closingBody?: string;
};

export type ConsultationPageData = {
  consultationPage: ConsultationPage | null;
  expeditions: Array<{ _id: string; name: string; code: string }>;
};

export type SanityAudienceTile = { label: string; subline: string; description: string };
export type SanityJourneyStage = { title: string; description: string; image?: { asset: { _ref: string } } | null };
export type SanityRouteWaypoint = { name: string; altitude: string };
export type SanityAvailableSeason = {
  name: string;
  dates: string;
  statusAlpine?: string;
  statusBespoke?: string;
  statusCrafted?: string;
  statusDefinitive?: string;
};
export type SanityFaqItem = { question: string; answer: string };
export type SanityInclusionCategory = { category: string; prefix: string; items: string[] };
export type SanitySafetyModule = { label: string; title: string; description: string };
export type SanityPreparationColumn = { title: string; items: string[] };
export type SanitySherpa = {
  name: string;
  portrait?: { asset: { _ref: string } } | null;
  region?: string;
  yearsActive?: string;
  mountainsSupported?: string;
  philosophyLine?: string;
};

export type SanityExpeditionDossier = {
  _id: string;
  number: string;
  code: string;
  name: string;
  slug: { current: string };
  altitude: string;
  region: string;
  season: string;
  style: string;
  positioning: string;
  image?: { asset: { _ref: string } } | null;
  heroImage?: { asset: { _ref: string } } | null;
  heroTagline?: string;
  heroSubtext?: string;
  duration?: string;
  expeditionStyleFact?: string;
  pricing?: string;
  overviewHeadline?: string;
  overviewBody?: string;
  overviewSideImage?: { asset: { _ref: string } } | null;
  whoItIsForHeadline?: string;
  audienceTiles?: SanityAudienceTile[];
  journeyStages?: SanityJourneyStage[];
  routeWaypoints?: SanityRouteWaypoint[];
  routePhilosophy?: string;
  acclimatisationNote?: string;
  summitWindowNote?: string;
  yetiAirNote?: string;
  yetiLodgesNote?: string;
  yetiAccessNote?: string;
  yetiContinuityNote?: string;
  editions?: Array<{ letter: string; name: string; subtitle: string; positioning: string; targetAudience: string }>;
  safetySupportHeadline?: string;
  safetyModules?: SanitySafetyModule[] | null;
  preparationHeadline?: string;
  preparationColumns?: SanityPreparationColumn[] | null;
  leadSherpa?: SanitySherpa | null;
  availableSeasons?: SanityAvailableSeason[];
  inclusionCategories?: SanityInclusionCategory[] | null;
  faqs?: SanityFaqItem[];
  closingImage?: { asset: { _ref: string } } | null;
  closingStatement?: string;
};

export async function getExpeditionBySlug(slug: string): Promise<SanityExpeditionDossier | null> {
  return serverClient.fetch(
    `*[_type == "expedition" && slug.current == $slug][0]{
      _id, number, code, name, slug,
      altitude, region, season, style, positioning, image,
      heroImage, heroTagline, heroSubtext,
      duration, expeditionStyleFact, pricing,
      overviewHeadline, overviewBody, overviewSideImage,
      whoItIsForHeadline,
      audienceTiles[]{ label, subline, description },
      journeyStages[]{ title, description, image },
      routeWaypoints[]{ name, altitude },
      routePhilosophy, acclimatisationNote, summitWindowNote,
      yetiAirNote, yetiLodgesNote, yetiAccessNote, yetiContinuityNote,
      safetySupportHeadline,
      safetyModules[]{ label, title, description },
      preparationHeadline,
      preparationColumns[]{ title, items },
      editions[]->{ letter, name, subtitle, positioning, targetAudience },
      leadSherpa->{ name, portrait, region, yearsActive, mountainsSupported, philosophyLine },
      availableSeasons[]{ name, dates, statusAlpine, statusBespoke, statusCrafted, statusDefinitive },
      inclusionCategories[]{ category, prefix, items },
      faqs[]{ question, answer },
      closingImage, closingStatement
    }`,
    { slug }
  );
}

export async function getExpeditions(): Promise<SanityExpedition[]> {
  return serverClient.fetch(
    `*[_type == "expedition"] | order(number asc) {
      _id, number, code, name, slug,
      altitude, region, season, style, positioning, image,
      editions[]->{ _id, letter, name, slug }
    }`
  );
}

export async function getConsultationPageData(): Promise<ConsultationPageData> {
  return serverClient.fetch(`{
    "consultationPage": *[_type == "consultationPage"][0] {
      heroHeadline, heroSubheading, heroImage,
      heroMetaResponse, heroMetaHandledBy, heroMetaLanguages, heroMetaConfidentiality,
      invitationHeading, invitationBody,
      trustQuote, trustBody,
      callCoversHeading, callCoversSubheading,
      callCoversMoments[] { _key, marker, title, description },
      callCoversFootnote,
      formSectionLabel, formHeading, formSubheading,
      formAlternativeLabel, formAlternativeSubheading,
      formChapterATitle, formChapterBTitle, formChapterCTitle,
      formChapterDTitle, formChapterDSubheading, formChapterETitle, formChapterFTitle,
      formEditionOptions, formSeasonOptions, formGroupOptions,
      formPrivacyOptions, formContactOptions, formTrekkingOptions, formAltitudeOptions,
      processHeading,
      processSteps[] { _key, stepNumber, marker, title, description },
      processFootnote,
      alternativeHeading,
      alternativeOptions[] { _key, label, title, value },
      closingLabel, closingHeading, closingBody
    },
    "expeditions": *[_type == "expedition"] | order(number asc) {
      _id, name, code
    }
  }`);
}
