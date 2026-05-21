import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { LegacyHero } from "../components/legacy/LegacyHero";
import { LegacyOrigin } from "../components/legacy/LegacyOrigin";
import { LegacyChairman } from "../components/legacy/LegacyChairman";
import { LegacyTimeline } from "../components/legacy/LegacyTimeline";
import { LegacyLineage } from "../components/legacy/LegacyLineage";
import { LegacyRevival } from "../components/legacy/LegacyRevival";
import { LegacyPhilosophy } from "../components/legacy/LegacyPhilosophy";
import { LegacyNewsletterBanner } from "../components/legacy/LegacyNewsletterBanner";
import { LegacyClosing } from "../components/legacy/LegacyClosing";

export function LegacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F4F2EC] text-[#1A1A1A]">
      <LegacyHero />
      <LegacyOrigin />
      <LegacyChairman />
      <LegacyTimeline />
      <LegacyLineage />
      <LegacyRevival />
      <LegacyPhilosophy />
      <LegacyNewsletterBanner />
      <LegacyClosing />
      <Footer />
    </div>
  );
}
