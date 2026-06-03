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
  bestFor?: string;
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
    faqHeading?: string;
    faqTagline?: string;
    faqs?: Array<{ _key: string; question: string; answer: string }>;
    closingHeading?: string;
    closingBody?: string;
  } | null;
};

export type SanityFieldNote = {
  _id: string;
  code: string;
  title: string;
  excerpt: string;
  byline: string;
  readTime: number;
  slug: { current: string };
  coverImage?: { asset: { _ref: string } } | null;
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
    manifestoStats: { value: string; label: string }[];
    fieldNotesEyebrow: string;
    fieldNotesHeading: string;
    newsletterEyebrow: string;
    newsletterHeading: string;
    newsletterBody: string;
    newsletterCta: string;
    newsletterPrivacyNote: string;
    closingEyebrow: string;
    closingHeading: string;
    closingBody: string;
    closingImage?: { asset: { _ref: string } } | null;
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
    heroImage?: { asset: { _ref: string } } | null;
    manifestoEyebrow?: string;
    manifestoHeading?: string;
    manifestoBody?: string;
    comparisonEyebrow?: string;
    comparisonHeadline?: string;
    comparisonNote?: string;
    availabilityEyebrow?: string;
    availabilityHeadline?: string;
    availabilityNote?: string;
    closingEyebrow?: string;
    closingHeading?: string;
    closingBody?: string;
    closingFootnote?: string;
  } | null;
  editions: SanityEditionFull[];
  expeditions: SanityExpeditionForMatrix[];
};

export async function getHomePageData(): Promise<HomePageData> {
  return serverClient.fetch(`{
    "homePage": *[_type == "homePage"][0] {
      heroHeadline, heroSubheading, heroImage, atlasEyebrow, atlasHeading, atlasIntro, editionsEyebrow, editionsHeading, editionsIntro, manifestoEyebrow, manifestoHeading, manifestoBody, manifestoStats,
      fieldNotesEyebrow, fieldNotesHeading,
      newsletterEyebrow, newsletterHeading, newsletterBody, newsletterCta, newsletterPrivacyNote,
      closingEyebrow, closingHeading, closingBody, closingImage,
      featuredFieldNotes[]->{ _id, code, title, excerpt, byline, readTime, slug, coverImage },
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
      faqHeading, faqTagline,
      faqs[] { _key, question, answer },
      closingHeading, closingBody
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
    newsletterEyebrow?: string;
    newsletterHeading?: string;
    newsletterBody?: string;
    newsletterPrivacyNote?: string;
    closingEyebrow?: string;
    closingHeading?: string;
    closingImage?: { asset: { _ref: string } } | null;
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
      newsletterEyebrow, newsletterHeading, newsletterBody, newsletterPrivacyNote,
      closingEyebrow, closingHeading, closingImage
    }
  }`);
}

