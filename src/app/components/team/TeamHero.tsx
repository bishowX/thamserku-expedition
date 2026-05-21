import { Nav } from "../Nav";

export function TeamHero() {
  return (
    <section className="relative w-full h-screen min-h-[800px] bg-[#1A1A1A] text-white flex flex-col justify-end pb-16 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 grayscale-[0.5] sepia-[0.2]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1658288098101-84f074c292a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBzaGVycGElMjBwb3J0cmFpdCUyMHZpbnRhZ2V8ZW58MXx8fHwxNzc3NDU5OTU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          }}
        />
        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A1A1A]" />
      </div>

      <Nav />

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end mt-48 h-full">
        {/* Eyebrow */}
        
        <h1 className="font-['Cormorant_Garamond'] font-light text-5xl md:text-[88px] lg:text-[104px] leading-[1.05] mb-8 max-w-[22ch] text-white tracking-tight">
          The people who know the mountain.
        </h1>
        
        <p className="font-['Inter'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch] mb-24 md:mb-32">
          Every Thamserku expedition is led by people whose judgement was earned over decades of Himalayan seasons — not over training programmes. Read the team that will guide your journey.
        </p>

        {/* Bottom Strip */}
        <div className="hidden md:block w-full pt-6 border-t border-white/20">
          <div className="flex flex-wrap md:flex-nowrap gap-y-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white">
            <div className="pr-8 py-2 md:py-0 whitespace-nowrap">LEADERSHIP · SHERPA-LED</div>
            <div className="md:px-8 py-2 md:py-0 whitespace-nowrap">FIELD TEAM · MULTI-GENERATIONAL</div>
            <div className="md:px-8 py-2 md:py-0 whitespace-nowrap">BASED · NEPAL HIMALAYA</div>
            <div className="md:px-8 py-2 md:py-0 whitespace-nowrap">LANGUAGES · NEPALI · ENGLISH · SHERPA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
