import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { getSevenThousandMeterPageData, type SevenThousandMeterPageData } from "../../lib/queries";
import { Nav } from '../components/Nav';
import { PathwayHero } from '../components/pathway/PathwayHero';
import { PathwayPlanningContext } from '../components/pathway/PathwayPlanningContext';
import { PathwayWhyItMatters } from '../components/pathway/PathwayWhyItMatters';
import { PathwayFiveRoutes } from '../components/pathway/PathwayFiveRoutes';
import { PathwayExplorerRoutes } from '../components/pathway/PathwayExplorerRoutes';
import { PathwayTwoExpeditionDiagram } from '../components/pathway/PathwayTwoExpeditionDiagram';
import { PathwayRegulatoryCaution } from '../components/pathway/PathwayRegulatoryCaution';
import { PathwayClosing } from '../components/pathway/PathwayClosing';
import { Footer } from '../components/Footer';

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
      <PathwayWhyItMatters pillars={data.sevenThousandMeterPage?.pillars ?? []} />
      <PathwayFiveRoutes routes={data.sevenThousandMeterPage?.routes ?? []} />
      <PathwayExplorerRoutes />
      <PathwayTwoExpeditionDiagram />
      <PathwayRegulatoryCaution />
      <PathwayClosing page={data.sevenThousandMeterPage ?? undefined} />
      <Footer />
    </main>
  );
};
