import { useLoaderData } from 'react-router'
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
import { getHomePageData, type HomePageData } from '../../lib/queries'

export async function loader() {
  return getHomePageData()
}

export default function Home() {
  const data = useLoaderData() as HomePageData

  return (
    <>
      <Nav />
      <main>
        <Hero data={data.homePage ?? undefined} />
        <Manifesto data={data.homePage ?? undefined} />
        <ManifestoStats stats={data.homePage?.manifestoStats} />
        <AtlasPreview expeditions={data.homePage?.featuredExpeditions?.length ? data.homePage.featuredExpeditions : undefined} data={data.homePage ?? undefined} />
        <EditionsPreview editions={data.editions.length > 0 ? data.editions : undefined} data={data.homePage ?? undefined} />
        <LegacyPreview data={data.homePage ?? undefined} />
        <UnclaimedPeaks data={data.homePage ?? undefined} />
        <NewsletterSection data={data.homePage ?? undefined} />
        <Closing data={data.homePage ?? undefined} />
      </main>
      <Footer />
    </>
  )
}
