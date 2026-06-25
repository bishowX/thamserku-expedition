import { stegaClean } from "@sanity/client/stega";
import { urlFor } from "../../../lib/sanity";
import type { SanityEditionFull } from "../../../lib/queries";

const BG_CLASS: Record<string, string> = {
  dark: "bg-[#1A1A1A]",
  light: "bg-[#F4F2EC]",
  blue: "bg-[#2E353C]",
};

const LETTER_COLOR: Record<string, string> = {
  dark: "text-[#C8CDD2]/20",
  light: "text-[#0A3A77]/20",
  blue: "text-white/20",
};

const COPY_COLOR: Record<string, string> = {
  dark: "text-[#C8CDD2]",
  light: "text-[#5A6673]",
  blue: "text-[#C8CDD2]",
};

const SIGNATURE_COLOR: Record<string, string> = {
  dark: "text-[#C8CDD2]",
  light: "text-[#0A3A77]",
  blue: "text-[#C8CDD2]",
};

export function EditionsBands({ editions }: { editions: SanityEditionFull[] }) {
  if (!editions.length) return null;

  return (
    <section className="w-full flex flex-col">
      {editions.map((ed, idx) => {
        const variant = stegaClean(ed.colorVariant ?? "dark");
        const isDark = variant === "dark" || variant === "blue";
        const bgClass = BG_CLASS[variant] ?? "bg-[#1A1A1A]";
        const letterColor = LETTER_COLOR[variant] ?? "text-[#C8CDD2]/20";
        const copyColor = COPY_COLOR[variant] ?? "text-[#C8CDD2]";
        const sigColor = SIGNATURE_COLOR[variant] ?? "text-[#C8CDD2]";
        const imageUrl = ed.image ? urlFor(ed.image).width(1800).url() : null;
        return (
          <div
            key={ed._id}
            className={`w-full relative overflow-hidden ${bgClass} px-5 md:px-8 pt-6 md:pt-24 pb-12 md:pb-24`}
          >
            {imageUrl && (
              <div
                className={`absolute inset-0 z-0 pointer-events-none ${isDark ? "mix-blend-luminosity opacity-30" : "mix-blend-multiply opacity-[0.35]"}`}
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundPosition: "left center",
                  backgroundSize: "cover",
                  WebkitMaskImage:
                    "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)",
                  maskImage:
                    "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)",
                }}
              />
            )}

            <div className="relative z-10 w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
              <div className="col-span-1 md:col-span-5 relative flex flex-col md:pt-8">
                {/*<p
                  className={`font-['DM_Mono'] uppercase hidden md:block tracking-[0.22em] text-[11px] mb-8 ${isDark ? "text-[#C8CDD2]" : "text-[#0A3A77]"}`}
                >
                  EDITION {ed.letter}
                </p>*/}
                <div
                  className={`font-['Fraunces'] font-light leading-none text-[200px] md:text-[320px] -ml-4 ${letterColor}`}
                >
                  {ed.letter}
                </div>
                {ed.tag && (
                  <p className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] mt-4 md:mt-8 max-w-[20ch] leading-relaxed text-[#5A6673]">
                    {ed.tag}
                  </p>
                )}
                {ed.isStandard && (
                  <span className="inline-flex items-center justify-center self-start bg-[#c8cdd2] border border-white/30 px-[33px] py-[17px] mt-10 font-['DM_Mono'] font-normal uppercase tracking-[2.42px] text-[11px] leading-[16.5px] text-[#25292c] whitespace-nowrap">
                    Standard Edition
                  </span>
                )}
              </div>

              <div className="col-span-1 md:col-span-7 flex flex-col">
                <p className="font-['DM_Mono'] uppercase hidden md:block tracking-[0.22em] text-[11px] mb-12 text-[#5A6673]">
                  01{ed.letter} — EDITION {ed.letter}
                </p>

                <h3
                  className={`font-['Fraunces'] font-light text-display-xl mb-6 ${isDark ? "text-white" : "text-[#1A1A1A]"}`}
                >
                  {ed.name}
                </h3>

                {ed.subtitle && (
                  <p
                    className={`font-['Fraunces'] italic text-display-m mb-6 md:mb-12 ${sigColor}`}
                  >
                    {ed.subtitle}
                  </p>
                )}

                <div
                  className={`font-['DM_Sans'] font-light text-body leading-relaxed max-w-[56ch] mb-2 md:mb-4 ${copyColor}`}
                >
                  {ed.body1 && <p className="mb-6">{ed.body1}</p>}
                  {ed.body2 && <p>{ed.body2}</p>}
                </div>

                <div className="flex flex-col gap-6 md:gap-10 max-w-[56ch]">
                  {ed.targetAudience && (
                    <div>
                      <p
                        className={`font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] mb-4 ${isDark ? "text-white" : "text-[#1A1A1A]"}`}
                      >
                        WHO IT IS FOR
                      </p>
                      <p
                        className={`font-['DM_Sans'] font-light italic text-body leading-relaxed ${copyColor}`}
                      >
                        {ed.targetAudience}
                      </p>
                    </div>
                  )}

                </div>

              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
