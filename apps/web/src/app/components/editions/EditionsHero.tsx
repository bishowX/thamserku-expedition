import { Nav } from "../Nav";
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
  const bgSrc = page?.heroImage ? urlFor(page.heroImage).width(1920).url() : null;

  return (
 <section className="relative w-full min-h-screen bg-[#1A1A1A] text-white flex flex-col justify-end md:justify-center p-5 pb-16 md:p-12 xl:p-40 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {bgSrc && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
            style={{ backgroundImage: `url('${bgSrc}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/60 to-[#1A1A1A]" />
      </div>

      <Nav />

      <div className="relative z-20 w-full flex flex-col items-start md:items-center text-left md:text-center">
        {page?.heroHeadline && (
          <h1 className="font-['Fraunces'] font-light text-display-xl tracking-tight text-balance mb-6 max-w-[22ch] text-white">
            {page.heroHeadline}
          </h1>
        )}

        {page?.heroSubheading && (
          <p className="font-['DM_Sans'] font-light text-[#C8CDD2] text-body max-w-[60ch] leading-relaxed md:mb-20">
            {page.heroSubheading}
          </p>
        )}
      </div>
    </section>
  );
}
