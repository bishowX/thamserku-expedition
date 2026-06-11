import { useEffect } from "react";
import { useLoaderData, redirect } from "react-router";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuery } from "@sanity/react-loader";
import type { QueryResponseInitial } from "@sanity/react-loader";
import {
  EXPEDITION_BY_SLUG_QUERY,
  attachConfig,
  type RawExpeditionDossier,
} from "../../lib/queries";
import { getPreviewData } from "../../lib/preview.server";
import { loadQuery } from "../../lib/loader.server";
import type { Route } from "./+types/ExpeditionDossier";
import { pageMeta } from "../../lib/seo";
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

export async function loader({ params, request }: { params: { slug: string }; request: Request }) {
  const { options } = await getPreviewData(request);
  const initial = await loadQuery<RawExpeditionDossier | null>(
    EXPEDITION_BY_SLUG_QUERY,
    { slug: params.slug },
    options,
  );
  if (!initial.data) {
    throw redirect("/");
  }
  return { initial, slug: params.slug };
}

export function meta({ data }: Route.MetaArgs) {
  const raw = (data as { initial: QueryResponseInitial<RawExpeditionDossier | null> } | undefined)?.initial.data;
  return pageMeta({
    title: raw ? `${raw.name} Expedition` : "Expedition",
    description: raw?.positioning,
    image: raw?.heroImage ?? raw?.image,
  });
}

export default function ExpeditionDossier() {
  const { initial, slug } = useLoaderData() as {
    initial: QueryResponseInitial<RawExpeditionDossier | null>;
    slug: string;
  };
  const { data: raw } = useQuery<RawExpeditionDossier | null>(
    EXPEDITION_BY_SLUG_QUERY,
    { slug },
    { initial },
  );
  // Live updates return the raw doc; reattach the normalized config matrix here.
  const expedition = raw ? attachConfig(raw) : null;

  // Client-side navigation between peaks keeps every section mounted, so all
  // ScrollTriggers hold positions measured against the previous peak's layout.
  // Re-measure once the new content has painted.
  useEffect(() => {
    let raf2: number;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [slug]);

  if (!expedition) return null;

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
          highlightsImage={expedition.highlightsImage}
          audienceTiles={expedition.audienceTiles}
        />
        <Itinerary
          itineraryHeading={expedition.itineraryHeading}
          itinerary={expedition.itinerary}
        />
        <Inclusions
          inclusionCategories={expedition.inclusionCategories}
          exclusions={expedition.exclusions}
          exclusionsImage={expedition.exclusionsImage}
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
