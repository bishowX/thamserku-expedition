import { useLoaderData, redirect } from "react-router";
import { getExpeditionBySlug, type SanityExpeditionDossier } from "../../lib/queries";
import { ExpeditionHero } from "../components/everest/ExpeditionHero";
import { QuickFacts } from "../components/everest/QuickFacts";
import { StickySubNav } from "../components/everest/StickySubNav";
import { Overview } from "../components/everest/Overview";
import { WhoItIsFor } from "../components/everest/WhoItIsFor";
import { Itinerary } from "../components/everest/Itinerary";
import { ExpeditionEditions } from "../components/everest/ExpeditionEditions";
import { RouteMap } from "../components/everest/RouteMap";
import { Inclusions } from "../components/everest/Inclusions";
import { ExpeditionFAQ } from "../components/everest/ExpeditionFAQ";
import { ExpeditionClosing } from "../components/everest/ExpeditionClosing";
import { ComparisonTables } from "../components/expedition/ComparisonTables";
import { Footer } from "../components/Footer";

export async function loader({ params }: { params: { slug: string } }) {
  const expedition = await getExpeditionBySlug(params.slug);
  if (!expedition) {
    throw redirect("/");
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
          difficulty={expedition.difficulty}
          groupSize={expedition.groupSize}
          duration={expedition.duration}
          baseCamp={expedition.baseCamp}
          leadGuide={expedition.leadGuide}
        />
        <StickySubNav />
        <Overview
          overviewHeadline={expedition.overviewHeadline}
          overviewHeadlineEmphasis={expedition.overviewHeadlineEmphasis}
          overviewBody={expedition.overviewBody}
          overviewSpecsHeading={expedition.overviewSpecsHeading}
          overviewSpecs={expedition.overviewSpecs}
        />
        <WhoItIsFor
          whoItIsForHeadline={expedition.whoItIsForHeadline}
          audienceTiles={expedition.audienceTiles}
        />
        <Itinerary
          itineraryHeading={expedition.itineraryHeading}
          itinerary={expedition.itinerary}
        />
        <Inclusions
          inclusionCategories={expedition.inclusionCategories}
          exclusions={expedition.exclusions}
          mandatoryPrerequisite={expedition.mandatoryPrerequisite}
        />
        <ExpeditionEditions name={expedition.name} editions={expedition.editions} />
        <ComparisonTables
          name={expedition.name}
          matrix={expedition.configMatrix}
          editions={expedition.editions}
        />
        <RouteMap
          waypoints={expedition.routeWaypoints}
          routePhilosophy={expedition.routePhilosophy}
          acclimatisationNote={expedition.acclimatisationNote}
          summitWindowNote={expedition.summitWindowNote}
        />
        <ExpeditionFAQ faqs={expedition.faqs} expeditionName={expedition.name} />
        <ExpeditionClosing
          name={expedition.name}
          closingImage={expedition.closingImage}
          slug={expedition.slug.current}
        />
      </main>
      <Footer />
    </div>
  );
}
