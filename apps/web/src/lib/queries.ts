import { serverClient } from "./sanity.server";
import type { ConfigMatrix, BasePrices, DesignConfig } from "./configMatrix";
import { normalizeDesignConfig } from "./configMatrix";

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
  character?: string;
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
  isStandard?: boolean;
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
    definitionHeading?: string;
    definitionTagline?: string;
    definitionBody?: string;
    closingHeading?: string;
    closingBody?: string;
    closingImage?: { asset: { _ref: string } } | null;
  } | null;
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
    newsletterEyebrow: string;
    newsletterHeading: string;
    newsletterBody: string;
    newsletterCta: string;
    newsletterPrivacyNote: string;
    closingEyebrow: string;
    closingHeading: string;
    closingBody: string;
    closingImage?: { asset: { _ref: string } } | null;
    legacyEyebrow: string;
    legacyHeading: string;
    legacyIntro?: string;
    legacyTimelineItems?: Array<{ year: string; title: string; description: string }>;
    unclaimedPeaksEyebrow?: string;
    unclaimedPeaksHeading?: string;
    unclaimedPeaksBody?: string;
    featuredExpeditions: SanityExpedition[];
  } | null;
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
    closingImage?: { asset: { _ref: string } } | null;
  } | null;
  editions: SanityEditionFull[];
  expeditions: SanityExpeditionForMatrix[];
};

export async function getHomePageData(): Promise<HomePageData> {
  return serverClient.fetch(`{
    "homePage": *[_type == "homePage"][0] {
      heroHeadline, heroSubheading, heroImage, atlasEyebrow, atlasHeading, atlasIntro, editionsEyebrow, editionsHeading, editionsIntro, manifestoEyebrow, manifestoHeading, manifestoBody, manifestoStats,
      newsletterEyebrow, newsletterHeading, newsletterBody, newsletterCta, newsletterPrivacyNote,
      closingEyebrow, closingHeading, closingBody, closingImage,
      legacyEyebrow, legacyHeading, legacyIntro,
      legacyTimelineItems[]{ year, title, description },
      unclaimedPeaksEyebrow, unclaimedPeaksHeading, unclaimedPeaksBody,
      "featuredExpeditions": featuredExpeditions[]->{ _id, number, code, name, slug, altitude, region, season, style, positioning, image, editions[]->{ _id, letter, name, slug } }
    },
    "editions": *[_type == "edition"] | order(letter asc) {
      _id, letter, name, subtitle, positioning, targetAudience, character, slug
    }
  }`);
}

export type NewsletterData = {
  newsletterEyebrow?: string;
  newsletterHeading?: string;
  newsletterBody?: string;
  newsletterCta?: string;
  newsletterPrivacyNote?: string;
};

export async function getNewsletterData(): Promise<NewsletterData> {
  const data = await serverClient.fetch<NewsletterData | null>(`*[_type == "homePage"][0] {
    newsletterEyebrow, newsletterHeading, newsletterBody, newsletterCta, newsletterPrivacyNote
  }`);
  return data ?? {};
}

