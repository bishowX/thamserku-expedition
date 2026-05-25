import { PortableText } from "@portabletext/react";
import chairmanImage from "../../../assets/images/Mt-Everest-8848m-no-label-1.jpg";
import { urlFor } from "../../../lib/sanity";
import type { ChairmanLetterData } from "../../../lib/queries";

const components = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p>{children}</p>
    ),
  },
};

export function LegacyChairman({ letter }: { letter?: ChairmanLetterData }) {
  const imgSrc = letter?.image ? urlFor(letter.image).width(800).url() : chairmanImage;

  return (
    <section className="relative w-full bg-[#1A1A1A] text-white py-24 px-8 overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32">

        {/* Left Column (5 cols) */}
        <div className="col-span-1 md:col-span-5 flex flex-col gap-6 md:sticky md:top-32 h-fit">
          <div className="w-full aspect-[4/5] bg-gray-800 overflow-hidden relative grayscale-[0.8] sepia-[0.2]">
            <img
              src={imgSrc}
              alt="Mt. Everest 8848m"
              className="w-full h-full object-cover mix-blend-screen opacity-90"
            />
            <div className="absolute inset-0 bg-[#1A1A1A]/30 mix-blend-multiply" />
          </div>
          {letter?.imageCaption && (
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block mt-2">
              {letter.imageCaption}
            </span>
          )}
        </div>

        {/* Right Column (7 cols) */}
        <div className="col-span-1 md:col-span-7 font-['Cormorant_Garamond'] text-[18px] leading-[1.75] text-[#C8CDD2] flex flex-col gap-12">

          <div className="mb-4">
            {letter?.eyebrow && (
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] block mb-8">
                {letter.eyebrow}
              </span>
            )}
            {letter?.heading && (
              <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[52px] leading-tight text-white max-w-[22ch]">
                {letter.heading}
              </h2>
            )}
          </div>

          {letter?.body && (
            <div className="flex flex-col gap-8 max-w-[60ch]">
              <PortableText value={letter.body} components={components} />
            </div>
          )}

          <div className="mt-12 flex flex-col items-start">
            {letter?.signature && (
              <span className="font-['Cormorant_Garamond'] italic text-2xl md:text-[24px] text-white border-b border-white/20 pb-2 mb-4">
                {letter.signature}
              </span>
            )}
            {letter?.organization && (
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                {letter.organization}
              </span>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
