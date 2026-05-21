
export const FAQHero = () => {
  return (
    <section className="relative w-full bg-[#1A1A1A] py-[100px] md:py-[140px] px-8 overflow-hidden">
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
      
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center pt-24 md:pt-0">
        {/* Top eyebrow row */}
        <div className="w-full flex flex-col items-center justify-center mb-16 md:mb-20">
          <div className="h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mb-4" />
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center whitespace-nowrap">
            MAIN FAQ <span className="mx-2">·</span> § XI — 15 PRIORITY QUESTIONS <span className="mx-2">·</span> NEPAL HIMALAYA
          </span>
          <div className="h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mt-4" />
        </div>

        {/* Headline */}
        <h1 className="font-['Radley'] font-light text-[64px] md:text-[88px] text-white leading-[1.05] text-center max-w-[22ch] mb-8">
          Fifteen quiet answers.
        </h1>

        {/* Subline */}
        <p className="font-['Lexend'] font-light text-[18px] text-[#C8CDD2] leading-[1.55] max-w-[64ch] text-center mb-20">
          The questions our expedition desk is asked most often. Short, considered placeholders at this stage — full answers will be drafted with our senior staff.
        </p>

        {/* Data legend strip */}
        <div className="w-full border-t border-[#C8CDD2]/30">
          <div className="w-full max-w-[800px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#C8CDD2]/30 border-b border-[#C8CDD2]/30">
            <div className="py-4 md:py-6 flex justify-center px-4">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                QUESTIONS <span className="mx-1 hidden md:inline">·</span><br className="md:hidden" /> 15
              </span>
            </div>
            <div className="py-4 md:py-6 flex justify-center px-4">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                CATEGORIES <span className="mx-1 hidden md:inline">·</span><br className="md:hidden" /> 7
              </span>
            </div>
            <div className="py-4 md:py-6 flex justify-center px-4">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                STATUS <span className="mx-1 hidden md:inline">·</span><br className="md:hidden" /> PLACEHOLDER ANSWERS <span className="mx-1">·</span> [DUMMY FAQ]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};