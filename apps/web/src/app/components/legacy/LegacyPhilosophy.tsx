import type { LegacyPageData } from "../../../lib/queries";

type PageData = LegacyPageData['legacyPage'];

export function LegacyPhilosophy({ page }: { page?: PageData }) {
  return (
    <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-32 md:py-48 px-8">
      <div className="max-w-[880px] mx-auto flex flex-col items-center text-center gap-16 md:gap-24">

        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block">
          {page?.philosophyEyebrow ?? '07 — PHILOSOPHY'}
        </span>

        <div className="flex flex-col gap-8 md:gap-12 w-full max-w-[800px]">
          <h2 className="font-['Cormorant_Garamond'] font-light text-5xl md:text-[64px] lg:text-[80px] leading-[1.1] text-[#1A1A1A] tracking-tight">
            {page?.philosophyHeadlinePart1 ?? 'We do not conquer the mountain.'}{' '}
            <span className="italic text-[#0A3A77] block mt-4">
              {page?.philosophyHeadlinePart2 ?? 'We learn from it.'}
            </span>
          </h2>

          <p className="font-['Inter'] font-light text-[#5A6673] text-[17px] leading-relaxed max-w-[56ch] mx-auto mt-4">
            {page?.philosophySubline ?? 'And we pass that learning on to the people who climb with us.'}
          </p>
        </div>

      </div>
    </section>
  );
}
