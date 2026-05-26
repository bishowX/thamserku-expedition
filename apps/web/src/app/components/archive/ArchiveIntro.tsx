import type { ArchivePageData } from '../../../lib/queries';

type Props = { page: ArchivePageData['archivePage'] };

export const ArchiveIntro = ({ page }: Props) => {
  return (
 <section className="bg-[#F4F2EC] py-24 px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">

        {/* Left column (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-start">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
            {page?.introEyebrow}
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[16ch] mb-6">
            {page?.introTitle}
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[28ch]">
            {page?.introSubtitle}
          </p>
        </div>

        {/* Right column (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-6 pt-2 md:pt-16">
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            {page?.introBody1}
          </p>
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            {page?.introBody2}
          </p>
          <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
            {page?.introBody3}
          </p>
        </div>

      </div>
    </section>
  );
};
