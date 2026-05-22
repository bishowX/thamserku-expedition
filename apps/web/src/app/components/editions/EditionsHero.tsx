import { Nav } from "../Nav";
import heroImage from "../../../assets/images/Copy_of_DSCF0876.jpg";
import type { SanityEditionFull } from "../../../lib/queries";

type PageData = {
  heroHeadline?: string;
  heroSubheading?: string;
};

export function EditionsHero({ editions, page }: { editions: SanityEditionFull[]; page?: PageData }) {
  return (
    <section className="relative w-full min-h-screen bg-[#1A1A1A] text-white flex flex-col justify-end pb-24 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/60 to-[#1A1A1A]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <Nav />

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end mt-48">
        {page?.heroHeadline && (
          <h1 className="font-['Radley'] font-light text-5xl md:text-[88px] lg:text-[104px] leading-[1.05] mb-8 max-w-[18ch] text-white tracking-tight">
            {page.heroHeadline}
          </h1>
        )}

        {page?.heroSubheading && (
          <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[64ch] mb-24 md:mb-32">
            {page.heroSubheading}
          </p>
        )}

        {editions.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-0 w-full border-l border-white/10">
            {editions.map((ed) => (
              <div key={ed._id} className="flex flex-col border-r border-b md:border-b-0 border-white/10 px-6 py-8">
                <span className="font-['Radley'] font-light text-7xl md:text-[140px] lg:text-[180px] leading-none text-[#C8CDD2] mb-4 md:mb-8">
                  {ed.letter}
                </span>
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white">
                  {ed.letter} — {ed.name.replace(' Edition', '').toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
