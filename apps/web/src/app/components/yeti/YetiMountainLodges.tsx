
export const YetiMountainLodges = () => {
  return (
    <section className="bg-[#F4F2EC] py-[140px] md:py-[180px] px-8 border-t border-[#C8CDD2]/30">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center">
        
        {/* Left column (5 cols) - Content */}
        <div className="md:col-span-5 flex flex-col items-start order-2 md:order-1">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
            PILLAR II — MOUNTAIN LODGES
          </span>
          
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] text-[#1A1A1A] leading-[1.1] max-w-[16ch] mb-6">
            Rest, before the route.
          </h2>
          
          <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[30ch] mb-8">
            Acclimatisation rhythm. Recovery. Quiet continuity.
          </p>
          
          <p className="font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.75] max-w-[50ch] mb-12">
            Operational lodges along approach routes — Lukla, Namche, Tengboche, Dingboche, and beyond — used for considered acclimatisation rhythm and recovery. These are not destination hotels. They are operational rest points maintained year-round, with the same teams, the same standards, and the discretion expected of every Thamserku expedition.
          </p>

          {/* Specifications strip */}
          <div className="w-full flex flex-col border-t border-[#C8CDD2]">
            
            <div className="flex flex-col gap-1 py-5 border-b border-[#C8CDD2]">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                REGIONS
              </span>
              <span className="font-['Radley'] text-[16px] text-[#1A1A1A]">
                KHUMBU · GORKHA · ANNAPURNA
              </span>
            </div>

            <div className="flex flex-col gap-1 py-5 border-b border-[#C8CDD2]">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                USE CASES
              </span>
              <span className="font-['Radley'] text-[16px] text-[#1A1A1A]">
                APPROACH · ACCLIMATISATION · RECOVERY
              </span>
            </div>

            <div className="flex flex-col gap-1 py-5 border-b border-[#C8CDD2]">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                STANDARD
              </span>
              <span className="font-['Radley'] text-[16px] text-[#1A1A1A]">
                OPERATIONAL · DISCREET
              </span>
            </div>

            <div className="flex flex-col gap-1 py-5 border-b border-[#C8CDD2]">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                STAFFING
              </span>
              <span className="font-['Radley'] text-[16px] text-[#1A1A1A]">
                YEAR-ROUND TEAMS
              </span>
            </div>

          </div>

        </div>

        {/* Padding column */}
        <div className="hidden md:block md:col-span-1 order-2" />

        {/* Right column (6 cols) - Image Placeholder */}
        <div className="md:col-span-6 w-full aspect-[16/10] border border-[#5A6673] flex flex-col items-center justify-center p-6 relative order-1 md:order-3">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2">
            [IMAGE PLACEHOLDER]
          </span>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2">
            MOUNTAIN LODGE — KHUMBU APPROACH — OPERATIONAL FRAME
          </span>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center opacity-60">
            [CLIENT TO CONFIRM]
          </span>
        </div>

      </div>
    </section>
  );
};