export async function getEditionsPageData(): Promise<EditionsPageData> {
  return serverClient.fetch(`{
    "editionsPage": *[_type == "editionsPage"][0] {
      heroHeadline, heroSubheading, heroImage, manifestoEyebrow, manifestoHeading, manifestoBody,
      comparisonEyebrow, comparisonHeadline, comparisonNote,
      availabilityEyebrow, availabilityHeadline, availabilityNote,
      closingEyebrow, closingHeading, closingBody, closingFootnote
    },
    "editions": *[_type == "edition"] | order(letter asc) {
      _id, letter, name, subtitle, positioning, targetAudience, slug,
      tag, body1, body2, image, colorVariant,
      character, privacyLevel, comfortLevel, comparisonStyle, bestFor,
      "mountainNames": *[_type == "expedition" && references(^._id)] | order(number asc).name
    },
    "expeditions": *[_type == "expedition"] | order(number asc) {
      _id, name, altitude,
      "editionLetters": editions[]->letter
    }
  }`);
}

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
  formSectionLabel?: string;
  formAlternativeLabel?: string;
  formAlternativeSubheading?: string;
  formChapterATitle?: string;
  formContactOptions?: string[];
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
  availableSeasons?: SanityAvailableSeason[];
  inclusionCategories?: SanityInclusionCategory[] | null;
  exclusions?: string[] | null;
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
      availableSeasons[]{ name, dates, statusAlpine, statusBespoke, statusCrafted, statusDefinitive },
      inclusionCategories[]{ category, prefix, items },
      exclusions,
      faqs[]{ question, answer },
      closingImage, closingStatement
    }`,
    { slug }
  );
}

export type AtlasPageData = {
  atlasPage: {
    heroHeadline?: string;
    heroSubheading?: string;
    heroImage?: { asset: { _ref: string } } | null;
    controlsEyebrow?: string;
    controlsSubline?: string;
    comparisonEyebrow?: string;
    comparisonHeadline?: string;
    comparisonNote?: string;
    pathwayEyebrow?: string;
    pathwayHeading?: string;
    pathwaySubheading?: string;
    pathwayBody?: string;
    pathwayCta1Label?: string;
    pathwayCta1Href?: string;
    pathwayCta2Label?: string;
    pathwayCta2Href?: string;
    pathwayFootnote?: string;
    seasonalGuideEyebrow?: string;
    seasonalGuideHeadline?: string;
    springWindowLabel?: string;
    springWindowDescription?: string;
    autumnWindowLabel?: string;
    autumnWindowDescription?: string;
    offSeasonLabel?: string;
    offSeasonDescription?: string;
    faqEyebrow?: string;
    faqHeadline?: string;
    faqSubheading?: string;
    faqCtaLabel?: string;
    faqs?: Array<{ _key: string; question: string; answer: string }>;
    closingEyebrow?: string;
    closingHeadline?: string;
    closingBody?: string;
    closingFootnote?: string;
    closingImage?: { asset: { _ref: string } } | null;
  } | null;
  expeditions: SanityExpedition[];
};

export async function getAtlasPageData(): Promise<AtlasPageData> {
  return serverClient.fetch(`{
    "atlasPage": *[_type == "atlasPage"][0] {
      heroHeadline, heroSubheading, heroImage, controlsEyebrow, controlsSubline,
      comparisonEyebrow, comparisonHeadline, comparisonNote,
      pathwayEyebrow, pathwayHeading, pathwaySubheading, pathwayBody,
      pathwayCta1Label, pathwayCta1Href, pathwayCta2Label, pathwayCta2Href, pathwayFootnote,
      seasonalGuideEyebrow, seasonalGuideHeadline,
      springWindowLabel, springWindowDescription,
      autumnWindowLabel, autumnWindowDescription,
      offSeasonLabel, offSeasonDescription,
      faqEyebrow, faqHeadline, faqSubheading, faqCtaLabel,
      faqs[] { _key, question, answer },
      closingEyebrow, closingHeadline, closingBody,
      closingFootnote, closingImage
    },
    "expeditions": *[_type == "expedition"] | order(number asc) {
      _id, number, code, name, slug, altitude, region, season, style, bestFor, positioning, image,
      editions[]->{ _id, letter, name, slug }
    }
  }`);
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
      formSectionLabel, formAlternativeLabel, formAlternativeSubheading,
      formChapterATitle, formContactOptions,
      processHeading,
      processSteps[] { _key, stepNumber, marker, title, description },
      processFootnote,
      alternativeHeading,
      alternativeOptions[] { _key, label, title, value },
      closingLabel, closingHeading, closingBody
    }
  }`);
}

// ─── Field Notes Page ───────────────────────────────────────────────────────

export type FieldNotesCategory = {
  name: string;
  description: string;
  articleCount: string;
};

export type FieldNotesPageFields = {
  heroHeadline: string;
  heroSubline: string;
  categoriesEyebrow: string;
  categoriesHeadline: string;
  categories: FieldNotesCategory[];
  featuredEyebrow: string;
  featuredHeadline: string;
  featuredSubline: string;
  archiveEyebrow: string;
  archiveHeadline: string;
  archiveSubline: string;
  newsletterEyebrow: string;
  newsletterHeadline: string;
  newsletterHeadlineAccent: string;
  newsletterBody: string;
  newsletterBodySecondary: string;
  newsletterInputPlaceholder: string;
  newsletterPrivacyLine: string;
  newsletterBottomNote: string;
  closingEyebrow: string;
  closingHeadline: string;
  closingBody: string;
};

export type FieldNotesPageData = {
  fieldNotesPage: FieldNotesPageFields;
  fieldNotes: SanityFieldNote[];
};

