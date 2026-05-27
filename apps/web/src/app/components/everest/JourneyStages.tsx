import { urlFor } from "../../../lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

type Stage = { title: string; description: string; image?: { asset: { _ref: string } } | null };

type Props = {
  stages?: Stage[];
};

export function JourneyStages({ stages }: Props) {
  const items = stages ?? [];

  return (
 <section className="bg-[#1A1A1A] w-full text-white py-24 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col gap-12 md:gap-24">

        <div className="flex flex-col gap-8">
          <p className="font-['JetBrains_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            05 — THE JOURNEY
          </p>
          <h2 className="font-['Radley'] font-light text-[56px] leading-[1.1] text-white">
            {items.length} {items.length === 1 ? 'stage' : 'stages'}, read in sequence.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((stage, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            const imgSrc = stage.image ? urlFor(stage.image as SanityImageSource).width(640).url() : null;

            return (
              <div key={idx} className="flex flex-col gap-6">
                <div className="w-full aspect-[4/3] bg-[rgba(90,102,115,0.1)] border border-[rgba(90,102,115,0.3)] flex items-center justify-center overflow-hidden">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={stage.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#5A6673]">
                      [IMAGE]
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#2E353C]">
                    {num}
                  </span>
                  <h3 className="font-['Radley'] font-light text-[20px] leading-7 text-white">
                    {stage.title}
                  </h3>
                  <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
