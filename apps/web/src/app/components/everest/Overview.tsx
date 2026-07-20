import { useRef } from "react";
import { stegaClean } from "@sanity/client/stega";
import { TextReveal } from "../TextReveal";
import { useSectionReveal } from "../../hooks/useSectionReveal";

type Props = {
  overviewHeadline?: string;
  overviewHeadlineEmphasis?: string;
  overviewBody?: string;
  overviewSpecsHeading?: string;
  overviewSpecs?: Array<{ label: string; value: string }>;
};

export function Overview({
  overviewHeadline,
  overviewHeadlineEmphasis,
  overviewBody,
  overviewSpecsHeading,
  overviewSpecs,
}: Props) {
  const specs = overviewSpecs ?? [];
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="bg-[#F4F2EC] w-full text-[#1A1A1A] py-16 md:py-24 px-5 md:px-8 scroll-mt-28"
    >
      <div className="max-w-[1320px] mx-auto flex flex-col gap-8">
        <span
          data-reveal
          className="font-['DM_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#5A6673]"
        >
          02 — Overview
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-start">
          {/* Left — narrative (Manifesto-style word brightening across heading + body) */}
          <div
            data-reveal-prose
            className="flex flex-col gap-8 md:gap-12 lg:pr-[100px]"
          >
            {(overviewHeadline || overviewHeadlineEmphasis) && (
              <h2 className="font-['Fraunces'] text-display-l text-[#1A1A1A]">
                {overviewHeadline && (
                  <TextReveal text={stegaClean(overviewHeadline)} />
                )}
                {overviewHeadlineEmphasis && (
                  <>
                    {overviewHeadline && " "}
                    <span className="font-['Fraunces'] italic text-[#0A3A77]">
                      <TextReveal text={stegaClean(overviewHeadlineEmphasis)} />
                    </span>
                  </>
                )}
              </h2>
            )}
            {overviewBody && (
              <div className="flex flex-col gap-4 font-['DM_Sans'] font-light text-body leading-[1.8] text-[#5A6673]">
                {stegaClean(overviewBody)
                  .split(/\n\n+/)
                  .map((para, i) => (
                    <p key={i}>
                      <TextReveal text={para.replace(/\n/g, " ")} />
                    </p>
                  ))}
              </div>
            )}
          </div>

          {/* Right — spec table */}
          <div className="flex flex-col">
            {overviewSpecsHeading && (
              <p
                data-reveal
                className="font-['DM_Mono'] text-[20px] md:text-[23px] leading-[1.25] text-[#5A6673] mb-6 md:mb-8"
              >
                {overviewSpecsHeading}
              </p>
            )}

            {specs.length > 0 && (
              <div data-reveal>
                {specs.map((spec, i) => {
                  // A value may hold several `|`-separated entries (e.g. the
                  // fixed-departure windows). Render those as a two-per-row
                  // grid so they read cleanly instead of wrapping mid-line.
                  const parts = stegaClean(spec.value)
                    .split("|")
                    .map((p) => p.trim())
                    .filter(Boolean);
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 md:gap-6 py-3 border-b border-dashed border-[rgba(26,26,26,0.22)]"
                    >
                      <p className="font-['DM_Mono'] uppercase tracking-[0.18em] md:tracking-[0.22em] text-[11px] leading-[1.5] text-[#5A6673] pt-[3px] break-words">
                        {spec.label}
                      </p>
                      {parts.length > 1 ? (
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 font-['DM_Mono'] text-body text-[#1A1A1A] text-[14px]">
                          {parts.map((part, j) => (
                            <span key={j} className="whitespace-nowrap">
                              {part}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="font-['DM_Mono'] text-body text-[#1A1A1A] text-[14px]">
                          {spec.value}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
