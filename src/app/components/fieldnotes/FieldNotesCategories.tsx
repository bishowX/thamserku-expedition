
const CATEGORIES = [
  {
    eyebrow: "CATEGORY I — THE APPROACH",
    title: "The Approach",
    desc: "Preparation, gear, training, and approach reading."
  },
  {
    eyebrow: "CATEGORY II — FIELD REPORTS",
    title: "Field Reports",
    desc: "Dispatches from Base Camp, route stages, and expedition rhythm."
  },
  {
    eyebrow: "CATEGORY III — SHERPA NOTES",
    title: "Sherpa Notes",
    desc: "Writings from senior Sirdars and climbing Sherpas, in their own words."
  },
  {
    eyebrow: "CATEGORY IV — ROUTE JUDGEMENT",
    title: "Route Judgement",
    desc: "Weather windows, summit decisions, and quiet calculations at altitude."
  },
  {
    eyebrow: "CATEGORY V — CULTURAL READINGS",
    title: "Cultural Readings",
    desc: "Himalayan regions, peoples, and the cultural ground of every expedition."
  },
  {
    eyebrow: "CATEGORY VI — LEGACY & ARCHIVE",
    title: "Legacy & Archive",
    desc: "Heritage pieces, archival notes, and house history."
  }
];

export const FieldNotesCategories = () => {
  return (
    <section className="bg-[#F4F2EC] py-[100px] md:py-[120px] px-8">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 md:mb-20 w-full">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8">
            CATEGORIES — § I
          </span>
          <h2 className="font-['Radley'] font-light text-[40px] md:text-[52px] text-[#1A1A1A] leading-[1.1] text-center max-w-[28ch]">
            Six readings of the Himalaya.
          </h2>
        </div>

        {/* Category grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 border-t border-[#5A6673]/30">
          {CATEGORIES.map((category, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col px-6 py-8 border-[#5A6673]/30 ${idx !== 0 ? 'border-t md:border-t-0 md:border-l' : ''}`}
            >
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mb-6 min-h-[3em] lg:min-h-[4.5em]">
                {category.eyebrow}
              </span>
              <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-[#1A1A1A] leading-[1.2] mb-4">
                {category.title}
              </h3>
              <p className="font-['Lexend'] font-light text-[14px] text-[#5A6673] leading-[1.5] flex-grow mb-8">
                {category.desc}
              </p>
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] mt-auto">
                [CLIENT TO CONFIRM] PIECES
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};