import { urlFor } from '../../../lib/sanity';
import type { SanityImageSource } from '@sanity/image-url';
import type { SafetyPageData } from '../../../lib/queries';
import { PortableTextBody } from '../PortableTextBody';

type Props = { page: SafetyPageData['safetyPage'] };

export const SafetyFoundation = ({ page }: Props) => {
  const specs = page?.foundationSpecs ?? [];
  const imageSrc = page?.foundationBgImage
    ? urlFor(page.foundationBgImage as SanityImageSource).width(1920).url()
    : null;

  return (
    <section className="relative bg-[#2E353C] section-padding overflow-hidden">
      {imageSrc && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={imageSrc}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover opacity-10 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E353C] via-transparent to-[#2E353C] opacity-70" />
        </div>
      )}

      <div className="relative z-10 max-w-[1180px] mx-auto flex flex-col items-center gap-12 md:gap-24">
        <div className="flex flex-col items-center gap-6 md:gap-8 text-center">
          {page?.foundationEyebrow && (
            <span className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              {page.foundationEyebrow}
            </span>
          )}
          <h2 className="font-['Fraunces'] text-display-l text-white max-w-[20ch]">
            {page?.foundationHeading}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16 w-full">
          <div className="flex-1">
            {page?.foundationBody?.length ? (
              <PortableTextBody
                value={page.foundationBody}
                theme="dark"
                size="lg"
              />
            ) : null}
          </div>

          <div className="md:w-[613px] md:shrink-0 border-t border-white/20">
            {specs.map((spec, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-6 md:gap-8 py-5 md:py-6 border-b border-white/20"
              >
                <p className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#8F8F8F] leading-[1.5]">
                  {spec.label}
                </p>
                <p className="font-['Fraunces'] text-body text-white whitespace-nowrap">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
