import { urlFor } from "../../../lib/sanity";
import type { LegacyPageData, LegacyTimelineChapter } from "../../../lib/queries";

type PageData = LegacyPageData['legacyPage'];

const DEFAULT_CHAPTERS: LegacyTimelineChapter[] = [
  {
    _key: '1',
    roman: 'I',
    years: '1987 — 1995',
    title: 'Founding Era',
    description: "Thamserku is established as one of Nepal's original high-altitude expedition names. Early seasons are run on Manaslu, Dhaulagiri, and the Khumbu approach to Everest. The Sherpa-first culture is set in place from the start.",
    image: null,
  },
  {
    _key: '2',
    roman: 'II',
    years: '1995 — 2005',
    title: 'Sherpa-led Logistics',
    description: 'The house deepens its logistics practice — route preparation, fixed lines, oxygen staging, and Base Camp operations are run end-to-end by senior Sherpas trained over years, not seasons.',
    image: null,
  },
  {
    _key: '3',
    roman: 'III',
    years: '2005 — 2020',
    title: 'Expedition Role',
    description: 'Thamserku grows quietly into a recognised name in the Himalayan expedition industry, supporting both private climbers and visiting teams across the 8,000m peaks of Nepal.',
    image: null,
  },
  {
    _key: '4',
    roman: 'IV',
    years: '2020 — 2024',
    title: 'Heritage Revival',
    description: 'A deliberate revival begins under the Yeti Group: the house is sharpened back to its original principles — fewer mountains, deeper practice, and a refined editorial identity for a global audience.',
    image: null,
  },
  {
    _key: '5',
    roman: 'V',
    years: 'Today',
    title: 'Refined for the World',
    description: 'Thamserku now reads five Himalayan mountains carefully — Everest, Manaslu, Dhaulagiri, Makalu, and Himchuli — across five editions: Alpine, Bespoke, Crafted, Definitive, and Explorer.',
    image: null,
  },
];

const DEFAULT_UNSPLASH: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1727209093337-4e9ba71e3f26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwxOTgwcyUyMG1vdW50YWluJTIwZXhwZWRpdGlvbiUyMHZpbnRhZ2V8ZW58MXx8fHwxNzc3NDU2NjE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  '2': 'https://images.unsplash.com/photo-1606585890880-a20adcf38a7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJhc2UlMjBjYW1wJTIwdGVudCUyMHNub3d8ZW58MXx8fHwxNzc3NDU2NjIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  '3': 'https://images.unsplash.com/photo-1734445558792-885402602f7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBjbGltYiUyMGVhcmx5JTIwMjAwMHN8ZW58MXx8fHwxNzc3NDU2NjI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  '4': 'https://images.unsplash.com/photo-1547127678-a8619053611c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGVycGElMjBsZWFkaW5nJTIwbW91bnRhaW4lMjB0cmVrfGVufDF8fHx8MTc3NzQ1NjYyOHww&ixlib=rb-4.1.0&q=80&w=1080',
  '5': 'https://images.unsplash.com/photo-1606928359897-d3dc5dd872df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBoaW1hbGF5YW4lMjBsYW5kc2NhcGUlMjBtb3VudGFpbnxlbnwxfHx8fDE3Nzc0NTY2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
};

export function LegacyTimeline({ page }: { page?: PageData }) {
  const chapters = page?.timelineChapters?.length ? page.timelineChapters : DEFAULT_CHAPTERS;

  return (
    <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col gap-12 md:gap-24">
        <div className="flex flex-col gap-8 mb-16">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block">
            {page?.timelineEyebrow ?? '04 — TIMELINE'}
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[56px] leading-tight text-[#1A1A1A] max-w-[22ch]">
            {page?.timelineHeading ?? 'Five chapters in the life of a Himalayan house.'}
          </h2>
        </div>
      </div>

      {/* Horizontal Timeline Strip */}
      <div className="relative w-full mt-8 md:mt-24 pb-32">
        <div className="absolute top-[80px] md:top-[120px] left-0 w-full h-[1px] bg-[#0A3A77] z-10" />

        <div className="flex overflow-x-auto gap-8 px-8 snap-x snap-mandatory scrollbar-hide pb-16 relative z-20">
          {chapters.map((chapter, idx) => {
            const imgSrc = chapter.image
              ? urlFor(chapter.image).width(680).url()
              : DEFAULT_UNSPLASH[String(idx + 1)] ?? '';

            return (
              <div key={chapter._key} className="min-w-[280px] md:min-w-[340px] max-w-[340px] flex-shrink-0 snap-start flex flex-col relative pt-[80px] md:pt-[120px]">
                {/* Marker Node & Line */}
                <div className="absolute top-[76px] md:top-[116px] left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
                  <div className="w-2 h-2 rounded-full bg-[#0A3A77]" />
                  <div className="w-[1px] h-12 bg-[#0A3A77]" />
                </div>

                {/* Card Body */}
                <div className="flex flex-col gap-6 mt-16 bg-[#F4F2EC]">
                  <div className="w-full aspect-[4/3] bg-gray-200 overflow-hidden grayscale-[0.5] sepia-[0.1]">
                    <img
                      src={imgSrc}
                      alt={chapter.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-4 px-2">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block">
                      CHAPTER {chapter.roman} · {chapter.years}
                    </span>
                    <h3 className="font-['Cormorant_Garamond'] text-[24px] md:text-[28px] leading-tight text-[#1A1A1A]">
                      {chapter.title}
                    </h3>
                    <p className="font-['Inter'] font-light text-[#5A6673] text-[15px] leading-relaxed">
                      {chapter.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="min-w-[24px] md:min-w-[64px] flex-shrink-0" />
        </div>
      </div>

      {/* Note */}
      <div className="max-w-[1440px] mx-auto px-8 mt-16">
        <p className="font-['Cormorant_Garamond'] italic text-[16px] text-[#5A6673] max-w-[56ch]">
          {page?.timelineFooterNote ?? 'Note · This is not a corporate milestone chart. It is the rhythm of a house that has measured time in seasons, not quarters.'}
        </p>
      </div>
    </section>
  );
}
