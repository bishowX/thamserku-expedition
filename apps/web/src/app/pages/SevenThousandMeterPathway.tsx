import { useEffect } from "react";
import { useLoaderData } from "react-router";
import {
  getSevenThousandMeterPageData,
  type SevenThousandMeterPageData,
} from "../../lib/queries";
import { Nav } from "../components/Nav";
import { PathwayHero } from "../components/pathway/PathwayHero";
import { PathwayPlanningContext } from "../components/pathway/PathwayPlanningContext";
import { PathwayWhyItMatters } from "../components/pathway/PathwayWhyItMatters";
import { PathwayFiveRoutes } from "../components/pathway/PathwayFiveRoutes";
import { PathwayTwoExpeditionDiagram } from "../components/pathway/PathwayTwoExpeditionDiagram";
import { PathwayRegulatoryCaution } from "../components/pathway/PathwayRegulatoryCaution";
import { PathwayFAQ } from "../components/pathway/PathwayFAQ";
import { PathwayClosing } from "../components/pathway/PathwayClosing";
import { Footer } from "../components/Footer";

export async function loader() {
  return getSevenThousandMeterPageData();
}

export default function SevenThousandMeterPathway() {
  const data = useLoaderData() as SevenThousandMeterPageData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <PathwayHero page={data.sevenThousandMeterPage ?? undefined} />
      <PathwayPlanningContext page={data.sevenThousandMeterPage ?? undefined} />
      <PathwayWhyItMatters page={data.sevenThousandMeterPage ?? undefined} />
      <PathwayFiveRoutes routes={data.sevenThousandMeterPage?.routes ?? []} />
      <PathwayTwoExpeditionDiagram
        page={data.sevenThousandMeterPage ?? undefined}
      />
      <PathwayRegulatoryCaution page={data.sevenThousandMeterPage ?? undefined} />
      <PathwayFAQ page={data.sevenThousandMeterPage ?? undefined} />
      <PathwayClosing page={data.sevenThousandMeterPage ?? undefined} />
      <Footer />
    </main>
  );
}
