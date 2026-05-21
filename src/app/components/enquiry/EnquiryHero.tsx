import { Nav } from '../Nav';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import heroBgImage from '../../../assets/images/Deboche_Trail_View_(22).jpg';

export const EnquiryHero = () => {
  return (
    <section className="relative min-h-screen bg-[#1A1A1A] flex flex-col overflow-hidden">
      {/* Faint cartographic grid overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageWithFallback 
          src={heroBgImage} 
          alt="Deboche Trail View" 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay saturate-[0.8] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent" />
      </div>

      <Nav />

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end h-full mt-32 md:mt-48 flex-grow pb-32">
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block mb-6">
          THE EXPEDITION DESK — SCHEDULE A CONSULTATION
        </span>
        <h1 className="font-['Cormorant_Garamond'] font-light text-5xl md:text-[72px] lg:text-[104px] leading-[1.05] mb-8 max-w-[22ch] text-white tracking-tight">
          Every Thamserku journey begins with a private conversation.
        </h1>
        
        <p className="text-[#C8CDD2] font-light text-base md:text-[17px] leading-relaxed max-w-[60ch]">
          Choose a time on our calendar, or write to us in your own words. A senior advisor will respond personally — quietly, and within 48 hours.
        </p>
      </div>

      {/* Bottom Strip */}
      <div className="relative z-20 w-full border-t border-[#2E353C] mt-auto">
        <div className="max-w-[1440px] mx-auto px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#2E353C]">
            <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] md:pr-6 py-2 md:py-0">
              RESPONSE <span className="mx-2 text-[#5A6673]">·</span> WITHIN 48 HOURS
            </div>
            <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] md:px-6 py-2 md:py-0">
              HANDLED BY <span className="mx-2 text-[#5A6673]">·</span> SENIOR EXPEDITION STAFF
            </div>
            <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] md:px-6 py-2 md:py-0">
              LANGUAGES <span className="mx-2 text-[#5A6673]">·</span> ENGLISH <span className="mx-2 text-[#5A6673]">·</span> NEPALI
            </div>
            <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] md:pl-6 py-2 md:py-0">
              CONFIDENTIALITY <span className="mx-2 text-[#5A6673]">·</span> ASSURED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
