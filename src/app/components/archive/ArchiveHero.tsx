
export const ArchiveHero = () => {
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
      
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center">
        {/* Top eyebrow row spanning full width */}
        <div className="w-full flex items-center justify-center mb-16 md:mb-24">
          <div className="h-[1px] w-full max-w-[200px] bg-white/20 mr-6 hidden md:block" />
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center whitespace-nowrap">
            EXPEDITION ARCHIVE <span className="mx-2">·</span> § VI — A HISTORY WRITTEN IN ALTITUDE <span className="mx-2">·</span> NEPAL HIMALAYA
          </span>
          <div className="h-[1px] w-full max-w-[200px] bg-white/20 ml-6 hidden md:block" />
        </div>

        {/* Headline */}
        <h1 className="font-['Radley'] font-light text-[64px] md:text-[80px] lg:text-[112px] text-white leading-[1.05] text-center max-w-[18ch] mb-8">
          A history written in altitude.
        </h1>

        {/* Subline */}
        <p className="font-['Lexend'] font-light text-[18px] text-[#C8CDD2] leading-[1.55] max-w-[64ch] text-center mb-24">
          A structured record of the Himalayan expeditions our house has been part of — across nearly four decades of seasons, summits, and quiet days on the mountain.
        </p>

        {/* Data legend strip */}
        <div className="w-full border-t border-white/20">
          <div className="w-full max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20 border-b border-white/20">
            <div className="py-4 md:py-6 flex justify-center">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                RECORDS <span className="mx-1">·</span> [CLIENT TO CONFIRM]
              </span>
            </div>
            <div className="py-4 md:py-6 flex justify-center">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                EARLIEST <span className="mx-1">·</span> 1987 [CLIENT TO CONFIRM]
              </span>
            </div>
            <div className="py-4 md:py-6 flex justify-center">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                LATEST <span className="mx-1">·</span> 2024 [CLIENT TO CONFIRM]
              </span>
            </div>
            <div className="py-4 md:py-6 flex justify-center">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                VERIFIED <span className="mx-1">·</span> ONGOING AUDIT
              </span>
            </div>
          </div>
        </div>

        {/* Bottom audit line */}
        <div className="mt-8">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center block">
            [CLIENT TO CONFIRM] — ARCHIVE AUDIT AND CLIENT PERMISSION REVIEW IN PROGRESS.
          </span>
        </div>
      </div>
    </section>
  );
};