export async function getFieldNotesPageData(): Promise<FieldNotesPageData> {
  return serverClient.fetch(`{
    "fieldNotesPage": *[_type == "fieldNotesPage"][0] {
      heroHeadline, heroSubline,
      categoriesEyebrow, categoriesHeadline,
      categories[] { name, description, articleCount },
      featuredEyebrow, featuredHeadline, featuredSubline,
      archiveEyebrow, archiveHeadline, archiveSubline,
      newsletterEyebrow, newsletterHeadline, newsletterHeadlineAccent,
      newsletterBody, newsletterBodySecondary, newsletterInputPlaceholder,
      newsletterPrivacyLine, newsletterBottomNote,
      closingEyebrow, closingHeadline, closingBody
    },
    "fieldNotes": *[_type == "fieldNote"] | order(publishedAt desc) {
      _id, code, title, excerpt, byline, readTime, slug, coverImage, publishedAt
    }
  }`);
}

// ─── FAQ Page ────────────────────────────────────────────────────────────────

export type FAQPageItem = {
  question: string;
  answer: string;
  linkText: string;
  linkTo: string;
};

export type FAQPageCategory = {
  label: string;
  title: string;
  subtitle: string;
  items: FAQPageItem[];
};

export type FAQRelatedPage = {
  eyebrow: string;
  title: string;
  desc: string;
  linkText: string;
  linkTo: string;
};

export type FAQQuickItem = {
  _key: string;
  question: string;
  answer: string;
};

export type FAQPageData = {
  faqPage: {
    heroHeadline?: string;
    heroSubline?: string;
    categoryNavEyebrow?: string;
    categoryNavHeadline?: string;
    listEyebrow?: string;
    categories?: FAQPageCategory[];
    quickFaqEyebrow?: string;
    quickFaqHeadline?: string;
    quickFaqSubheading?: string;
    quickFaqs?: FAQQuickItem[];
    relatedPagesEyebrow?: string;
    relatedPagesHeadline?: string;
    relatedPages?: FAQRelatedPage[];
    newsletterEyebrow?: string;
    newsletterHeadline?: string;
    newsletterBody?: string;
    newsletterPrivacyLine?: string;
    newsletterBottomNote?: string;
    closingHeadline?: string;
    closingBody?: string;
    closingDisclaimerLine?: string;
  } | null;
};

export async function getFAQPageData(): Promise<FAQPageData> {
  return serverClient.fetch(`{
    "faqPage": *[_type == "faqPage"][0] {
      heroHeadline, heroSubline,
      categoryNavEyebrow, categoryNavHeadline,
      listEyebrow,
      categories[] { label, title, subtitle, items[] { question, answer, linkText, linkTo } },
      quickFaqEyebrow, quickFaqHeadline, quickFaqSubheading,
      quickFaqs[] { _key, question, answer },
      relatedPagesEyebrow, relatedPagesHeadline,
      relatedPages[] { eyebrow, title, desc, linkText, linkTo },
      newsletterEyebrow, newsletterHeadline, newsletterBody, newsletterPrivacyLine, newsletterBottomNote,
      closingHeadline, closingBody, closingDisclaimerLine
    }
  }`);
}

// ─── Archive Page ────────────────────────────────────────────────────────────

export type SanityArchiveRecord = {
  _id: string;
  code: string;
  year: number;
  peak: string;
  altitude: string;
  route: string;
  region: string;
  editionType: string;
  status: string;
  description: string;
  image?: { asset: { _ref: string } } | null;
  notableDetail: string;
  source: string;
  relatedRecord?: { _id: string; code: string; peak: string; year: number } | null;
  isFeatured: boolean;
};

export type ArchiveVerificationBlock = {
  _key: string;
  title: string;
  subtitle: string;
  body: string;
};

