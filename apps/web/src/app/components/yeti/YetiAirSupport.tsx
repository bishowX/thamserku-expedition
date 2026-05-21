
export const YetiAirSupport = () => {
  return (
    <section className="bg-[#1A1A1A] py-[140px] md:py-[180px] px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center">
        
        {/* Left column (6 cols) - Image Placeholder */}
        <div className="md:col-span-6 w-full aspect-[16/10] border border-[#5A6673] flex flex-col items-center justify-center p-6 relative">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2">
            [IMAGE PLACEHOLDER]
          </span>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2">
            HELICOPTER IN A HIMALAYAN VALLEY — OPERATIONAL FRAME
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
            PILLAR I — AIR SUPPORT
          </span>
          
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] text-white leading-[1.1] max-w-[16ch] mb-6">
            Aerial coordination, when it matters.
          </h2>
          
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] max-w-[30ch] mb-8">
            Helicopter access. Aerial logistics. Rescue support.
          </p>
          
          <p className="font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.75] max-w-[50ch] mb-12">
            Helicopter access between Kathmandu, Lukla, and base camps across the Khumbu, Gorkha, and Annapurna regions — coordinated through the Yeti Group's aviation network. Aerial logistics for high-camp staging where conditions allow. Medical evacuation and rescue support coordinated through the same operational channel.
          </p>

          {/* Specifications strip */}
          <div className="w-full flex flex-col border-t border-white/20">
            
            <div className="flex flex-col gap-1 py-5 border-b border-white/20">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                CHANNELS
              </span>
              <span className="font-['Radley'] text-[16px] text-white">
                KATHMANDU · LUKLA · HIMALAYAN VALLEYS
              </span>
            </div>

            <div className="flex flex-col gap-1 py-5 border-b border-white/20">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                USE CASES
              </span>
              <span className="font-['Radley'] text-[16px] text-white">
                ACCESS · STAGING · RESCUE
              </span>
            </div>

            <div className="flex flex-col gap-1 py-5 border-b border-white/20">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                AVAILABILITY
              </span>
              <span className="font-['Radley'] text-[16px] text-white">
                SEASONAL · <span className="opacity-60">[CLIENT TO CONFIRM]</span>
              </span>
            </div>

            <div className="flex flex-col gap-1 py-5 border-b border-white/20">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                COORDINATION
              </span>
              <span className="font-['Radley'] text-[16px] text-white">
                YETI GROUP AVIATION
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};