import type { ArchivePageData } from '../../../lib/queries';

type Props = { page: ArchivePageData['archivePage'] };

export const ArchiveVerification = ({ page }: Props) => {
  const blocks = page?.verificationBlocks ?? [];

  return (
 <section className="bg-[#F4F2EC] py-24 px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">

        {/* Section Header */}
        <div className="flex flex-col items-start md:items-center w-full max-w-[1180px] mb-20 md:mb-24">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
            {page?.verificationEyebrow}
          </span>
          <h2 className="font-['Radley'] font-light text-[44px] md:text-[56px] text-[#1A1A1A] leading-[1.1] max-w-[22ch] md:text-center">
            {page?.verificationHeading}
          </h2>
        </div>

        {/* Three-column transparency grid */}
        <div className="w-full max-w-[1180px] grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x divide-[#C8CDD2] border-t border-[#C8CDD2] pt-12 md:pt-16 mb-20 md:mb-24">
          {blocks.map((block, i) => (
            <div
              key={block._key}
              className={`flex flex-col ${
                i === 0 ? 'md:pr-12 lg:pr-16' :
                i === blocks.length - 1 ? 'md:pl-12 lg:pl-16' :
                'md:px-12 lg:px-16'
              } ${i > 0 ? 'pt-8 md:pt-0 border-t md:border-t-0 border-[#C8CDD2]' : ''}`}
            >
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6 md:mb-8 min-h-[28px]">
                {block.title} <span className="mx-1">·</span> {block.subtitle}
              </span>
              <p className="font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.65] line-clamp-4">
                {block.body}
              </p>
            </div>
          ))}
        </div>

        {/* Below the grid */}
        <div className="w-full flex justify-center pt-8 border-t border-[#C8CDD2] md:border-none md:pt-0">
          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] text-center max-w-[60ch]">
            {page?.verificationFooter}
          </p>
        </div>

      </div>
    </section>
  );
};
