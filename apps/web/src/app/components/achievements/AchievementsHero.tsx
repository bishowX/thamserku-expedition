import { stegaClean } from "@sanity/client/stega";
import type { AchievementsPageData } from "../../../lib/queries";
import { urlFor } from "../../../lib/sanity";

type PageData = AchievementsPageData['achievementsPage'];

const DEFAULT_SUBHEADING =
  'A structured record of the Himalayan expeditions our house has been part of — across nearly four decades of seasons, summits, and quiet days on the mountain.';

export function AchievementsHero({ page }: { page?: PageData }) {
  const bgSrc = page?.heroImage ? urlFor(page.heroImage).width(1920).url() : null;
  const subheading = stegaClean(page?.heroSubheading ?? DEFAULT_SUBHEADING);

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

      <div className="relative z-10 flex flex-grow flex-col items-start justify-end md:items-center md:justify-center section-padding pb-16 md:pb-24">
        <div className="flex w-full max-w-[1138px] flex-col items-start md:items-center gap-5 md:gap-[30px]">
          <h1 className="font-['Fraunces'] font-light text-display-xl tracking-tight text-balance text-left md:text-center text-white max-w-[18ch] mx-auto [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
            {page?.heroHeadline ?? 'A history written in altitude.'}
          </h1>
          <p className="font-['DM_Sans'] font-light text-body-lg text-left md:text-center text-[#C8CDD2] max-w-[705px] whitespace-pre-line [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
            {subheading}
          </p>
        </div>
      </div>
    </section>
  );
}
