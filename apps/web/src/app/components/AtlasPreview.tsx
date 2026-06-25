import { useRef } from "react";
import { MoveRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { urlFor } from "../../lib/sanity";
import type { SanityExpedition } from "../../lib/queries";

gsap.registerPlugin(ScrollTrigger);

const COL_PATTERN = [6, 3, 3, 6, 6, 3, 3, 6];
function getColClass(idx: number) {
  return COL_PATTERN[idx % COL_PATTERN.length] === 6
    ? "md:col-span-6"
    : "md:col-span-3";
}

function toPreviewData(exp: SanityExpedition, idx: number) {
  return {
    code: `EXP / ${exp.number} — ${exp.code}`,
    name: exp.name,
    slug: exp.slug?.current ?? "",
    positioning: exp.positioning,
    altitude: exp.altitude,
    region: exp.region,
    season: exp.season,
    style: exp.style,
    editions:
      exp.editions?.map((e) => ({
        id: e._id,
        name: e.name.replace(" Edition", ""),
        slug: e.slug?.current ?? "",
      })) ?? [],
    image: exp.image ? urlFor(exp.image).width(1200).url() : "",
  };
}

type AtlasData = {
  atlasEyebrow?: string;
  atlasHeading?: string;
  atlasIntro?: string;
};

export function AtlasPreview({
  expeditions,
  data,
}: {
  expeditions?: SanityExpedition[];
  data?: AtlasData;
}) {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (headerRef.current) {
        const children = Array.from(headerRef.current.children);
        gsap.from(children, {
          opacity: 0,
          y: 25,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        });
      }

      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children);

        gsap.set(cards, { opacity: 0, y: 40 });

        cards.forEach((card) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          });

          const img = card.querySelector("img");
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }
        });
      }
    },
    { scope: sectionRef },
  );

  if (!expeditions?.length) return null;

  const items = expeditions.map(toPreviewData);

  const getEditionLabel = (exp: ReturnType<typeof toPreviewData>) => {
    const editionNames = exp.editions.map((e) => e.name[0]);
    const editionsLabel = `${editionNames[0]}-${editionNames[editionNames.length - 1]}`;
    return editionsLabel;
  };

  return (
    <section
      ref={sectionRef}
      id="atlas"
      className="relative w-full bg-[#1A1A1A] text-white section-padding overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-6 md:gap-16">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row gap-6 md:gap-16 items-start"
        >
          <div className="shrink-0 md:w-[280px]">
            <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              {data?.atlasEyebrow ?? "03 — EXPEDITION ATLAS"}
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            {data?.atlasHeading && (
              <h2 className="font-['Fraunces'] font-light text-display-l">
                {data.atlasHeading}
              </h2>
            )}
            {data?.atlasIntro && (
              <p className="font-['DM_Sans'] font-light text-[#C8CDD2] text-body leading-[1.6] whitespace-pre-line">
                {data.atlasIntro}
              </p>
            )}
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {items.map((exp, idx) => {
            const href = exp.slug ? `/expeditions/${exp.slug}` : null;
            return (
              <div
                key={idx}
                onClick={() => href && navigate(href)}
                className={`group relative flex flex-col justify-between border border-white/10 bg-[#2E353C]/30 p-8 min-h-[480px] overflow-hidden transition-all duration-500 hover:-translate-y-1 ${href ? "cursor-pointer" : ""} ${getColClass(idx)}`}
              >
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out">
                    <ImageWithFallback
                      src={exp.image}
                      alt={exp.name}
                      className="w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:opacity-70 transition-opacity duration-700 will-change-transform"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />
                </div>

                <div className="relative z-10">
                  <div className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#C8CDD2] mb-8">
                    {exp.code}
                  </div>
                  <h3 className="font-['Fraunces'] font-light text-display-l mb-4">
                    {exp.name}
                  </h3>
                  <p className="font-['DM_Sans'] font-light text-[#C8CDD2] text-body leading-relaxed max-w-[40ch]">
                    {exp.positioning}
                  </p>
                </div>

                <div className="relative z-10 mt-12 flex flex-col gap-4 font-['DM_Mono'] text-[11px] uppercase tracking-[0.1em] text-[#5A6673]">
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4  transition-opacity duration-300">
                    <div>ALTITUDE: {exp.altitude}</div>
                    <div>REGION: {exp.region}</div>
                    <div>SEASON: {exp.season}</div>
                    <div>EDITION: {getEditionLabel(exp)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
