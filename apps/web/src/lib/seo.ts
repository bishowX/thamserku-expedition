import { urlFor } from "./sanity";
import type { SanityImageRef, SeoFields, SiteSettings } from "./queries";

/**
 * The one canonical origin for the site. Deliberately NOT a CMS field — an
 * editor typo here would deindex everything. Shared with sitemap.xml and
 * robots.txt so the three can never disagree.
 */
export const SITE_URL = "https://thamserkuexpedition.com";
const PRODUCTION_HOST = new URL(SITE_URL).host;

/**
 * True only on the production domain. Amplify branch deploys, the www
 * subdomain and localhost all return false, so they can be kept out of the
 * index. Reads the proxy header first — behind Amplify's CDN the Host header
 * is the internal origin, not the domain the visitor typed.
 */
export function isProductionHost(request: Request): boolean {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    new URL(request.url).host;
  return host.split(",")[0].trim().toLowerCase() === PRODUCTION_HOST;
}

/** Absolute canonical URL for a path: production origin, no query, no trailing slash. */
export function canonicalUrl(pathname: string): string {
  const path = pathname.replace(/\/+$/, "");
  return path ? `${SITE_URL}${path}` : SITE_URL;
}

// Last-resort values, used only if Site Settings → SEO is left blank in the CMS.
const FALLBACK_SITE_NAME = "Thamserku Expedition";
const FALLBACK_DESC =
  "World-leading high-altitude expeditions across Nepal, Tibet & Pakistan — guided by expert Sherpa teams.";

/** Loose shape of React Router's `MetaArgs["matches"]` — we only read root's data. */
type MetaMatches = readonly (undefined | null | { id: string; pathname?: string; data?: unknown })[];

/**
 * Site-wide SEO defaults ride along on the root loader (see root.tsx). Exported
 * so the routes with no page document of their own (/newsletter,
 * /news-and-blogs) can read their SEO out of Site Settings.
 */
export function rootSettings(matches?: MetaMatches): SiteSettings | undefined {
  const root = matches?.find((m) => m?.id === "root") as
    | { data?: { settings?: SiteSettings } }
    | undefined;
  return root?.data?.settings;
}

/** Collapse the stray whitespace a CMS field can pick up (e.g. "Everest  Expedition"). */
const clean = (v?: string | null) => v?.replace(/\s+/g, " ").trim() || undefined;

/**
 * Build the meta tags for a page. Every value is resolved CMS-first:
 *
 *   the document's own `seo` field
 *   → the page's hero content (title/description/image below)
 *   → Site Settings → SEO
 *   → the hardcoded fallbacks above
 */
export function pageMeta({
  seo,
  title,
  description,
  image,
  matches,
}: {
  seo?: SeoFields | null;
  title?: string | null;
  description?: string | null;
  image?: SanityImageRef | null;
  matches?: MetaMatches;
}) {
  const settings = rootSettings(matches);
  const siteSeo = settings?.seo;
  const site = clean(settings?.siteName) ?? FALLBACK_SITE_NAME;

  const base =
    clean(seo?.metaTitle) ??
    clean(title) ??
    clean(siteSeo?.metaTitle) ??
    site;
  const fullTitle = base.includes(site) ? base : `${base} | ${site}`;

  const desc =
    clean(seo?.metaDescription) ??
    clean(description) ??
    clean(siteSeo?.metaDescription) ??
    FALLBACK_DESC;

  const source = seo?.ogImage ?? image ?? siteSeo?.ogImage;
  const ogImage = source
    ? urlFor(source).width(1200).height(630).format("jpg").url()
    : undefined;

  // The deepest match's pathname is the resolved URL with params filled in
  // (/expeditions/everest) and the query string already dropped — exactly what
  // a canonical needs. It collapses /design-your-expedition?expedition=<slug>
  // onto one URL instead of thirteen near-duplicates.
  const pathname = matches?.[matches.length - 1]?.pathname;
  const canonical = pathname ? canonicalUrl(pathname) : undefined;

  // A noindexed page has no canonical: pointing at a URL you are also telling
  // Google to drop sends two contradictory signals.
  const noIndex = seo?.noIndex === true;

  return [
    { title: fullTitle },
    { name: "description", content: desc },
    ...(noIndex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ...(canonical && !noIndex
      ? [
          { tagName: "link", rel: "canonical", href: canonical },
          { property: "og:url", content: canonical },
        ]
      : []),
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: desc },
    ...(ogImage ? [{ property: "og:image", content: ogImage }] : []),
    {
      name: "twitter:card",
      content: ogImage ? "summary_large_image" : "summary",
    },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: desc },
    ...(ogImage ? [{ name: "twitter:image", content: ogImage }] : []),
  ];
}
