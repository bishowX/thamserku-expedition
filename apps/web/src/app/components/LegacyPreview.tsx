"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stegaClean } from "@sanity/client/stega";
import { urlFor } from "../../lib/sanity";

gsap.registerPlugin(ScrollTrigger);

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  image?: { asset: { _ref: string } } | null;
};

type LegacyData = {
  legacyEyebrow?: string;
  legacyHeading?: string;
  legacyIntro?: string;
  legacyTimelineItems?: TimelineItem[];
};

const CARD_WIDTH = 400;
const CARD_GAP = 80;
const SECTION_H_PADDING = 64; // px-8 * 2

export function LegacyPreview({ data }: { data?: LegacyData }) {
  const items = data?.legacyTimelineItems;
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const totalCardsWidth = items
    ? items.length * CARD_WIDTH + (items.length - 1) * CARD_GAP
    : 0;

  useGSAP(
    () => {
      if (!items?.length) return;
      const section = sectionRef.current!;
      const container = cardsRef.current!;

      const getScrollAmount = () => {
        const visibleWidth =
          Math.min(1440, window.innerWidth) - SECTION_H_PADDING;
        return -(totalCardsWidth - visibleWidth);
      };

      if (getScrollAmount() >= 0) return;

      gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: () => {
            const spacer = section.parentElement;
            if (spacer?.classList.contains("pin-spacer")) {
              spacer.style.background = "#C8CDD2";
            }
          },
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="w-full bg-[#C8CDD2] min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-8 md:py-16 w-full flex flex-col gap-12">
        {/* Header — 3-column row: eyebrow · heading · intro */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16 lg:py-24">
          {data?.legacyEyebrow && (
            <p className="lg:w-[280px] shrink-0 font-['DM_Mono'] text-[11px] tracking-[2.4px] uppercase text-[#1A1A1A]">
              {data.legacyEyebrow}
            </p>
          )}
          {data?.legacyHeading && (
            <h2 className="lg:w-[531px] shrink-0 font-['Fraunces'] text-display-l text-[#1A1A1A]">
              {data.legacyHeading}
            </h2>
          )}
          {data?.legacyIntro && (
            <p className="flex-1 lg:pl-16 font-['DM_Sans'] font-light text-body leading-[1.4] text-[#202121] max-w-[373px] whitespace-pre-line">
              {stegaClean(data.legacyIntro)}
            </p>
          )}
        </div>

        {/* Timeline cards */}
        {items && items.length > 0 && (
          <div
            ref={cardsRef}
            className="flex items-start relative w-max"
            style={{ gap: `${CARD_GAP}px` }}
          >
            {/* Horizontal connector line spanning all cards */}
            <div
              className="absolute h-px bg-white"
              style={{ top: "47px", left: 0, width: `${totalCardsWidth}px` }}
            />

            {items.map((item) => (
              <div
                key={item.year}
                className="flex flex-col items-center shrink-0"
                style={{ width: `${CARD_WIDTH}px` }}
              >
                <div className="bg-[#2E353C] px-2 h-[15px] flex items-center mt-2 mb-4">
                  <span className="font-['DM_Mono'] text-[11px] text-white tracking-[2.2px] uppercase whitespace-nowrap">
                    {item.year}
                  </span>
                </div>
                <div className="w-4 h-4 rounded-full bg-[#2E353C] border border-white relative z-10 mb-16" />
                <div className="flex flex-col gap-4 items-center text-center px-8">
                  {item.image && (
                    <div className="w-[220px] h-[120px] overflow-hidden">
                      <img
                        src={urlFor(item.image).width(440).height(240).url()}
                        alt=""
                        className="w-full h-full object-cover mix-blend-darken pointer-events-none"
                      />
                    </div>
                  )}
                  <h3 className="font-['Fraunces'] text-display-m text-[#1A1A1A]">
                    {item.title}
                  </h3>
                  <p className="font-['DM_Sans'] font-light text-body leading-[1.75] text-[#5A6673]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
