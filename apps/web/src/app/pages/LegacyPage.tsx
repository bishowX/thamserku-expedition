import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { useQuery } from "@sanity/react-loader";
import type { QueryResponseInitial } from "@sanity/react-loader";
import { Footer } from "../components/Footer";
import { LegacyHero } from "../components/legacy/LegacyHero";
import { LegacyTimeline } from "../components/legacy/LegacyTimeline";
import { LEGACY_QUERY, type LegacyPageData } from "../../lib/queries";
import { getPreviewData } from "../../lib/preview.server";
import { loadQuery } from "../../lib/loader.server";
import type { Route } from "./+types/LegacyPage";
import { pageMeta } from "../../lib/seo";

export async function loader({ request }: { request: Request }) {
  const { options } = await getPreviewData(request);
  const initial = await loadQuery<LegacyPageData>(LEGACY_QUERY, {}, options);
  return { initial };
}

export function meta({ data, matches }: Route.MetaArgs) {
  const d = (data as { initial: QueryResponseInitial<LegacyPageData> } | undefined)?.initial.data;
  return pageMeta({
    seo: d?.legacyPage?.seo,
    title: d?.legacyPage?.heroHeadline ?? "Our Legacy",
    description: d?.legacyPage?.heroSubheading,
    image: d?.legacyPage?.heroImage,
    matches,
  });
}

export default function LegacyPage() {
  const { initial } = useLoaderData() as { initial: QueryResponseInitial<LegacyPageData> };
  const { data } = useQuery<LegacyPageData>(LEGACY_QUERY, {}, { initial });
  const page = data.legacyPage ?? undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F4F2EC] text-[#1A1A1A]">
      <LegacyHero page={page} />
      <LegacyTimeline page={page} />
      <Footer />
    </div>
  );
}
