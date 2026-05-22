import { urlFor } from "../../../lib/sanity";
import type { LegacyPageData } from "../../../lib/queries";

type PageData = LegacyPageData['legacyPage'];

export function LegacyOrigin({ page }: { page?: PageData }) {
  return (
    <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-24 md:py-40 px-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">

        {/* Left Column (Narrow) */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-8 md:sticky md:top-32 h-fit">
          <div>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block mb-2">
              {page?.originEyebrow ?? '02 — ORIGIN'}
            </span>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block">
              {page?.originYears ?? '1987 — 1995'}
            </span>
          </div>
          <div className="border-t border-[#1A1A1A]/10 pt-4 mt-8 hidden md:block">
            <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] leading-relaxed max-w-[16ch]">
              {page?.originSideNote ?? 'PRINCIPALS · A SHERPA-LED HOUSE FROM THE BEGINNING.'}
            </p>
          </div>
        </div>

        {/* Center Column (Main Body) */}
        <div className="col-span-1 md:col-span-7 font-['Cormorant_Garamond'] text-[18px] leading-[1.7] text-[#2E353C] flex flex-col gap-8">
          <p className="first-letter:font-['Cormorant_Garamond'] first-letter:text-[#0A3A77] first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:-mt-2">
            {page?.originBody1 ?? "Thamserku was named after a Himalayan peak, but it was built around a quieter principle: that a Himalayan expedition is only as serious as the Sherpa knowledge that runs it. Founded in the late 1980s as one of Nepal's original high-altitude expedition names, the house grew not by chasing the largest summits, but by deepening the practices that made each expedition possible — route preparation, weather judgement, and a Sherpa-first leadership culture that has remained at the centre of the house for nearly four decades."}
          </p>

          <p>
            {page?.originBody2 ?? 'It is part of the Yeti Group, the wider Nepali hospitality and Himalayan group through which Thamserku continues to operate, and to which it is connected by lineage rather than by branding.'}
          </p>

          {/* Pull Quote */}
          <div className="border-y border-[#0A3A77]/20 py-12 md:py-16 mt-12 mb-8">
            <h3 className="font-['Cormorant_Garamond'] italic text-3xl md:text-[44px] leading-tight text-[#0A3A77] font-light">
              "{page?.originPullQuote ?? 'A Himalayan expedition is only as serious as the Sherpa knowledge that runs it.'}"
            </h3>
          </div>
        </div>

        {/* Right Column (Narrow) */}
        <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
          <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden relative grayscale-[0.8] sepia-[0.3]">
            <img
              src={page?.originImage ? urlFor(page.originImage).width(600).url() : 'https://images.unsplash.com/photo-1678501265684-9b76ea299692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGVycGElMjB2aW50YWdlJTIwa2h1bWJ1JTIwYXBwcm9hY2h8ZW58MXx8fHwxNzc3NDU2NjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'}
              alt="Origin"
              className="w-full h-full object-cover mix-blend-multiply opacity-80"
            />
          </div>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block mt-2">
            {page?.originImageCaption ?? 'KHUMBU APPROACH · ARCHIVAL'}
          </span>
        </div>

      </div>
    </section>
  );
}
