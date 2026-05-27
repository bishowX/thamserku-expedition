import type { PathwayPillar } from "../../../lib/queries";

type PageData = {
  pillarsEyebrow?: string;
  pillarsHeading?: string;
  pillars?: PathwayPillar[];
};

export const PathwayWhyItMatters = ({ page }: { page?: PageData }) => {
  if (!page?.pillarsEyebrow || !page?.pillarsHeading || !page?.pillars?.length) return null;

  return (
    <section className="relative bg-[#353E46] section-padding border-t border-[#C8CDD2]/10 overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-8 md:mb-16">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            {page.pillarsEyebrow}
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch]">
            {page.pillarsHeading}
          </h2>
        </div>

        <div className="w-full max-w-[1320px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {page.pillars.map((pillar, idx) => (
            <div
              key={pillar._key ?? idx}
              className="flex flex-col bg-[rgba(32,33,33,0.5)] border-t border-[rgba(200,205,210,0.3)] px-6 pt-[41px] pb-10 gap-6"
            >
              {pillar.eyebrow && (
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                  {pillar.eyebrow}
                </span>
              )}
              <h3 className="font-['Radley'] font-light text-[26px] text-white leading-[1.2]">
                {pillar.title}
              </h3>
              <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
