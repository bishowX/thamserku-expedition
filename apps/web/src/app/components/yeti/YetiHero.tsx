
export const YetiHero = () => {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#1A1A1A] flex flex-col justify-end pb-32 md:pb-48 px-8 overflow-hidden">
      {/* Faint cartographic grid overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px'
        }}
      />
      
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center pt-32 md:pt-0">
        {/* Top eyebrow row spanning full width */}
        <div className="w-full flex flex-col items-center justify-center mb-16 md:mb-24">
          <div className="h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mb-4" />
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center whitespace-nowrap">
            YETI INFRASTRUCTURE <span className="mx-2">·</span> § VII — AN OPERATING ECOSYSTEM <span className="mx-2">·</span> NEPAL HIMALAYA
          </span>
          <div className="h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mt-4" />
        </div>

        {/* Headline */}
        <h1 className="font-['Radley'] font-light text-[64px] md:text-[80px] lg:text-[112px] text-white leading-[1.05] text-center max-w-[22ch] mb-8">
          The operating ecosystem behind every expedition.
        </h1>

        {/* Subline */}
        <p className="font-['Lexend'] font-light text-[18px] text-[#C8CDD2] leading-[1.55] max-w-[64ch] text-center mb-24">
          Air support, mountain lodges, regional access, and field continuity — quietly maintained by the Yeti Group, so the climb in front of you receives our full attention.
        </p>

        {/* Data legend strip */}
        <div className="w-full border-t border-[#C8CDD2]/30">
          <div className="w-full max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#C8CDD2]/30 border-b border-[#C8CDD2]/30">
            <div className="py-4 md:py-6 flex justify-center">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                OPERATIONS <span className="mx-1">·</span> KATHMANDU
              </span>
            </div>
            <div className="py-4 md:py-6 flex justify-center">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                REGIONS <span className="mx-1">·</span> 5 HIMALAYAN
              </span>
            </div>
            <div className="py-4 md:py-6 flex justify-center">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                CONTINUITY <span className="mx-1">·</span> MULTI-GENERATIONAL
              </span>
            </div>
            <div className="py-4 md:py-6 flex justify-center">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                STATUS <span className="mx-1">·</span> UHNI-LEVEL ASSURANCE
              </span>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-8">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center block">
            [CLIENT TO CONFIRM] — OPERATIONAL CLAIMS AND PARTNERSHIPS UNDER REVIEW BEFORE PUBLICATION.
          </span>
        </div>
      </div>
    </section>
  );
};