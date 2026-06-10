import { useLoaderData } from 'react-router'
import { useQuery } from '@sanity/react-loader'
import type { QueryResponseInitial } from '@sanity/react-loader'
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { Manifesto } from '../components/Manifesto'
import { ManifestoStats } from '../components/ManifestoStats'
import { AtlasPreview } from '../components/AtlasPreview'
import { NewsletterSection } from '../components/NewsletterSection'
import { EditionsPreview } from '../components/EditionsPreview'
import { LegacyPreview } from '../components/LegacyPreview'
import { UnclaimedPeaks } from '../components/UnclaimedPeaks'
import { Closing } from '../components/Closing'
import { Footer } from '../components/Footer'
import { HOME_QUERY, type HomePageData } from '../../lib/queries'
import { getPreviewData } from '../../lib/preview.server'
import { loadQuery } from '../../lib/loader.server'
import type { Route } from "./+types/Home";
import { pageMeta } from "../../lib/seo";

export async function loader({ request }: { request: Request }) {
  const { options } = await getPreviewData(request)
  const initial = await loadQuery<HomePageData>(HOME_QUERY, {}, options)
  return { initial }
}

export function meta({ data }: Route.MetaArgs) {
  const d = (data as { initial: QueryResponseInitial<HomePageData> } | undefined)?.initial.data;
  return pageMeta({
    title: "Thamserku Expedition | World-Leading Himalayan Expeditions",
    description: d?.homePage?.heroSubheading,
    image: d?.homePage?.heroImage,
  });
}

export default function Home() {
  const { initial } = useLoaderData() as { initial: QueryResponseInitial<HomePageData> }
  const { data, encodeDataAttribute } = useQuery<HomePageData>(HOME_QUERY, {}, { initial })

  return (
    <>
      <Nav />
      <main>
        <Hero data={data.homePage ?? undefined} encodeDataAttribute={encodeDataAttribute} />
        <Manifesto data={data.homePage ?? undefined} encodeDataAttribute={encodeDataAttribute} />
        <ManifestoStats stats={data.homePage?.manifestoStats} />
        <AtlasPreview expeditions={data.homePage?.featuredExpeditions?.length ? data.homePage.featuredExpeditions : undefined} data={data.homePage ?? undefined} />
        <EditionsPreview editions={data.editions.length > 0 ? data.editions : undefined} data={data.homePage ?? undefined} />
        <LegacyPreview data={data.homePage ?? undefined} />
        <UnclaimedPeaks data={data.homePage ?? undefined} />
        <NewsletterSection data={data.homePage ?? undefined} />
        <Closing data={data.homePage ?? undefined} encodeDataAttribute={encodeDataAttribute} />
      </main>
      <Footer />
    </>
  )
}
