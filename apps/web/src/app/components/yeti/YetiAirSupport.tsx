import { urlFor } from '../../../lib/sanity';
import type { YetiPageData } from '../../../lib/queries';

type PageData = YetiPageData['yetiPage'];

export const YetiAirSupport = ({ page }: { page?: PageData }) => {
  const imageUrl = page?.airImage ? urlFor(page.airImage).width(1200).url() : null;

  return (
 <section className="bg-[#2E353C] py-24 px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center">

        <div className="md:col-span-6 w-full aspect-[16/10] relative overflow-hidden">
          {imageUrl && (
            <img src={imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}
        </div>

        <div className="hidden md:block md:col-span-1" />

        <div className="md:col-span-5 flex flex-col items-start">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
            PILLAR I — AIR SUPPORT
          </span>

          {page?.airHeading && (
            <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] text-white leading-[1.1] max-w-[16ch] mb-6">
              {page.airHeading}
            </h2>
          )}

          {page?.airTagline && (
            <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] max-w-[30ch] mb-8">
              {page.airTagline}
            </p>
          )}

          {page?.airBody && (
            <p className="font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.75] max-w-[50ch] mb-12">
              {page.airBody}
            </p>
          )}

          <div className="w-full flex flex-col border-t border-white/20">
            <div className="flex flex-col gap-1 py-5 border-b border-white/20">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">CHANNELS</span>
              <span className="font-['Radley'] text-[16px] text-white">{page?.airChannels ?? '—'}</span>
            </div>
            <div className="flex flex-col gap-1 py-5 border-b border-white/20">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">USE CASES</span>
              <span className="font-['Radley'] text-[16px] text-white">{page?.airUseCases ?? '—'}</span>
            </div>
            <div className="flex flex-col gap-1 py-5 border-b border-white/20">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">AVAILABILITY</span>
              <span className="font-['Radley'] text-[16px] text-white">{page?.airAvailability ?? '—'}</span>
            </div>
            <div className="flex flex-col gap-1 py-5 border-b border-white/20">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">COORDINATION</span>
              <span className="font-['Radley'] text-[16px] text-white">{page?.airCoordination ?? '—'}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
