export function LegacyLineage() {
  return (
    <section className="w-full bg-white text-[#1A1A1A] py-24 md:py-40 px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Header */}
        <div className="flex flex-col gap-6">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block">
            05 — LINEAGE
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[56px] leading-tight text-[#1A1A1A] max-w-[22ch]">
            A house within a wider Himalayan group.
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32">
          
          {/* Left Column (7 cols) */}
          <div className="col-span-1 md:col-span-7 flex flex-col gap-8 font-['Cormorant_Garamond'] text-[18px] leading-[1.7] text-[#5A6673] max-w-[60ch]">
            <p>
              Thamserku Expeditions operates under the Yeti Group, the Nepali hospitality and Himalayan group through which the house has been continuously connected to the country's mountaineering, hospitality, and aviation lineage.
            </p>
            <p>
              The relationship is one of stewardship rather than ownership. The Yeti Group provides the wider organisational support that allows Thamserku to remain disciplined in scope: a small, focused expedition house that does not need to chase volume to remain relevant.
            </p>
          </div>

          {/* Right Column (5 cols) */}
          <div className="col-span-1 md:col-span-5 relative flex flex-col justify-center">
            {/* Cartographic-style data tiles */}
            <div className="flex flex-col border-t border-[#1A1A1A]/10 w-full max-w-[400px]">
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between border-b border-[#1A1A1A]/10 gap-2">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">HOUSE</span>
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A]">THAMSERKU EXPEDITIONS</span>
              </div>
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between border-b border-[#1A1A1A]/10 gap-2">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">GROUP</span>
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A]">YETI GROUP</span>
              </div>
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between border-b border-[#1A1A1A]/10 gap-2">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">LOCATION</span>
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A]">KATHMANDU · NEPAL HIMALAYA</span>
              </div>
            </div>
            
            {/* Faint overlay grid for cartographic feel */}
            <div 
              className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
              style={{
                backgroundImage: `linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)`,
                backgroundSize: '32px 32px'
              }}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
