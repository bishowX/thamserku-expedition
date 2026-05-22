import { useLoaderData } from "react-router";
import { Footer } from "../components/Footer";
import { EditionsHero } from "../components/editions/EditionsHero";
import { EditionsManifesto } from "../components/editions/EditionsManifesto";
import { EditionsBands } from "../components/editions/EditionsBands";
import { EditionsComparison } from "../components/editions/EditionsComparison";
import { EditionsAvailability } from "../components/editions/EditionsAvailability";
import { EditionsClosing } from "../components/editions/EditionsClosing";
import { getEditionsPageData, type EditionsPageData } from "../../lib/queries";

export async function loader() {
  return getEditionsPageData();
}

export default function EditionsPage() {
  const data = useLoaderData() as EditionsPageData;

  return (
    <div className="w-full min-h-screen bg-[#1A1A1A] text-white">
      <EditionsHero editions={data.editions} page={data.editionsPage ?? undefined} />
      <EditionsManifesto page={data.editionsPage ?? undefined} />
      <EditionsBands editions={data.editions} />
      <EditionsComparison editions={data.editions} expeditions={data.expeditions} />
      <EditionsAvailability expeditions={data.expeditions} editions={data.editions} />
      <EditionsClosing page={data.editionsPage ?? undefined} />
      <Footer />
    </div>
  );
}
