// Self-check for the CMS-first meta-tag fallback chain in src/lib/seo.ts.
//   node scripts/seo.test.mjs
// Loaded through Vite because seo.ts pulls in sanity.ts, which reads
// `import.meta.env` — undefined under a bare node run.
import assert from "node:assert/strict";
import { createServer } from "vite";

const vite = await createServer({ configFile: false, server: { middlewareMode: true }, appType: "custom" });
const { pageMeta, canonicalUrl, isProductionHost } = await vite.ssrLoadModule("/src/lib/seo.ts");
const { siteJsonLd, breadcrumbJsonLd, faqJsonLd, expeditionJsonLd, jsonLdGraph } =
  await vite.ssrLoadModule("/src/lib/jsonld.ts");

const settings = {
  siteName: "Thamserku Expedition",
  seo: { metaTitle: "Site Title", metaDescription: "Site desc" },
};
const matches = [{ id: "root", pathname: "/", data: { settings } }];
const at = (pathname) => [...matches, { id: "leaf", pathname }];
const link = (tags, rel) => tags.find((t) => t.tagName === "link" && t.rel === rel)?.href;
const title = (tags) => tags.find((t) => "title" in t).title;
const tag = (tags, key, prop = "name") => tags.find((t) => t[prop] === key)?.content;

// 1. Document seo wins over the page's own hero content.
let t = pageMeta({
  seo: { metaTitle: "CMS Title", metaDescription: "CMS desc" },
  title: "Hero Headline",
  description: "Hero subheading",
  matches,
});
assert.equal(title(t), "CMS Title | Thamserku Expedition");
assert.equal(tag(t, "description"), "CMS desc");
assert.equal(tag(t, "og:title", "property"), "CMS Title | Thamserku Expedition");
assert.equal(tag(t, "twitter:description"), "CMS desc");

// 2. Blank document seo falls back to hero content.
t = pageMeta({ seo: {}, title: "Hero Headline", description: "Hero subheading", matches });
assert.equal(title(t), "Hero Headline | Thamserku Expedition");
assert.equal(tag(t, "description"), "Hero subheading");

// 3. No hero content either → Site Settings defaults.
t = pageMeta({ matches });
assert.equal(title(t), "Site Title | Thamserku Expedition");
assert.equal(tag(t, "description"), "Site desc");

// 4. No root settings at all → hardcoded last resort, never an empty tag.
t = pageMeta({ title: "Standalone" });
assert.equal(title(t), "Standalone | Thamserku Expedition");
assert.match(tag(t, "description"), /^World-leading/);

// 5. A stray space in the CMS never reaches the title tag ("Everest  Expedition").
t = pageMeta({ title: "Everest  Expedition ", matches });
assert.equal(title(t), "Everest Expedition | Thamserku Expedition");

// 6. A title already containing the site name isn't suffixed twice.
t = pageMeta({ title: "Thamserku Expedition | Himalayan Expeditions", matches });
assert.equal(title(t), "Thamserku Expedition | Himalayan Expeditions");

// 7. No image anywhere → no og:image, and the summary card downgrades.
assert.equal(tag(t, "og:image", "property"), undefined);
assert.equal(tag(t, "twitter:card"), "summary");

// ── canonical / og:url ─────────────────────────────────────────────────────
t = pageMeta({ title: "Everest Expedition", matches: at("/expeditions/everest") });
assert.equal(link(t, "canonical"), "https://thamserkuexpedition.com/expeditions/everest");
assert.equal(tag(t, "og:url", "property"), "https://thamserkuexpedition.com/expeditions/everest");

// The home route canonicalises to the bare origin, not a trailing slash.
assert.equal(canonicalUrl("/"), "https://thamserkuexpedition.com");
assert.equal(canonicalUrl("/editions/"), "https://thamserkuexpedition.com/editions");

// ── noindex ────────────────────────────────────────────────────────────────
// A noindexed page emits robots and drops the canonical — telling Google both
// "drop this" and "this is the preferred URL" is contradictory.
t = pageMeta({ seo: { noIndex: true }, title: "Hidden", matches: at("/hidden") });
assert.equal(tag(t, "robots"), "noindex, nofollow");
assert.equal(link(t, "canonical"), undefined);
assert.equal(tag(t, "og:url", "property"), undefined);

// noIndex false/absent must not emit the tag.
assert.equal(tag(pageMeta({ seo: { noIndex: false }, matches }), "robots"), undefined);
assert.equal(tag(pageMeta({ matches }), "robots"), undefined);

