import { Link } from 'react-router';
import { urlFor } from '../../../lib/sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { YetiPageData } from '../../../lib/queries';

type PageData = YetiPageData['yetiPage'];

export const YetiClosing = ({ page }: { page?: PageData }) => {
  const imageSrc = page?.closingImage
    ? urlFor(page.closingImage as SanityImageSource).width(1920).url()
    : null;

  return (
    <section className="relative bg-[#1A1A1A] section-padding border-t border-white/10 overflow-hidden">
      {imageSrc && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={imageSrc}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A] opacity-80" />
        </div>
      )}

      <div className="relative z-10 max-w-[880px] mx-auto flex flex-col items-center">
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10">
          CONTINUE PRIVATELY — § VIII
        </span>

        {page?.closingHeading && (
          <h2 className="font-['Radley'] font-light text-[32px] md:text-[48px] text-white leading-[1.05] text-center max-w-[24ch] mb-8">
            {page.closingHeading}
          </h2>
        )}

        {page?.closingBody && (
          <p className="font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch] mb-8 md:mb-16">
            {page.closingBody}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center">
          <Link
            to="/design-your-expedition"
            className="w-full sm:w-auto border border-white text-white px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap"
          >
            DESIGN YOUR EXPEDITION →
          </Link>

          <Link
            to="/editions"
            className="w-full sm:w-auto border border-white/30 text-[#C8CDD2] px-10 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:text-white transition-colors whitespace-nowrap"
          >
            EXPLORE EDITIONS →
          </Link>
        </div>
      </div>
    </section>
  );
};
