import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { Footer } from "../components/Footer";
import { LegacyHero } from "../components/legacy/LegacyHero";
import { LegacyTimeline } from "../components/legacy/LegacyTimeline";
import { getLegacyPageData, type LegacyPageData } from "../../lib/queries";
import type { Route } from "./+types/LegacyPage";
import { pageMeta } from "../../lib/seo";

export async function loader() {
  return getLegacyPageData();
}

export function meta({ data }: Route.MetaArgs) {
  const d = data as LegacyPageData | undefined;
  return pageMeta({
    title: d?.legacyPage?.heroHeadline ?? "Our Legacy",
    description: d?.legacyPage?.heroSubheading,
  });
}

export default function LegacyPage() {
  const data = useLoaderData() as LegacyPageData;
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
