
export const YetiDefinition = () => {
  return (
    <section className="bg-[#F4F2EC] py-[140px] md:py-[180px] px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
        
        {/* Left column (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-start">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
            THE DEFINITION — § I
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[16ch] mb-6">
            Infrastructure is what you do not see.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[30ch]">
            Quietly held, behind every season.
          </p>
        </div>

        {/* Right column (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-6 pt-2 md:pt-16">
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            Yeti Infrastructure is the operating ecosystem Thamserku draws on across every Himalayan season. It is not a marketing partnership or a co-branded service. It is the operational fabric — aviation, hospitality, regional presence, and field continuity — that the Yeti Group has maintained in Nepal for decades.
          </p>
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            For the climber, it means an expedition is supported by infrastructure that exists year-round, not only during a season. For our senior expedition staff, it means continuity: the same crews, the same lodges, the same regional partners, season after season.
          </p>
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            This page describes the four operational pillars that matter most to a Himalayan expedition. None of them are positioning claims. All are working operations.
          </p>
        </div>

      </div>
    </section>
  );
};