export type ArchivePageData = {
  archivePage: {
    heroHeadline: string;
    heroSubline: string;
    introEyebrow: string;
    introTitle: string;
    introSubtitle: string;
    introBody1: string;
    introBody2: string;
    introBody3: string;
    filterPeakLabel: string;
    filterPeakDefault: string;
    filterYearLabel: string;
    filterYearDefault: string;
    filterTypeLabel: string;
    filterTypeDefault: string;
    filterSortLabel: string;
    filterSortDefault: string;
    filterResetLabel: string;
    gridRegionLabel: string;
    gridRegionSuffix: string;
    gridEditionTypeLabel: string;
    gridNoteLabel: string;
    gridLoadMoreLabel: string;
    gridDisclaimer: string;
    statusVerifiedLabel: string;
    statusPermissionLabel: string;
    statusPrivateLabel: string;
    featuredEyebrow: string;
    featuredHeading: string;
    featuredSubline: string;
    featuredCardLabel: string;
    featuredButtonLabel: string;
    detailEyebrow: string;
    detailHeading: string;
    detailSubline: string;
    detailRecord: SanityArchiveRecord;
    detailYearLabel: string;
    detailPeakLabel: string;
    detailRouteLabel: string;
    detailTypeLabel: string;
    detailNotableLabel: string;
    detailSourceLabel: string;
    detailPermissionLabel: string;
    detailRelatedLabel: string;
    detailFooter: string;
    verificationEyebrow: string;
    verificationHeading: string;
    verificationBlocks: ArchiveVerificationBlock[];
    verificationFooter: string;
    closingEyebrow: string;
    closingHeadline: string;
    closingBody: string;
    closingPrimaryButtonLabel: string;
    closingPrimaryButtonHref: string;
    closingSecondaryButtonLabel: string;
    closingSecondaryButtonHref: string;
  } | null;
  records: SanityArchiveRecord[];
};

export async function getArchivePageData(): Promise<ArchivePageData> {
  return serverClient.fetch(`{
    "archivePage": *[_type == "archivePage"][0] {
      heroHeadline, heroSubline,
      introEyebrow, introTitle, introSubtitle, introBody1, introBody2, introBody3,
      filterPeakLabel, filterPeakDefault, filterYearLabel, filterYearDefault,
      filterTypeLabel, filterTypeDefault, filterSortLabel, filterSortDefault, filterResetLabel,
      gridRegionLabel, gridRegionSuffix, gridEditionTypeLabel, gridNoteLabel,
      gridLoadMoreLabel, gridDisclaimer,
      statusVerifiedLabel, statusPermissionLabel, statusPrivateLabel,
      featuredEyebrow, featuredHeading, featuredSubline, featuredCardLabel, featuredButtonLabel,
      detailEyebrow, detailHeading, detailSubline,
      detailRecord->{ _id, code, year, peak, altitude, route, region, editionType, status, description, notableDetail, source, relatedRecord->{ _id, code, peak, year } },
      detailYearLabel, detailPeakLabel, detailRouteLabel, detailTypeLabel,
      detailNotableLabel, detailSourceLabel, detailPermissionLabel, detailRelatedLabel, detailFooter,
      verificationEyebrow, verificationHeading,
      verificationBlocks[] { _key, title, subtitle, body },
      verificationFooter,
      closingEyebrow, closingHeadline, closingBody,
      closingPrimaryButtonLabel, closingPrimaryButtonHref,
      closingSecondaryButtonLabel, closingSecondaryButtonHref
    },
    "records": *[_type == "archiveRecord"] | order(year desc) {
      _id, code, year, peak, altitude, route, region, editionType, status, description, image, notableDetail, source, relatedRecord->{ _id, code, peak, year }, isFeatured
    }
  }`);
}

// ─── Team Page ───────────────────────────────────────────────────────────────

export type TeamLeadershipMember = {
  _key: string;
  name: string;
  role: string;
  basedIn: string;
  yearsWithHouse: string;
  expertise: string;
  languages: string;
  portrait?: { asset: { _ref: string } } | null;
};

export type TeamPageData = {
  teamPage: {
    heroHeadline?: string;
    heroSubline?: string;
    heroImage?: { asset: { _ref: string } } | null;
    manifestoPullQuote?: string;
    manifestoBody1?: string;
    manifestoBody2?: string;
    leadership?: TeamLeadershipMember[];
    closingHeadline?: string;
    closingBody?: string;
  } | null;
  sherpas: Array<SanitySherpa & { _id: string; role?: string; expertise?: string; languages?: string }>;
};

export async function getTeamPageData(): Promise<TeamPageData> {
  return serverClient.fetch(`{
    "teamPage": *[_type == "teamPage"][0] {
      heroHeadline, heroSubline, heroImage,
      manifestoPullQuote, manifestoBody1, manifestoBody2,
      leadership[] { _key, name, role, portrait, basedIn, yearsWithHouse, expertise, languages },
      closingHeadline, closingBody
    },
    "sherpas": *[_type == "sherpa"] | order(name asc) {
      _id, name, portrait, region, yearsActive, mountainsSupported, philosophyLine, role, expertise, languages
    }
  }`);
}

