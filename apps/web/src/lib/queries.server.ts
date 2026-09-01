// Server-only data fetchers. These use serverClient (published perspective) and
// are safe to call from loaders/actions/resource routes that don't need preview.
// Page loaders that support Visual Editing use loadQuery instead — see the query
// string constants and transforms in ./queries (which is client-safe).
import { serverClient } from "./sanity.server";
import type { ConfigMatrix, BasePrices } from "./configMatrix";
import {
  HOME_QUERY,
  NEWSLETTER_QUERY,
  YETI_QUERY,
  LEGACY_QUERY,
  EDITIONS_QUERY,
  EXPEDITION_BY_SLUG_QUERY,
  CONSULTATION_QUERY,
  FAQ_QUERY,
  SAFETY_QUERY,
  ACHIEVEMENTS_QUERY,
  DESIGN_QUERY,
  SITE_SETTINGS_QUERY,
  ROOT_QUERY,
  DESIGN_CONFIG_PROJECTION,
  attachConfig,
  normalizeDesignPageData,
  type HomePageData,
  type NewsletterData,
  type YetiPageData,
  type LegacyPageData,
  type EditionsPageData,
  type ConsultationPageData,
  type FAQPageData,
  type SafetyPageData,
  type AchievementsPageData,
  type DesignPageData,
  type RawDesignPageData,
  type SanityExpedition,
  type SanityExpeditionDossier,
  type RawExpeditionDossier,
  type WithRawDesignConfig,
  type SiteSettings,
  type RootData,
} from "./queries";

export async function getHomePageData(): Promise<HomePageData> {
  return serverClient.fetch(HOME_QUERY);
}

export async function getNewsletterData(): Promise<NewsletterData> {
  const data = await serverClient.fetch<NewsletterData | null>(NEWSLETTER_QUERY);
  return data ?? {};
}

export async function getYetiPageData(): Promise<YetiPageData> {
  return serverClient.fetch(YETI_QUERY);
}

export async function getLegacyPageData(): Promise<LegacyPageData> {
  return serverClient.fetch(LEGACY_QUERY);
}

export async function getEditionsPageData(): Promise<EditionsPageData> {
  return serverClient.fetch(EDITIONS_QUERY);
}

export async function getExpeditionBySlug(slug: string): Promise<SanityExpeditionDossier | null> {
  const raw = await serverClient.fetch<RawExpeditionDossier | null>(EXPEDITION_BY_SLUG_QUERY, { slug });
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
  return serverClient.fetch(CONSULTATION_QUERY);
}

export async function getFAQPageData(): Promise<FAQPageData> {
  return serverClient.fetch(FAQ_QUERY);
}

export async function getSafetyPageData(): Promise<SafetyPageData> {
  return serverClient.fetch(SAFETY_QUERY);
}

export async function getAchievementsPageData(): Promise<AchievementsPageData> {
  return serverClient.fetch(ACHIEVEMENTS_QUERY);
}

export async function getDesignPageData(): Promise<DesignPageData> {
  const raw = await serverClient.fetch<RawDesignPageData>(DESIGN_QUERY);
  return normalizeDesignPageData(raw);
}

/** Site settings plus the expedition list the footer links, in one round trip. */
export async function getRootData(): Promise<RootData> {
  const data = await serverClient.fetch<RootData | null>(ROOT_QUERY);
  return { settings: data?.settings ?? null, expeditions: data?.expeditions ?? [] };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await serverClient.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
  return data ?? {};
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
