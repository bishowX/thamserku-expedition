import { Nav } from "../Nav";
import type { LegacyPageData } from "../../../lib/queries";
import { urlFor } from "../../../lib/sanity";

type PageData = LegacyPageData['legacyPage'];

export function LegacyHero({ page }: { page?: PageData }) {
  const bgSrc = page?.heroImage ? urlFor(page.heroImage).width(1920).url() : null;

  return (
    <section className="relative w-full min-h-screen bg-[#1A1A1A] text-white flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {bgSrc ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
              style={{ backgroundImage: `url('${bgSrc}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/60 to-[#1A1A1A]" />
          </>
        ) : (
          /* Faint cartographic grid fallback */
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #C8CDD2 1px, transparent 1px),
                linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
              `,
              backgroundSize: '96px 96px',
            }}
          />
        )}
      </div>

      <Nav />

      <div className="relative z-10 flex flex-grow flex-col items-start justify-end md:items-center md:justify-center section-padding pb-16 md:pb-24">
        <div className="flex w-full max-w-[1138px] flex-col items-start md:items-center gap-5 md:gap-[30px]">
          <h1 className="font-['Fraunces'] font-light text-display-xl tracking-tight text-balance text-left md:text-center text-white max-w-[30ch] mx-auto [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
            {page?.heroHeadline ?? 'Born in the high Himalaya. Built for the hard way up.'}
          </h1>
          <p className="font-['DM_Sans'] font-light text-body-lg text-left md:text-center text-[#C8CDD2] max-w-[705px] [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
            {page?.heroSubheading ??
              "From its first years in Kathmandu to landmark ascents across Nepal, Thamserku's story is written in altitude, speed, risk, judgement, and the teams who kept moving when the route got serious."}
          </p>
        </div>
      </div>
    </section>
  );
}
