import { urlFor } from "../../../lib/sanity";
import type { YetiPageData } from "../../../lib/queries";

type PageData = YetiPageData["yetiPage"];

export const YetiFieldContinuity = ({ page }: { page?: PageData }) => {
  const imageUrl = page?.continuityImage
    ? urlFor(page.continuityImage).width(1200).url()
    : null;

  return (
 <section className="bg-[#2E353C] py-24 px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center">
        <div className="md:col-span-5 flex flex-col items-start">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
            PILLAR IV — FIELD CONTINUITY
          </span>

          {page?.continuityHeading && (
            <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] max-w-[18ch] mb-6">
              {page.continuityHeading}
            </h2>
          )}

          {page?.continuityTagline && (
            <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[24px] max-w-[30ch] mb-8">
              {page.continuityTagline}
            </p>
          )}

          <div className="flex flex-col gap-6">
            {page?.continuityBody1 && (
              <p className="font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.75] max-w-[50ch]">
                {page.continuityBody1}
              </p>
            )}
            {page?.continuityBody2 && (
              <p className="font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.75] max-w-[50ch]">
                {page.continuityBody2}
              </p>
            )}
          </div>
        </div>

        <div className="hidden md:block md:col-span-1" />

        <div className="md:col-span-6 w-full aspect-[16/10] relative overflow-hidden">
          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};
