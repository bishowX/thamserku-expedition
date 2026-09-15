/**
 * Permanent redirects from the previous WordPress site.
 *
 * The map used to live only in docs/amplify-redirects.json, which has to be
 * pasted into the Amplify console by hand — it was never applied, so every
 * earned backlink 404s. Matching here means a deploy is enough.
 *
 * Destinations that no longer exist on this site (/atlas, /team, /private)
 * are remapped to the closest live route.
 */
import { SITE_ROUTES } from "./siteRoutes";

const EXACT: Record<string, string> = {
  "/thamserku_expedition_booking": "/design-your-expedition",
  "/thamserku-expeditions-search": "/",
  "/bespoke-tailor-made-expeditions": "/design-your-expedition",
  "/about-us": "/legacy",
  "/about-us/making-a-difference": "/legacy",
  "/about-us/testimonials": "/legacy",
  "/about-us/our-team": "/heritage-and-achievements",
  "/contact-us": "/consultation",
  "/our-patrons": "/legacy",
  "/our-equipment-partners": "/legacy",
  "/our-sister-companies": "/legacy",
  "/blog": "/news-and-blogs",
  "/news-and-updates": "/news-and-blogs",
  "/thamserku-expeditions-booking-form": "/consultation",
  "/book-now": "/consultation",
  "/make-payment": "/consultation",
  "/payment-invoice": "/consultation",
  "/payment-status": "/consultation",
  "/confirmation": "/consultation",
  "/my-account": "/",
  "/accueil": "/",
  "/a-propos-de-nous": "/legacy",
  "/heim": "/",
  "/ueber-uns": "/legacy",
  "/chi-siamo": "/legacy",
  "/sobre-nosotros": "/legacy",
  "/wp-login.php": "/",
  "/wp-admin": "/",
  // Planned routes that were never shipped; old redirect docs pointed here.
  "/atlas": "/",
  "/team": "/heritage-and-achievements",
  "/private": "/design-your-expedition",
  "/expeditions": "/",
  "/cart": "/consultation",
  "/checkout": "/consultation",
  "/shop": "/design-your-expedition",
};

/** Longest prefix first so /about-us/our-team wins over /about-us. */
const PREFIXES: Array<[prefix: string, to: string]> = [
  ["/about-us/our-team", "/heritage-and-achievements"],
  ["/about-us", "/legacy"],
  ["/a-propos-de-nous", "/legacy"],
  ["/ueber-uns", "/legacy"],
  ["/chi-siamo", "/legacy"],
  ["/sobre-nosotros", "/legacy"],
  ["/news-and-updates", "/news-and-blogs"],
  ["/blog", "/news-and-blogs"],
  ["/category", "/news-and-blogs"],
  ["/tag", "/news-and-blogs"],
  ["/author", "/heritage-and-achievements"],
  ["/my-account", "/"],
  ["/wp-admin", "/"],
  ["/product", "/design-your-expedition"],
  ["/shop", "/design-your-expedition"],
];

/**
 * WordPress booking slugs (and their translated copies) matched against the
 * live expedition slugs. More specific needles first so
 * baruntse-expedition-with-mera-peak lands on Baruntse, not Mera.
 */
const PEAK_NEEDLES: Array<[needle: string, slug: string]> = [
  ["ama-dablam", "ama-dablam"],
  ["amadablam", "ama-dablam"],
  ["putha-hiunchuli", "putha-hiunchuli"],
  ["putha", "putha-hiunchuli"],
  ["hiunchuli", "putha-hiunchuli"],
  ["chulu-far-east", "chulu-far-east"],
  ["chulu", "chulu-far-east"],
  ["island-peak", "imja-tse"],
  ["lobuche", "lobuche-peak"],
  ["baruntse", "baruntse"],
  ["himlung", "himlung"],
  ["manaslu", "manaslu"],
  ["lhotse", "lhotse"],
  ["everest", "everest"],
  ["saribung", "saribung"],
  ["api-himal", "api-himal"],
  ["imja", "imja-tse"],
  ["island", "imja-tse"],
  ["mera", "mera-peak"],
  ["api", "api-himal"],
];

const EXPEDITION_ALIASES: Record<string, string> = {
  "himlung-himal": "himlung",
  amadablam: "ama-dablam",
  ama_dablam: "ama-dablam",
  "island-peak": "imja-tse",
  mera: "mera-peak",
  lobuche: "lobuche-peak",
  putha: "putha-hiunchuli",
  api: "api-himal",
  chulu: "chulu-far-east",
};

const BOOKING_PREFIX = "/thamserku_expedition_booking";
const LANG_PREFIX = /^\/(fr|de|it|es|en)(?=\/|$)/;
const STATIC_PATHS = new Set(SITE_ROUTES.map((r) => r.path));

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  return trimmed.toLowerCase();
}

function peakSlugFromBooking(rest: string): string | undefined {
  return PEAK_NEEDLES.find(([needle]) => rest.includes(needle))?.[1];
}

function prefixDestination(path: string): string | undefined {
  return PREFIXES.find(
    ([prefix]) => path === prefix || path.startsWith(`${prefix}/`),
  )?.[1];
}

/**
 * Canonical path to 301 to, or null if this URL should 404.
 * Hash/query are dropped — old booking query strings are meaningless here.
 */
export function matchLegacyRedirect(pathname: string): string | null {
  let path = normalizePath(pathname);

  const withoutLang = path.replace(LANG_PREFIX, "") || "/";
  if (withoutLang !== path) path = normalizePath(withoutLang);

  const exact = EXACT[path];
  if (exact) return exact;

  if (path === BOOKING_PREFIX || path.startsWith(`${BOOKING_PREFIX}/`)) {
    const rest = path.slice(BOOKING_PREFIX.length + 1);
    const slug = peakSlugFromBooking(rest);
    return slug ? `/expeditions/${slug}` : "/design-your-expedition";
  }

  const prefixed = prefixDestination(path);
  if (prefixed) return prefixed;

  const expedition = /^\/expeditions\/([^/]+)$/.exec(path);
  if (expedition) {
    const alias = matchExpeditionSlugAlias(expedition[1]);
    if (alias) return `/expeditions/${alias}`;
  }

  // /faq/ (and mixed-case static paths) never hit their real route —
  // trailingSlash is off and the router is case-sensitive.
  if (STATIC_PATHS.has(path) && pathname !== path) return path;

  if (pathname !== "/" && pathname.endsWith("/")) return path;

  return null;
}

/** Old or guessed expedition slugs that should 301 onto the live one. */
export function matchExpeditionSlugAlias(slug: string): string | null {
  const key = slug.replace(/\/+$/, "").toLowerCase();
  const alias = EXPEDITION_ALIASES[key];
  if (alias && alias !== key) return alias;
  if (key !== slug) return key;
  return null;
}
