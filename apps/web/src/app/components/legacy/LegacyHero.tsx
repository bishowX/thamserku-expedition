import { Nav } from "../Nav";
import heroImage from "../../../assets/images/Copy_of_Everest_for_Breakfast_(3).jpg";
import { urlFor } from "../../../lib/sanity";
import type { LegacyPageData } from "../../../lib/queries";

type PageData = LegacyPageData['legacyPage'];

export function LegacyHero({ page }: { page?: PageData }) {
  const bgImage = page?.heroImage ? urlFor(page.heroImage).width(1920).url() : heroImage;

  return (
    <section className="relative w-full h-screen min-h-[800px] bg-[#1A1A1A] text-white flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity sepia-[.2]"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-transparent to-[#1A1A1A]/90" />
      </div>

      <Nav />

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end h-full mt-32 md:mt-48 flex-grow pb-24 md:pb-32">
        <h1 className="font-['Cormorant_Garamond'] font-light text-5xl md:text-[88px] lg:text-[104px] leading-[1.05] mb-8 max-w-[24ch] text-white tracking-tight">
          {page?.heroHeadline ?? (
            <>
              Thamserku was not created to <span className="italic text-[#C8CDD2]">follow</span> the Himalayan expedition industry. It helped <span className="italic text-[#C8CDD2]">shape</span> it.
            </>
          )}
        </h1>

        <p className="font-['Inter'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch]">
          {page?.heroSubheading ?? 'A long-form reading of the house, its origins, its Sherpa leadership, its place in the Yeti Group, and its revival for a global audience.'}
        </p>
      </div>

      <div className="hidden md:block relative z-20 w-full border-t border-white/20 mt-auto bg-[#1A1A1A]/30 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-8 py-5">
          <div className="flex flex-wrap md:flex-nowrap gap-y-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white">
            <div className="md:pr-8 py-2 md:py-0 whitespace-nowrap">{page?.heroMetaFeature ?? 'FEATURE · LEGACY'}</div>
            <div className="md:px-8 py-2 md:py-0 whitespace-nowrap">{page?.heroMetaAtlas ?? 'THE HIMALAYAN ATLAS'}</div>
            <div className="md:px-8 py-2 md:py-0 whitespace-nowrap">{page?.heroMetaReadTime ?? 'READ TIME · 12 MIN'}</div>
            <div className="md:px-8 py-2 md:py-0 whitespace-nowrap">{page?.heroMetaEra ?? 'NEPAL · 1987 — TODAY'}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
