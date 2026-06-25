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

  return (
    <section
      id="overview"
      className="bg-[#F4F2EC] w-full text-[#1A1A1A] py-16 md:py-24 px-5 md:px-8 scroll-mt-28"
    >
      <div className="max-w-[1320px] mx-auto flex flex-col gap-8">
        <span className="font-['DM_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
          02 — Overview
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-start">
          {/* Left — narrative */}
          <div className="flex flex-col gap-8 md:gap-12 lg:pr-[100px]">
            {(overviewHeadline || overviewHeadlineEmphasis) && (
              <h2 className="font-['Fraunces'] text-display-l text-[#1A1A1A]">
                {overviewHeadline}
                {overviewHeadlineEmphasis && (
                  <>
                    {overviewHeadline && " "}
                    <span className="font-['Fraunces'] italic text-[#0A3A77]">
                      {overviewHeadlineEmphasis}
                    </span>
                  </>
                )}
              </h2>
            )}
            {overviewBody && (
              <p className="font-['DM_Sans'] font-light text-body leading-[1.8] text-[#5A6673]">
                {overviewBody}
              </p>
            )}
          </div>

          {/* Right — spec table */}
          <div className="flex flex-col">
            {overviewSpecsHeading && (
              <p className="font-['DM_Mono'] text-[20px] md:text-[23px] leading-[1.25] text-[#5A6673] mb-6 md:mb-8">
                {overviewSpecsHeading}
              </p>
            )}

            {specs.length > 0 && (
              <div className="border-t border-[rgba(26,26,26,0.2)]">
                {specs.map((spec, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 md:gap-6 py-3 border-b border-[rgba(26,26,26,0.2)]"
                  >
                    <p className="font-['DM_Mono'] uppercase tracking-[0.18em] md:tracking-[0.22em] text-[11px] leading-[1.5] text-[#5A6673] pt-[3px] break-words">
                      {spec.label}
                    </p>
                    <p className="font-['Fraunces'] text-body text-[#1A1A1A] text-[14px]">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
