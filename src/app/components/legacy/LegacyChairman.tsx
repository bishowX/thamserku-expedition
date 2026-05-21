import chairmanImage from "../../../assets/images/Mt-Everest-8848m-no-label-1.jpg";

export function LegacyChairman() {
  return (
    <section className="relative w-full bg-[#1A1A1A] text-white py-24 md:py-40 px-8 overflow-hidden">
      {/* Background cartographic grid overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32">
        
        {/* Left Column (5 cols) */}
        <div className="col-span-1 md:col-span-5 flex flex-col gap-6 md:sticky md:top-32 h-fit">
          <div className="w-full aspect-[4/5] bg-gray-800 overflow-hidden relative grayscale-[0.8] sepia-[0.2]">
            <img
              src={chairmanImage}
              alt="Mt. Everest 8848m"
              className="w-full h-full object-cover mix-blend-screen opacity-90"
            />
            <div className="absolute inset-0 bg-[#1A1A1A]/30 mix-blend-multiply" />
          </div>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block mt-2">
            MT. EVEREST · 8848M · MAHALANGUR HIMAL
          </span>
        </div>

        {/* Right Column (7 cols) */}
        <div className="col-span-1 md:col-span-7 font-['Cormorant_Garamond'] text-[18px] leading-[1.75] text-[#C8CDD2] flex flex-col gap-12">
          
          <div className="mb-4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block mb-8">
              03 — THE CHAIRMAN'S LETTER
            </span>
            <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[52px] leading-tight text-white max-w-[22ch]">
              A short letter, written quietly.
            </h2>
          </div>

          <div className="flex flex-col gap-8 max-w-[60ch]">
            <p>
              To those reading this page —
            </p>
            
            <p>
              The Himalayas have given our family, our team, and our company more than we will ever be able to give back. We have been part of seasons, summits, and quiet days that asked everything of us. We have been part of decisions that were made carefully, by people whose judgement was earned over decades, not bought with equipment.
            </p>
            
            <p>
              Thamserku, today, is a refinement of that long inheritance. It is run by a smaller, more disciplined house, supported by the Yeti Group, and led — as it has always been — by Sherpa expertise. The mountain has not changed. Our way of reading it has only deepened.
            </p>
            
            <p>
              We do not conquer the mountain. We learn from it. And we pass that learning on to the people who climb with us.
            </p>
          </div>

          {/* Signature block */}
          <div className="mt-12 flex flex-col items-start">
            <span className="font-['Cormorant_Garamond'] italic text-2xl md:text-[24px] text-white border-b border-white/20 pb-2 mb-4">
              — The Chairman
            </span>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              THAMSERKU EXPEDITIONS · YETI GROUP
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
