import { Link } from 'react-router';
import { urlFor } from '../../../lib/sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { SafetyPageData } from '../../../lib/queries';

type Props = { page: SafetyPageData['safetyPage'] };

export const SafetyClosing = ({ page }: Props) => {
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
        {page?.closingEyebrow && (
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10">
            {page.closingEyebrow}
          </span>
        )}

        <h2 className="font-['Radley'] font-light text-[32px] md:text-[48px] text-white leading-[1.05] text-center max-w-[16ch] mb-8">
          {page?.closingHeadline}
        </h2>

        <p className="font-['Lexend'] font-light text-[17px] text-[#C8CDD2] leading-[1.65] text-center max-w-[56ch] mb-10 md:mb-14">
          {page?.closingBody}
        </p>

        <Link
          to="/design-your-expedition"
          className="w-full sm:w-auto border border-white text-white px-12 py-5 flex items-center justify-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap"
        >
          Design your expedition
        </Link>
      </div>
    </section>
  );
};
