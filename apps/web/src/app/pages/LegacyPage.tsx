import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { Footer } from "../components/Footer";
import { LegacyHero } from "../components/legacy/LegacyHero";
import { LegacyOrigin } from "../components/legacy/LegacyOrigin";
import { LegacyChairman } from "../components/legacy/LegacyChairman";
import { LegacyTimeline } from "../components/legacy/LegacyTimeline";
import { LegacyLineage } from "../components/legacy/LegacyLineage";
import { LegacyNewsletterBanner } from "../components/legacy/LegacyNewsletterBanner";
import { LegacyClosing } from "../components/legacy/LegacyClosing";
import { getLegacyPageData, type LegacyPageData } from "../../lib/queries";

export async function loader() {
  return getLegacyPageData();
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
      <LegacyOrigin page={page} />
      <LegacyChairman letter={page?.chairmanLetter ?? undefined} />
      <LegacyTimeline page={page} />
      <LegacyLineage page={page} />
<LegacyNewsletterBanner page={page} />
      <LegacyClosing page={page} />
      <Footer />
    </div>
  );
}
