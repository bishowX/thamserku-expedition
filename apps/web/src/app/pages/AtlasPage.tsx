import { useState, useMemo } from "react";
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

  const [mountain, setMountain] = useState("All");
  const [technicalLevel, setTechnicalLevel] = useState("All");
  const [edition, setEdition] = useState("All");

  const mountains = useMemo(
    () => [...new Set(expeditions.map((e) => e.name).filter(Boolean))].sort(),
    [expeditions]
  );

  const technicalLevels = useMemo(
    () => [...new Set(expeditions.map((e) => e.style).filter(Boolean))].sort(),
    [expeditions]
  );

  const editions = useMemo(() => {
    const seen = new Map<string, string>();
    expeditions.forEach((e) =>
      e.editions?.forEach((ed) => {
        if (!seen.has(ed.letter)) seen.set(ed.letter, ed.name ?? ed.letter);
      })
    );
    return [...seen.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, name]) => ({ value: letter, label: name }));
  }, [expeditions]);

  const filtered = useMemo(
    () =>
      expeditions.filter((exp) => {
        if (mountain !== "All" && exp.name !== mountain) return false;
        if (technicalLevel !== "All" && exp.style !== technicalLevel)
          return false;
        if (
          edition !== "All" &&
          !exp.editions?.some((ed) => ed.letter === edition)
        )
          return false;
        return true;
      }),
    [expeditions, mountain, technicalLevel, edition]
  );

  function reset() {
    setMountain("All");
    setTechnicalLevel("All");
    setEdition("All");
  }

  return (
    <div className="w-full min-h-screen bg-[#1A1A1A] text-white">
      <Nav hideOnScrollDown />
      <AtlasListingHero data={atlasPage ?? undefined} />
      <AtlasControls
        mountains={mountains}
        technicalLevels={technicalLevels}
        editions={editions}
        mountain={mountain}
        technicalLevel={technicalLevel}
        edition={edition}
        setMountain={setMountain}
        setTechnicalLevel={setTechnicalLevel}
        setEdition={setEdition}
        onReset={reset}
        filteredCount={filtered.length}
        data={atlasPage ?? undefined}
      />
      <AtlasIndex expeditions={filtered} />
      <AtlasComparison expeditions={expeditions} data={atlasPage ?? undefined} />
      <SevenThousandMeterPathwayInsert data={atlasPage ?? undefined} />
      <AtlasSeasonalGuide expeditions={expeditions} data={atlasPage ?? undefined} />
      <AtlasWhy />
      <AtlasFAQ />
      <AtlasClosing />
      <Footer />
    </div>
  );
}
