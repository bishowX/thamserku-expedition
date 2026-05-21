export function LegacyRevival() {
  return (
    <section className="w-full bg-[#0A3A77] text-white py-24 md:py-40 px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-white/20 pb-16">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block">
            06 — THE REVIVAL
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[56px] leading-tight text-white max-w-[24ch]">
            The same house, read again — for a quieter, more global audience.
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32">
          
          {/* Left Column (5 cols) */}
          <div className="col-span-1 md:col-span-5 flex flex-col gap-8">
            <h3 className="font-['Cormorant_Garamond'] italic text-[26px] text-[#C8CDD2] mb-4">
              "Refined, not reinvented."
            </h3>
            
            <div className="font-['Cormorant_Garamond'] text-[17px] leading-[1.75] text-[#C8CDD2] flex flex-col gap-8">
              <p>
                The revival of Thamserku is not a relaunch. The team that runs the house, the Sherpas who lead the climbs, and the principles that shape the editions are the same as they have been for decades.
              </p>
              <p>
                What has changed is the way the house presents itself. Fewer mountains. Clearer editions. A quieter editorial voice. A way of speaking to a global audience without losing the Sherpa lineage that defines us.
              </p>
              <p>
                It is the same expedition house, read again.
              </p>
            </div>
          </div>

          {/* Right Column (7 cols) */}
          <div className="col-span-1 md:col-span-7 flex flex-col gap-8 md:gap-12 mt-8 md:mt-0">
            
            <div className="flex flex-col gap-4 border-t border-white/20 pt-6">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                FOCUS
              </span>
              <p className="font-['Cormorant_Garamond'] italic text-[22px] md:text-[28px] text-white">
                "Five mountains, read carefully — instead of a long catalogue."
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/20 pt-6">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                EDITIONS
              </span>
              <p className="font-['Cormorant_Garamond'] italic text-[22px] md:text-[28px] text-white">
                "Five editions — Alpine, Bespoke, Crafted, Definitive, Explorer — clearly defined."
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/20 pt-6">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                LEADERSHIP
              </span>
              <p className="font-['Cormorant_Garamond'] italic text-[22px] md:text-[28px] text-white">
                "Sherpa-led at every layer of the expedition, from sirdar to summit decision."
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
