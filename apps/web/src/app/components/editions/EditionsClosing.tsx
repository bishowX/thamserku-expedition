import { Link } from "react-router";
import { urlFor } from "../../../lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

type PageData = {
  closingEyebrow?: string;
  closingHeading?: string;
  closingBody?: string;
  closingFootnote?: string;
  closingImage?: { asset: { _ref: string } } | null;
};

export function EditionsClosing({ page }: { page?: PageData }) {
  const eyebrow = page?.closingEyebrow ?? "06 — BEGIN PRIVATELY";
  const footnote =
    page?.closingFootnote ??
    "RESPONSE WITHIN 48 HOURS · HANDLED BY SENIOR EXPEDITION STAFF";
  const imageSrc = page?.closingImage
    ? urlFor(page.closingImage as SanityImageSource).width(1920).url()
    : null;

  return (
    <section className="relative w-full bg-[#2E353C] text-white section-padding flex flex-col items-center justify-center text-center overflow-hidden">
      {imageSrc && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={imageSrc}
            alt="closing background"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E353C] via-transparent to-[#2E353C] opacity-80" />
        </div>
      )}

      <div className="relative z-10 w-full max-w-[800px] flex flex-col items-center">
        <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-12">
          {eyebrow}
        </p>

        {page?.closingHeading && (
          <h2 className="font-['Radley'] font-light text-5xl md:text-[64px] lg:text-[80px] leading-[1.05] tracking-tight mb-8">
            {page.closingHeading}
          </h2>
        )}

        {page?.closingBody && (
          <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch] mb-8 md:mb-16">
            {page.closingBody}
          </p>
        )}

        <div className="mb-8 md:mb-16">
          <Link
            to="/enquiry"
            className="inline-flex items-center justify-center px-16 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors border border-white text-white hover:bg-white hover:text-[#2E353C]"
          >
            ENQUIRE
          </Link>
        </div>

        <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] opacity-80">
          {footnote}
        </p>
      </div>
    </section>
  );
}
