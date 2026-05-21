import heroImage from "../../../assets/images/Copy_of_Lukla_(14).jpg";

export function AtlasListingHero() {
  return (
    <section className="relative w-full min-h-screen bg-[#1A1A1A] flex flex-col justify-end text-white overflow-hidden pb-16 md:pb-32">
      {/* Background cartographic grid overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{
            backgroundImage: `url('${heroImage}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/60 to-[#1A1A1A]" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />
      </div>

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end h-full mt-32 md:mt-48">
        {/* Eyebrow */}
        
        <h1 className="font-['Radley'] font-light text-5xl md:text-[88px] lg:text-[104px] leading-[1.05] mb-8 max-w-[18ch] text-white tracking-tight">
          Five mountains. Five different kinds of preparation.
        </h1>
        
        <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch] mb-20">
          Thamserku reads each Himalayan summit as a passage of its own. Choose by altitude, region, season or character — then begin a private conversation with the expedition desk.
        </p>

        {/* Data legend */}
        <div className="hidden md:block w-full pt-6">
          <div className="flex flex-wrap md:flex-nowrap gap-y-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
            <div className="pr-8 py-2 md:py-0 whitespace-nowrap">5 EXPEDITIONS</div>
            <div className="md:px-8 py-2 md:py-0 whitespace-nowrap">ALTITUDE 8,000m+ · TBC</div>
            <div className="md:px-8 py-2 md:py-0 whitespace-normal">REGION KHUMBU · GORKHA · DHAULAGIRI · MAHALANGUR · ANNAPURNA</div>
            <div className="md:px-8 py-2 md:py-0 whitespace-nowrap">SEASON SPRING · AUTUMN</div>
          </div>
        </div>
      </div>
    </section>
  );
}