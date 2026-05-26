import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { getTeamPageData, type TeamPageData } from "../../lib/queries";
import { Footer } from "../components/Footer";
import { TeamHero } from "../components/team/TeamHero";
import { TeamManifesto } from "../components/team/TeamManifesto";
import { TeamSherpaLeadership } from "../components/team/TeamSherpaLeadership";
import { TeamField } from "../components/team/TeamField";
import { TeamLeadership } from "../components/team/TeamLeadership";
import { TeamClosing } from "../components/team/TeamClosing";

export async function loader() {
  return getTeamPageData();
}

export default function TeamPage() {
  const data = useLoaderData() as TeamPageData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#1A1A1A] text-white">
      <TeamHero page={data.teamPage ?? undefined} />
      <TeamManifesto page={data.teamPage ?? undefined} />
      <TeamSherpaLeadership sherpas={data.sherpas} />
      <TeamField sherpas={data.sherpas} />
      <TeamLeadership leadership={data.teamPage?.leadership ?? []} />
      <TeamClosing page={data.teamPage ?? undefined} />
      <Footer />
    </div>
  );
}
