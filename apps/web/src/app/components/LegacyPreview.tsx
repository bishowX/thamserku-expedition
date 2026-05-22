import { PortableText } from "@portabletext/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import chairmanImage from "../../assets/images/Mt-Everest-8848m-no-label-2.jpg";
import { urlFor } from "../../lib/sanity";
import type { SanityTimelineEra, ChairmanLetterData } from "../../lib/queries";

type LegacyData = {
  chairmanLetter?: ChairmanLetterData | null
  legacyHeading?: string
  legacyTimeline?: SanityTimelineEra[]
}

function splitAtLastSentence(text: string): [string, string] {
  const idx = text.lastIndexOf('. ')
  if (idx === -1) return [text, '']
  return [text.slice(0, idx + 1), text.slice(idx + 2)]
}

const bodyComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-['Lexend'] font-light text-[16px] text-[#5A6673] leading-[1.8]">{children}</p>
    ),
  },
};

export function LegacyPreview({ data }: { data?: LegacyData }) {
  const [headingPart1, headingPart2] = splitAtLastSentence(data?.legacyHeading ?? '')
  const timeline = data?.legacyTimeline ?? []

  const letter = data?.chairmanLetter
  const imgSrc = letter?.image ? urlFor(letter.image).width(800).url() : chairmanImage
  const quote = letter?.signature
  const attribution = letter?.organization

  return (
    <section id="legacy" className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-32 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">

        <div className="w-full md:w-5/12">
          <div className="aspect-[4/5] bg-[#E5E7EB] overflow-hidden">
            <ImageWithFallback
              src={imgSrc}
              alt="Legacy"
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

          {letter?.body && (
            <div className="flex flex-col gap-6 max-w-[56ch]">
              <PortableText value={letter.body} components={bodyComponents} />
            </div>
          )}

          {(quote || attribution) && (
            <div className="mt-4 border-l-2 border-[#C8CDD2] pl-6 py-2">
              {quote && (
                <div className="font-['Radley'] italic text-[28px] text-[#1A1A1A] leading-none mb-2">
                  {quote}
                </div>
              )}
              {attribution && (
                <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#5A6673]">
                  {attribution}
                </div>
              )}
            </div>
          )}

          {timeline.length > 0 && (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-5 gap-6 border-t border-[#C8CDD2]/30 pt-8 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.15em] text-[#5A6673]">
              {timeline.map((era, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-[#0A3A77]">{era.decade}</span>
                  <span className="font-['Radley'] text-[18px] text-[#1A1A1A] font-light capitalize tracking-normal">{era.era}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
