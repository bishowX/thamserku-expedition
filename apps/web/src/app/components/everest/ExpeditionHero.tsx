import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router";
import { Nav } from "../Nav";
import { urlFor } from "../../../lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

type Props = {
  name: string;
  heroImage?: { asset: { _ref: string } } | null;
  heroTagline?: string;
  heroSubtext?: string;
  slug: string;
};

export function ExpeditionHero({ name, heroImage, heroTagline, heroSubtext, slug }: Props) {
  const imageSrc = heroImage ? urlFor(heroImage as SanityImageSource).width(1920).url() : null;

  return (
    <section className="relative w-full h-screen bg-[#1A1A1A] flex flex-col justify-end text-white overflow-hidden pb-16 md:pb-24">
      <div className="absolute inset-0 z-0">
        {imageSrc ? (
          <img src={imageSrc} alt={`${name} hero`} className="w-full h-full object-cover object-center" />
        ) : (
          <div className="w-full h-full bg-[#2E353C]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-transparent to-[#1A1A1A]/90" />
      </div>

      <Nav />

      <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-20">
        <div className="w-full h-full border-l border-r border-[#C8CDD2]/30 max-w-[1440px] mx-auto relative grid grid-cols-4 md:grid-cols-12 gap-5 px-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-r border-[#C8CDD2]/20 hidden md:block" />
          ))}
        </div>
      </div>

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end h-full mt-24">
        <h1 className="font-['Radley'] font-light text-fluid-display tracking-tight leading-[1.1] mb-6 max-w-[18ch]">
          {heroTagline || `${name} Expedition`}
        </h1>

        <div className="flex flex-col gap-2 mb-12">
          {heroSubtext && (
            <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch]">
              {heroSubtext}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            to={`/consultation?peak=${slug}`}
            className="border border-white bg-white text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-transparent hover:text-white transition-colors flex items-center justify-center gap-3"
          >
            Request a Private {name} Consultation <ArrowRight className="w-4 h-4" strokeWidth={1} />
          </Link>
          <button className="border border-white/30 text-white px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white transition-colors flex items-center justify-center gap-3">
            Read the Dossier <ArrowDown className="w-4 h-4" strokeWidth={1} />
          </button>
        </div>
      </div>
    </section>
  );
}
