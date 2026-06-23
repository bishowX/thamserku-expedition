type Edition = {
  letter: string;
  name: string;
  subtitle: string;
  positioning: string;
  targetAudience: string;
  character?: string;
  isStandard?: boolean;
};

type Props = {
  name?: string;
  editions?: Edition[];
};

export function ExpeditionEditions({ name, editions }: Props) {
  const items = editions ?? [];
  if (items.length === 0) return null;

  const expeditionName = name ?? "This Mountain";
  const standard = items.find((ed) => ed.isStandard);
  const intro = `The details above describe the ${
    standard?.name ?? "Crafted Edition"
  } — our curated standard. Every Edition below is available on ${expeditionName}. Select one to begin designing your expedition.`;

  return (
    <section
      id="expedition-type"
      className="bg-[#2E353C] w-full text-white py-16 md:py-24 px-5 md:px-8 scroll-mt-28"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10 md:gap-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          <div className="shrink-0 md:w-[280px]">
            <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              06 — Choose Your Philosophy
            </span>
          </div>
          <div className="flex-1">
            <h2 className="font-['Fraunces'] text-display-l tracking-[-0.5px] text-white">
              {expeditionName} in Every Edition
            </h2>
          </div>
          <div className="shrink-0 flex items-center md:w-[253px]">
            <p className="font-['DM_Sans'] font-light text-body leading-[1.4] tracking-[-0.5px] text-[#C8CDD2]">
              {intro}
            </p>
          </div>
        </div>

        {/* Pillar grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-[rgba(200,205,210,0.3)]">
          {items.map((ed, i) => (
            <div
              key={ed.letter ?? i}
              className={`bg-[rgba(32,33,33,0.5)] flex flex-col gap-5 p-8 border-t border-[rgba(200,205,210,0.3)] ${
                i > 0 ? "sm:border-l" : ""
              } border-[rgba(200,205,210,0.3)]`}
            >
              <p className="font-['DM_Mono'] text-[11px] tracking-[0.22em] uppercase text-[#C8CDD2] md:h-[38px]">
                {ed.name}
              </p>
              <div className="flex items-center gap-8">
                <span className="font-['Fraunces'] text-display-xl text-white">
                  {ed.letter}
                </span>
                {ed.isStandard && (
                  <span className="inline-flex items-center justify-center bg-[#C8CDD2] px-[3px] font-['DM_Mono'] text-[11px] leading-[16.5px] tracking-[0.22em] uppercase text-[#5A6673]">
                    Standard
                  </span>
                )}
              </div>
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
