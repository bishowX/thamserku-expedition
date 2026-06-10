import type { AchievementsPageData } from "../../../lib/queries";
import { urlFor } from "../../../lib/sanity";

type PageData = AchievementsPageData['achievementsPage'];

export function AchievementsHero({ page }: { page?: PageData }) {
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

      <div className="relative z-10 flex flex-grow flex-col items-center justify-center section-padding">
        <div className="flex w-full max-w-[1138px] flex-col items-center gap-[30px]">
          <h1 className="font-['Cormorant_Garamond'] font-light text-fluid-heading leading-[1.1] tracking-tight text-center text-white">
            {page?.heroHeadline ?? 'A history written in altitude.'}
          </h1>
          <p className="font-['Lexend'] font-light text-[18px] leading-[1.55] text-center text-[#C8CDD2] max-w-[705px]">
            {page?.heroSubheading ??
              'A structured record of the Himalayan expeditions our house has been part of — across nearly four decades of seasons, summits, and quiet days on the mountain.'}
          </p>
        </div>
      </div>
    </section>
  );
}
