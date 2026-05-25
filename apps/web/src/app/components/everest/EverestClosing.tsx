import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { urlFor } from "../../../lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

type Props = {
  name?: string;
  closingImage?: { asset: { _ref: string } } | null;
  closingStatement?: string;
  slug?: string;
};

export function EverestClosing({ name, closingImage, closingStatement, slug }: Props) {
  const imageSrc = closingImage ? urlFor(closingImage as SanityImageSource).width(1920).url() : null;

  return (
    <section className="relative bg-[#1A1A1A] w-full min-h-[80vh] flex items-center justify-center text-center px-8 py-32 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${name ?? "Everest"} silhouette at twilight`}
            className="w-full h-full object-cover object-bottom opacity-20"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 to-[#1A1A1A]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-[800px] w-full">
        <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
          10 — BEGIN PRIVATELY
        </h2>

        <h3 className="font-['Radley'] font-light text-[60px] md:text-[80px] leading-[1.1] text-white mb-4">
          Speak with the expedition desk.
        </h3>

        {closingStatement && (
          <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[16px] leading-[1.8] max-w-[56ch] mb-8">
            {closingStatement}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <Link
            to={`/consultation${slug ? `?peak=${slug}` : "?peak=everest"}`}
            className="border border-white bg-white text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-transparent hover:text-white transition-colors flex items-center justify-center gap-3"
          >
            Schedule a{name ? ` ${name}` : "n Everest"} Consultation <ArrowRight className="w-4 h-4" strokeWidth={1} />
          </Link>
          <Link
            to="/editions"
            className="border border-white/30 text-white px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white transition-colors flex items-center justify-center gap-3"
          >
            Explore Available Editions <ArrowRight className="w-4 h-4" strokeWidth={1} />
          </Link>
        </div>

        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mt-8">
          RESPONSE WITHIN 48 HOURS · HANDLED BY SENIOR EXPEDITION STAFF
        </span>
      </div>
    </section>
  );
}
