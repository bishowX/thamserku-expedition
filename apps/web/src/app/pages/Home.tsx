import { useLoaderData } from 'react-router'
import { useQuery } from '@sanity/react-loader'
import type { QueryResponseInitial } from '@sanity/react-loader'
import { Nav } from '../components/Nav'
import { CinematicIntro } from '../components/CinematicIntro'
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
import { heroSrcSet, HERO_SIZES } from "../../lib/heroImage";

export function links() {
  // Scene 1 of the cinematic intro is the LCP element. Preload the responsive
  // AVIF set so the browser fetches the viewport-appropriate variant (13 KB on
  // a phone, 84 KB on desktop) instead of the 1.3 MB source JPEG. Browsers
  // without AVIF ignore this and load from the <picture> webp/jpg fallback.
  return [
    {
      rel: "preload",
      as: "image",
      type: "image/avif",
      // lowercase attribute keys: React 18 has no special handling for these
      // (they're React-19 props), so it passes them through verbatim as valid
      // lowercase HTML attributes instead of warning about camelCase.
      imagesrcset: heroSrcSet("/images/hero-cinematic-1.jpg", "avif"),
      imagesizes: HERO_SIZES,
      fetchpriority: "high",
    },
  ];
}

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

// Home's "page top" for the Nav is the hero's rest position — one intro
// viewport down (see CinematicIntro's scroll hand-off).
const navTopOffset = () => window.innerHeight;

export default function Home() {
  const { initial } = useLoaderData() as { initial: QueryResponseInitial<HomePageData> }
  const { data, encodeDataAttribute } = useQuery<HomePageData>(HOME_QUERY, {}, { initial })

  return (
    <>
      <Nav topOffset={navTopOffset} cinematic />
      <main>
        <CinematicIntro>
          <Hero data={data.homePage ?? undefined} encodeDataAttribute={encodeDataAttribute} />
        </CinematicIntro>
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
