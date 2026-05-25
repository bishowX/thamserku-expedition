import { urlFor } from "../../../lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

type Stage = { title: string; description: string; image?: { asset: { _ref: string } } | null };

type Props = {
  stages?: Stage[];
};

export function JourneyStages({ stages }: Props) {
  const items = stages ?? [];
  return (
    <section className="bg-[#1A1A1A] w-full text-white py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            05 — THE JOURNEY
          </h2>
          <h3 className="font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]">
            {items.length} {items.length === 1 ? 'stage' : 'stages'}, read in sequence.
          </h3>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {items.map((stage, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            const imgSrc = stage.image ? urlFor(stage.image as SanityImageSource).width(800).url() : null;
            return (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 border-b border-white/10 items-center">
                <div className="lg:col-span-2">
                  <span className="font-['Radley'] font-light text-[56px] lg:text-[80px] text-[#C8CDD2] leading-none block">
                    {num}
                  </span>
                </div>
                <div className="lg:col-span-6 flex flex-col gap-4 pr-8 lg:pr-16">
                  <h4 className="font-['Radley'] font-light text-[32px] text-white">{stage.title}</h4>
                  <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[16px] leading-[1.8] max-w-[50ch]">
                    {stage.description}
                  </p>
                </div>
                <div className="lg:col-span-4 mt-8 lg:mt-0">
                  <div className="w-full aspect-[4/3] overflow-hidden bg-[#2E353C]">
                    {imgSrc && (
                      <img src={imgSrc} alt={stage.title} className="w-full h-full object-cover grayscale-[20%] opacity-90" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
