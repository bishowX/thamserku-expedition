import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ManifestoStats } from "../components/ManifestoStats";
import { AchievementsHero } from "../components/achievements/AchievementsHero";
import { AchievementsDecades } from "../components/achievements/AchievementsDecades";
import {
  getAchievementsPageData,
  type AchievementsPageData,
} from "../../lib/queries";
import type { Route } from "./+types/HeritageAndAchievementsPage";
import { pageMeta } from "../../lib/seo";

const DEFAULT_STATS = [
  { value: "37+", label: "Years" },
  { value: "800+", label: "Expeditions" },
  { value: "66+", label: "Peaks" },
  { value: "42+", label: "Nations" },
];

export async function loader() {
  return getAchievementsPageData();
}

export function meta({ data }: Route.MetaArgs) {
  const d = data as AchievementsPageData | undefined;
  return pageMeta({
    title: d?.achievementsPage?.heroHeadline ?? "Heritage & Achievements",
    description: d?.achievementsPage?.heroSubheading,
  });
}

export default function HeritageAndAchievementsPage() {
  const data = useLoaderData() as AchievementsPageData;
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
