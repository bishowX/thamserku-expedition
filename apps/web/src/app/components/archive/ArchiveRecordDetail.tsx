import { Link } from 'react-router';

export const ArchiveRecordDetail = () => {
  return (
 <section className="relative w-full bg-[#1A1A1A] py-24 px-8">
      {/* Faint cartographic grid overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px'
        }}
      />
      
      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            RECORD DETAIL — § IV — REPRESENTATIVE TEMPLATE
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] text-white leading-[1.1] text-center max-w-[26ch] mb-6">
            A single record, read in full.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]">
            Below: the structure used for every detailed archive record.
          </p>
        </div>

        {/* Detail Body */}
        <div className="w-full max-w-[1180px] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          
          {/* Left 5 cols: Image Placeholder */}
          <div className="md:col-span-5 w-full aspect-[4/5] border border-white/20 flex flex-col items-center justify-center p-8">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-4">
              [IMAGE PLACEHOLDER]
            </span>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-2">
              RECORD DETAIL IMAGE — DHAULAGIRI 2021
            </span>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center opacity-60">
              [PERMISSION REQUIRED]
            </span>
          </div>

          {/* Right 7 cols: Data Display */}
          <div className="md:col-span-7 flex flex-col pt-4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
              EXPEDITION RECORD <span className="mx-1">·</span> DHA <span className="mx-1">·</span> 2021
            </span>
            
            <h3 className="font-['Radley'] font-light text-[56px] md:text-[72px] text-white leading-[1.05] max-w-[14ch] mb-6">
              2021 — Dhaulagiri
            </h3>
            
            <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] max-w-[30ch] mb-12 md:mb-16">
              Northeast Ridge — a quiet spring expedition.
            </p>

            {/* Structured fields panel */}
            <div className="flex flex-col border-t border-white/20">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    YEAR
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-['Radley'] text-[16px] text-white">
                    2021
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    PEAK
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-['Radley'] text-[16px] text-white">
                    Dhaulagiri (8,167 m)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    ROUTE / REGION
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-['Radley'] text-[16px] text-white">
                    Northeast Ridge, Myagdi, Nepal
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    EXPEDITION TYPE
                  </span>
                </div>
                <div className="sm:col-span-2 flex flex-wrap gap-2">
                  <span className="font-['Radley'] text-[16px] text-white">
                    Summit Expedition <span className="mx-1 font-['JetBrains_Mono'] text-[#5A6673] text-[10px]">·</span> Definitive Edition
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    NOTABLE DETAIL
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-['Radley'] text-[16px] text-white leading-[1.6]">
                    A remote spring expedition emphasising solitude and disciplined logistics. The team achieved the summit window without incident across thirty-eight field days. <span className="opacity-60">[CLIENT TO CONFIRM]</span> for the principal's tailored narrative excerpt.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    SOURCE
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-['Radley'] text-[16px] text-white">
                    Internal expedition log — verified
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    PERMISSION STATUS
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-['Radley'] text-[16px] text-[#C8CDD2]">
                    VERIFIED (status published)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 py-6 border-b border-white/20">
                <div className="sm:col-span-1 flex items-center">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                    RELATED EXPEDITION
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <Link to="#" className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] hover:text-white transition-colors">
                    → DHA · 2018 Reconnaissance
                  </Link>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Below the detail */}
        <div className="mt-24 md:mt-32 w-full flex justify-center">
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[16px] text-center max-w-[60ch]">
            Every published record follows this structure. Records without verified permission remain in the internal archive and are not displayed here.
          </p>
        </div>

      </div>
    </section>
  );
};