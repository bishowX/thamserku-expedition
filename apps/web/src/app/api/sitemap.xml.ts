import { getExpeditions } from "../../lib/queries.server";

const BASE = "https://thamserkuexpedition.com";

const STATIC_ROUTES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "/",                          priority: "1.0", changefreq: "weekly"  },
  { path: "/editions",                  priority: "0.9", changefreq: "monthly" },
  { path: "/design-your-expedition",    priority: "0.9", changefreq: "monthly" },
  { path: "/consultation",              priority: "0.8", changefreq: "monthly" },
  { path: "/safety",                    priority: "0.7", changefreq: "monthly" },
  { path: "/heritage-and-achievements", priority: "0.7", changefreq: "monthly" },
  { path: "/legacy",                    priority: "0.7", changefreq: "monthly" },
  { path: "/yeti-infrastructure",       priority: "0.6", changefreq: "monthly" },
  { path: "/faq",                       priority: "0.6", changefreq: "monthly" },
  { path: "/news-and-blogs",            priority: "0.6", changefreq: "weekly"  },
  { path: "/newsletter",               priority: "0.4", changefreq: "monthly" },
];

function url(loc: string, priority: string, changefreq: string) {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

export async function loader() {
  const expeditions = await getExpeditions();

  const expeditionEntries = expeditions.map((e) =>
    url(`${BASE}/expeditions/${e.slug.current}`, "0.9", "monthly")
  );

  const staticEntries = STATIC_ROUTES.map((r) =>
    url(`${BASE}${r.path}`, r.priority, r.changefreq)
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...expeditionEntries,
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
