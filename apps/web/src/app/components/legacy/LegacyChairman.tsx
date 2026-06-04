import { PortableText } from "@portabletext/react";
import { urlFor } from "../../../lib/sanity";
import type { ChairmanLetterData } from "../../../lib/queries";
import { ChairmanSignature } from "./ChairmanSignature";

function splitAtLastSentence(text: string): [string, string] {
  const idx = text.lastIndexOf(". ");
  if (idx === -1) return [text, ""];
  return [text.slice(0, idx + 1), text.slice(idx + 2)];
}

const bodyComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-['Lexend'] font-light text-fluid-body text-[#C8CDD2] leading-[1.8]">
        {children}
      </p>
    ),
  },
};

export function LegacyChairman({ letter }: { letter?: ChairmanLetterData }) {
  const imgSrc = letter?.image ? urlFor(letter.image).width(800).url() : null;

  const [headingPart1, headingPart2] = splitAtLastSentence(
    letter?.heading ?? ""
  );

  return (
 <section className="w-full bg-[#1A1A1A] text-white section-padding">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">

        <div className="w-full md:w-5/12">
          <div className="aspect-[4/5] bg-[#E5E7EB] overflow-hidden">
            {imgSrc && (
              <img
                src={imgSrc}
                alt="Chairman"
                className="w-full h-full object-cover saturate-[0.6] contrast-110 sepia-[0.2]"
              />
            )}
          </div>
        </div>

        <div className="w-full md:w-7/12 flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              {letter?.eyebrow ?? "03 — THE CHAIRMAN'S LETTER"}
            </span>
            {letter?.heading && (
              <h2 className="font-['Radley'] font-light text-fluid-heading leading-[1.1] text-white">
                {headingPart1}{" "}
                <em className="text-[#0A3A77] not-italic italic">
                  {headingPart2}
                </em>
              </h2>
            )}
          </div>

          {letter?.body && (
            <div className="flex flex-col gap-6 max-w-[56ch]">
              <PortableText value={letter.body} components={bodyComponents} />
            </div>
          )}

          {(letter?.signature || letter?.organization) && (
            <div className="mt-4 border-l-2 border-white/20 pl-6 py-2">
              <div className="mb-3">
                <ChairmanSignature />
              </div>
              {letter.signature && (
                <div className="font-['Radley'] italic text-fluid-lg text-white leading-none mb-2">
                  {letter.signature}
                </div>
              )}
              {letter.organization && (
                <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#C8CDD2]">
                  {letter.organization}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
