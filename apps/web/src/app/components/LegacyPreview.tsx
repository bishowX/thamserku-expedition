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
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const totalCardsWidth = items
    ? items.length * CARD_WIDTH + (items.length - 1) * CARD_GAP
    : 0;

  useGSAP(
    () => {
      if (!items?.length) return;
      const pinEl = pinRef.current!;
      const container = cardsRef.current!;

      const getScrollAmount = () => {
        const visibleWidth =
          Math.min(1440, window.innerWidth) - SECTION_H_PADDING;
        return -(totalCardsWidth - visibleWidth);
      };

      // Cards already fit — no horizontal scroll, no pin needed.
      if (getScrollAmount() >= 0) return;

      // Pin ONLY the timeline frame (not the header), so the cards get a full
      // viewport to themselves and nothing clips.
      gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: pinEl,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="legacy" className="w-full bg-[#C8CDD2] overflow-x-clip">
      {/* Header — 3-column row, scrolls normally (not pinned) */}
      <div className="max-w-[1440px] mx-auto px-8 pt-24 pb-12 md:pt-32 md:pb-16 flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
        {data?.legacyEyebrow && (
          <p className="lg:w-[280px] shrink-0 font-['DM_Mono'] text-[11px] tracking-[2.4px] uppercase text-[#1A1A1A]">
            {data.legacyEyebrow}
          </p>
        )}
        {(data?.legacyHeading || data?.legacyIntro) && (
          <div className="flex flex-col gap-6 lg:max-w-[600px]">
            {data?.legacyHeading && (
              <h2 className="font-['Fraunces'] text-display-l text-[#1A1A1A]">
                {data.legacyHeading}
              </h2>
            )}
            {data?.legacyIntro && (
              <p className="font-['DM_Sans'] font-light text-body leading-[1.6] text-[#202121] max-w-[520px] whitespace-pre-line">
                {stegaClean(data.legacyIntro)}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Timeline — ONLY this frame pins + scrolls horizontally */}
      {items && items.length > 0 && (
        <div
          ref={pinRef}
          className="h-screen overflow-hidden bg-[#C8CDD2]"
        >
          <div className="h-full max-w-[1440px] mx-auto px-8 flex flex-col justify-center">
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
                  className="flex flex-col items-start shrink-0"
                  style={{ width: `${CARD_WIDTH}px` }}
                >
                  <div className="bg-[#2E353C] px-2 h-[15px] flex items-center mt-2 mb-4">
                    <span className="font-['DM_Mono'] text-[11px] text-white tracking-[2.2px] uppercase whitespace-nowrap">
                      {item.year}
                    </span>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#2E353C] border border-white relative z-10 mb-16" />
                  <div className="flex flex-col gap-4 items-start text-left pr-10">
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
          </div>
        </div>
      )}
    </section>
  );
}
