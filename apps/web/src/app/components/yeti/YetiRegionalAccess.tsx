
export const YetiRegionalAccess = () => {
  return (
    <section className="bg-[#1A1A1A] py-[140px] md:py-[180px] px-8 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center">
        
        {/* Left column (6 cols) - Image Placeholder */}
        <div className="md:col-span-6 w-full aspect-[16/10] border border-[#5A6673] flex flex-col items-center justify-center p-6 relative">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2">
            [IMAGE PLACEHOLDER]
          </span>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2">
            LOGISTICS DESK · KATHMANDU OPERATIONS — OPERATIONAL FRAME
          </span>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center opacity-60">
            [CLIENT TO CONFIRM]
          </span>
        </div>

        {/* Padding column */}
        <div className="hidden md:block md:col-span-1" />

        {/* Right column (5 cols) - Content */}
        <div className="md:col-span-5 flex flex-col items-start">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
            PILLAR III — REGIONAL ACCESS
          </span>
          
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] text-white leading-[1.1] max-w-[16ch] mb-6">
            Permits, regions, and quiet passage.
          </h2>
          
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] max-w-[30ch] mb-8">
            Decades of regional presence.
          </p>
          
          <p className="font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.75] max-w-[50ch] mb-12">
            Continuous regional presence across the five Himalayan regions where Thamserku operates — Khumbu, Gorkha, Dhaulagiri, Mahalangur, and Annapurna. Backed by decades of permits, partnerships, and quiet field relationships. This is the layer of an expedition no client should have to think about; it is also the layer that fails most often elsewhere.
          </p>

          {/* Specifications strip */}
          <div className="w-full flex flex-col border-t border-white/20">
            
            <div className="flex flex-col gap-1 py-5 border-b border-white/20">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                REGIONS
              </span>
              <span className="font-['Radley'] text-[16px] text-white">
                KHUMBU · GORKHA · DHAULAGIRI · MAHALANGUR · ANNAPURNA
              </span>
            </div>

            <div className="flex flex-col gap-1 py-5 border-b border-white/20">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                USE CASES
              </span>
              <span className="font-['Radley'] text-[16px] text-white">
                PERMITS · PARTNERSHIPS · ACCESS
              </span>
            </div>

            <div className="flex flex-col gap-1 py-5 border-b border-white/20">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                CONTINUITY
              </span>
              <span className="font-['Radley'] text-[16px] text-white">
                NEARLY FOUR DECADES
              </span>
            </div>

            <div className="flex flex-col gap-1 py-5 border-b border-white/20">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                HANDLING
              </span>
              <span className="font-['Radley'] text-[16px] text-white">
                KATHMANDU OPERATIONS
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};