import { Nav } from "../Nav";
import type { LegacyPageData } from "../../../lib/queries";

type PageData = LegacyPageData['legacyPage'];

export function LegacyHero({ page }: { page?: PageData }) {
  return (
    <section className="relative w-full min-h-screen bg-[#1A1A1A] text-white flex flex-col overflow-hidden">
      {/* Faint cartographic grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: '96px 96px',
        }}
      />

      <Nav />

      <div className="relative z-10 flex flex-grow flex-col items-center justify-center section-padding">
        <div className="flex w-full max-w-[1138px] flex-col items-center gap-[30px]">
          <h1 className="font-['Radley'] font-light text-fluid-heading leading-[1.1] tracking-tight text-center text-white">
            {page?.heroHeadline ?? 'Born in the high Himalaya. Built for the hard way up.'}
          </h1>
          <p className="font-['Lexend'] font-light text-[18px] leading-[1.55] text-center text-[#C8CDD2] max-w-[705px]">
            {page?.heroSubheading ??
              "From its first years in Kathmandu to landmark ascents across Nepal, Thamserku's story is written in altitude, speed, risk, judgement, and the teams who kept moving when the route got serious."}
          </p>
        </div>
      </div>
    </section>
  );
}