// ─── 7,000m Pathway Page ─────────────────────────────────────────────────────

export type PathwayPillar = {
  _key: string;
  eyebrow?: string;
  title: string;
  body: string;
};

export type PathwayRoute = {
  _key: string;
  peakName: string;
  altitude: string;
  region: string;
  character: string;
  description: string;
  image?: { asset: { _ref: string } } | null;
};

export type PathwayFaqItem = {
  _key: string;
  question: string;
  answer: string;
};

export type DiagramStep = {
  _key: string;
  altitudeLabel: string;
  stepLabel: string;
  title: string;
  description: string;
};

export type DiagramTimingNote = {
  _key: string;
  label: string;
  body: string;
};

export type SevenThousandMeterPageData = {
  sevenThousandMeterPage: {
    heroHeadline?: string;
    heroSubline?: string;
    planningContextEyebrow?: string;
    planningContextHeadline?: string;
    planningContextSubtitle?: string;
    planningContextBody?: string;
    planningContextNote?: string;
    pillarsEyebrow?: string;
    pillarsHeading?: string;
    pillars?: PathwayPillar[];
    routesSectionEyebrow?: string;
    routesSectionHeadline?: string;
    routesSectionSubtitle?: string;
    routes?: PathwayRoute[];
    explorerRoutesHeadline?: string;
    explorerRoutesBody?: string;
    diagramEyebrow?: string;
    diagramHeadline?: string;
    diagramSubheading?: string;
    diagramSteps?: DiagramStep[];
    diagramTimingNotes?: DiagramTimingNote[];
    cautionEyebrow?: string;
    cautionHeadline?: string;
    cautionBody?: string;
    cautionNote?: string;
    cautionFootnote?: string;
    faqEyebrow?: string;
    faqHeadline?: string;
    faqSubheading?: string;
    faqCtaLabel?: string;
    faqs?: PathwayFaqItem[];
    closingEyebrow?: string;
    closingHeadline?: string;
    closingBody?: string;
  } | null;
};

export async function getSevenThousandMeterPageData(): Promise<SevenThousandMeterPageData> {
  return serverClient.fetch(`{
    "sevenThousandMeterPage": *[_type == "sevenThousandMeterPage"][0] {
      heroHeadline, heroSubline,
      planningContextEyebrow, planningContextHeadline, planningContextSubtitle,
      planningContextBody, planningContextNote,
      pillarsEyebrow, pillarsHeading,
      pillars[] { _key, eyebrow, title, body },
      routesSectionEyebrow, routesSectionHeadline, routesSectionSubtitle,
      routes[] { _key, peakName, altitude, region, character, description, image },
      explorerRoutesHeadline, explorerRoutesBody,
      diagramEyebrow, diagramHeadline, diagramSubheading,
      diagramSteps[] { _key, altitudeLabel, stepLabel, title, description },
      diagramTimingNotes[] { _key, label, body },
      cautionEyebrow, cautionHeadline, cautionBody, cautionNote, cautionFootnote,
      faqEyebrow, faqHeadline, faqSubheading, faqCtaLabel,
      faqs[] { _key, question, answer },
      closingEyebrow, closingHeadline, closingBody
    }
  }`);
}

// ─── Private Expeditions Page ────────────────────────────────────────────────

export type PrivateAudience = {
  _key: string;
  title: string;
  subtitle: string;
  body: string;
};

export type PrivateConsultationStep = {
  _key: string;
  step: string;
  title: string;
  body: string;
};

export type AvailableEditionSpec = {
  _key?: string;
  label: string;
  value: string;
};

export type AvailableEdition = {
  _key?: string;
  letter: string;
  pullQuote: string;
  headline: string;
  body: string;
  whoItIsFor: string;
  bestReadOn: string;
  specs?: AvailableEditionSpec[];
};

