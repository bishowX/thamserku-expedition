import { urlFor } from '../../../lib/sanity';
import type { YetiPageData } from '../../../lib/queries';

type PageData = YetiPageData['yetiPage'];

export const YetiMountainLodges = ({ page }: { page?: PageData }) => {
  const imageUrl = page?.lodgesImage ? urlFor(page.lodgesImage).width(1200).url() : null;

  return (
    <section className="bg-[#F4F2EC] py-[140px] md:py-[180px] px-8 border-t border-[#C8CDD2]/30">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center">

        <div className="md:col-span-5 flex flex-col items-start order-2 md:order-1">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
            PILLAR II — MOUNTAIN LODGES
          </span>

          {page?.lodgesHeading && (
            <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] text-[#1A1A1A] leading-[1.1] max-w-[16ch] mb-6">
              {page.lodgesHeading}
            </h2>
          )}

          {page?.lodgesTagline && (
            <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[30ch] mb-8">
              {page.lodgesTagline}
            </p>
          )}

          {page?.lodgesBody && (
            <p className="font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.75] max-w-[50ch] mb-12">
              {page.lodgesBody}
            </p>
          )}

          <div className="w-full flex flex-col border-t border-[#C8CDD2]">
            <div className="flex flex-col gap-1 py-5 border-b border-[#C8CDD2]">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">REGIONS</span>
              <span className="font-['Radley'] text-[16px] text-[#1A1A1A]">{page?.lodgesRegions ?? '—'}</span>
            </div>
            <div className="flex flex-col gap-1 py-5 border-b border-[#C8CDD2]">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">USE CASES</span>
              <span className="font-['Radley'] text-[16px] text-[#1A1A1A]">{page?.lodgesUseCases ?? '—'}</span>
            </div>
            <div className="flex flex-col gap-1 py-5 border-b border-[#C8CDD2]">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">STANDARD</span>
              <span className="font-['Radley'] text-[16px] text-[#1A1A1A]">{page?.lodgesStandard ?? '—'}</span>
            </div>
            <div className="flex flex-col gap-1 py-5 border-b border-[#C8CDD2]">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">STAFFING</span>
              <span className="font-['Radley'] text-[16px] text-[#1A1A1A]">{page?.lodgesStaffing ?? '—'}</span>
            </div>
          </div>
        </div>

        <div className="hidden md:block md:col-span-1 order-2" />

        <div className="md:col-span-6 w-full aspect-[16/10] relative overflow-hidden order-1 md:order-3">
          {imageUrl && (
            <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}
        </div>

      </div>
    </section>
  );
};
