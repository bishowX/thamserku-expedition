import { ImageWithFallback } from "./figma/ImageWithFallback";
import chairmanImage from "../../assets/images/Mt-Everest-8848m-no-label-2.jpg";
import type { SanityTimelineEra } from "../../lib/queries";

type LegacyData = {
  heading?: string
  body1?: string
  body2?: string
  quote?: string
  attribution?: string
  timeline?: SanityTimelineEra[]
}

const FALLBACK_HEADING_PART1 = "Thamserku was not created to follow the Himalayan expedition industry."
const FALLBACK_HEADING_PART2 = "It helped shape it."
const FALLBACK_BODY1 = "Founded as one of Nepal's original high-altitude expedition names and continuing under the Yeti Group, Thamserku has been part of Himalayan exploration through nearly four decades of seasons, summits, and Sherpa-led judgement."
const FALLBACK_BODY2 = "We do not fight the mountain. We learn from it — and we pass that learning on to the people who climb with us."
const FALLBACK_QUOTE = "— The Chairman"
const FALLBACK_ATTRIBUTION = "THAMSERKU EXPEDITIONS · YETI GROUP"
const FALLBACK_TIMELINE: SanityTimelineEra[] = [
  { decade: "1980s", era: "Founding Era" },
  { decade: "1990s", era: "Sherpa-led Logistics" },
  { decade: "2000s", era: "Expedition Role" },
  { decade: "2020s", era: "Heritage Revival" },
  { decade: "Today", era: "Refined for the World" },
]

function splitAtLastSentence(text: string): [string, string] {
  const idx = text.lastIndexOf('. ')
  if (idx === -1) return [text, '']
  return [text.slice(0, idx + 1), text.slice(idx + 2)]
}

export function LegacyPreview({ data }: { data?: LegacyData }) {
  const [headingPart1, headingPart2] = data?.heading
    ? splitAtLastSentence(data.heading)
    : [FALLBACK_HEADING_PART1, FALLBACK_HEADING_PART2]
  const body1 = data?.body1 ?? FALLBACK_BODY1
  const body2 = data?.body2 ?? FALLBACK_BODY2
  const quote = data?.quote ?? FALLBACK_QUOTE
  const attribution = data?.attribution ?? FALLBACK_ATTRIBUTION
  const timeline = data?.timeline ?? FALLBACK_TIMELINE

  return (
    <section id="legacy" className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-32 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">

        <div className="w-full md:w-5/12">
          <div className="aspect-[4/5] bg-[#E5E7EB] overflow-hidden">
            <ImageWithFallback
              src={chairmanImage}
              alt="Mt. Everest 8848m"
              className="w-full h-full object-cover saturate-[0.6] contrast-110 sepia-[0.2]"
            />
          </div>
        </div>

        <div className="w-full md:w-7/12 flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
              06 — LEGACY
            </span>
            <h2 className="font-['Radley'] font-light text-4xl md:text-[56px] leading-[1.1] text-[#1A1A1A]">
              {headingPart1}{" "}
              <em className="text-[#0A3A77] not-italic italic">{headingPart2}</em>
            </h2>
          </div>

          <div className="flex flex-col gap-6 font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.8] max-w-[56ch]">
            <p>{body1}</p>
            <p>{body2}</p>
          </div>

          <div className="mt-4 border-l-2 border-[#C8CDD2] pl-6 py-2">
            <div className="font-['Radley'] italic text-[28px] text-[#1A1A1A] leading-none mb-2">
              {quote}
            </div>
            <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#5A6673]">
              {attribution}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-5 gap-6 border-t border-[#C8CDD2]/30 pt-8 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#5A6673]">
            {timeline.map((era, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <span className="text-[#0A3A77]">{era.decade}</span>
                <span className="font-['Radley'] text-[18px] text-[#1A1A1A] font-light capitalize tracking-normal">{era.era}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
