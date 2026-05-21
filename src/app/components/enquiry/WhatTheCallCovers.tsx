
export const WhatTheCallCovers = () => {
  return (
    <section className="w-full bg-[#1A1A1A] py-[140px] md:py-[180px] px-8 flex justify-center">
      <div className="w-full max-w-[1180px] flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
            WHAT THE CONVERSATION COVERS
          </span>
          <h2 className="font-['Radley'] font-light text-[56px] md:text-[72px] text-white leading-[1.1] max-w-[22ch] mb-6">
            "Forty-five minutes, read carefully."
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] max-w-[56ch]">
            Every consultation is shaped to your background, your timing, and your intention.
          </p>
        </div>

        {/* Coverage Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
          
          <div className="border-t border-[#C8CDD2]/20 bg-[#2E353C]/20 p-8 md:p-10 flex flex-col items-start text-left">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
              MOMENT I — UNDERSTANDING
            </span>
            <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-tight mb-4">
              We listen first.
            </h3>
            <p className="font-['Lexend'] text-[#C8CDD2] text-[15px] leading-[1.65]">
              You share your background, your timing, and what brings you to a Himalayan expedition. The advisor listens before recommending anything.
            </p>
          </div>

          <div className="border-t border-[#C8CDD2]/20 bg-[#2E353C]/20 p-8 md:p-10 flex flex-col items-start text-left">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
              MOMENT II — THE MOUNTAIN
            </span>
            <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-tight mb-4">
              We discuss the right peak.
            </h3>
            <p className="font-['Lexend'] text-[#C8CDD2] text-[15px] leading-[1.65]">
              Based on your readiness, we discuss which of our five mountains is the right reading for your journey — Everest, Manaslu, Dhaulagiri, Makalu, or Himchuli.
            </p>
          </div>

          <div className="border-t border-[#C8CDD2]/20 bg-[#2E353C]/20 p-8 md:p-10 flex flex-col items-start text-left">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
              MOMENT III — THE EDITION
            </span>
            <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-tight mb-4">
              We shape the edition.
            </h3>
            <p className="font-['Lexend'] text-[#C8CDD2] text-[15px] leading-[1.65]">
              We walk you through how each edition (Alpine, Bespoke, Crafted, Definitive, Explorer) would shape your expedition — and recommend what fits.
            </p>
          </div>

          <div className="border-t border-[#C8CDD2]/20 bg-[#2E353C]/20 p-8 md:p-10 flex flex-col items-start text-left">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
              MOMENT IV — NEXT STEPS
            </span>
            <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-tight mb-4">
              We confirm direction.
            </h3>
            <p className="font-['Lexend'] text-[#C8CDD2] text-[15px] leading-[1.65]">
              By the end of the conversation, you have a clear sense of the mountain, edition, season, and what a tailored proposal would look like.
            </p>
          </div>

        </div>

        {/* Section Closer */}
        <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[16px] max-w-[60ch] text-center">
          Consultations are exploratory. Nothing is sold during the call. A tailored proposal follows only if direction is set.
        </p>

      </div>
    </section>
  );
};
