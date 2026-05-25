type AudienceTile = { label: string; subline: string; description: string };

type Props = {
  whoItIsForHeadline?: string;
  audienceTiles?: AudienceTile[];
};

export function WhoItIsFor({ whoItIsForHeadline, audienceTiles }: Props) {
  const tiles = audienceTiles ?? [];
  return (
    <section className="bg-[#FFFFFF] w-full text-[#1A1A1A] py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            04 — WHO IT IS FOR
          </h2>
          {whoItIsForHeadline && (
            <h3 className="font-['Radley'] font-light text-[40px] md:text-[52px] leading-[1.1] max-w-[32ch]">
              {whoItIsForHeadline}
            </h3>
          )}
        </div>

        {tiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 border-t border-[#1A1A1A]/10 pt-16">
            {tiles.map((tile, idx) => (
              <AudienceTileCard
                key={idx}
                label={`0${idx + 1} / ${tile.label}`}
                subline={tile.subline}
                description={tile.description}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AudienceTileCard({ label, subline, description }: { label: string; subline: string; description: string }) {
  return (
    <div className="flex flex-col gap-6">
      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
        {label}
      </span>
      <h4 className="font-['Radley'] font-light text-[24px] leading-[1.3] text-[#1A1A1A] italic">
        "{subline}"
      </h4>
      <p className="font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-[1.6]">
        {description}
      </p>
    </div>
  );
}
