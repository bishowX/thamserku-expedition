import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { stegaClean } from "@sanity/client/stega";
import { urlFor } from "../../../lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { TextReveal } from "../TextReveal";
import { useSectionReveal } from "../../hooks/useSectionReveal";

type Props = {
  name?: string;
  closingImage?: { asset: { _ref: string } } | null;
  slug?: string;
};

export function ExpeditionClosing({ name, closingImage, slug }: Props) {
  const imageSrc = closingImage ? urlFor(closingImage as SanityImageSource).width(1920).url() : null;
  const expeditionName = stegaClean(name ?? "Expedition");
  const designHref = `/design-your-expedition${slug ? `?expedition=${slug}` : ""}`;
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section ref={sectionRef} id="configure" className="relative bg-[#1A1A1A] w-full flex items-center justify-center text-center px-5 md:px-8 py-24 md:py-32 overflow-hidden scroll-mt-28">
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
        <span data-reveal className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
          10 — Configure
        </span>

        <h2 data-reveal-words className="font-['Fraunces'] text-display-l text-white">
          <TextReveal text={`Design your ${expeditionName} Expedition`} />
        </h2>

        <p data-reveal className="font-['DM_Sans'] font-light text-body leading-[1.6] text-[#C8CDD2] max-w-[480px]">
          Select your Edition, customize add-ons, and receive a detailed proposal with
          investment guidance — sent privately to your email within 60 seconds.
        </p>

        <Link
          to={designHref}
          data-reveal
          className="mt-2 inline-flex items-center justify-center gap-3 border border-white/30 text-white px-8 py-4 font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:bg-white/5 transition-colors"
        >
          Design Your Expedition <ArrowRight className="w-4 h-4" strokeWidth={1} />
        </Link>

        <span data-reveal className="mt-2 font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
          Response within 48 hours · Handled by senior expedition staff
        </span>
      </div>
    </section>
  );
}
