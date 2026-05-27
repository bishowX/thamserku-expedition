import { useLoaderData, redirect } from "react-router";
import { getExpeditionBySlug, type SanityExpeditionDossier } from "../../lib/queries";
import { ExpeditionHero } from "../components/everest/ExpeditionHero";
import { QuickFacts } from "../components/everest/QuickFacts";
import { Overview } from "../components/everest/Overview";
import { WhoItIsFor } from "../components/everest/WhoItIsFor";
import { ExpeditionEditions } from "../components/everest/ExpeditionEditions";
import { JourneyStages } from "../components/everest/JourneyStages";
import { RouteMap } from "../components/everest/RouteMap";
import { SafetySupport } from "../components/everest/SafetySupport";
import { YetiInfrastructureSupport } from "../components/everest/YetiInfrastructureSupport";
import { Preparation } from "../components/everest/Preparation";
import { Availability } from "../components/everest/Availability";
import { Inclusions } from "../components/everest/Inclusions";
import { ExpeditionFAQ } from "../components/everest/ExpeditionFAQ";
import { ExpeditionClosing } from "../components/everest/ExpeditionClosing";
import { Footer } from "../components/Footer";

export async function loader({ params }: { params: { slug: string } }) {
  const expedition = await getExpeditionBySlug(params.slug);
  if (!expedition) {
    throw redirect("/atlas");
  }
  return { expedition };
}

export default function ExpeditionDossier() {
  const { expedition } = useLoaderData() as { expedition: SanityExpeditionDossier };

  return (
    <div className="bg-[#1A1A1A] min-h-screen text-white font-['Lexend'] selection:bg-[#2E353C] selection:text-white">
      <main>
        <ExpeditionHero
          name={expedition.name}
          heroImage={expedition.heroImage}
          heroTagline={expedition.heroTagline}
          heroSubtext={expedition.heroSubtext}
          slug={expedition.slug.current}
        />
        <QuickFacts
          altitude={expedition.altitude}
          region={expedition.region}
          duration={expedition.duration}
          season={expedition.season}
          expeditionStyleFact={expedition.expeditionStyleFact}
          pricing={expedition.pricing}
        />
        <Overview
          overviewHeadline={expedition.overviewHeadline}
          overviewBody={expedition.overviewBody}
          overviewSideImage={expedition.overviewSideImage}
        />
        <WhoItIsFor
          whoItIsForHeadline={expedition.whoItIsForHeadline}
          audienceTiles={expedition.audienceTiles}
        />
        <ExpeditionEditions editions={expedition.editions} />
        <JourneyStages stages={expedition.journeyStages} />
        <RouteMap
          waypoints={expedition.routeWaypoints}
          routePhilosophy={expedition.routePhilosophy}
          acclimatisationNote={expedition.acclimatisationNote}
          summitWindowNote={expedition.summitWindowNote}
        />
        <SafetySupport
          safetySupportHeadline={expedition.safetySupportHeadline}
          safetyModules={expedition.safetyModules}
        />
        <YetiInfrastructureSupport
          name={expedition.name}
          airNote={expedition.yetiAirNote}
          lodgesNote={expedition.yetiLodgesNote}
          accessNote={expedition.yetiAccessNote}
          continuityNote={expedition.yetiContinuityNote}
        />
        <Preparation
          preparationHeadline={expedition.preparationHeadline}
          preparationColumns={expedition.preparationColumns}
          expeditionName={expedition.name}
        />
        <Availability
          expeditionName={expedition.name}
          availableSeasons={expedition.availableSeasons}
          slug={expedition.slug.current}
        />
        <Inclusions expeditionName={expedition.name} inclusionCategories={expedition.inclusionCategories} />
        <ExpeditionFAQ faqs={expedition.faqs} expeditionName={expedition.name} />
        <ExpeditionClosing
          name={expedition.name}
          closingImage={expedition.closingImage}
          closingStatement={expedition.closingStatement}
          slug={expedition.slug.current}
        />
      </main>
      <Footer />
    </div>
  );
}
