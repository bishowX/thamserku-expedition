import { serverClient } from "./sanity.server";

export type SanityEditionRef = {
  _id: string;
  letter: string;
  name: string;
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
    manifestoHeading: string;
    manifestoBody: string;
    closingHeading: string;
    closingBody: string;
    featuredFieldNotes: SanityFieldNote[];
  } | null;
  expeditions: SanityExpedition[];
  editions: SanityEdition[];
  yetiInfrastructure: {
    heading: string;
    intro: string;
    pillars: SanityYetiPillar[];
  } | null;
  legacy: {
    heading: string;
    body1: string;
    body2: string;
    quote: string;
    attribution: string;
    timeline: SanityTimelineEra[];
  } | null;
};

export async function getHomePageData(): Promise<HomePageData> {
  return serverClient.fetch(`{
    "homePage": *[_type == "homePage"][0] {
      heroHeadline, heroSubheading, manifestoHeading, manifestoBody,
      closingHeading, closingBody,
      featuredFieldNotes[]->{ _id, code, title, excerpt, byline, readTime, slug }
    },
    "expeditions": *[_type == "expedition"] | order(number asc) {
      _id, number, code, name, slug, altitude, region, season, style, positioning,
      editions[]->{ _id, letter, name }
    },
    "editions": *[_type == "edition"] | order(letter asc) {
      _id, letter, name, subtitle, positioning, targetAudience, slug
    },
    "yetiInfrastructure": *[_type == "yetiInfrastructure"][0] {
      heading, intro, pillars
    },
    "legacy": *[_type == "legacy"][0] {
      heading, body1, body2, quote, attribution, timeline
    }
  }`);
}
