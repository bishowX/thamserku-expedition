import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { urlFor } from "../../../lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

type InclusionCategory = { category: string; items: string[] };

function InclusionCategoryRow({ category, items }: InclusionCategory) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center justify-between gap-4 text-left cursor-pointer"
      >
        <h3 className="font-['Radley'] text-[24px] leading-[1.3] text-[#1A1A1A] capitalize">
          {category.toLowerCase()}
        </h3>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-[#5A6673] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.5}
        />
      </button>

      {items?.length > 0 && (
        <div
          className={`grid transition-all duration-300 ease-out ${
            open ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col border-t border-[rgba(90,102,115,0.3)]">
              {items.map((item, j) => (
                <p
                  key={j}
                  className="font-['Lexend'] font-light text-[15px] leading-[24px] text-[#5A6673] pt-[14px] pb-[15px] border-b border-[rgba(90,102,115,0.3)]"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type Props = {
  inclusionCategories?: InclusionCategory[] | null;
  exclusions?: string[] | null;
  exclusionsImage?: { asset: { _ref: string } } | null;
  mandatoryPrerequisite?: string;
};

export function Inclusions({
  inclusionCategories,
  exclusions,
  exclusionsImage,
  mandatoryPrerequisite,
}: Props) {
  const categories = inclusionCategories ?? [];
  const notIncluded = exclusions ?? [];
  const exclusionsImageSrc = exclusionsImage
    ? urlFor(exclusionsImage as SanityImageSource).width(900).url()
    : null;

  if (
    categories.length === 0 &&
    notIncluded.length === 0 &&
    !mandatoryPrerequisite
  ) {
    return null;
  }

  return (
    <section
      id="include-exclude"
      className="w-full bg-white text-[#1A1A1A] py-16 md:py-24 px-5 md:px-8 scroll-mt-28"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10 md:gap-14">
        {/* What's Included */}
        {categories.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="font-['JetBrains_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                06 — Crafted Edition Standard
              </span>
              <h2 className="font-['Radley'] text-[32px] md:text-[44px] lg:text-[48px] leading-[1.28] text-[#1A1A1A]">
                What's Included
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-9 lg:gap-x-[50px]">
              {[0, 1].map((col) => (
                <div key={col} className="flex-1 min-w-0 flex flex-col gap-9">
                  {categories
                    .filter((_, i) => i % 2 === col)
                    .map((cat, i) => (
                      <InclusionCategoryRow
                        key={i}
                        category={cat.category}
                        items={cat.items}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Not Included */}
        {notIncluded.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="font-['Radley'] text-[32px] md:text-[44px] lg:text-[48px] leading-[1.28] text-[#1A1A1A]">
              Not Included
            </h2>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-x-[50px] items-start">
              <div className="w-full lg:flex-1 min-w-0 flex flex-col border-t border-[rgba(90,102,115,0.3)]">
                {notIncluded.map((item, i) => (
                  <p
                    key={i}
                    className="font-['Lexend'] font-light text-[15px] leading-[24px] text-[#5A6673] pt-[14px] pb-[15px] border-b border-[rgba(90,102,115,0.3)]"
                  >
                    {item}
                  </p>
                ))}
              </div>

              {exclusionsImageSrc && (
                <div className="w-full lg:flex-1 min-w-0 max-h-[360px] overflow-hidden">
                  <img
                    src={exclusionsImageSrc}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mandatory Prerequisite */}
        {mandatoryPrerequisite && (
          <div className="flex flex-col gap-3">
            <h3 className="font-['Radley'] text-[24px] leading-[1.3] text-[#1A1A1A]">
              Mandatory Prerequisite
            </h3>
            <p className="font-['Lexend'] font-light text-[15px] leading-[24px] text-[#5A6673] whitespace-pre-line">
              {mandatoryPrerequisite}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
