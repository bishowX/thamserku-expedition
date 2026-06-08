import { urlFor } from "./sanity";

const SITE = "Thamserku Expedition";
const DEFAULT_DESC =
  "World-leading high-altitude expeditions across Nepal, Tibet & Pakistan — guided by expert Sherpa teams.";

export function pageMeta({
  title,
  description,
  image,
}: {
  title: string;
  description?: string | null;
  image?: { asset: { _ref: string } } | null;
}) {
  const fullTitle = title.includes(SITE) ? title : `${title} | ${SITE}`;
  const desc = description?.trim() || DEFAULT_DESC;
  const ogImage = image
    ? urlFor(image).width(1200).height(630).format("jpg").url()
    : undefined;

  return [
    { title: fullTitle },
    { name: "description", content: desc },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE },
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
