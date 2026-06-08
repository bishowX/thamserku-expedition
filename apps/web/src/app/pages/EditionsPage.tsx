import { useLoaderData } from "react-router";
import { Footer } from "../components/Footer";
import { EditionsHero } from "../components/editions/EditionsHero";
import { EditionsManifesto } from "../components/editions/EditionsManifesto";
import { EditionsBands } from "../components/editions/EditionsBands";
import { EditionsComparison } from "../components/editions/EditionsComparison";
import { EditionsAvailability } from "../components/editions/EditionsAvailability";
import { EditionsClosing } from "../components/editions/EditionsClosing";
import { getEditionsPageData, type EditionsPageData } from "../../lib/queries";
import type { Route } from "./+types/EditionsPage";
import { pageMeta } from "../../lib/seo";

export async function loader() {
  return getEditionsPageData();
}

export function meta({ data }: Route.MetaArgs) {
  const d = data as EditionsPageData | undefined;
  return pageMeta({
    title: d?.editionsPage?.heroHeadline ?? "Our Expedition Editions",
    description: d?.editionsPage?.heroSubheading,
    image: d?.editionsPage?.heroImage,
  });
}

export default function EditionsPage() {
  const data = useLoaderData() as EditionsPageData;

  return (
    <div className="w-full min-h-screen bg-[#1A1A1A] text-white">
      <EditionsHero
        editions={data.editions}
        page={data.editionsPage ?? undefined}
      />
      <EditionsManifesto page={data.editionsPage ?? undefined} />
      <EditionsBands editions={data.editions} />
      <EditionsComparison
        editions={data.editions}
        expeditions={data.expeditions}
        page={data.editionsPage ?? undefined}
      />
      <EditionsClosing page={data.editionsPage ?? undefined} />
      <Footer />
    </div>
  );
}
