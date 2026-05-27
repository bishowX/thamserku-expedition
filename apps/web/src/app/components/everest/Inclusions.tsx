type InclusionCategory = { category: string; prefix: string; items: string[] };

type Props = {
  expeditionName?: string;
  inclusionCategories?: InclusionCategory[] | null;
  exclusions?: string[] | null;
};

const FALLBACK_CATEGORIES: InclusionCategory[] = [
  {
    category: "EXPEDITION LEADERSHIP",
    prefix: "L",
    items: [
      "Senior Sirdar and lead climbing Sherpas",
      "Expedition director (Kathmandu coordination)",
      "Senior medical advisor on call",
      "Client experience lead, single point of contact"
    ]
  },
  {
    category: "LOGISTICS & SUPPORT",
    prefix: "S",
    items: [
      "Permits, transport, and supply chain",
      "Base Camp setup and operational support",
      "Oxygen strategy and high-camp staging",
      "Communications (satellite, daily check-ins)",
      "Helicopter coordination via Yeti aviation network"
    ]
  },
  {
    category: "HOSPITALITY & CARE",
    prefix: "H",
    items: [
      "Kathmandu arrival and briefing",
      "Khumbu approach hospitality (lodges via Yeti)",
      "Base Camp catering and rest facilities",
      "Post-expedition debrief and continuity"
    ]
  }
];

export function Inclusions({ expeditionName, inclusionCategories, exclusions }: Props) {
  const name = expeditionName || 'Expedition';
  const categories = inclusionCategories ?? FALLBACK_CATEGORIES;

  return (
 <section className="w-full bg-[#F4F2EC] py-24 text-[#1A1A1A]">
      <div className="w-full max-w-[1440px] mx-auto px-8">

        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-10 md:mb-24">
          <div className="md:col-span-5 flex flex-col">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
              WHAT IS INCLUDED — {name.toUpperCase()}
            </span>
            <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] leading-[1.05] text-[#1A1A1A] max-w-[14ch]">
              "Everything considered, in one expedition."
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-col justify-end md:pb-4">
            <p className="font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
              Every Thamserku {name} expedition is supported from the first private conversation through descent. Exact inclusions vary by edition and are confirmed in a tailored proposal.
            </p>
          </div>
        </div>

        {/* Inclusions grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-20">
          {categories.map((col, cIdx) => (
            <div key={cIdx} className="flex flex-col">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
                {col.category}
              </span>
              <div className="flex flex-col border-t border-[#5A6673]/30">
                {col.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="flex items-start gap-6 py-6 border-b border-[#5A6673]/30"
                  >
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] pt-1 min-w-[32px]">
                      {col.prefix}.0{iIdx + 1}
                    </span>
                    <span className="font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.6]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Below grid note */}
        <p className="font-['Cormorant_Garamond'] italic text-[16px] text-[#5A6673] max-w-[60ch] mb-10 md:mb-24">
          Editions vary. Definitive expeditions add private camp configuration, concierge planning, and maximum discretion. Your tailored proposal will specify exact inclusions.
        </p>

        {exclusions && exclusions.length > 0 && (
          <p className="font-['Cormorant_Garamond'] italic text-[16px] text-[#5A6673] pb-10 md:pb-24">
            <span>Exclusion: </span>{exclusions.join(', ')}
          </p>
        )}

      </div>
    </section>
  );
}
