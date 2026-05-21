import { Link } from 'react-router';

export const PathwayExplorerRoutes = () => {
  return (
    <section className="bg-[#1A1A1A] py-[120px] md:py-[160px] px-8 border-t border-[#C8CDD2]/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center">
        
        {/* Left column (5 cols) - Image Placeholder */}
        <div className="md:col-span-5 w-full aspect-[16/10] border border-[#5A6673] flex flex-col items-center justify-center p-6 relative">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2">
            [IMAGE PLACEHOLDER]
          </span>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2">
            REMOTE HIMALAYAN RIDGE — EXPLORER CONTEXT
          </span>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center opacity-60">
            [ROUTE TBC]
          </span>
        </div>

        {/* Padding column */}
        <div className="hidden md:block md:col-span-1" />

        {/* Right column (6 cols) - Content */}
        <div className="md:col-span-6 flex flex-col items-start">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
            EXPLORER ROUTES — § IV — CONSULTATION ONLY
          </span>
          
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] text-white leading-[1.1] max-w-[18ch] mb-6">
            Less commercial routes. By private consultation.
          </h2>
          
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] max-w-[36ch] mb-8">
            Routes selected for solitude, quieter regions, or specific preparation needs.
          </p>
          
          <p className="font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.75] max-w-[50ch] mb-12">
            Some 7,000m routes are not commercially run. They are quieter peaks, less-trodden regions, or routes selected to match a specific climber's preparation goals. These are not listed publicly. They are designed in private consultation with our expedition desk and led by Sherpa teams familiar with the region.
          </p>

          {/* Specifications strip */}
          <div className="w-full flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#C8CDD2]/30 mb-12 border-y border-[#C8CDD2]/30">
            <div className="py-4 sm:pr-6 flex justify-start sm:justify-center">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] text-left sm:text-center">
                AVAILABILITY <span className="mx-1">·</span> BY CONSULTATION
              </span>
            </div>
            <div className="py-4 sm:px-6 flex justify-start sm:justify-center">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] text-left sm:text-center">
                EDITIONS <span className="mx-1">·</span> BESPOKE <span className="mx-1">·</span> CRAFTED <span className="mx-1">·</span> DEFINITIVE
              </span>
            </div>
            <div className="py-4 sm:pl-6 flex justify-start sm:justify-center">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] text-left sm:text-center">
                REGIONS <span className="mx-1">·</span> KHUMBU <span className="mx-1">·</span> DOLPO <span className="mx-1">·</span> MUSTANG <span className="mx-1">·</span> [ROUTE TBC]
              </span>
            </div>
          </div>

          <Link 
            to="/consultation?intent=7000m-explorer" 
            className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] hover:text-white transition-colors"
          >
            REQUEST AN EXPLORER ROUTE CONSULTATION →
          </Link>

        </div>

      </div>
    </section>
  );
};