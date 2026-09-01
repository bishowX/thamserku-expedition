// One table of the site's static routes, carrying everything both the sitemap
// and the breadcrumb trail need. Previously the sitemap kept its own hardcoded
// copy, which had already drifted — /terms-and-conditions was missing from it.
// Add a route to `routes.ts` and add it here; nothing else needs touching.
export type SiteRoute = {
  path: string;
  /** Breadcrumb label. Also the human name for this URL in structured data. */
  label: string;
  priority: string;
  changefreq: string;
};

export const SITE_ROUTES: SiteRoute[] = [
  { path: "/",                          label: "Home",                     priority: "1.0", changefreq: "weekly"  },
  { path: "/editions",                  label: "Editions",                 priority: "0.9", changefreq: "monthly" },
  { path: "/design-your-expedition",    label: "Design Your Expedition",   priority: "0.9", changefreq: "monthly" },
  { path: "/consultation",              label: "Consultation",             priority: "0.8", changefreq: "monthly" },
  { path: "/safety",                    label: "Safety",                   priority: "0.7", changefreq: "monthly" },
  { path: "/heritage-and-achievements", label: "Heritage & Achievements",  priority: "0.7", changefreq: "monthly" },
  { path: "/legacy",                    label: "Legacy",                   priority: "0.7", changefreq: "monthly" },
  { path: "/yeti-infrastructure",       label: "Yeti Infrastructure",      priority: "0.6", changefreq: "monthly" },
  { path: "/faq",                       label: "FAQ",                      priority: "0.6", changefreq: "monthly" },
  { path: "/news-and-blogs",            label: "News & Field Reports",     priority: "0.6", changefreq: "weekly"  },
  { path: "/newsletter",                label: "Newsletter",               priority: "0.4", changefreq: "monthly" },
  { path: "/terms-and-conditions",      label: "Terms & Conditions",       priority: "0.3", changefreq: "yearly"  },
];

/** Breadcrumb label for a static path, or undefined for dynamic/unknown routes. */
export function routeLabel(pathname: string): string | undefined {
  const path = pathname.replace(/\/+$/, "") || "/";
  return SITE_ROUTES.find((r) => r.path === path)?.label;
}
