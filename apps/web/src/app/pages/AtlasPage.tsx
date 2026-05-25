import { useLoaderData } from "react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { AtlasListingHero } from "../components/atlas/AtlasListingHero";
import { AtlasControls } from "../components/atlas/AtlasControls";
import { AtlasIndex } from "../components/atlas/AtlasIndex";
import { AtlasComparison } from "../components/atlas/AtlasComparison";
import { SevenThousandMeterPathwayInsert } from "../components/atlas/SevenThousandMeterPathwayInsert";
import { AtlasSeasonalGuide } from "../components/atlas/AtlasSeasonalGuide";
import { AtlasWhy } from "../components/atlas/AtlasWhy";
import { AtlasFAQ } from "../components/atlas/AtlasFAQ";
import { AtlasClosing } from "../components/atlas/AtlasClosing";
import { getAtlasPageData, type AtlasPageData } from "../../lib/queries";

export async function loader() {
  return getAtlasPageData();
}

export default function AtlasPage() {
  const { atlasPage, expeditions } = useLoaderData() as AtlasPageData;

  return (
    <div className="w-full min-h-screen bg-[#1A1A1A] text-white">
      <Nav hideOnScrollDown />
      <AtlasListingHero data={atlasPage ?? undefined} />
      <AtlasControls />
      <AtlasIndex expeditions={expeditions} />
      <AtlasComparison />
      <SevenThousandMeterPathwayInsert />
      <AtlasSeasonalGuide />
      <AtlasWhy />
      <AtlasFAQ />
      <AtlasClosing />
      <Footer />
    </div>
  );
}