// ── production host detection ──────────────────────────────────────────────
const req = (headers) => new Request("https://internal.local/", { headers });
assert.equal(isProductionHost(req({ host: "thamserkuexpedition.com" })), true);
assert.equal(isProductionHost(req({ "x-forwarded-host": "thamserkuexpedition.com" })), true);
// The proxy header wins over Host — behind a CDN, Host is the internal origin.
assert.equal(isProductionHost(req({ "x-forwarded-host": "preview.amplifyapp.com", host: "thamserkuexpedition.com" })), false);
assert.equal(isProductionHost(req({ host: "www.thamserkuexpedition.com" })), false);
assert.equal(isProductionHost(req({ host: "localhost:3000" })), false);
// A forwarded chain lists the client-facing host first.
assert.equal(isProductionHost(req({ "x-forwarded-host": "thamserkuexpedition.com, internal" })), true);

// ── JSON-LD ────────────────────────────────────────────────────────────────
const graph = (nodes) => JSON.parse(jsonLdGraph(nodes).replaceAll("\\u003c", "<"))["@graph"];
const typeOf = (n) => [].concat(n["@type"]).join("+");

// Empty values are stripped rather than emitted as null.
let g = graph(siteJsonLd({ siteName: "Acme", contactEmail: "a@b.c" }));
assert.equal(typeOf(g[0]), "Organization+TravelAgency");
assert.equal(g[0].name, "Acme");
assert.ok(!("address" in g[0]), "blank address must be omitted, not null");
assert.ok(!("sameAs" in g[0]));
assert.equal(g[1]["@id"], "https://thamserkuexpedition.com/#website");

// geo needs both coordinates or neither.
g = graph(siteJsonLd({ address: { addressLocality: "Kathmandu", latitude: 27.7 } }));
assert.ok(!("geo" in g[0]), "geo needs both lat and lng");
assert.equal(g[0].address.addressLocality, "Kathmandu");

// Breadcrumbs always start at Home and use absolute canonical URLs.
g = graph([breadcrumbJsonLd([{ name: "Editions", path: "/editions" }])]);
assert.deepEqual(g[0].itemListElement.map((i) => i.item), [
  "https://thamserkuexpedition.com",
  "https://thamserkuexpedition.com/editions",
]);
assert.equal(breadcrumbJsonLd([]), undefined);

// FAQ entries missing a question or an answer are dropped, not half-emitted.
g = graph([faqJsonLd([{ question: "Q1", answer: "A1" }, { question: "Q2" }, {}])]);
assert.equal(g[0].mainEntity.length, 1);
assert.equal(g[0].mainEntity[0].acceptedAnswer.text, "A1");
assert.equal(faqJsonLd([]), undefined);

// Free-text altitude and duration are parsed into machine-readable values.
g = graph(expeditionJsonLd({
  name: "Everest ",                       // trailing space, as in the CMS
  slug: { current: "everest" },
  altitude: "8,848.86 m",
  region: "Solu, Nepal",
  duration: "42 days",
  positioning: "A long climb.",
  itinerary: [{ activity: " Arrive Kathmandu" }, { activity: "Trek to Base Camp" }],
}));
const [mountain, trip] = g;
assert.equal(mountain.elevation.value, 8848.86);
assert.equal(mountain.elevation.unitCode, "MTR");
assert.equal(trip.name, "Everest Expedition");           // trailing space gone
assert.equal(trip.duration, "P42D");                     // ISO-8601, not "42 days"
assert.equal(trip.itinerary.numberOfItems, 2);
assert.equal(trip.itinerary.itemListElement[0].item.name, "Arrive Kathmandu");
assert.equal(trip.arrivalLocation["@id"], mountain["@id"]);
// Prices are deliberately off the site, so no offers node may appear.
assert.ok(!("offers" in trip), "no offers node — the site publishes no prices");

// Unparseable altitude must omit elevation rather than emit NaN.
assert.ok(!("elevation" in graph(expeditionJsonLd({ name: "X", slug: { current: "x" }, altitude: "unknown" }))[0]));

// A CMS field containing </script> cannot break out of the script tag.
const escaped = jsonLdGraph([faqJsonLd([{ question: "Hack", answer: "</script><script>alert(1)" }])]);
assert.ok(!escaped.includes("</script>"), "angle brackets must be escaped");
assert.ok(escaped.includes("\\u003c"));

console.log("seo fallback chain ok");
await vite.close();
