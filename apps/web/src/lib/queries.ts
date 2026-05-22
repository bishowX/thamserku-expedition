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

export type SanityTimelineEra = {
  decade: string;
  era: string;
};

export type HomePageData = {
  homePage: {
    heroHeadline: string;
    heroSubheading: string;
    atlasHeading: string;
    atlasIntro: string;
    editionsHeading: string;
    editionsIntro: string;
    manifestoHeading: string;
    manifestoBody: string;
    closingHeading: string;
    closingBody: string;
    featuredFieldNotes: SanityFieldNote[];
    legacyImage: { asset: { _ref: string } } | null;
    legacyHeading: string;
    legacyBody1: string;
    legacyBody2: string;
    legacyQuote: string;
    legacyAttribution: string;
    legacyTimeline: SanityTimelineEra[];
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
      heroHeadline, heroSubheading, atlasHeading, atlasIntro, editionsHeading, editionsIntro, manifestoHeading, manifestoBody,
      closingHeading, closingBody,
      featuredFieldNotes[]->{ _id, code, title, excerpt, byline, readTime, slug },
      legacyImage, legacyHeading, legacyBody1, legacyBody2, legacyQuote, legacyAttribution, legacyTimeline,
      infrastructureHeading, infrastructureIntro, infrastructurePillars
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
