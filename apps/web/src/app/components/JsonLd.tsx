/**
 * Renders a JSON-LD graph. The string must come from `jsonLdGraph`, which
 * escapes angle brackets so CMS text cannot break out of the script tag.
 */
export function JsonLd({ graph }: { graph: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: graph }}
    />
  );
}
