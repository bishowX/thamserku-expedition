import { getExpeditions } from "../../lib/queries.server";
import { SITE_URL as BASE } from "../../lib/seo";
import { SITE_ROUTES } from "../../lib/siteRoutes";

function url(loc: string, priority: string, changefreq: string) {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

export async function loader() {
  const expeditions = await getExpeditions();

  const expeditionEntries = expeditions.map((e) =>
    url(`${BASE}/expeditions/${e.slug.current}`, "0.9", "monthly")
  );

  const staticEntries = SITE_ROUTES.map((r) =>
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
