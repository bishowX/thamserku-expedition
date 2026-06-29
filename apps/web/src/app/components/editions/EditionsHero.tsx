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
 <section className="relative w-full min-h-screen bg-[#1A1A1A] text-white flex flex-col justify-end md:justify-center p-5 pb-16 md:p-12 xl:px-24 xl:pb-24 xl:pt-12 overflow-hidden">
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
          <h1 className="font-['Fraunces'] font-light text-display-xl tracking-tight text-balance mb-6 max-w-[22ch] text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
            {page.heroHeadline}
          </h1>
        )}

        {page?.heroSubheading && (
          <p className="font-['DM_Sans'] font-light text-[#C8CDD2] text-body-lg max-w-[60ch] md:mb-20 whitespace-pre-line [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
            {page.heroSubheading}
          </p>
        )}
      </div>
    </section>
  );
}
