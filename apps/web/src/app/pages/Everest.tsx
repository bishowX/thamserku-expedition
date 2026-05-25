import { useLoaderData } from "react-router";
import { getExpeditionBySlug, type SanityExpeditionDossier } from "../../lib/queries";
import { EverestHero } from "../components/everest/EverestHero";
import { QuickFacts } from "../components/everest/QuickFacts";
import { Overview } from "../components/everest/Overview";
import { WhoItIsFor } from "../components/everest/WhoItIsFor";
import { EverestEditions } from "../components/everest/EverestEditions";
import { JourneyStages } from "../components/everest/JourneyStages";
import { RouteMap } from "../components/everest/RouteMap";
import { SafetySupport } from "../components/everest/SafetySupport";
import { YetiInfrastructureSupport } from "../components/everest/YetiInfrastructureSupport";
import { Preparation } from "../components/everest/Preparation";
import { LeadSherpaPlaceholder } from "../components/everest/LeadSherpaPlaceholder";
import { Availability } from "../components/everest/Availability";
import { Inclusions } from "../components/everest/Inclusions";
import { ExpeditionFAQ } from "../components/everest/ExpeditionFAQ";
import { EverestClosing } from "../components/everest/EverestClosing";
import { Footer } from "../components/Footer";

export async function loader() {
  const expedition = await getExpeditionBySlug("everest");
  return { expedition };
}

export default function Everest() {
  const { expedition } = useLoaderData() as { expedition: SanityExpeditionDossier | null };

  return (
    <div className="bg-[#1A1A1A] min-h-screen text-white font-['Lexend'] selection:bg-[#0A3A77] selection:text-white">
      <main>
        <EverestHero />
        <QuickFacts />
        <Overview />
        <WhoItIsFor />
        <EverestEditions />
        <JourneyStages />
        <RouteMap />
        <SafetySupport />
        <YetiInfrastructureSupport />
        <Preparation />
        <LeadSherpaPlaceholder />
        <Availability />
        <Inclusions />
        <ExpeditionFAQ />
        <EverestClosing
          name={expedition?.name}
          closingImage={expedition?.closingImage}
          closingStatement={expedition?.closingStatement}
          slug={expedition?.slug?.current}
        />
      </main>
      <Footer />
    </div>
  );
}