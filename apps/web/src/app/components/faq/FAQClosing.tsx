import { Link } from 'react-router';
import { urlFor } from '../../../lib/sanity';
import type { SanityImageSource } from '@sanity/image-url';

type PageData = {
  closingHeadline?: string;
  closingBody?: string;
  closingDisclaimerLine?: string;
  closingImage?: { asset: { _ref: string } } | null;
};

export const FAQClosing = ({ page }: { page?: PageData }) => {
  const imageSrc = page?.closingImage
    ? urlFor(page.closingImage as SanityImageSource).width(1920).url()
    : null;

  return (
    <section className="relative bg-[#2E353C] section-padding overflow-hidden">
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

      <div className="relative z-10 max-w-[880px] mx-auto flex flex-col items-center">
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10">
          BEGIN PRIVATELY — § III
        </span>

        <h2 className="font-['Radley'] font-light text-[60px] md:text-[80px] text-white leading-[1.1] text-center max-w-[26ch] mb-8">
          {page?.closingHeadline ?? 'Your question is not on this page?'}
        </h2>

        <p className="font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch] mb-8 md:mb-16">
          {page?.closingBody ?? 'Write to the expedition desk. A senior advisor will respond personally — quietly, and within 48 hours — and the conversation begins.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center mb-8 md:mb-16">
          <Link
            to="/consultation"
            className="w-full sm:w-auto border border-white text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#0A3A77] transition-colors whitespace-nowrap"
          >
            SCHEDULE A CONSULTATION →
          </Link>
        </div>

        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center">
          {page?.closingDisclaimerLine ?? 'ALL ENQUIRIES ARE HANDLED DISCREETLY BY SENIOR EXPEDITION STAFF.'}
        </span>
      </div>
    </section>
  );
};
