import { Nav } from "../Nav";
import { urlFor } from "../../../lib/sanity";

type PageData = { heroHeadline?: string; heroSubline?: string; heroImage?: { asset: { _ref: string } } | null };

export function TeamHero({ page }: { page?: PageData }) {
  const bgSrc = page?.heroImage ? urlFor(page.heroImage).width(1920).url() : null;

  return (
 <section className="relative w-full h-screen min-h-[800px] bg-[#1A1A1A] text-white flex flex-col justify-end py-24 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {bgSrc && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 grayscale-[0.5] sepia-[0.2]"
            style={{ backgroundImage: `url('${bgSrc}')` }}
          />
        )}
        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A1A1A]" />
      </div>

      <Nav />

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end mt-48 h-full">
        {/* Eyebrow */}
        
        <h1 className="font-['Cormorant_Garamond'] font-light text-fluid-heading tracking-tight leading-[1.1] mb-6 max-w-[22ch] text-white">
          {page?.heroHeadline ?? 'The people who know the mountain.'}
        </h1>

        <p className="font-['Inter'] font-light text-[#C8CDD2] text-fluid-body leading-relaxed max-w-[60ch] mb-20">
          {page?.heroSubline ?? 'Every Thamserku expedition is led by people whose judgement was earned over decades of Himalayan seasons — not over training programmes. Read the team that will guide your journey.'}
        </p>
      </div>
    </section>
  );
}
