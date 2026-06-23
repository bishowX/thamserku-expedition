import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SanityEdition } from "../../lib/queries";

gsap.registerPlugin(ScrollTrigger);

type EditionsData = {
  editionsEyebrow?: string;
  editionsHeading?: string;
  editionsIntro?: string;
};

export function EditionsPreview({
  editions,
  data,
}: {
  editions?: SanityEdition[];
  data?: EditionsData;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (headerRef.current) {
        gsap.from(Array.from(headerRef.current.children), {
          opacity: 0,
          y: 25,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        });
      }
    },
    { scope: sectionRef },
  );

  if (!editions?.length) return null;

  return (
    <section
      ref={sectionRef}
      id="editions"
      className="w-full bg-[#2E353C] text-white section-padding"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row gap-6 md:gap-16 items-start"
        >
          <div className="shrink-0 md:w-[280px]">
            <span className="font-['DM_Mono'] uppercase tracking-[2.4px] text-[11px] text-[#C8CDD2]">
              {data?.editionsEyebrow ?? "04 — EDITIONS"}
            </span>
          </div>
          <div className="flex-1">
            {data?.editionsHeading && (
              <h2 className="font-['Fraunces'] text-display-l tracking-[-0.5px] text-white">
                {data.editionsHeading}
              </h2>
            )}
          </div>
          <div className="shrink-0 flex items-center md:w-[253px]">
            {data?.editionsIntro && (
              <p className="font-['DM_Sans'] font-light text-body leading-[1.2] tracking-[-0.5px] text-white">
                {data.editionsIntro}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5">
          {editions.map((ed, i) => (
            <div
              key={ed._id}
              className={`bg-[rgba(32,33,33,0.5)] flex flex-col gap-5 p-8 border-t border-[rgba(200,205,210,0.3)] ${
                i > 0 ? "border-l border-[rgba(200,205,210,0.3)]" : ""
              }`}
            >
              <p className="font-['DM_Mono'] text-[11px] tracking-[2.2px] uppercase text-[#C8CDD2] h-[38px]">
                {ed.name}
              </p>
              <p className="font-['Fraunces'] text-display-xl text-white">
                {ed.letter}
              </p>
              {ed.character && (
                <p className="font-['DM_Sans'] font-light text-body text-[#C8CDD2] leading-[1.65]">
                  {ed.character}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
