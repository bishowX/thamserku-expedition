import { MoveRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { urlFor } from "../../../lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";
import type { SanityExpedition } from "../../../lib/queries";

type Props = {
  expeditions: SanityExpedition[];
};

export function AtlasIndex({ expeditions }: Props) {
  return (
    <div className="w-full flex flex-col">
      {expeditions.map((expedition, idx) => {
        const isDark = idx % 2 === 0;
        const imageSrc = expedition.image
          ? urlFor(expedition.image as SanityImageSource)
              .width(1200)
              .url()
          : null;
        const editionLetters =
          expedition.editions?.map((e) => e.letter).join(" · ") || "—";
        const code = `EXP / ${expedition.number?.padStart(2, "0") || "—"} — ${expedition.code}`;
        const seasonLabel = `SEASON · ${expedition.season?.toUpperCase() || "—"}`;
        const slug = expedition.slug?.current;

        return (
          <section
            key={expedition._id}
            className={`w-full py-15 px-8 ${isDark ? "bg-[#1A1A1A] text-white" : "bg-[#F4F2EC] text-[#1A1A1A]"}`}
          >
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-center">
              {/* Left 6 cols: Image */}
              <div className="md:col-span-6 relative aspect-[4/3] w-full overflow-hidden">
                <ImageWithFallback
                  src={imageSrc || ""}
                  alt={expedition.name}
                  className="w-full h-full object-cover grayscale-[30%] opacity-90 transition-opacity duration-700 hover:opacity-100"
                />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] bg-white/10 backdrop-blur-sm px-4 py-2 text-white">
                    ALT · {expedition.altitude?.toUpperCase() || "—"}
                  </span>
                </div>
              </div>

              {/* Right 6 cols: Dossier Content */}
              <div className="md:col-span-6 flex flex-col justify-center">
                {/* Eyebrow */}
                <div
                  className={`w-full border-t ${isDark ? "border-white/20 text-[#C8CDD2]" : "border-[#1A1A1A]/20 text-[#5A6673]"} pt-4 mb-16 flex justify-between items-start`}
                >
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px]">
                    {code}
                  </span>
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px]">
                    {seasonLabel}
                  </span>
                </div>

                {/* Title & Positioning */}
                <h2 className="font-['Radley'] font-light text-6xl md:text-[72px] leading-[1] mb-8 tracking-tight">
                  {expedition.name}
                </h2>
                <p
                  className={`font-['Radley'] text-[18px] italic leading-relaxed mb-16 ${isDark ? "text-[#C8CDD2]" : "text-[#5A6673]"}`}
                >
                  "{expedition.positioning}"
                </p>

                {/* Fact Grid */}
                <div
                  className={`grid grid-cols-2 gap-8 mb-12 ${isDark ? "text-white" : "text-[#1A1A1A]"}`}
                >
                  <div>
                    <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-2 text-[#5A6673]">
                      Altitude
                    </div>
                    <div className="font-['Radley'] text-2xl">
                      {expedition.altitude || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-2 text-[#5A6673]">
                      Region
                    </div>
                    <div className="font-['Radley'] text-2xl">
                      {expedition.region || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-2 text-[#5A6673]">
                      Season
                    </div>
                    <div className="font-['Radley'] text-2xl">
                      {expedition.season || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-2 text-[#5A6673]">
                      Style
                    </div>
                    <div className="font-['Radley'] text-2xl">
                      {expedition.style || "—"}
                    </div>
                  </div>
                </div>

                {/* Editions */}
                <div
                  className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-16 pb-6 border-b ${isDark ? "border-white/10 text-[#C8CDD2]" : "border-[#1A1A1A]/10 text-[#5A6673]"}`}
                >
                  EDITIONS AVAILABLE <span className="mx-4 font-light">·</span>{" "}
                  {editionLetters}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-6">
                  {slug ? (
                    <Link
                      to={`/expeditions/${slug}`}
                      className={`border px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors flex items-center justify-center gap-3 ${
                        isDark
                          ? "border-white bg-white text-[#0A3A77] hover:bg-transparent hover:text-white"
                          : "border-[#0A3A77] bg-[#0A3A77] text-white hover:bg-transparent hover:text-[#0A3A77]"
                      }`}
                    >
                      Read the Dossier{" "}
                      <MoveRight className="w-4 h-4" strokeWidth={1} />
                    </Link>
                  ) : (
                    <span
                      className={`border px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center justify-center gap-3 opacity-40 cursor-not-allowed ${
                        isDark
                          ? "border-white text-white"
                          : "border-[#0A3A77] text-[#0A3A77]"
                      }`}
                    >
                      Dossier Coming Soon
                    </span>
                  )}
                  <Link
                    to="/consultation"
                    className={`border px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors flex items-center justify-center gap-3 ${
                      isDark
                        ? "border-white/30 text-white hover:border-white"
                        : "border-[#0A3A77]/30 text-[#0A3A77] hover:border-[#0A3A77]"
                    }`}
                  >
                    Schedule a Consultation{" "}
                    <MoveRight className="w-4 h-4" strokeWidth={1} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
