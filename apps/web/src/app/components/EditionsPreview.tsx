import { useRef } from "react";
import { MoveRight } from "lucide-react";
import { Link } from "react-router";
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

function toDisplayData(ed: SanityEdition) {
  return {
    letter: ed.letter,
    name: ed.name,
    sub: ed.subtitle,
    positioning: ed.positioning,
    who: ed.targetAudience,
    slug: ed.slug?.current ?? "",
  };
}

export function EditionsPreview({
  editions,
  data,
}: {
  editions?: SanityEdition[];
  data?: EditionsData;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

      if (listRef.current) {
        const rows = Array.from(listRef.current.children);
        rows.forEach((row, i) => {
          gsap.from(row, {
            clipPath: "inset(0% 100% 0% 0%)",
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: row, start: "top 90%" },
          });

          const letterEl = row.querySelector(":first-child");
          if (letterEl) {
            gsap.from(letterEl, {
              scale: 1.4,
              opacity: 0,
              duration: 0.6,
              delay: i * 0.1 + 0.3,
              ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 90%" },
            });
          }
        });
      }
    },
    { scope: sectionRef },
  );

  if (!editions?.length) return null;

  const items = editions.map(toDisplayData);

  return (
    <section
      ref={sectionRef}
      id="editions"
      className="w-full bg-[#2E353C] text-white py-24 px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row gap-12 md:gap-24 items-start mb-12"
        >
          <div className="md:w-1/4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              {data?.editionsEyebrow ?? "04 — EDITIONS"}
            </span>
          </div>
          <div className="md:w-1/2">
            {data?.editionsHeading && (
              <h2 className="font-['Radley'] font-light text-fluid-heading leading-[1.1] mb-6">
                {data.editionsHeading}
              </h2>
            )}
          </div>
          <div className="md:w-1/4">
            {data?.editionsIntro && (
              <p className="font-['Lexend'] font-light text-[#C8CDD2] text-fluid-body leading-[1.6]">
                {data.editionsIntro}
              </p>
            )}
          </div>
        </div>

        <div ref={listRef} className="flex flex-col border-b border-white/10">
          {items.map((ed, idx) => (
            <div
              key={idx}
              className="group flex flex-col md:flex-row border-t border-white/10 hover:bg-white/5 transition-colors duration-300 items-start md:items-center py-8 gap-8"
              style={{ clipPath: "inset(0% 0% 0% 0%)" }}
            >
              <div className="md:w-1/12 font-['Radley'] text-fluid-display text-[#C8CDD2] font-light leading-none">
                {ed.letter}
              </div>

              <div className="md:w-3/12 flex flex-col gap-1">
                <h3 className="font-['Radley'] font-light text-fluid-lg leading-tight">
                  {ed.name}
                </h3>
                <span className="font-['Lexend'] font-light text-fluid-body-sm text-[#C8CDD2]">
                  {ed.sub}
                </span>
              </div>

              <div className="md:w-3/12">
                <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-relaxed">
                  "{ed.positioning}"
                </p>
              </div>

              <div className="md:w-3/12">
                <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-relaxed">
                  {ed.who.toLocaleLowerCase()}
                </p>
              </div>

              <div className="md:w-2/12 flex md:justify-end">
                {ed.slug ? (
                  <Link
                    to={`/editions/${ed.slug}`}
                    className="flex items-center gap-2 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors border-b border-transparent hover:border-[#C8CDD2] pb-1"
                  >
                    Read Edition <MoveRight className="w-3 h-3 arrow-shift" />
                  </Link>
                ) : (
                  <span className="flex items-center gap-2 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white opacity-40">
                    Read Edition <MoveRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
