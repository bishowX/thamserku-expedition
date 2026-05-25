import { Link } from "react-router";
import { urlFor } from "../../../lib/sanity";
import type { SanityEditionFull } from "../../../lib/queries";

const BG_CLASS: Record<string, string> = {
  dark: "bg-[#1A1A1A]",
  light: "bg-[#F4F2EC]",
  blue: "bg-[#0A3A77]",
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
        const variant = ed.colorVariant ?? "dark";
        const isDark = variant === "dark" || variant === "blue";
        const bgClass = BG_CLASS[variant] ?? "bg-[#1A1A1A]";
        const letterColor = LETTER_COLOR[variant] ?? "text-[#C8CDD2]/20";
        const copyColor = COPY_COLOR[variant] ?? "text-[#C8CDD2]";
        const sigColor = SIGNATURE_COLOR[variant] ?? "text-[#C8CDD2]";
        const imageUrl = ed.image ? urlFor(ed.image).width(1800).url() : null;
        const mountains = ed.mountainNames?.join(" · ").toUpperCase() ?? "";

        return (
          <div
            key={ed._id}
            className={`w-full relative overflow-hidden ${bgClass} py-24 px-8`}
          >
            {imageUrl && (
              <div
                className={`absolute inset-0 z-0 pointer-events-none mix-blend-luminosity ${isDark ? "opacity-30" : "opacity-[0.08]"}`}
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

            <div className="relative z-10 w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
              <div className="col-span-1 md:col-span-5 relative flex flex-col pt-8">
                <p
                  className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-8 ${isDark ? "text-[#C8CDD2]" : "text-[#0A3A77]"}`}
                >
                  EDITION {ed.letter}
                </p>
                <div
                  className={`font-['Radley'] font-light leading-none text-[200px] md:text-[320px] -ml-4 ${letterColor}`}
                >
                  {ed.letter}
                </div>
                {ed.tag && (
                  <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mt-8 max-w-[20ch] leading-relaxed text-[#5A6673]">
                    {ed.tag}
                  </p>
                )}
              </div>

              <div className="col-span-1 md:col-span-7 flex flex-col">
                <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-12 text-[#5A6673]">
                  03{ed.letter} — EDITION {ed.letter}
                </p>

                <h3
                  className={`font-['Radley'] font-light text-5xl md:text-[64px] mb-6 ${isDark ? "text-white" : "text-[#1A1A1A]"}`}
                >
                  {ed.name}
                </h3>

                {ed.subtitle && (
                  <p
                    className={`font-['Radley'] italic text-[24px] md:text-[28px] mb-12 ${sigColor}`}
                  >
                    {ed.subtitle}
                  </p>
                )}

                <div
                  className={`font-['Lexend'] font-light text-[16px] leading-relaxed max-w-[56ch] mb-16 ${copyColor}`}
                >
                  {ed.body1 && <p className="mb-6">{ed.body1}</p>}
                  {ed.body2 && <p>{ed.body2}</p>}
                </div>

                <div className="flex flex-col gap-10 max-w-[56ch]">
                  {ed.targetAudience && (
                    <div>
                      <p
                        className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-4 ${isDark ? "text-white" : "text-[#1A1A1A]"}`}
                      >
                        WHO IT IS FOR
                      </p>
                      <p
                        className={`font-['Lexend'] font-light italic text-[15px] leading-relaxed ${copyColor}`}
                      >
                        {ed.targetAudience}
                      </p>
                    </div>
                  )}

                  {mountains && (
                    <div>
                      <p
                        className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-4 ${isDark ? "text-white" : "text-[#1A1A1A]"}`}
                      >
                        BEST READ ON
                      </p>
                      <p
                        className={`font-['JetBrains_Mono'] uppercase tracking-[0.1em] text-[13px] ${isDark ? "text-[#C8CDD2]" : "text-[#5A6673]"}`}
                      >
                        {mountains}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-8 mt-20">
                  <Link
                    to={ed.slug?.current ? `/editions/${ed.slug.current}` : "/editions"}
                    className={`inline-flex items-center justify-center px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border ${
                      isDark
                        ? "border-white text-white hover:bg-white hover:text-[#0A3A77]"
                        : "border-[#0A3A77] text-[#0A3A77] hover:bg-[#0A3A77] hover:text-white"
                    }`}
                  >
                    READ THE COLLECTION →
                  </Link>
                  <Link
                    to="/consultation"
                    className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors ${
                      isDark ? "text-[#C8CDD2] hover:text-white" : "text-[#5A6673] hover:text-[#1A1A1A]"
                    }`}
                  >
                    SCHEDULE A CONSULTATION →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
