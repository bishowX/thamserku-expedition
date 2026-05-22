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
