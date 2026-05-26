import type { ArchivePageData } from '../../../lib/queries';

type Props = { page: ArchivePageData['archivePage'] };

export const ArchiveFilters = ({ page }: Props) => {
  return (
 <section className="bg-[#1A1A1A] py-5 px-8">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">

        {/* Full-width filter bar */}
        <div className="w-full flex flex-col lg:flex-row border-y border-white/20 divide-y lg:divide-y-0 lg:divide-x divide-white/20 mb-8 relative">

          <div className="flex-1 px-4 py-4 flex flex-col justify-center">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
              {page?.filterPeakLabel}
            </span>
            <div className="relative group cursor-pointer inline-flex items-center gap-2 border-b border-[#E5E7EB] pb-1 w-fit">
              <span className="font-['Radley'] text-[16px] text-white group-hover:text-[#C8CDD2] transition-colors">
                {page?.filterPeakDefault}
              </span>
              <span className="text-[#E5E7EB] text-[12px] group-hover:text-[#C8CDD2] transition-colors">▾</span>
            </div>
          </div>

          <div className="flex-1 px-4 py-4 flex flex-col justify-center">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
              {page?.filterYearLabel}
            </span>
            <div className="relative group cursor-pointer inline-flex items-center gap-2 border-b border-[#E5E7EB] pb-1 w-fit">
              <span className="font-['Radley'] text-[16px] text-white group-hover:text-[#C8CDD2] transition-colors">
                {page?.filterYearDefault}
              </span>
              <span className="text-[#E5E7EB] text-[12px] group-hover:text-[#C8CDD2] transition-colors">▾</span>
            </div>
          </div>

          <div className="flex-1 px-4 py-4 flex flex-col justify-center">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
              {page?.filterTypeLabel}
            </span>
            <div className="relative group cursor-pointer inline-flex items-center gap-2 border-b border-[#E5E7EB] pb-1 w-fit">
              <span className="font-['Radley'] text-[16px] text-white group-hover:text-[#C8CDD2] transition-colors">
                {page?.filterTypeDefault}
              </span>
              <span className="text-[#E5E7EB] text-[12px] group-hover:text-[#C8CDD2] transition-colors">▾</span>
            </div>
          </div>

          <div className="flex-1 px-4 py-4 flex flex-col justify-center relative">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
              {page?.filterSortLabel}
            </span>
            <div className="relative group cursor-pointer inline-flex items-center gap-2 border-b border-[#E5E7EB] pb-1 w-fit">
              <span className="font-['Radley'] text-[16px] text-white group-hover:text-[#C8CDD2] transition-colors">
                {page?.filterSortDefault}
              </span>
              <span className="text-[#E5E7EB] text-[12px] group-hover:text-[#C8CDD2] transition-colors">▾</span>
            </div>
          </div>

          {/* Reset Filters Link */}
          <div className="hidden lg:flex items-center absolute right-0 -top-10">
            <button className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] hover:text-white transition-colors">
              {page?.filterResetLabel}
            </button>
          </div>
        </div>

        {/* Mobile Reset Filters */}
        <div className="w-full flex lg:hidden justify-end mb-8 -mt-4">
          <button className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] hover:text-white transition-colors">
            {page?.filterResetLabel}
          </button>
        </div>

      </div>
    </section>
  );
};
