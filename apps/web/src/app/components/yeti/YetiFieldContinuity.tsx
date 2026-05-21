
export const YetiFieldContinuity = () => {
  return (
    <section className="bg-[#0A3A77] py-[160px] md:py-[200px] px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center">
        
        {/* Left column (5 cols) - Content */}
        <div className="md:col-span-5 flex flex-col items-start">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
            PILLAR IV — FIELD CONTINUITY
          </span>
          
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] max-w-[18ch] mb-6">
            The same hands, season after season.
          </h2>
          
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[24px] max-w-[30ch] mb-8">
            Multi-generational. Nepal-based. On the ground.
          </p>
          
          <div className="flex flex-col gap-6">
            <p className="font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.75] max-w-[50ch]">
              Yeti Infrastructure is operated by a multi-generational field team supported from Kathmandu. The same senior Sherpas, the same base camp managers, the same logistics coordinators — across seasons, across peaks, across the years. This continuity is what allows the same standards of care from first letter to descent.
            </p>
            <p className="font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.75] max-w-[50ch]">
              It is also the reason our judgement on the mountain extends as far as it does. Field knowledge is earned slowly. We do not rotate teams. We grow them.
            </p>
          </div>

        </div>

        {/* Padding column */}
        <div className="hidden md:block md:col-span-1" />

        {/* Right column (6 cols) - Image Placeholder */}
        <div className="md:col-span-6 w-full aspect-[16/10] border border-white flex flex-col items-center justify-center p-6 relative">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] text-center mb-2">
            [IMAGE PLACEHOLDER]
          </span>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] text-center mb-2">
            FIELD TEAM AT WORK — ROUTE PREPARATION — OPERATIONAL FRAME
          </span>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] text-center opacity-60">
            [CLIENT TO CONFIRM]
          </span>
        </div>

      </div>
    </section>
  );
};