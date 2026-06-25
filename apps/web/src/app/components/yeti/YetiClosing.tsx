import { Link } from 'react-router';
import type { EncodeDataAttributeCallback } from '@sanity/react-loader';
import { urlFor } from '../../../lib/sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { YetiPageData } from '../../../lib/queries';

type PageData = YetiPageData['yetiPage'];

export const YetiClosing = ({
  page,
  encodeDataAttribute,
}: {
  page?: PageData;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}) => {
  const eyebrow = page?.closingEyebrow ?? 'YETI GROUP';
  const primaryLabel = page?.closingPrimaryCtaLabel ?? 'DESIGN YOUR EXPEDITION →';
  const primaryPath = page?.closingPrimaryCtaPath ?? '/design-your-expedition';
  const secondaryLabel = page?.closingSecondaryCtaLabel ?? 'EXPLORE EDITIONS →';
  const secondaryPath = page?.closingSecondaryCtaPath ?? '/editions';

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
        <span
          className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-10"
          data-sanity={encodeDataAttribute?.(['yetiPage', 'closingEyebrow'])}
        >
          {eyebrow}
        </span>

        {page?.closingHeading && (
          <h2
            className="font-['Fraunces'] font-light text-display-l text-white text-center max-w-[24ch] mb-8"
            data-sanity={encodeDataAttribute?.(['yetiPage', 'closingHeading'])}
          >
            {page.closingHeading}
          </h2>
        )}

        {page?.closingBody && (
          <p
            className="font-['DM_Sans'] font-light text-body text-[#C8CDD2] leading-[1.65] text-center max-w-[60ch] mb-8 md:mb-16"
            data-sanity={encodeDataAttribute?.(['yetiPage', 'closingBody'])}
          >
            {page.closingBody}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center">
          <Link
            to={primaryPath}
            className="w-full sm:w-auto border border-white text-white px-10 py-5 flex items-center justify-center font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-white hover:text-[#1A1A1A] transition-colors whitespace-nowrap"
            data-sanity={encodeDataAttribute?.(['yetiPage', 'closingPrimaryCtaLabel'])}
          >
            {primaryLabel}
          </Link>

          <Link
            to={secondaryPath}
            className="w-full sm:w-auto border border-white/30 text-[#C8CDD2] px-10 py-5 flex items-center justify-center font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white hover:text-white transition-colors whitespace-nowrap"
            data-sanity={encodeDataAttribute?.(['yetiPage', 'closingSecondaryCtaLabel'])}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
};