export type PrivateExpeditionsPageData = {
  privateExpeditionsPage: {
    heroHeadline?: string;
    heroSubline?: string;
    philosophyEyebrow?: string;
    philosophyHeadline?: string;
    philosophyTagline?: string;
    philosophyBody?: string;
    philosophyFootnote?: string;
    audiencesEyebrow?: string;
    audiencesHeadline?: string;
    audiencesTagline?: string;
    audiences?: PrivateAudience[];
    availableEditionsEyebrow?: string;
    availableEditionsHeadline?: string;
    availableEditionsTagline?: string;
    availableEditions?: AvailableEdition[];
    consultationEyebrow?: string;
    consultationHeadline?: string;
    consultationTagline?: string;
    consultationNote?: string;
    consultationSteps?: PrivateConsultationStep[];
    faqEyebrow?: string;
    faqHeadline?: string;
    faqSubheading?: string;
    faqCtaLabel?: string;
    faqs?: Array<{ _key: string; question: string; answer: string }>;
    closingEyebrow?: string;
    closingHeadline?: string;
    closingBody?: string;
    closingNote?: string;
  } | null;
};

// ── Design Your Expedition ─────────────────────────────────────────────────

export type DesignOption = {
  value: string;
  label: string;
  description?: string;
};

export type DesignSettings = {
  ktmHotelOptions: DesignOption[];
  trekGuideOptions: DesignOption[];
  climbGuideOptions: DesignOption[];
  sherpaRatioOptions: DesignOption[];
  oxygenMin: number;
  oxygenMax: number;
  oxygenStep: number;
  oxygenUnlimitedThreshold: number;
  oxygenUnit: string;
} | null;

export type SanityExpeditionForDesign = {
  _id: string;
  name: string;
  code: string;
  altitude: string;
  slug: string;
  trekLodgeOptions: DesignOption[];
  helicopterInclusions: DesignOption[];
};

export type SanityEditionForDesign = {
  _id: string;
  letter: string;
  name: string;
  positioning?: string;
  designDefaults?: {
    ktmHotel?: string;
    trekLodge?: string;
    trekGuide?: string;
    climbGuide?: string;
    sherpaRatio?: string;
    oxygenBottles?: number;
  };
};

export type DesignPageData = {
  expeditions: SanityExpeditionForDesign[];
  editions: SanityEditionForDesign[];
  designSettings: DesignSettings;
};

export async function getDesignPageData(): Promise<DesignPageData> {
  return serverClient.fetch(`{
    "expeditions": *[_type == "expedition"] | order(name asc) {
      _id, name, code, altitude,
      "slug": slug.current,
      "trekLodgeOptions": coalesce(trekLodgeOptions[]{value, label, description}, []),
      "helicopterInclusions": coalesce(helicopterInclusions[]{value, label, description}, [])
    },
    "editions": *[_type == "edition"] | order(letter asc) {
      _id, letter, name, positioning,
      designDefaults
    },
    "designSettings": *[_type == "designSettings"][0]{
      "ktmHotelOptions": coalesce(ktmHotelOptions[]{value, label, description}, []),
      "trekGuideOptions": coalesce(trekGuideOptions[]{value, label, description}, []),
      "climbGuideOptions": coalesce(climbGuideOptions[]{value, label, description}, []),
      "sherpaRatioOptions": coalesce(sherpaRatioOptions[]{value, label, description}, []),
      "oxygenMin": coalesce(oxygenMin, 6),
      "oxygenMax": coalesce(oxygenMax, 20),
      "oxygenStep": coalesce(oxygenStep, 1),
      "oxygenUnlimitedThreshold": coalesce(oxygenUnlimitedThreshold, 20),
      "oxygenUnit": coalesce(oxygenUnit, "× 4L bottles")
    }
  }`);
}

export async function getPrivateExpeditionsPageData(): Promise<PrivateExpeditionsPageData> {
  return serverClient.fetch(`{
    "privateExpeditionsPage": *[_type == "privateExpeditionsPage" && _id == "privateExpeditionsPage"][0] {
      heroHeadline, heroSubline,
      philosophyEyebrow, philosophyHeadline, philosophyTagline, philosophyBody, philosophyFootnote,
      audiencesEyebrow, audiencesHeadline, audiencesTagline,
      audiences[] { _key, title, subtitle, body },
      availableEditionsEyebrow, availableEditionsHeadline, availableEditionsTagline,
      availableEditions[] { _key, letter, pullQuote, headline, body, whoItIsFor, bestReadOn, specs[] { _key, label, value } },
      consultationEyebrow, consultationHeadline, consultationTagline, consultationNote,
      consultationSteps[] { _key, step, title, body },
      faqEyebrow, faqHeadline, faqSubheading, faqCtaLabel,
      faqs[] { _key, question, answer },
      closingEyebrow, closingHeadline, closingBody, closingNote
    }
  }`);
}
