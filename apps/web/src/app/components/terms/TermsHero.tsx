import { urlFor } from '../../../lib/sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { TermsPageData } from '../../../lib/queries';

type Props = { page: TermsPageData['termsPage'] };

export const TermsHero = ({ page }: Props) => {
  const imageSrc = page?.heroImage
    ? urlFor(page.heroImage as SanityImageSource).width(1920).url()
    : null;

  return (
    <section className="relative w-full min-h-[50vh] md:min-h-[60vh] bg-[#1A1A1A] flex flex-col justify-center section-padding overflow-hidden">
      {/* Background image */}
      {imageSrc && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      )}

      {/* Faint cartographic grid overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center">
        {page?.heroEyebrow && (
          <p className="font-['DM_Mono'] text-[#C8CDD2] text-[11px] uppercase tracking-[0.22em] mb-6 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
            {page.heroEyebrow}
          </p>
        )}
        <h1 className="font-['Fraunces'] font-light text-display-xl tracking-tight text-balance text-white text-center max-w-[22ch] mx-auto [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
          {page?.heroTitle}
        </h1>
      </div>
    </section>
  );
};
