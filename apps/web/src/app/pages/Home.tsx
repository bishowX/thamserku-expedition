import { useLoaderData } from 'react-router'
import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { Manifesto } from '../components/Manifesto'
import { YetiInfrastructurePreview } from '../components/YetiInfrastructurePreview'
import { AtlasPreview } from '../components/AtlasPreview'
import { FieldNotesPreview } from '../components/FieldNotesPreview'
import { EditionsPreview } from '../components/EditionsPreview'
import { LegacyPreview } from '../components/LegacyPreview'
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
        <YetiInfrastructurePreview data={data.homePage ?? undefined} />
        <AtlasPreview expeditions={data.expeditions.length > 0 ? data.expeditions : undefined} data={data.homePage ?? undefined} />
        <EditionsPreview editions={data.editions.length > 0 ? data.editions : undefined} data={data.homePage ?? undefined} />
        <LegacyPreview data={data.homePage ?? undefined} />
        <FieldNotesPreview fieldNotes={data.homePage?.featuredFieldNotes ?? []} data={data.homePage ?? undefined} />
        <Closing data={data.homePage ?? undefined} />
      </main>
      <Footer />
    </>
  )
}
