import { ChevronDown } from 'lucide-react';

export const ArchiveFilters = () => {
  return (
 <section className="bg-[#1A1A1A] py-24 px-8 border-b border-white/10">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        
        {/* Full-width filter bar */}
        <div className="w-full flex flex-col lg:flex-row border-y border-white/20 divide-y lg:divide-y-0 lg:divide-x divide-white/20 mb-8 relative">
          
          <div className="flex-1 px-4 py-4 flex flex-col justify-center">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
              FILTER BY PEAK
            </span>
            <div className="relative group cursor-pointer inline-flex items-center gap-2 border-b border-[#5A6673] pb-1 w-fit">
              <span className="font-['Radley'] text-[16px] text-white group-hover:text-[#C8CDD2] transition-colors">
                ALL PEAKS
              </span>
              <span className="text-[#5A6673] text-[12px] group-hover:text-[#C8CDD2] transition-colors">▾</span>
            </div>
          </div>

          <div className="flex-1 px-4 py-4 flex flex-col justify-center">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
              FILTER BY YEAR
            </span>
            <div className="relative group cursor-pointer inline-flex items-center gap-2 border-b border-[#5A6673] pb-1 w-fit">
              <span className="font-['Radley'] text-[16px] text-white group-hover:text-[#C8CDD2] transition-colors">
                ALL YEARS
              </span>
              <span className="text-[#5A6673] text-[12px] group-hover:text-[#C8CDD2] transition-colors">▾</span>
            </div>
          </div>

          <div className="flex-1 px-4 py-4 flex flex-col justify-center">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
              FILTER BY TYPE
            </span>
            <div className="relative group cursor-pointer inline-flex items-center gap-2 border-b border-[#5A6673] pb-1 w-fit">
              <span className="font-['Radley'] text-[16px] text-white group-hover:text-[#C8CDD2] transition-colors">
                ALL TYPES
              </span>
              <span className="text-[#5A6673] text-[12px] group-hover:text-[#C8CDD2] transition-colors">▾</span>
            </div>
          </div>

          <div className="flex-1 px-4 py-4 flex flex-col justify-center relative">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
              SORT BY
            </span>
            <div className="relative group cursor-pointer inline-flex items-center gap-2 border-b border-[#5A6673] pb-1 w-fit">
              <span className="font-['Radley'] text-[16px] text-white group-hover:text-[#C8CDD2] transition-colors">
                MOST RECENT
              </span>
              <span className="text-[#5A6673] text-[12px] group-hover:text-[#C8CDD2] transition-colors">▾</span>
            </div>
          </div>

          {/* Reset Filters Link */}
          <div className="hidden lg:flex items-center absolute right-0 -top-10">
            <button className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] hover:text-white transition-colors">
              RESET FILTERS →
            </button>
          </div>
        </div>
        
        {/* Mobile Reset Filters */}
        <div className="w-full flex lg:hidden justify-end mb-8 -mt-4">
          <button className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] hover:text-white transition-colors">
            RESET FILTERS →
          </button>
        </div>

        {/* Showing Count */}
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] text-center">
          SHOWING [CLIENT TO CONFIRM] RECORDS OF [CLIENT TO CONFIRM] TOTAL — VERIFIED RECORDS ONLY.
        </span>

      </div>
    </section>
  );
};