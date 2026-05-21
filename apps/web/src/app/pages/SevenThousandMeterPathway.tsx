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

export default function SevenThousandMeterPathway() {
  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <PathwayHero />
      <PathwayPlanningContext />
      <PathwayWhyItMatters />
      <PathwayFiveRoutes />
      <PathwayExplorerRoutes />
      <PathwayTwoExpeditionDiagram />
      <PathwayRegulatoryCaution />
      <PathwayClosing />
      <Footer />
    </main>
  );
};