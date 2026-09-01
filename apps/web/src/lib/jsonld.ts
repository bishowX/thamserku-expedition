// JSON-LD generators. Structured data is the format answer engines (ChatGPT,
// Perplexity, Claude) parse most reliably, so this file is as much AEO work as
// SEO work. Caveat worth knowing before judging results: Google restricted FAQ
// rich results to government and health sites in August 2023, and TouristTrip
// has no documented Google rich result. Organization and BreadcrumbList are the
// two here that change how the site looks in Google. The rest earn citations.
import { urlFor } from "./sanity";
import { SITE_URL, canonicalUrl } from "./seo";
import type { SanityImageRef, SeoFields, SiteSettings } from "./queries";

type Json = Record<string, unknown>;

/** Strip empty values so we never emit `"name": null` into the graph. */
function compact(obj: Json): Json {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === undefined || v === null || v === "") return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    }),
  );
}

const text = (v?: string | null) => v?.replace(/\s+/g, " ").trim() || undefined;

const imageUrl = (img?: SanityImageRef | null) =>
  img ? urlFor(img).width(1200).height(630).format("jpg").url() : undefined;

/** "8,848.86 m" → 8848.86. Altitude is free text in the CMS. */
function metres(altitude?: string): number | undefined {
  const n = parseFloat((altitude ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

/** "42 days" → 42. Used for itinerary.numberOfItems. */
function days(duration?: string): number | undefined {
  const n = parseInt((duration ?? "").replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/**
 * Organization + LocalBusiness + WebSite. Emitted once, from the root, so every
 * page carries the brand identity and deeper nodes can reference it by @id
 * instead of repeating it.
 */
export function siteJsonLd(settings?: SiteSettings | null): Json[] {
  const name = text(settings?.siteName) || "Thamserku Expedition";
  const a = settings?.address;

  const address = a
    ? compact({
        "@type": "PostalAddress",
        streetAddress: text(a.streetAddress),
        addressLocality: text(a.addressLocality),
        addressRegion: text(a.addressRegion),
        postalCode: text(a.postalCode),
        addressCountry: text(a.addressCountry),
      })
    : undefined;

  const geo =
    a?.latitude != null && a?.longitude != null
      ? { "@type": "GeoCoordinates", latitude: a.latitude, longitude: a.longitude }
      : undefined;

  const contactPoints = [
    settings?.contactEmail && {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: settings.contactEmail,
      availableLanguage: ["English", "Nepali"],
    },
    settings?.contactWhatsAppDisplay && {
      "@type": "ContactPoint",
      contactType: "reservations",
      telephone: settings.contactWhatsAppDisplay,
    },
  ].filter(Boolean);

  // TravelAgency is the narrowest schema.org type that fits an expedition
  // operator, and it inherits from both Organization and LocalBusiness — so one
  // node does the job of the two the plan called for.
  const organization = compact({
    "@type": ["Organization", "TravelAgency"],
    "@id": ORG_ID,
    name,
    url: SITE_URL,
    description: text(settings?.seo?.metaDescription),
    image: imageUrl(settings?.seo?.ogImage),
    logo: imageUrl(settings?.seo?.ogImage),
    email: settings?.contactEmail,
    foundingDate: settings?.foundingYear ? String(settings.foundingYear) : undefined,
    address,
    geo,
    contactPoint: contactPoints.length ? contactPoints : undefined,
    sameAs: settings?.socialProfiles?.filter(Boolean),
    areaServed: ["Nepal", "Tibet", "Pakistan"],
  });

  const website = compact({
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  });

  return [organization, website];
}

/**
 * BreadcrumbList for any page below the root. Google shows these in results in
 * place of the raw URL, which is why it is one of the two nodes here that
 * visibly change the search listing.
 */
export function breadcrumbJsonLd(
  trail: Array<{ name: string; path: string }>,
): Json | undefined {
  if (trail.length === 0) return undefined;
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

/**
 * FAQPage. Emit every question the document holds, not the subset a component
 * chooses to render — the markup is read by machines, not clipped by a
 * "show more" button.
 */
export function faqJsonLd(
  faqs?: Array<{ question?: string; answer?: string }> | null,
): Json | undefined {
  const entries = (faqs ?? [])
    .map((f) => ({ q: text(f.question), a: text(f.answer) }))
    .filter((f) => f.q && f.a);
  if (entries.length === 0) return undefined;
  return {
    "@type": "FAQPage",
    mainEntity: entries.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

type ExpeditionForJsonLd = {
  name: string;
  slug: { current: string };
  altitude?: string;
  region?: string;
  season?: string;
  duration?: string;
  positioning?: string;
  overviewBody?: string;
  seo?: SeoFields | null;
  heroImage?: SanityImageRef | null;
  image?: SanityImageRef | null;
  itinerary?: Array<{ days?: string; activity?: string }>;
  faqs?: Array<{ question?: string; answer?: string }> | null;
};

/**
 * TouristTrip for an expedition, plus the Mountain it climbs. Prices are
 * deliberately absent from the site, so no `offers` node — asserting a price we
 * do not publish would be worse than omitting it.
 */
export function expeditionJsonLd(e: ExpeditionForJsonLd): Json[] {
  const url = canonicalUrl(`/expeditions/${e.slug.current}`);
  const name = text(e.name);
  const elevation = metres(e.altitude);
  const mountainId = `${url}#mountain`;

  const mountain = compact({
    "@type": "Mountain",
    "@id": mountainId,
    name,
    elevation: elevation
      ? { "@type": "QuantitativeValue", value: elevation, unitCode: "MTR" }
      : undefined,
    containedInPlace: text(e.region)
      ? { "@type": "Place", name: text(e.region) }
      : undefined,
  });

  const legs = (e.itinerary ?? [])
    .map((d) => text(d.activity))
    .filter(Boolean)
    .map((activity, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "TouristAttraction", name: activity },
    }));

  const trip = compact({
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    name: name ? `${name} Expedition` : undefined,
    url,
    description: text(e.seo?.metaDescription) || text(e.overviewBody) || text(e.positioning),
    image: imageUrl(e.seo?.ogImage ?? e.heroImage ?? e.image),
    provider: { "@id": ORG_ID },
    touristType: "Mountaineers",
    arrivalLocation: { "@id": mountainId },
    // `duration` is free text ("42 days"); ISO-8601 is what consumers parse.
    ...(days(e.duration) ? { duration: `P${days(e.duration)}D` } : {}),
    itinerary: legs.length
      ? { "@type": "ItemList", numberOfItems: legs.length, itemListElement: legs }
      : undefined,
  });

  return [mountain, trip];
}

/**
 * Wrap nodes in a single `@graph`. One script tag per page beats several — the
 * nodes can then cross-reference each other by @id.
 */
export function jsonLdGraph(nodes: Array<Json | undefined>): string {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  });
  // This string goes into a <script> via dangerouslySetInnerHTML. JSON.stringify
  // does not escape "<", so a CMS field containing "</script>" would break out
  // of the tag. Escaping the angle bracket keeps the JSON valid and inert.
  return json.replace(/</g, "\\u003c");
}