export async function getYetiPageData(): Promise<YetiPageData> {
  return serverClient.fetch(`{
    "yetiPage": *[_type == "yetiInfrastructurePage"][0] {
      heroHeadline, heroSubheading,
      definitionHeading, definitionTagline, definitionBody,
      closingHeading, closingBody, closingImage
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

export type LegacyPageData = {
  legacyPage: {
    heroHeadline?: string;
    heroSubheading?: string;
    heroImage?: { asset: { _ref: string } } | null;
    timelineEyebrow?: string;
    timelineHeading?: string;
    timelineFooterNote?: string;
    timelineChapters?: LegacyTimelineChapter[];
  } | null;
};

export async function getLegacyPageData(): Promise<LegacyPageData> {
  return serverClient.fetch(`{
    "legacyPage": *[_type == "legacyPage"][0] {
      heroHeadline, heroSubheading, heroImage,
      timelineEyebrow, timelineHeading, timelineFooterNote,
      timelineChapters[] { _key, roman, years, title, description, image }
    }
  }`);
}

export async function getEditionsPageData(): Promise<EditionsPageData> {
  return serverClient.fetch(`{
    "editionsPage": *[_type == "editionsPage"][0] {
      heroHeadline, heroSubheading, heroImage, manifestoEyebrow, manifestoHeading, manifestoBody,
      comparisonEyebrow, comparisonHeadline, comparisonNote,
      availabilityEyebrow, availabilityHeadline, availabilityNote,
      closingEyebrow, closingHeading, closingBody, closingFootnote, closingImage
    },
    "editions": *[_type == "edition"] | order(letter asc) {
      _id, letter, name, subtitle, positioning, targetAudience, slug,
      tag, body1, body2, image, colorVariant, isStandard,
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
trustQuote?: string;
  trustBody?: string;
  formSectionLabel?: string;
  formAlternativeLabel?: string;
  formAlternativeSubheading?: string;
  formChapterATitle?: string;
  formContactOptions?: string[];
  processHeading?: string;
  processBgImage?: { asset: { _ref: string } } | null;
  processSteps?: ConsultationStep[];
  processFootnote?: string;
  alternativeHeading?: string;
  alternativeOptions?: ConsultationContactOption[];
  closingLabel?: string;
  closingHeading?: string;
  closingBody?: string;
  closingImage?: { asset: { _ref: string } } | null;
};

export type ConsultationPageData = {
  consultationPage: ConsultationPage | null;
};

export type SanityAudienceTile = { label: string; subline: string; description: string };
export type SanityRouteWaypoint = { name: string; altitude: string };
export type SanityFaqItem = { question: string; answer: string };
export type SanityInclusionCategory = { category: string; items: string[] };
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
  difficulty?: string;
  groupSize?: string;
  baseCamp?: string;
  leadGuide?: string;
  expeditionStyleFact?: string;
  pricing?: string;
  overviewHeadline?: string;
  overviewHeadlineEmphasis?: string;
  overviewBody?: string;
  overviewSpecsHeading?: string;
  overviewSpecs?: Array<{ label: string; value: string }>;
  whoItIsForHeadline?: string;
  audienceTiles?: SanityAudienceTile[];
  itineraryHeading?: string;
  itinerary?: Array<{ days: string; activity: string; accommodation: string; meals: string }>;
  routeWaypoints?: SanityRouteWaypoint[];
  routePhilosophy?: string;
  acclimatisationNote?: string;
  summitWindowNote?: string;
  editions?: Array<{ letter: string; name: string; subtitle: string; positioning: string; targetAudience: string; character?: string; isStandard?: boolean }>;
  inclusionCategories?: SanityInclusionCategory[] | null;
  exclusions?: string[] | null;
  mandatoryPrerequisite?: string;
  faqs?: SanityFaqItem[];
  closingImage?: { asset: { _ref: string } } | null;
  closingStatement?: string;
  configMatrix?: ConfigMatrix;
  basePrices?: BasePrices;
};

export async function getExpeditionBySlug(slug: string): Promise<SanityExpeditionDossier | null> {
  const raw = await serverClient.fetch<(Omit<SanityExpeditionDossier, "configMatrix" | "basePrices"> & WithRawDesignConfig) | null>(
    `*[_type == "expedition" && slug.current == $slug][0]{
      _id, number, code, name, slug,
      altitude, region, season, style, positioning, image,
      heroImage, heroTagline, heroSubtext,
      duration, difficulty, groupSize, baseCamp, leadGuide,
      expeditionStyleFact, pricing,
      overviewHeadline, overviewHeadlineEmphasis, overviewBody,
      overviewSpecsHeading, overviewSpecs[]{ label, value },
      whoItIsForHeadline,
      audienceTiles[]{ label, subline, description },
      itineraryHeading, itinerary[]{ days, activity, accommodation, meals },
      routeWaypoints[]{ name, altitude },
      routePhilosophy, acclimatisationNote, summitWindowNote,
      editions[]->{ letter, name, subtitle, positioning, targetAudience, character, isStandard },
      inclusionCategories[]{ category, items },
      exclusions,
      mandatoryPrerequisite,
      faqs[]{ question, answer },
      closingImage, closingStatement,
      ${DESIGN_CONFIG_PROJECTION}
    }`,
    { slug }
  );
  return raw ? attachConfig(raw) : null;
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
trustQuote, trustBody,
      formSectionLabel, formAlternativeLabel, formAlternativeSubheading,
      formChapterATitle, formContactOptions,
      processHeading, processBgImage,
      processSteps[] { _key, stepNumber, marker, title, description },
      processFootnote,
      alternativeHeading,
      alternativeOptions[] { _key, label, title, value },
      closingLabel, closingHeading, closingBody, closingImage
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
    closingImage?: { asset: { _ref: string } } | null;
  } | null;
};

export async function getFAQPageData(): Promise<FAQPageData> {
  return serverClient.fetch(`{
    "faqPage": *[_id == "faqPage"][0] {
      heroHeadline, heroSubline,
      categoryNavEyebrow, categoryNavHeadline,
      listEyebrow,
      categories[] { label, title, subtitle, items[] { question, answer, linkText, linkTo } },
      quickFaqEyebrow, quickFaqHeadline, quickFaqSubheading,
      quickFaqs[] { _key, question, answer },
      relatedPagesEyebrow, relatedPagesHeadline,
      relatedPages[] { eyebrow, title, desc, linkText, linkTo },
      newsletterEyebrow, newsletterHeadline, newsletterBody, newsletterPrivacyLine, newsletterBottomNote,
      closingHeadline, closingBody, closingDisclaimerLine, closingImage
    }
  }`);
}

// ─── Safety Page ─────────────────────────────────────────────────────────────

export type SafetyStat = { value: string; label: string };
export type SafetyNumberCard = { title: string; body: string };
export type SafetyProtocol = { label: string; description: string };
export type SafetySpec = { label: string; value: string };
export type SafetyCommunicationItem = { title: string; body: string };
export type SafetyEvacuationCard = { title: string; body: string };

export type SafetyPageData = {
  safetyPage: {
    heroHeadline?: string;
    heroSubline?: string;
    statsLabel?: string;
    stats?: SafetyStat[];
    numbersHeading?: string;
    numbersCards?: SafetyNumberCard[];
    architectureEyebrow?: string;
    architectureHeading?: string;
    protocols?: SafetyProtocol[];
    foundationEyebrow?: string;
    foundationHeading?: string;
    foundationBgImage?: { asset: { _ref: string } } | null;
    foundationBody?: string[];
    foundationSpecs?: SafetySpec[];
    communicationEyebrow?: string;
    communicationHeading?: string;
    communicationItems?: SafetyCommunicationItem[];
    evacuationEyebrow?: string;
    evacuationHeading?: string;
    evacuationCards?: SafetyEvacuationCard[];
    evacuationQuote?: string;
    evacuationBody?: string[];
    closingEyebrow?: string;
    closingHeadline?: string;
    closingBody?: string;
    closingImage?: { asset: { _ref: string } } | null;
  } | null;
};

export async function getSafetyPageData(): Promise<SafetyPageData> {
  return serverClient.fetch(`{
    "safetyPage": *[_type == "safetyPage"][0] {
      heroHeadline, heroSubline,
      statsLabel, stats[] { value, label },
      numbersHeading, numbersCards[] { title, body },
      architectureEyebrow, architectureHeading, protocols[] { label, description },
      foundationEyebrow, foundationHeading, foundationBgImage, foundationBody, foundationSpecs[] { label, value },
      communicationEyebrow, communicationHeading, communicationItems[] { title, body },
      evacuationEyebrow, evacuationHeading, evacuationCards[] { title, body },
      evacuationQuote, evacuationBody,
      closingEyebrow, closingHeadline, closingBody, closingImage
    }
  }`);
}

// ─── Achievements Page ───────────────────────────────────────────────────────

export type AchievementStat = { _key: string; value: string; label: string };

export type AchievementDecade = {
  _key: string;
  years: string;
  title: string;
  body?: string;
  meta?: string;
  image?: { asset: { _ref: string } } | null;
};

export type AchievementsPageData = {
  achievementsPage: {
    heroHeadline?: string;
    heroSubheading?: string;
    heroImage?: { asset: { _ref: string } } | null;
    stats?: AchievementStat[];
    decades?: AchievementDecade[];
  } | null;
};

export async function getAchievementsPageData(): Promise<AchievementsPageData> {
  return serverClient.fetch(`{
    "achievementsPage": *[_type == "achievementsPage"][0] {
      heroHeadline, heroSubheading, heroImage,
      stats[] { _key, value, label },
      decades[] { _key, years, title, body, meta, image }
    }
  }`);
}

// ── Design Your Expedition ─────────────────────────────────────────────────
// Driven by the per-peak configuration matrix. See lib/configMatrix.ts.

// Projection of the raw `designConfig` (category-named storage), shared by the
// GROQ fragments below. Normalized into the internal ConfigMatrix IR in JS via
// `attachConfig` (see lib/configMatrix → normalizeDesignConfig).
const EDITION_CONFIG_PROJECTION = `{
  acclimatisation[]{ label, included, priceDelta },
  accommodation[]{ name, options[]{ label, included, priceDelta } },
  guiding[]{ name, options[]{ label, included, priceDelta } },
  oxygen,
  helicopter[]{ label, included, priceDelta }
}`;
const DESIGN_CONFIG_PROJECTION = `
  "_designConfig": designConfig{
    basePrices,
    b${EDITION_CONFIG_PROJECTION},
    c${EDITION_CONFIG_PROJECTION},
    d${EDITION_CONFIG_PROJECTION}
  }
`;

type WithRawDesignConfig = { _designConfig?: DesignConfig | null };

/** Strip the raw `_designConfig` and attach the normalized matrix + base prices. */
function attachConfig<T extends WithRawDesignConfig>(
  doc: T,
): Omit<T, "_designConfig"> & { configMatrix: ConfigMatrix; basePrices: BasePrices } {
  const { _designConfig, ...rest } = doc;
  const { configMatrix, basePrices } = normalizeDesignConfig(_designConfig ?? undefined);
  return { ...rest, configMatrix, basePrices };
}

export type SanityExpeditionForDesign = {
  _id: string;
  name: string;
  code: string;
  altitude: string;
  slug: string;
  configMatrix: ConfigMatrix;
  basePrices?: BasePrices;
};

export type SanityEditionForDesign = {
  _id: string;
  letter: string;
  name: string;
  positioning?: string;
};

export type DesignPageData = {
  expeditions: SanityExpeditionForDesign[];
  editions: SanityEditionForDesign[];
};

export async function getDesignPageData(): Promise<DesignPageData> {
  const raw = await serverClient.fetch<{
    expeditions: Array<Omit<SanityExpeditionForDesign, "configMatrix" | "basePrices"> & WithRawDesignConfig>;
    editions: SanityEditionForDesign[];
  }>(`{
    "expeditions": *[_type == "expedition"] | order(name asc) {
      _id, name, code, altitude,
      "slug": slug.current,
      ${DESIGN_CONFIG_PROJECTION}
    },
    "editions": *[_type == "edition"] | order(letter asc) {
      _id, letter, name, positioning
    }
  }`);
  // Sort by parsed altitude (e.g. "8,848.86 m" → 8848.86), tallest first. The
  // field is free text, so this can't be done reliably in GROQ.
  const heightOf = (alt?: string) => parseFloat((alt ?? "").replace(/[^\d.]/g, "")) || 0;
  const expeditions = raw.expeditions
    .map(attachConfig)
    .sort((a, b) => heightOf(b.altitude) - heightOf(a.altitude));
  return { expeditions, editions: raw.editions };
}

// Matrix for a single peak (used by the server action to price/snapshot a booking).
export async function getExpeditionConfig(id: string): Promise<{
  name?: string;
  configMatrix: ConfigMatrix;
  basePrices: BasePrices;
} | null> {
  const raw = await serverClient.fetch<({ name?: string } & WithRawDesignConfig) | null>(
    `*[_type == "expedition" && _id == $id][0]{ name, ${DESIGN_CONFIG_PROJECTION} }`,
    { id },
  );
  return raw ? attachConfig(raw) : null;
}

