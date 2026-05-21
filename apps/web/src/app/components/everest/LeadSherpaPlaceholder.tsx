export function LeadSherpaPlaceholder() {
  return (
    <section className="w-full bg-[#F4F2EC] py-[140px] md:py-[180px] text-[#1A1A1A]">
      <div className="w-full max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12">
          
          {/* Left column - Portrait placeholder */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="w-full aspect-[4/5] border border-[#5A6673] flex items-center justify-center p-8 text-center">
              <div className="flex flex-col gap-3 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
                <span>[IMAGE PLACEHOLDER] — LEAD SHERPA PORTRAIT — NO AI-GENERATED IMAGE PERMITTED. CLIENT TO PROVIDE.</span>
              </div>
            </div>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
              [CLIENT TO CONFIRM] Lead Sherpa name, portrait, region, years, mountains supported and philosophy line to be provided by the client.
            </span>
          </div>

          {/* Right column - Lead Sherpa profile content */}
          <div className="md:col-span-7 flex flex-col md:pt-16">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
              LEAD SHERPA — EVEREST EXPEDITION
            </span>
            
            <h2 className="font-['Radley'] font-light text-[56px] md:text-[72px] leading-[1.05] text-[#1A1A1A] max-w-[18ch] mb-8">
              "Led by the people who know the mountain."
            </h2>
            
            <p className="font-['Cormorant_Garamond'] italic text-[22px] text-[#0A3A77] max-w-[36ch] mb-8">
              Senior Sirdar. Sherpa-led. Continuity across seasons.
            </p>
            
            <p className="font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.75] max-w-[56ch] mb-16">
              Every Thamserku Everest expedition is led by a senior Sirdar whose route judgement has been earned across decades of Himalayan seasons. The climbing Sherpas who walk with you are selected for experience, temperament, and continuity with the house.
            </p>

            {/* Field-note specifications strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 border-t border-[#5A6673]/30 pt-8 mb-16">
              <div className="flex flex-col gap-2">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                  NAME
                </span>
                <span className="font-['Radley'] font-light text-[22px] text-[#1A1A1A]">
                  [CLIENT TO CONFIRM]
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                  REGION
                </span>
                <span className="font-['Radley'] font-light text-[22px] text-[#1A1A1A]">
                  Khumbu, Solukhumbu
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                  YEARS
                </span>
                <span className="font-['Radley'] font-light text-[22px] text-[#1A1A1A]">
                  [CLIENT TO CONFIRM]
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                  MOUNTAINS SUPPORTED
                </span>
                <span className="font-['Radley'] font-light text-[22px] text-[#1A1A1A]">
                  Everest · [CLIENT TO CONFIRM]
                </span>
              </div>
            </div>

            <p className="font-['Cormorant_Garamond'] italic text-[20px] text-[#0A3A77] max-w-[40ch]">
              "[CLIENT TO CONFIRM] — Philosophy line to be provided by the lead Sherpa."
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}