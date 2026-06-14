import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { urlFor } from "../../../lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

type Props = {
  name?: string;
  closingImage?: { asset: { _ref: string } } | null;
  slug?: string;
};

export function ExpeditionClosing({ name, closingImage, slug }: Props) {
  const imageSrc = closingImage ? urlFor(closingImage as SanityImageSource).width(1920).url() : null;
  const expeditionName = name ?? "Expedition";
  const designHref = `/design-your-expedition${slug ? `?expedition=${slug}` : ""}`;

  return (
    <section id="configure" className="relative bg-[#1A1A1A] w-full flex items-center justify-center text-center px-5 md:px-8 py-24 md:py-32 overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${expeditionName} closing`}
            loading="lazy"
            className="w-full h-full object-cover object-bottom"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,26,26,0.8)] to-[#1A1A1A]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-[640px] w-full">
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
          10 — Configure
        </span>

        <h2 className="font-['Radley'] text-[32px] md:text-[48px] leading-[1.1] text-white">
          Design your {expeditionName} Expedition
        </h2>

        <p className="font-['Lexend'] font-light text-[15px] leading-[1.6] text-[#C8CDD2] max-w-[480px]">
          Select your Edition, customize add-ons, and receive a detailed proposal with
          investment guidance — sent privately to your email within 60 seconds.
        </p>

        <Link
          to={designHref}
          className="mt-2 inline-flex items-center justify-center gap-3 border border-white/30 text-white px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:bg-white/5 transition-colors"
        >
          Design Your Expedition <ArrowRight className="w-4 h-4" strokeWidth={1} />
        </Link>

        <span className="mt-2 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
          Response within 48 hours · Handled by senior expedition staff
        </span>
      </div>
    </section>
  );
}
