import { Link } from 'react-router';

export const PathwayHero = () => {
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
        {/* Top eyebrow row */}
        <div className="w-full flex flex-col items-center justify-center mb-16 md:mb-24">
          <div className="h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mb-4" />
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center whitespace-nowrap">
            7,000M QUALIFYING PATHWAY <span className="mx-2">·</span> § VIII — PREPARATION CONTEXT <span className="mx-2">·</span> NEPAL HIMALAYA
          </span>
          <div className="h-[1px] w-full max-w-[300px] bg-[#C8CDD2]/30 mt-4" />
        </div>

        {/* Headline */}
        <h1 className="font-['Radley'] font-light text-[64px] md:text-[80px] lg:text-[112px] text-white leading-[1.05] text-center max-w-[22ch] mb-8">
          Earn altitude. Then climb above 8,000m.
        </h1>

        {/* Subline */}
        <p className="font-['Lexend'] font-light text-[18px] text-[#C8CDD2] leading-[1.55] max-w-[64ch] text-center mb-24">
          A considered planning context for climbers preparing for Everest, Manaslu, Dhaulagiri, or Makalu. Five 7,000m route placeholders, a two-expedition pathway, and a private consultation channel.
        </p>

        {/* Data legend strip */}
        <div className="w-full border-t border-[#C8CDD2]/30 mb-20">
          <div className="w-full max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#C8CDD2]/30 border-b border-[#C8CDD2]/30">
            <div className="py-4 md:py-6 flex justify-center px-4">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                ALTITUDE BAND <span className="mx-1 hidden lg:inline">·</span><br className="lg:hidden" /> 7,000 — 7,500 M
              </span>
            </div>
            <div className="py-4 md:py-6 flex justify-center px-4">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                ROUTES <span className="mx-1 hidden lg:inline">·</span><br className="lg:hidden" /> 5 PLACEHOLDER
              </span>
            </div>
            <div className="py-4 md:py-6 flex justify-center px-4">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                PATHWAY <span className="mx-1 hidden lg:inline">·</span><br className="lg:hidden" /> 2 EXPEDITIONS
              </span>
            </div>
            <div className="py-4 md:py-6 flex justify-center px-4">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
                MODE <span className="mx-1 hidden lg:inline">·</span><br className="lg:hidden" /> PRIVATE CONSULTATION
              </span>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <Link 
          to="/consultation?intent=7000m" 
          className="border border-white/50 text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap mb-12"
        >
          PLAN YOUR QUALIFYING ASCENT →
        </Link>

        {/* Bottom text */}
        <div>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center block">
            [ROUTE TBC] — FIVE 7,000M ROUTE OPTIONS PENDING CLIENT CONFIRMATION.
          </span>
        </div>
      </div>
    </section>
  );
};