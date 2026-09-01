import { SITE_URL, isProductionHost } from "../../lib/seo";

// Answer engines that we deliberately let in. This allow is intentional: being
// quoted by ChatGPT, Perplexity and Claude is a traffic channel we want, not a
// leak to plug. Please do not "tighten" this by reflex — removing these lines
// undoes the AEO work in one commit. If you want to reconsider it, that is a
// business decision, not a security one.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Google-Extended",
];

export function loader({ request }: { request: Request }) {
  // Preview and branch deploys serve the same app on a different host. Without
  // this they compete with production for the same content in the index.
  if (!isProductionHost(request)) {
    return robots(["User-agent: *", "Disallow: /"]);
  }

  return robots([
    "User-agent: *",
    "Allow: /",
    "",
    // Note: the configurator's ?expedition= variants are deliberately NOT
    // disallowed. They are already collapsed by the canonical tag, and blocking
    // them would stop Google reading that tag — which is how you end up with
    // "indexed, though blocked by robots.txt" instead of clean deduplication.
    "Disallow: /api/",
    "",
    ...AI_CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, "Allow: /", ""]),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
  ]);
}

function robots(lines: string[]) {
  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
