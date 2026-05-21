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

export function AtlasPage() {
  return (
    <div className="w-full min-h-screen bg-[#1A1A1A] text-white">
      <Nav hideOnScrollDown />
      <AtlasListingHero />
      <AtlasControls />
      <AtlasIndex />
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