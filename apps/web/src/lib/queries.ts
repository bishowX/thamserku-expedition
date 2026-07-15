// Client-safe module: GROQ query strings, response types, and pure transforms.
// Both loaders (loadQuery) and page components (useQuery) import from here, so it
// must NOT pull in server-only code. The serverClient-backed fetchers live in
// queries.server.ts.
import type { PortableTextBlock } from "@portabletext/types";
import type { ConfigMatrix, BasePrices, DesignConfig } from "./configMatrix";
import { normalizeDesignConfig } from "./configMatrix";
import type { RawServicesConfig } from "./servicesConfig";

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

export type SanityPartner = {
  _key: string;
  name?: string;
  logo?: { asset: { _ref: string } } | null;
  label?: string;
  href?: string;
};

export type YetiPageData = {
  yetiPage: {
    heroHeadline?: string;
    heroSubheading?: string;
    heroPartners?: SanityPartner[];
    definitionHeading?: string;
    definitionTagline?: string;
    definitionBody?: string;
    closingEyebrow?: string;
    closingHeading?: string;
    closingBody?: string;
    closingImage?: { asset: { _ref: string } } | null;
    closingPrimaryCtaLabel?: string;
    closingPrimaryCtaPath?: string;
    closingSecondaryCtaLabel?: string;
    closingSecondaryCtaPath?: string;
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
    legacyTimelineItems?: Array<{ year: string; title: string; description: string; image?: { asset: { _ref: string } } | null }>;
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
    manifestoImage?: { asset: { _ref: string } } | null;
    comparisonEyebrow?: string;
    comparisonHeadline?: string;
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

export const HOME_QUERY = `{
  "homePage": *[_type == "homePage"][0] {
    heroHeadline, heroSubheading, heroImage, atlasEyebrow, atlasHeading, atlasIntro, editionsEyebrow, editionsHeading, editionsIntro, manifestoEyebrow, manifestoHeading, manifestoBody, manifestoStats,
    newsletterEyebrow, newsletterHeading, newsletterBody, newsletterCta, newsletterPrivacyNote,
    closingEyebrow, closingHeading, closingBody, closingImage,
    legacyEyebrow, legacyHeading, legacyIntro,
    legacyTimelineItems[]{ year, title, description, image },
    unclaimedPeaksEyebrow, unclaimedPeaksHeading, unclaimedPeaksBody,
    "featuredExpeditions": featuredExpeditions[]->{ _id, number, code, name, slug, altitude, region, season, style, positioning, image, editions[]->{ _id, letter, name, slug } }
  },
  "editions": *[_type == "edition"] | order(letter asc) {
    _id, letter, name, subtitle, positioning, targetAudience, character, slug
  }
}`;

export type NewsletterData = {
  newsletterEyebrow?: string;
  newsletterHeading?: string;
  newsletterBody?: string;
  newsletterCta?: string;
  newsletterPrivacyNote?: string;
};

export const NEWSLETTER_QUERY = `*[_type == "homePage"][0] {
  newsletterEyebrow, newsletterHeading, newsletterBody, newsletterCta, newsletterPrivacyNote
}`;

export const YETI_QUERY = `{
  "yetiPage": *[_type == "yetiInfrastructurePage"][0] {
    heroHeadline, heroSubheading,
    heroPartners[] { _key, name, logo, label, href },
    definitionHeading, definitionTagline, definitionBody,
    closingEyebrow, closingHeading, closingBody, closingImage,
    closingPrimaryCtaLabel, closingPrimaryCtaPath,
    closingSecondaryCtaLabel, closingSecondaryCtaPath
  }
}`;

export type LegacyTimelineChapter = {
  _key: string;
  roman: string;
  years: string;
  title: string;
  description: string | PortableTextBlock[];
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

export const LEGACY_QUERY = `{
  "legacyPage": *[_type == "legacyPage"][0] {
    heroHeadline, heroSubheading, heroImage,
    timelineEyebrow, timelineHeading, timelineFooterNote,
    timelineChapters[] { _key, roman, years, title, description, image }
  }
}`;

export const EDITIONS_QUERY = `{
  "editionsPage": *[_type == "editionsPage"][0] {
    heroHeadline, heroSubheading, heroImage, manifestoEyebrow, manifestoHeading, manifestoBody, manifestoImage,
    comparisonEyebrow, comparisonHeadline,
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
}`;

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
  highlightsImage?: { asset: { _ref: string } } | null;
  audienceTiles?: SanityAudienceTile[];
  itineraryHeading?: string;
  itinerary?: Array<{ days: string; activity: string; accommodation: string; meals: string }>;
  routeWaypoints?: SanityRouteWaypoint[];
  routeHeadline?: string;
  routeHeadlineSuffix?: string;
  routePhilosophy?: string;
  acclimatisationNote?: string;
  summitWindowNote?: string;
  editions?: Array<{ letter: string; name: string; subtitle: string; positioning: string; targetAudience: string; character?: string; isStandard?: boolean }>;
  inclusionCategories?: SanityInclusionCategory[] | null;
  exclusions?: string[] | null;
  exclusionsImage?: { asset: { _ref: string } } | null;
  mandatoryPrerequisite?: string;
  faqs?: SanityFaqItem[];
  closingImage?: { asset: { _ref: string } } | null;
  closingStatement?: string;
  configMatrix?: ConfigMatrix;
  basePrices?: BasePrices;
  servicesConfig?: RawServicesConfig | null;
};

export type RawExpeditionDossier =
  (Omit<SanityExpeditionDossier, "configMatrix" | "basePrices"> & WithRawDesignConfig);

export const CONSULTATION_QUERY = `{
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
}`;

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
    heroImage?: { asset: { _ref: string } } | null;
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

export const FAQ_QUERY = `{
  "faqPage": *[_id == "faqPage"][0] {
    heroHeadline, heroSubline, heroImage,
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
}`;

// ─── Safety Page ─────────────────────────────────────────────────────────────

export type SafetyStat = { value: string; label: string };
export type SafetyProtocol = { label: string; description: string };
export type SafetySpec = { label: string; value: string };
export type SafetyCommunicationItem = { title: string; body: string };
export type SafetyEvacuationCard = { title: string; body: string };

export type SafetyPageData = {
  safetyPage: {
    heroHeadline?: string;
    heroSubline?: string;
    heroBgImage?: { asset: { _ref: string } } | null;
    statsLabel?: string;
    stats?: SafetyStat[];
    architectureEyebrow?: string;
    architectureHeading?: string;
    protocols?: SafetyProtocol[];
    foundationEyebrow?: string;
    foundationHeading?: string;
    foundationBgImage?: { asset: { _ref: string } } | null;
    foundationBody?: PortableTextBlock[];
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

export const SAFETY_QUERY = `{
  "safetyPage": *[_type == "safetyPage"][0] {
    heroHeadline, heroSubline, heroBgImage,
    statsLabel, stats[] { value, label },
    architectureEyebrow, architectureHeading, protocols[] { label, description },
    foundationEyebrow, foundationHeading, foundationBgImage, foundationBody, foundationSpecs[] { label, value },
    communicationEyebrow, communicationHeading, communicationItems[] { title, body },
    evacuationEyebrow, evacuationHeading, evacuationCards[] { title, body },
    evacuationQuote, evacuationBody,
    closingEyebrow, closingHeadline, closingBody, closingImage
  }
}`;

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
    decadesHeading?: string;
    decadesSubtitle?: string;
    decades?: AchievementDecade[];
  } | null;
};

export const ACHIEVEMENTS_QUERY = `{
  "achievementsPage": *[_type == "achievementsPage"][0] {
    heroHeadline, heroSubheading, heroImage,
    stats[] { _key, value, label },
    decadesHeading, decadesSubtitle,
    decades[] { _key, years, title, body, meta, image }
  }
}`;

// ─── Site Settings ────────────────────────────────────────────────────────────

export type SiteSettings = {
  contactEmail?: string;
  contactEmailKushal?: string;
  contactWhatsApp?: string;
  contactWhatsAppDisplay?: string;
};

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  contactEmail, contactEmailKushal, contactWhatsApp, contactWhatsAppDisplay
}`;

// ─── Terms & Conditions Page ──────────────────────────────────────────────────

export type TermsPageData = {
  termsPage: {
    heroEyebrow?: string;
    heroTitle?: string;
    heroImage?: { asset: { _ref: string } } | null;
    heroIntro?: PortableTextBlock[];
    heroNote?: string;
    body?: PortableTextBlock[];
  } | null;
};

export const TERMS_QUERY = `{
  "termsPage": *[_type == "termsPage"][0] {
    heroEyebrow, heroTitle, heroImage, heroIntro, heroNote,
    body
  }
}`;

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
export const DESIGN_CONFIG_PROJECTION = `
  "_designConfig": designConfig{
    basePrices,
    b${EDITION_CONFIG_PROJECTION},
    c${EDITION_CONFIG_PROJECTION},
    d${EDITION_CONFIG_PROJECTION}
  }
`;

// Services & Add-ons — separate pipeline from designConfig (see
// lib/servicesConfig.ts). This is the SOLE source for both ComparisonTables
// tabs (Services + Add-on, split by each row's `category`); designConfig only
// feeds the configurator (which stays B/C/D-only). Passed through raw;
// ComparisonTables normalizes it itself via `servicesRows()`.
const SERVICES_CONFIG_ROW_PROJECTION = `{ name, text, category }`;
export const SERVICES_CONFIG_PROJECTION = `
  servicesConfig{
    a[]${SERVICES_CONFIG_ROW_PROJECTION},
    b[]${SERVICES_CONFIG_ROW_PROJECTION},
    c[]${SERVICES_CONFIG_ROW_PROJECTION},
    d[]${SERVICES_CONFIG_ROW_PROJECTION},
    e[]${SERVICES_CONFIG_ROW_PROJECTION}
  }
`;

export type WithRawDesignConfig = { _designConfig?: DesignConfig | null };

/** Strip the raw `_designConfig` and attach the normalized matrix + base prices. */
export function attachConfig<T extends WithRawDesignConfig>(
  doc: T,
): Omit<T, "_designConfig"> & { configMatrix: ConfigMatrix; basePrices: BasePrices } {
  const { _designConfig, ...rest } = doc;
  const { configMatrix, basePrices } = normalizeDesignConfig(_designConfig ?? undefined);
  return { ...rest, configMatrix, basePrices };
}

// Shared by the loader (loadQuery) and the page (useQuery) so live preview
// re-runs the exact same query. Declared here because it interpolates the
// DESIGN_CONFIG_PROJECTION above.
export const EXPEDITION_BY_SLUG_QUERY = `*[_type == "expedition" && slug.current == $slug][0]{
  _id, number, code, name, slug,
  altitude, region, season, style, positioning, image,
  heroImage, heroTagline, heroSubtext,
  duration, difficulty, groupSize, baseCamp, leadGuide,
  expeditionStyleFact, pricing,
  overviewHeadline, overviewHeadlineEmphasis, overviewBody,
  overviewSpecsHeading, overviewSpecs[]{ label, value },
  whoItIsForHeadline, highlightsImage,
  audienceTiles[]{ label, subline, description },
  itineraryHeading, itinerary[]{ days, activity, accommodation, meals },
  routeWaypoints[]{ name, altitude },
  routeHeadline, routeHeadlineSuffix, routePhilosophy, acclimatisationNote, summitWindowNote,
  editions[]->{ letter, name, subtitle, positioning, targetAudience, character, isStandard },
  inclusionCategories[]{ category, items },
  exclusions,
  exclusionsImage,
  mandatoryPrerequisite,
  faqs[]{ question, answer },
  closingImage, closingStatement,
  ${DESIGN_CONFIG_PROJECTION},
  ${SERVICES_CONFIG_PROJECTION}
}`;

export type SanityExpeditionForDesign = {
  _id: string;
  name: string;
  code: string;
  altitude: string;
  slug: string;
  /** Season chip preselected when this peak is picked. Raw Sanity string —
   *  coerce with `toSeasonValue` (StepFormat) before use. */
  defaultSeason?: string;
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
  page?: RawDesignPageData['page'];
};

export type RawDesignPageData = {
  expeditions: Array<Omit<SanityExpeditionForDesign, "configMatrix" | "basePrices"> & WithRawDesignConfig>;
  editions: SanityEditionForDesign[];
  page?: {
    heroHeadline?: string;
    heroSubheading?: string;
    heroBgImage?: { asset: { _ref: string } } | null;
  } | null;
};

export const DESIGN_QUERY = `{
  "expeditions": *[_type == "expedition"] | order(name asc) {
    _id, name, code, altitude,
    "slug": slug.current,
    "defaultSeason": designConfig.defaultSeason,
    ${DESIGN_CONFIG_PROJECTION}
  },
  "editions": *[_type == "edition"] | order(letter asc) {
    _id, letter, name, positioning
  },
  "page": *[_type == "designPage"][0] {
    heroHeadline, heroSubheading, heroBgImage
  }
}`;

/**
 * Normalize raw design-page data: attach the config matrix to each peak and sort
 * tallest-first. Exported so the page can apply it after useQuery in live mode.
 */
export function normalizeDesignPageData(raw: RawDesignPageData): DesignPageData {
  // Sort by parsed altitude (e.g. "8,848.86 m" → 8848.86), tallest first. The
  // field is free text, so this can't be done reliably in GROQ.
  const heightOf = (alt?: string) => parseFloat((alt ?? "").replace(/[^\d.]/g, "")) || 0;
  const expeditions = raw.expeditions
    .map(attachConfig)
    .sort((a, b) => heightOf(b.altitude) - heightOf(a.altitude));
  return { expeditions, editions: raw.editions, page: raw.page };
}

