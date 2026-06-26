import { urlFor } from "../../../lib/sanity";
import type { LegacyPageData, LegacyTimelineChapter } from "../../../lib/queries";
import { PortableTextBody } from "../PortableTextBody";

type PageData = LegacyPageData["legacyPage"];

const DEFAULT_CHAPTERS: LegacyTimelineChapter[] = [
  {
    _key: "1",
    roman: "I",
    years: "1987 — 1995",
    title: "Founding Era",
    description:
      "Thamserku is established as one of Nepal's original high-altitude expedition names. Early seasons are run on Manaslu, Dhaulagiri, and the Khumbu approach to Everest. The Sherpa-first culture is set in place from the start.",
    image: null,
  },
  {
    _key: "2",
    roman: "II",
    years: "1995 — 2005",
    title: "Sherpa-led Logistics",
    description:
      "The house deepens its logistics practice — route preparation, fixed lines, oxygen staging, and Base Camp operations are run end-to-end by senior Sherpas trained over years, not seasons.",
    image: null,
  },
  {
    _key: "3",
    roman: "III",
    years: "2005 — 2020",
    title: "Expedition Role",
    description:
      "Thamserku grows quietly into a recognised name in the Himalayan expedition industry, supporting both private climbers and visiting teams across the 8,000m peaks of Nepal.",
    image: null,
  },
  {
    _key: "4",
    roman: "IV",
    years: "2020 — 2024",
    title: "Heritage Revival",
    description:
      "A deliberate revival begins under the Yeti Group: the house is sharpened back to its original principles — fewer mountains, deeper practice, and a refined editorial identity for a global audience.",
    image: null,
  },
  {
    _key: "5",
    roman: "V",
    years: "Today",
    title: "Refined for the World",
    description:
      "Thamserku now reads five Himalayan mountains carefully — Everest, Manaslu, Dhaulagiri, Makalu, and Himchuli — across five editions: Alpine, Bespoke, Crafted, Definitive, and Explorer.",
    image: null,
  },
];

export function LegacyTimeline({ page }: { page?: PageData }) {
  const chapters = page?.timelineChapters?.length
    ? page.timelineChapters
    : DEFAULT_CHAPTERS;

  return (
    <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-16 md:py-20 section-padding">
      <div className="flex flex-col items-center gap-12 md:gap-24 w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-4 w-full max-w-[1100px]">
          <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            {page?.timelineEyebrow ?? "04 — TIMELINE"}
          </span>
          <h2 className="font-['Fraunces'] font-light text-display-l text-[#1A1A1A] max-w-[588px]">
            {page?.timelineHeading ??
              "Five chapters in the life of a Himalayan expedition house."}
          </h2>
        </div>

        {chapters.map((chapter, idx) => {
          const imageSrc = chapter.image
            ? urlFor(chapter.image).width(600).url()
            : null;
          const isImageLeft = idx % 2 === 0;
          const eyebrow = chapter.roman
            ? `CHAPTER ${chapter.roman} · ${chapter.years}`
            : chapter.years;

          if (imageSrc) {
            return (
              <article
                key={chapter._key}
                className={`flex w-full max-w-[1100px] flex-col gap-8 md:gap-12 md:items-start ${
                  isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="w-full md:w-[360px] shrink-0">
                  <img
                    src={imageSrc}
                    alt={chapter.title}
                    loading="lazy"
                    className="w-full aspect-[3/2] object-cover"
                  />
                </div>

                <div className="flex flex-col gap-4 flex-1">
                  <div className="flex flex-col gap-1">
                    <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                      {eyebrow}
                    </span>
                    <h3 className="font-['Fraunces'] font-normal text-display-m text-[#1A1A1A]">
                      {chapter.title}
                    </h3>
                  </div>

                  <div className="text-justify">
                    {Array.isArray(chapter.description) ? (
                      <PortableTextBody value={chapter.description} spacing="compact" />
                    ) : (
                      chapter.description && (
                        <p className="font-['DM_Sans'] font-light text-body leading-[24.375px] text-[#5A6673]">
                          {chapter.description}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </article>
            );
          }

          return (
            <article
              key={chapter._key}
              className="flex flex-col gap-4 items-start w-full max-w-[855px]"
            >
              <div className="flex flex-col gap-1">
                <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                  {eyebrow}
                </span>
                <h3 className="font-['Fraunces'] font-normal text-display-m text-[#1A1A1A]">
                  {chapter.title}
                </h3>
              </div>

              {Array.isArray(chapter.description) ? (
                <PortableTextBody value={chapter.description} spacing="compact" />
              ) : (
                chapter.description && (
                  <p className="font-['DM_Sans'] font-light text-body leading-[24.375px] text-[#5A6673]">
                    {chapter.description}
                  </p>
                )
              )}
            </article>
          );
        })}

        <div className="w-full max-w-[1100px]">
          <p className="font-['Fraunces'] italic text-body text-[#5A6673] max-w-[393px]">
            {page?.timelineFooterNote ??
              "Note · This is not a corporate milestone chart. It is the rhythm of a house that has measured time in seasons, not quarters."}
          </p>
        </div>
      </div>
    </section>
  );
}
