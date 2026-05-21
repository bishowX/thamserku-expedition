
const CATEGORIES = [
  { id: "#about", num: "CATEGORY I", label: "ABOUT", title: "About Thamserku", count: "3 QUESTIONS" },
  { id: "#planning", num: "CATEGORY II", label: "EXPEDITION PLANNING", title: "Choosing & Planning an Expedition", count: "1 QUESTION" },
  { id: "#everest", num: "CATEGORY III", label: "EVEREST & 8,000M", title: "Everest and 8,000m Preparation", count: "1 QUESTION" },
  { id: "#pathway", num: "CATEGORY IV", label: "7,000M PATHWAY", title: "Qualifying Ascents & Preparation", count: "2 QUESTIONS" },
  { id: "#editions", num: "CATEGORY V", label: "EDITIONS", title: "The Thamserku Editions", count: "4 QUESTIONS" },
  { id: "#yeti", num: "CATEGORY VI", label: "YETI INFRASTRUCTURE", title: "Operating Ecosystem & Support", count: "2 QUESTIONS" },
  { id: "#consultation", num: "CATEGORY VII", label: "CONSULTATION", title: "Booking & Consultation Process", count: "2 QUESTIONS" }
];

export const FAQCategoryNavigation = () => {
  return (
    <section className="bg-[#F4F2EC] py-[80px] md:py-[100px] px-8 border-b border-[#5A6673]/30">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 md:mb-20">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-6">
            JUMP TO A CATEGORY — § I
          </span>
          <h2 className="font-['Radley'] font-light text-[36px] md:text-[44px] text-[#1A1A1A] leading-[1.1] text-center max-w-[24ch]">
            Seven categories of question.
          </h2>
        </div>

        {/* Category navigation grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 border-t border-[#5A6673]/30">
          {CATEGORIES.map((cat, idx) => (
            <a 
              key={idx} 
              href={cat.id}
              className={`flex flex-col px-5 py-6 border-[#5A6673]/30 hover:bg-black/5 transition-colors cursor-pointer ${idx !== 0 ? 'border-t md:border-t-0 md:border-l' : ''}`}
            >
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mb-4 min-h-[3em]">
                {cat.num} —<br />{cat.label}
              </span>
              <h3 className="font-['Radley'] font-light text-[18px] md:text-[22px] text-[#1A1A1A] leading-[1.2] mb-6 flex-grow">
                {cat.title}
              </h3>
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] mt-auto">
                {cat.count}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};