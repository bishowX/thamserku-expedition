import type { YetiPageData } from '../../../lib/queries';

type PageData = YetiPageData['yetiPage'];

export const YetiDefinition = ({ page }: { page?: PageData }) => {
  return (
    <section className="bg-[#F4F2EC] py-[140px] md:py-[180px] px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">

        <div className="md:col-span-5 flex flex-col items-start">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
            THE DEFINITION — § I
          </span>
          {page?.definitionHeading && (
            <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[16ch] mb-6">
              {page.definitionHeading}
            </h2>
          )}
          {page?.definitionTagline && (
            <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[30ch]">
              {page.definitionTagline}
            </p>
          )}
        </div>

        <div className="md:col-span-7 flex flex-col gap-6 pt-2 md:pt-16">
          {page?.definitionBody1 && (
            <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
              {page.definitionBody1}
            </p>
          )}
          {page?.definitionBody2 && (
            <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
              {page.definitionBody2}
            </p>
          )}
          {page?.definitionBody3 && (
            <p className="font-['Lexend'] font-light text-[17px] text-[#5A6673] leading-[1.75] max-w-[60ch]">
              {page.definitionBody3}
            </p>
          )}
        </div>

      </div>
    </section>
  );
};
