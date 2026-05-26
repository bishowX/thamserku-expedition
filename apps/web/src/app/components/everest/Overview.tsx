import { urlFor } from "../../../lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

type Props = {
  overviewHeadline?: string;
  overviewBody?: string;
  overviewSideImage?: { asset: { _ref: string } } | null;
};

export function Overview({ overviewHeadline, overviewBody, overviewSideImage }: Props) {
  const sideImageSrc = overviewSideImage ? urlFor(overviewSideImage as SanityImageSource).width(400).url() : null;

  return (
 <section className="bg-[#F4F2EC] w-full text-[#1A1A1A] py-24">
      <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 lg:col-span-3">
          <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            03 — OVERVIEW
          </h2>
        </div>

        <div className="md:col-span-8 lg:col-span-7 flex flex-col gap-12">
          {overviewHeadline && (
            <h3 className="font-['Radley'] font-light text-[44px] md:text-[52px] leading-[1.1] max-w-[28ch]">
              {overviewHeadline}
            </h3>
          )}
          {overviewBody && (
            <div className="flex flex-col gap-6">
              <p className="font-['Lexend'] font-light text-[#5A6673] text-[16px] leading-[1.8] max-w-[60ch]">
                {overviewBody}
              </p>
            </div>
          )}
        </div>

        {sideImageSrc && (
          <div className="md:col-span-12 lg:col-span-2 flex items-end justify-end hidden lg:flex">
            <div className="w-full aspect-[3/4] overflow-hidden">
              <img
                src={sideImageSrc}
                alt="Expedition overview"
                className="w-full h-full object-cover grayscale-[30%] opacity-80"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
