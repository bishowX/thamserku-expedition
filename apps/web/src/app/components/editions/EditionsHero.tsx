import { Nav } from "../Nav";
import heroImageFallback from "../../../assets/images/Copy_of_DSCF0876.jpg";
import type { SanityEditionFull } from "../../../lib/queries";
import { urlFor } from "../../../lib/sanity";

type PageData = {
  heroHeadline?: string;
  heroSubheading?: string;
  heroImage?: { asset: { _ref: string } } | null;
};

export function EditionsHero({
  editions,
  page,
}: {
  editions: SanityEditionFull[];
  page?: PageData;
}) {
  const bgSrc = page?.heroImage
    ? urlFor(page.heroImage).width(1920).url()
    : (heroImageFallback as string);

  return (
    <section className="relative w-full min-h-screen bg-[#1A1A1A] text-white flex flex-col justify-end pb-24 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{ backgroundImage: `url('${bgSrc}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/60 to-[#1A1A1A]" />
      </div>

      <Nav />

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end mt-48">
        {page?.heroHeadline && (
          <h1 className="font-['Radley'] font-light text-fluid-display tracking-tight leading-[1.1] mb-6 max-w-[18ch] text-white">
            {page.heroHeadline}
          </h1>
        )}

        {page?.heroSubheading && (
          <p className="font-['Lexend'] font-light text-[#C8CDD2] text-fluid-body max-w-[60ch] leading-relaxed mb-20">
            {page.heroSubheading}
          </p>
        )}
      </div>
    </section>
  );
}
