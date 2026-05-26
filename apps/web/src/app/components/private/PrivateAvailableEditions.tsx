import { Link } from 'react-router';

export const PrivateAvailableEditions = () => {
  return (
    <section className="flex flex-col w-full">
      {/* Section Header */}
      <div className="bg-[#F4F2EC] pt-[140px] md:pt-[180px] px-8 pb-16">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] text-center mb-8">
            AVAILABLE EDITIONS — § III
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] text-center max-w-[22ch] mb-6">
            Three editions, shaped privately.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] text-center max-w-[56ch]">
            Strategy doc reference: Crafted, Definitive, and Explorer editions are the editions most often commissioned privately.
          </p>
        </div>
      </div>

      {/* Band III.1 — Crafted Edition (Archival Paper) */}
      <div className="w-full bg-[#F4F2EC] py-24 md:py-32 px-8 overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24 relative">
          <div className="md:w-5/12 flex flex-col items-start md:sticky md:top-32 pt-8">
            <span className="font-['Radley'] font-light text-[240px] md:text-[320px] text-[#0A3A77] leading-[0.8] tracking-tighter ml-[-20px] md:ml-[-40px]">
              C
            </span>
            <span className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[22px] mt-6 ml-2 max-w-[20ch]">
              "An elevated reading, held privately."
            </span>
          </div>
          <div className="md:w-7/12 flex flex-col items-start pt-16 md:pt-32">
            <h3 className="font-['Radley'] font-light text-[40px] md:text-[56px] text-[#1A1A1A] leading-[1.1] mb-8">
              Crafted Edition — Private
            </h3>
            <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[52ch] mb-12">
              A Crafted expedition run privately for a principal, family, or small group. The technical seriousness of a Crafted expedition is preserved; what changes is the privacy of the camp, the rhythm of the days, and the level of attention given to comfort, food, recovery, and documentation. Public attribution is opt-in.
            </p>
            <div className="flex flex-col gap-6 w-full max-w-[52ch] mb-12">
              <div className="border-t border-[#5A6673]/30 pt-6">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] block mb-2">WHO IT IS FOR</span>
                <p className="font-['Lexend'] font-light text-[15px] text-[#1A1A1A]">HNW and UHNI clients who want a serious Himalayan climb with deeper service and the privacy of a non-shared expedition.</p>
              </div>
              <div className="border-t border-[#5A6673]/30 pt-6">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] block mb-2">BEST READ ON</span>
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] text-[#1A1A1A]">EVEREST · MANASLU · DHAULAGIRI · MAKALU</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/editions" className="border border-[#0A3A77] text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] hover:bg-[#2E353C] hover:text-white transition-colors text-center">
                READ THE CRAFTED EDITION →
              </Link>
              <Link to="/consultation?intent=private" className="border border-[#1A1A1A]/30 text-[#5A6673] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors text-center">
                SCHEDULE A PRIVATE CONSULTATION →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Band III.2 — Definitive Edition (Deep Blue) */}
      <div className="w-full bg-[#2E353C] py-[220px] md:py-[260px] px-8 overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row-reverse items-center md:items-start gap-12 md:gap-24 relative">
          <div className="md:w-5/12 flex flex-col items-start md:sticky md:top-32 pt-8">
            <span className="font-['Radley'] font-light text-[280px] md:text-[360px] text-white leading-[0.8] tracking-tighter">
              D
            </span>
            <span className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] mt-6 max-w-[20ch]">
              "The most exclusive private expedition."
            </span>
          </div>
          <div className="md:w-7/12 flex flex-col items-start pt-16 md:pt-32">
            <h3 className="font-['Radley'] font-light text-[40px] md:text-[56px] text-white leading-[1.1] mb-8">
              Definitive Edition — Private Flagship
            </h3>
            <p className="font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.75] max-w-[52ch] mb-6">
              The Definitive Edition is the flagship private expedition of the house. A private camp configuration, concierge planning, maximum discretion, and the senior leadership of the house — all built quietly around a single climber, family, or principal. Nothing is templated. Every detail is shaped in private and handled by senior expedition staff from first contact to descent.
            </p>
            <p className="font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.75] max-w-[52ch] mb-12">
              Public attribution is by your written invitation only. Many Definitive expeditions remain entirely private.
            </p>

            <div className="w-full max-w-[52ch] grid grid-cols-2 md:grid-cols-4 divide-x divide-white/30 border-y border-white/30 mb-12">
              <div className="py-4 px-2 flex flex-col items-start justify-center">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#C8CDD2] mb-2">CAMP</span>
                <span className="font-['Radley'] font-light text-[16px] text-white leading-[1.2]">Private Base Camp Configuration</span>
              </div>
              <div className="py-4 px-4 flex flex-col items-start justify-center">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#C8CDD2] mb-2">CONCIERGE</span>
                <span className="font-['Radley'] font-light text-[16px] text-white leading-[1.2]">Single Senior Advisor</span>
              </div>
              <div className="py-4 px-4 flex flex-col items-start justify-center">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#C8CDD2] mb-2">DISCRETION</span>
                <span className="font-['Radley'] font-light text-[16px] text-white leading-[1.2]">Maximum · Contracted</span>
              </div>
              <div className="py-4 px-4 flex flex-col items-start justify-center">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#C8CDD2] mb-2">LEADERSHIP</span>
                <span className="font-['Radley'] font-light text-[16px] text-white leading-[1.2]">Senior House Team</span>
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full max-w-[52ch] mb-12">
              <div className="border-t border-white/30 pt-6">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] block mb-2">WHO IT IS FOR</span>
                <p className="font-['Lexend'] font-light text-[15px] text-white">UHNI individuals, principal families, elite adventurers, and clients requiring maximum privacy, discretion, and tailoring.</p>
              </div>
              <div className="border-t border-white/30 pt-6">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] block mb-2">BEST READ ON</span>
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] text-white">EVEREST · DHAULAGIRI · MAKALU</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/editions" className="border border-white text-white px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] hover:bg-white hover:text-[#0A3A77] transition-colors text-center">
                READ THE DEFINITIVE EDITION →
              </Link>
              <Link to="/consultation?intent=definitive" className="border border-white/50 text-[#C8CDD2] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] hover:border-white hover:text-white transition-colors text-center">
                SCHEDULE A DEFINITIVE CONSULTATION →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Band III.3 — Explorer Edition (Archival Paper) */}
      <div className="w-full bg-[#F4F2EC] py-24 md:py-32 px-8 overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24 relative">
          <div className="md:w-5/12 flex flex-col items-start md:sticky md:top-32 pt-8">
            <span className="font-['Radley'] font-light text-[240px] md:text-[320px] text-[#0A3A77] leading-[0.8] tracking-tighter ml-[-20px] md:ml-[-40px]">
              E
            </span>
            <span className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[22px] mt-6 ml-2 max-w-[20ch]">
              "The Himalayas, read softly."
            </span>
          </div>
          <div className="md:w-7/12 flex flex-col items-start pt-16 md:pt-32">
            <h3 className="font-['Radley'] font-light text-[40px] md:text-[56px] text-[#1A1A1A] leading-[1.1] mb-8">
              Explorer Edition — Private
            </h3>
            <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[52ch] mb-12">
              A private Explorer expedition for principals or families seeking the Himalayas beyond the summit — cultural journeys, base-camp experiences, photographic expeditions, or non-climbing readings of the same mountains we summit on other editions. Same discretion, gentler pace.
            </p>
            <div className="flex flex-col gap-6 w-full max-w-[52ch] mb-12">
              <div className="border-t border-[#5A6673]/30 pt-6">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] block mb-2">WHO IT IS FOR</span>
                <p className="font-['Lexend'] font-light text-[15px] text-[#1A1A1A]">Principals, families, and private groups who want time in the Himalayas without the commitment of a summit objective.</p>
              </div>
              <div className="border-t border-[#5A6673]/30 pt-6">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] block mb-2">BEST READ ON</span>
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] text-[#1A1A1A]">HIMCHULI · EVEREST (BASE CAMP / EXPERIENCE)</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/editions" className="border border-[#0A3A77] text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] hover:bg-[#2E353C] hover:text-white transition-colors text-center">
                READ THE EXPLORER EDITION →
              </Link>
              <Link to="/consultation?intent=private" className="border border-[#1A1A1A]/30 text-[#5A6673] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors text-center">
                SCHEDULE A PRIVATE CONSULTATION →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};