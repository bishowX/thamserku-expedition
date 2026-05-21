import { ReactNode } from "react";
import { Link } from "react-router";

interface BandProps {
  id: string;
  letter: string;
  tag: string;
  name: string;
  signature: string;
  copy: ReactNode;
  audience: string;
  mountains: string;
  bgColor: string;
  isFlagship?: boolean;
  image: string;
}

const bandsData: BandProps[] = [
  {
    id: "03A",
    letter: "A",
    tag: "THE DISCIPLINED CLIMB",
    name: "Alpine Edition",
    signature: "The essential expedition.",
    copy: (
      <>
        <p className="mb-6">
          The Alpine Edition is the foundation of how Thamserku climbs. It is the most direct reading of the mountain — disciplined, professionally led, and built around the climber's own preparation rather than external comfort.
        </p>
        <p>
          Every Alpine expedition is run with full Sherpa leadership, conservative weather judgement, and the same field standards as our most private editions. What changes is restraint: less surface, more substance.
        </p>
      </>
    ),
    audience: "Experienced climbers seeking a disciplined, professionally managed expedition. Suited to those who measure a Himalayan season by judgement and patience, not by service.",
    mountains: "EVEREST · MANASLU · HIMCHULI",
    bgColor: "bg-[#1A1A1A]",
    image: "https://images.unsplash.com/photo-1629976791862-5749e12b2f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YXMlMjBtb3VudGFpbiUyMHBlYWslMjBzbm93fGVufDF8fHx8MTc3NzU2MTc5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "03B",
    letter: "B",
    tag: "A MORE PERSONAL EXPEDITION",
    name: "Bespoke Edition",
    signature: "Shaped around your intent.",
    copy: (
      <>
        <p className="mb-6">
          The Bespoke Edition is the first edition in which the expedition is reshaped around the individual. Schedule, pace, support, and small private elements are tuned to the climber's goals, body, and life — without compromising the rigor of how Thamserku reads the mountain.
        </p>
        <p>
          It remains a serious Himalayan expedition, but the rhythm is yours.
        </p>
      </>
    ),
    audience: "Private climbers, couples, or small groups seeking flexibility and customization within a fully Sherpa-led expedition framework.",
    mountains: "EVEREST · MANASLU · DHAULAGIRI · MAKALU · HIMCHULI",
    bgColor: "bg-[#F4F2EC]",
    image: "https://images.unsplash.com/photo-1692452376160-14194abefba8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJhc2UlMjBjYW1wJTIwdGVudCUyMGV2ZW5pbmd8ZW58MXx8fHwxNzc3NTYxNzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "03C",
    letter: "C",
    tag: "SERVICE · COMFORT · STORYTELLING",
    name: "Crafted Edition",
    signature: "An elevated reading.",
    copy: (
      <>
        <p className="mb-6">
          The Crafted Edition deepens the human side of an expedition. The technical seriousness remains, but Base Camp life, acclimatisation rest, and the rhythm of the journey are richer. There is more attention to comfort, to food, to recovery, and to the documentation of the climb itself.
        </p>
        <p>
          It is the edition for climbers who want their season to be remembered as well as completed.
        </p>
      </>
    ),
    audience: "HNW clients, executives, and climbers who want technical seriousness paired with richer service, attentive comfort, and considered expedition storytelling.",
    mountains: "EVEREST · MANASLU · DHAULAGIRI · MAKALU",
    bgColor: "bg-[#1A1A1A]",
    image: "https://images.unsplash.com/photo-1733528346006-a47bc1648c76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGJhc2UlMjBjYW1wJTIwdGVudCUyMGV2ZW5pbmd8ZW58MXx8fHwxNzc3NTYxNzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "03D",
    letter: "D",
    tag: "RARE · PRIVATE · UNCOMMON",
    name: "Definitive Edition",
    signature: "The most exclusive private expedition.",
    copy: (
      <>
        <p className="mb-6">
          The Definitive Edition is the most exclusive Thamserku experience. A private camp, concierge planning, maximum discretion, and rare access — all built quietly around a single climber, family, or principal.
        </p>
        <p>
          Nothing is templated. Logistics, route preparation, communication, hospitality, and aftercare are designed in private and handled by senior expedition staff from first contact to descent.
        </p>
      </>
    ),
    audience: "UHNW individuals, private families, elite adventurers, and clients requiring maximum privacy, discretion, and tailoring.",
    mountains: "EVEREST · DHAULAGIRI · MAKALU",
    bgColor: "bg-[#0A3A77]",
    isFlagship: true,
    image: "https://images.unsplash.com/photo-1767511513723-bc5ec26142c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YXMlMjBtYWplc3RpYyUyMHBlYWslMjBkcmFtYXRpY3xlbnwxfHx8fDE3Nzc1NjE4MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "03E",
    letter: "E",
    tag: "BEYOND THE SUMMIT",
    name: "Explorer Edition",
    signature: "The Himalayas, read softly.",
    copy: (
      <>
        <p className="mb-6">
          The Explorer Edition exists for the Himalayas beyond the summit. Cultural journeys, base-camp experiences, photographic expeditions, and slower, non-climbing readings of the same mountains we summit on other editions.
        </p>
        <p>
          It is the edition for those who want to be in the Himalayas without setting out to stand on top of them.
        </p>
      </>
    ),
    audience: "Travellers, families, leaders, photographers, and cultural explorers seeking softer Himalayan journeys.",
    mountains: "HIMCHULI · EVEREST (BASE CAMP / EXPERIENCE)",
    bgColor: "bg-[#F4F2EC]",
    image: "https://images.unsplash.com/photo-1763738173775-5f2f5c6fd782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXBhbCUyMGhpbWFsYXlhcyUyMHZhbGxleSUyMGN1bHR1cmV8ZW58MXx8fHwxNzc3NTYxODA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function EditionsBands() {
  return (
    <section className="w-full flex flex-col">
      {bandsData.map((band, idx) => {
        const isDark = band.bgColor === "bg-[#1A1A1A]" || band.bgColor === "bg-[#0A3A77]";
        const letterColor = band.bgColor === "bg-[#F4F2EC]" ? "text-[#0A3A77]/20" : 
                            band.bgColor === "bg-[#0A3A77]" ? "text-white/20" : "text-[#C8CDD2]/20";
        
        return (
          <div 
            key={idx} 
            className={`w-full relative overflow-hidden ${band.bgColor} ${band.isFlagship ? 'py-40 md:py-64 pb-16' : 'py-32 md:py-48'} px-8`}
          >
            {/* Background Image Layer */}
            <div 
              className={`absolute inset-0 z-0 pointer-events-none mix-blend-luminosity ${isDark ? 'opacity-30' : 'opacity-[0.08]'}`}
              style={{
                backgroundImage: `url(${band.image})`,
                backgroundPosition: 'left center',
                backgroundSize: 'cover',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)'
              }}
            />

            <div className="relative z-10 w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
              
              {/* Left Column: Visual Anchor */}
              <div className="col-span-1 md:col-span-5 relative flex flex-col pt-8">
                <p className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-8 ${isDark ? 'text-[#C8CDD2]' : 'text-[#0A3A77]'}`}>
                  EDITION {band.letter}
                </p>
                <div className={`font-['Radley'] font-light leading-none ${band.isFlagship ? 'text-[240px] md:text-[380px]' : 'text-[200px] md:text-[320px]'} -ml-4 ${letterColor}`}>
                  {band.letter}
                </div>
                <p className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mt-8 max-w-[20ch] leading-relaxed ${isDark ? 'text-[#5A6673]' : 'text-[#5A6673]'}`}>
                  {band.tag}
                </p>
              </div>

              {/* Right Column: Editorial Stack */}
              <div className="col-span-1 md:col-span-7 flex flex-col">
                <p className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-12 ${isDark ? 'text-[#5A6673]' : 'text-[#5A6673]'}`}>
                  {band.id} — EDITION {band.letter}
                </p>
                
                <h3 className={`font-['Radley'] font-light ${band.isFlagship ? 'text-5xl md:text-[80px]' : 'text-5xl md:text-[64px]'} mb-6 ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  {band.name}
                </h3>
                
                <p className={`font-['Radley'] italic text-[24px] md:text-[28px] mb-12 ${
                  band.bgColor === "bg-[#1A1A1A]" ? 'text-[#C8CDD2]' : 
                  band.bgColor === "bg-[#0A3A77]" ? 'text-[#C8CDD2]' : 'text-[#0A3A77]'
                }`}>
                  {band.signature}
                </p>
                
                <div className={`font-['Lexend'] font-light text-[16px] leading-relaxed max-w-[56ch] mb-16 ${
                  band.bgColor === "bg-[#1A1A1A]" ? 'text-[#C8CDD2]' :
                  band.bgColor === "bg-[#0A3A77]" ? 'text-[#C8CDD2]' : 'text-[#5A6673]'
                }`}>
                  {band.copy}
                </div>
                
                <div className="flex flex-col gap-10 max-w-[56ch]">
                  {/* WHO IT IS FOR */}
                  <div>
                    <p className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-4 ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      WHO IT IS FOR
                    </p>
                    <p className={`font-['Lexend'] font-light italic text-[15px] leading-relaxed ${
                      band.bgColor === "bg-[#1A1A1A]" ? 'text-[#C8CDD2]' :
                      band.bgColor === "bg-[#0A3A77]" ? 'text-[#C8CDD2]' : 'text-[#5A6673]'
                    }`}>
                      {band.audience}
                    </p>
                  </div>
                  
                  {/* BEST READ ON */}
                  <div>
                    <p className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-4 ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      BEST READ ON
                    </p>
                    <p className={`font-['JetBrains_Mono'] uppercase tracking-[0.1em] text-[13px] ${
                      band.bgColor === "bg-[#1A1A1A]" ? 'text-[#C8CDD2]' :
                      band.bgColor === "bg-[#0A3A77]" ? 'text-white' : 'text-[#5A6673]'
                    }`}>
                      {band.mountains}
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-6 mt-20">
                  {band.isFlagship ? (
                    <>
                      <Link 
                        to="/consultation?intent=definitive"
                        className={`inline-flex items-center justify-center px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border ${
                          isDark 
                            ? 'border-white text-white hover:bg-white hover:text-[#0A3A77]' 
                            : 'border-[#0A3A77] text-[#0A3A77] hover:bg-[#0A3A77] hover:text-white'
                        }`}
                      >
                        SCHEDULE A DEFINITIVE CONSULTATION →
                      </Link>
                      <button className={`px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border border-transparent ${
                        isDark
                          ? 'text-[#C8CDD2] hover:text-white hover:border-white/30'
                          : 'text-[#5A6673] hover:text-[#1A1A1A] hover:border-[#1A1A1A]/30'
                      }`}>
                        READ MORE ABOUT THE DEFINITIVE →
                      </button>
                    </>
                  ) : (
                    <>
                      <button className={`px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border ${
                        isDark 
                          ? 'border-white text-white hover:bg-white hover:text-[#0A3A77]' 
                          : 'border-[#0A3A77] text-[#0A3A77] hover:bg-[#0A3A77] hover:text-white'
                      }`}>
                        READ THE COLLECTION →
                      </button>
                      <Link 
                        to="/consultation"
                        className={`inline-flex items-center justify-center px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border border-transparent ${
                          isDark
                            ? 'text-[#C8CDD2] hover:text-white hover:border-white/30'
                            : 'text-[#5A6673] hover:text-[#1A1A1A] hover:border-[#1A1A1A]/30'
                        }`}
                      >
                        SCHEDULE A CONSULTATION →
                      </Link>
                    </>
                  )}
                </div>

              </div>
            </div>

            {band.isFlagship && (
              <div className="absolute bottom-8 left-8 right-8 z-10 w-full max-w-[1440px] mx-auto text-center md:text-left">
                 <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                   [IMAGE PLACEHOLDER] — DEFINITIVE EDITION CINEMATIC SPREAD. FINAL IMAGE TO BE PROVIDED BY CLIENT.
                 </p>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}