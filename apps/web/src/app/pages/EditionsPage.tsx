import { useLoaderData } from "react-router";
import { useQuery } from "@sanity/react-loader";
import type { QueryResponseInitial } from "@sanity/react-loader";
import { Footer } from "../components/Footer";
import { EditionsHero } from "../components/editions/EditionsHero";
import { EditionsManifesto } from "../components/editions/EditionsManifesto";
import { EditionsBands } from "../components/editions/EditionsBands";
import { EditionsComparison } from "../components/editions/EditionsComparison";
import { EditionsAvailability } from "../components/editions/EditionsAvailability";
import { EditionsClosing } from "../components/editions/EditionsClosing";
import { EDITIONS_QUERY, type EditionsPageData } from "../../lib/queries";
import { getPreviewData } from "../../lib/preview.server";
import { loadQuery } from "../../lib/loader.server";
import type { Route } from "./+types/EditionsPage";
import { pageMeta } from "../../lib/seo";

export async function loader({ request }: { request: Request }) {
  const { options } = await getPreviewData(request);
  const initial = await loadQuery<EditionsPageData>(EDITIONS_QUERY, {}, options);
  return { initial };
}

export function meta({ data }: Route.MetaArgs) {
  const d = (data as { initial: QueryResponseInitial<EditionsPageData> } | undefined)?.initial.data;
  return pageMeta({
    title: d?.editionsPage?.heroHeadline ?? "Our Expedition Editions",
    description: d?.editionsPage?.heroSubheading,
    image: d?.editionsPage?.heroImage,
  });
}

export default function EditionsPage() {
  const { initial } = useLoaderData() as { initial: QueryResponseInitial<EditionsPageData> };
  const { data } = useQuery<EditionsPageData>(EDITIONS_QUERY, {}, { initial });

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
