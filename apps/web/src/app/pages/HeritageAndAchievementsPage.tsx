import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { useQuery } from "@sanity/react-loader";
import type { QueryResponseInitial } from "@sanity/react-loader";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ManifestoStats } from "../components/ManifestoStats";
import { AchievementsHero } from "../components/achievements/AchievementsHero";
import { AchievementsDecades } from "../components/achievements/AchievementsDecades";
import {
  ACHIEVEMENTS_QUERY,
  type AchievementsPageData,
} from "../../lib/queries";
import { getPreviewData } from "../../lib/preview.server";
import { loadQuery } from "../../lib/loader.server";
import type { Route } from "./+types/HeritageAndAchievementsPage";
import { pageMeta } from "../../lib/seo";

const DEFAULT_STATS = [
  { value: "37+", label: "Years" },
  { value: "800+", label: "Expeditions" },
  { value: "66+", label: "Peaks" },
  { value: "42+", label: "Nations" },
];

export async function loader({ request }: { request: Request }) {
  const { options } = await getPreviewData(request);
  const initial = await loadQuery<AchievementsPageData>(ACHIEVEMENTS_QUERY, {}, options);
  return { initial };
}

export function meta({ data }: Route.MetaArgs) {
  const d = (data as { initial: QueryResponseInitial<AchievementsPageData> } | undefined)?.initial.data;
  return pageMeta({
    title: d?.achievementsPage?.heroHeadline ?? "Heritage & Achievements",
    description: d?.achievementsPage?.heroSubheading,
  });
}

export default function HeritageAndAchievementsPage() {
  const { initial } = useLoaderData() as { initial: QueryResponseInitial<AchievementsPageData> };
  const { data } = useQuery<AchievementsPageData>(ACHIEVEMENTS_QUERY, {}, { initial });
  const page = data.achievementsPage ?? undefined;
  const stats = page?.stats?.length ? page.stats : DEFAULT_STATS;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <AchievementsHero page={page} />
      <ManifestoStats stats={stats} />
      <AchievementsDecades page={page} />
      <Footer />
    </main>
  );
}
