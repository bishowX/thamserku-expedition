import { useEffect } from "react";
import { Footer } from "../components/Footer";
import { TeamHero } from "../components/team/TeamHero";
import { TeamManifesto } from "../components/team/TeamManifesto";
import { TeamSherpaLeadership } from "../components/team/TeamSherpaLeadership";
import { TeamField } from "../components/team/TeamField";
import { TeamLeadership } from "../components/team/TeamLeadership";
import { TeamClosing } from "../components/team/TeamClosing";

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#1A1A1A] text-white">
      <TeamHero />
      <TeamManifesto />
      <TeamSherpaLeadership />
      <TeamField />
      <TeamLeadership />
      <TeamClosing />
      <Footer />
    </div>
  );
}
