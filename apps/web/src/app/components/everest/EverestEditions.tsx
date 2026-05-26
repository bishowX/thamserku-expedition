export function EverestEditions() {
  const editions = [
    {
      letter: "A",
      name: "Alpine Edition",
      sub: "The disciplined climb",
      positioning: "The essential Thamserku Everest experience, run with disciplined professional support and a clear, well-supported path to the summit.",
      for: "EXPERIENCED CLIMBERS"
    },
    {
      letter: "B",
      name: "Bespoke Edition",
      sub: "The personal expedition",
      positioning: "An Everest expedition shaped to your individual preparation, schedule, and pace, with private elements built around your goals.",
      for: "PRIVATE INDIVIDUALS"
    },
    {
      letter: "C",
      name: "Crafted Edition",
      sub: "Service, comfort, storytelling",
      positioning: "An elevated Everest with deeper service at Base Camp, richer comfort during acclimatisation, and documented expedition storytelling.",
      for: "STORYTELLERS & PRINCIPALS"
    },
    {
      letter: "D",
      name: "Definitive Edition",
      sub: "The most exclusive private Everest",
      positioning: "The most exclusive Thamserku Everest. A private camp, concierge planning, maximum discretion, and rare access.",
      for: "LEADERS & EXECUTIVES"
    }
  ];

  return (
 <section className="bg-[#2E353C] w-full text-white py-24">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col gap-24">
        
        {/* Header */}
        <div className="flex flex-col gap-8">
          <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
            08 — EDITIONS
          </h2>
          <h3 className="font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]">
            Four ways to read this mountain.
          </h3>
        </div>

        {/* Editions List */}
        <div className="flex flex-col border-t border-white/20">
          {editions.map((ed, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-12 py-12 border-b border-white/20 items-start md:items-center hover:bg-white/[0.02] transition-colors cursor-pointer group">
              
              <div className="md:w-1/12 flex items-center justify-center">
                <span className="font-['Radley'] font-light text-[80px] lg:text-[100px] leading-none text-[#C8CDD2] group-hover:text-white transition-colors">
                  {ed.letter}
                </span>
              </div>
              
              <div className="md:w-3/12 flex flex-col gap-2">
                <h3 className="font-['Radley'] font-light text-[28px] text-white">
                  {ed.name}
                </h3>
                <span className="font-['Lexend'] font-light text-[13px] text-[#C8CDD2]">
                  {ed.sub}
                </span>
              </div>

              <div className="md:w-4/12">
                <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[14px] leading-relaxed pr-8">
                  "{ed.positioning}"
                </p>
              </div>

              <div className="md:w-2/12 flex items-center">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2]">
                  {ed.for}
                </span>
              </div>

              <div className="md:w-2/12 flex justify-end">
                <span className="font-['Lexend'] font-light text-[13px] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
                  Read Edition →
                </span>
              </div>
              
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8">
          <p className="font-['Radley'] font-light italic text-[#C8CDD2] text-[16px]">
            Note · The Explorer Edition is offered as a separate Everest Base Camp / Everest Experience product, not as a summit climb.
          </p>
        </div>

      </div>
    </section>
  );
}
