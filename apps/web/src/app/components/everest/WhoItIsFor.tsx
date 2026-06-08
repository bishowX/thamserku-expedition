type AudienceTile = { label: string; subline?: string; description: string };

type Props = {
  whoItIsForHeadline?: string;
  audienceTiles?: AudienceTile[];
};

export function WhoItIsFor({ whoItIsForHeadline, audienceTiles }: Props) {
  const tiles = audienceTiles ?? [];

  return (
    <section id="why-this-expedition" className="bg-white w-full text-[#1A1A1A] py-16 md:py-24 px-5 md:px-8 scroll-mt-28">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-6 md:gap-8">
          <span className="font-['JetBrains_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            04 — Why This Expedition
          </span>
          {whoItIsForHeadline && (
            <h2 className="font-['Radley'] text-[32px] md:text-[44px] lg:text-[48px] leading-[1.15] text-[#1A1A1A]">
              {whoItIsForHeadline}
            </h2>
          )}
        </div>

        {tiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-16 border-t border-[rgba(26,26,26,0.1)] pt-12 md:pt-16">
            {tiles.map((tile, idx) => (
              <div key={idx} className="flex flex-col gap-5 md:gap-6">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] leading-[1.5] text-[#5A6673]">
                  {tile.label}
                </span>
                <p className="font-['Radley'] italic text-[22px] md:text-[24px] leading-[1.3] text-[#1A1A1A]">
                  {tile.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
