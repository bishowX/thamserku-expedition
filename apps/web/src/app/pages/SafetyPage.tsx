import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { useQuery } from "@sanity/react-loader";
import type { QueryResponseInitial } from "@sanity/react-loader";
import { SAFETY_QUERY, type SafetyPageData } from "../../lib/queries";
import { getPreviewData } from "../../lib/preview.server";
import { loadQuery } from "../../lib/loader.server";
import { Nav } from "../components/Nav";
import { SafetyHero } from "../components/safety/SafetyHero";
import { SafetyStats } from "../components/safety/SafetyStats";
import { SafetyArchitecture } from "../components/safety/SafetyArchitecture";
import { SafetyFoundation } from "../components/safety/SafetyFoundation";
import { SafetyCommunication } from "../components/safety/SafetyCommunication";
import { SafetyEvacuation } from "../components/safety/SafetyEvacuation";
import { SafetyClosing } from "../components/safety/SafetyClosing";
import { Footer } from "../components/Footer";
import type { Route } from "./+types/SafetyPage";
import { pageMeta } from "../../lib/seo";

export async function loader({ request }: { request: Request }) {
  const { options } = await getPreviewData(request);
  const initial = await loadQuery<SafetyPageData>(SAFETY_QUERY, {}, options);
  return { initial };
}

export function meta({ data, matches }: Route.MetaArgs) {
  const d = (data as { initial: QueryResponseInitial<SafetyPageData> } | undefined)?.initial.data;
  return pageMeta({
    seo: d?.safetyPage?.seo,
    title: d?.safetyPage?.heroHeadline ?? "Safety Systems",
    description: d?.safetyPage?.heroSubline,
    image: d?.safetyPage?.heroBgImage,
    matches,
  });
}

export default function SafetyPage() {
  const { initial } = useLoaderData() as { initial: QueryResponseInitial<SafetyPageData> };
  const { data } = useQuery<SafetyPageData>(SAFETY_QUERY, {}, { initial });
  const page = data.safetyPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <SafetyHero page={page} />
      <SafetyStats page={page} />
      <SafetyArchitecture page={page} />
      <SafetyFoundation page={page} />
      <SafetyCommunication page={page} />
      <SafetyEvacuation page={page} />
      <SafetyClosing page={page} />
      <Footer />
    </main>
  );
}
