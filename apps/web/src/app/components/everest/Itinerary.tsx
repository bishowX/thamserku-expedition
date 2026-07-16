type ItineraryDay = {
  days: string;
  activity: string;
  accommodation: string;
  meals: string;
};

// Only these expeditions use Mountain Lodges of Nepal, so only their legend
// links the phrase to the operator's site. Every other expedition omits it.
const MLN_SLUGS = new Set([
  "putha-hiunchuli",
  "himlung",
  "baruntse",
  "saribung",
  "chulu-far-east",
]);
const MLN_WEBSITE_URL = "https://mountainlodgesofnepal.com/";

import { useRef } from "react";
import { stegaClean } from "@sanity/client/stega";
import { TextReveal } from "../TextReveal";
import { useSectionReveal } from "../../hooks/useSectionReveal";

type Props = {
  slug?: string;
  itineraryHeading?: string;
  itinerary?: ItineraryDay[];
};

export function Itinerary({ slug, itineraryHeading, itinerary }: Props) {
  const rows = itinerary ?? [];
  const showMln = slug ? MLN_SLUGS.has(slug) : false;
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  if (rows.length === 0 && !itineraryHeading) return null;

  return (
    <section ref={sectionRef} id="program" className="bg-[#2E353C] w-full text-white py-16 md:py-24 px-5 md:px-8 scroll-mt-28">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-6 md:gap-8">
          <span
            data-reveal
            className="font-['DM_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]"
          >
            04 — Program
          </span>
          {itineraryHeading && (
            <h2
              data-reveal-words
              className="font-['Fraunces'] text-display-l text-white"
            >
              <TextReveal text={stegaClean(itineraryHeading)} />
            </h2>
          )}
        </div>

        {rows.length > 0 && (
          <div className="border-t border-white/20">
            {rows.map((row, i) => (
              <div
                key={i}
                data-reveal-row
                className="grid grid-cols-[4.5rem_minmax(0,1fr)] md:grid-cols-[4.5rem_minmax(0,1fr)_150px_72px] gap-x-5 md:gap-x-12 items-baseline md:items-center border-b border-white/20 py-5 md:py-4 md:min-h-[63px]"
              >
                <span className="font-['Fraunces'] font-light text-body text-[#C8CDD2] whitespace-nowrap shrink-0 tabular-nums">
                  {row.days}
                </span>
                <span className="font-['Fraunces'] font-light text-body text-white">
                  {row.activity}
                </span>
                {row.accommodation && (
                  <span className="col-start-2 md:col-start-3 font-['DM_Sans'] font-light text-body leading-[1.6] text-white/60 md:text-white mt-2 md:mt-0">
                    {row.accommodation}
                  </span>
                )}
                {row.meals && (
                  <span className="col-start-2 md:col-start-4 font-['DM_Sans'] font-light text-body leading-[1.6] text-white/60 md:text-white mt-1 md:mt-0">
                    {row.meals}
                  </span>
                )}
              </div>
            ))}
            <p data-reveal-row className="border-t border-white/20 py-5 md:py-4 font-['DM_Sans'] font-light text-body leading-[1.6] text-white/60">
              {showMln ? (
                <>
                  <a
                    href={MLN_WEBSITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white transition-colors"
                  >
                    MLN — Mountain Lodges of Nepal
                  </a>
                  {" "}· B — Breakfast · L — Lunch · D — Dinner
                </>
              ) : (
                "B — Breakfast · L — Lunch · D — Dinner"
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
