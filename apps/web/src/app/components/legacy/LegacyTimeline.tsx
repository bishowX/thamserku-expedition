import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { urlFor } from "../../../lib/sanity";
import type { LegacyPageData, LegacyTimelineChapter } from "../../../lib/queries";

gsap.registerPlugin(ScrollTrigger);

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

export function LegacyTimeline({ page }: { page?: PageData }) {
  const chapters = page?.timelineChapters?.length ? page.timelineChapters : DEFAULT_CHAPTERS;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current!;
    const container = cardsRef.current!;
    const cards = gsap.utils.toArray<HTMLElement>('.timeline-card', container);

    const cardWidth = 380;
    const cardGap = 96;
    const sectionPadding = 64; // px-8 both sides
    const totalCardsWidth = cards.length * cardWidth + (cards.length - 1) * cardGap;
    const getScrollAmount = () => {
      const visibleWidth = Math.min(1440, window.innerWidth) - sectionPadding;
      return -(totalCardsWidth - visibleWidth);
    };

    gsap.to(container, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-8">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            {page?.timelineEyebrow ?? '04 — TIMELINE'}
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-light text-[56px] leading-[70px] text-[#1A1A1A] max-w-[588px]">
            {page?.timelineHeading ?? 'Five chapters in the life of a Himalayan house.'}
          </h2>
        </div>

        {/* Chapter Cards */}
        <div ref={cardsRef} className="flex gap-24 items-start">
          {chapters.map((chapter) => {
            const imgSrc = chapter.image ? urlFor(chapter.image).width(680).url() : null;

            return (
              <div key={chapter._key} className="timeline-card flex flex-col gap-6 shrink-0 w-[380px] bg-[#F4F2EC]">
                <div className="h-[255px] w-full overflow-hidden bg-[#E5E7EB]">
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={chapter.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-4 px-2">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    CHAPTER {chapter.roman} · {chapter.years}
                  </span>
                  <h3 className="font-['Cormorant_Garamond'] font-medium text-[28px] leading-[35px] text-[#1A1A1A]">
                    {chapter.title}
                  </h3>
                  <p className="font-['Inter'] font-light text-[#5A6673] text-[15px] leading-[24.375px]">
                    {chapter.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <p className="font-['Cormorant_Garamond'] italic text-[16px] leading-[24px] text-[#5A6673] max-w-[393px]">
          {page?.timelineFooterNote ?? 'Note · This is not a corporate milestone chart. It is the rhythm of a house that has measured time in seasons, not quarters.'}
        </p>
      </div>
    </section>
  );
}
