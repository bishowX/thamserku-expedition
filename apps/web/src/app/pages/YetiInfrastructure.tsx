import { useLoaderData } from "react-router";
import { useQuery } from "@sanity/react-loader";
import type { QueryResponseInitial } from "@sanity/react-loader";
import { Nav } from '../components/Nav';
import { YetiHero } from '../components/yeti/YetiHero';
import { YetiDefinition } from '../components/yeti/YetiDefinition';
import { YetiClosing } from '../components/yeti/YetiClosing';
import { Footer } from '../components/Footer';
import { YETI_QUERY, type YetiPageData } from '../../lib/queries';
import { getPreviewData } from '../../lib/preview.server';
import { loadQuery } from '../../lib/loader.server';
import type { Route } from "./+types/YetiInfrastructure";
import { pageMeta } from "../../lib/seo";

export async function loader({ request }: { request: Request }) {
  const { options } = await getPreviewData(request);
  const initial = await loadQuery<YetiPageData>(YETI_QUERY, {}, options);
  return { initial };
}

export function meta({ data, matches }: Route.MetaArgs) {
  const d = (data as { initial: QueryResponseInitial<YetiPageData> } | undefined)?.initial.data;
  return pageMeta({
    seo: d?.yetiPage?.seo,
    title: d?.yetiPage?.heroHeadline ?? "Yeti Infrastructure",
    description: d?.yetiPage?.heroSubheading,
    image: d?.yetiPage?.closingImage,
    matches,
  });
}

export default function YetiInfrastructure() {
  const { initial } = useLoaderData() as { initial: QueryResponseInitial<YetiPageData> };
  const { data, encodeDataAttribute } = useQuery<YetiPageData>(YETI_QUERY, {}, { initial });
  const page = data.yetiPage ?? undefined;

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <YetiHero page={page} encodeDataAttribute={encodeDataAttribute} />
      <YetiDefinition page={page} encodeDataAttribute={encodeDataAttribute} />
      <YetiClosing page={page} encodeDataAttribute={encodeDataAttribute} />
      <Footer />
    </main>
  );
}
