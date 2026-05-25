type Edition = { letter: string; name: string; subtitle: string; positioning: string; targetAudience: string };

type Props = {
  editions?: Edition[];
};

export function ExpeditionEditions({ editions }: Props) {
  const items = editions ?? [];
  return (
    <section className="bg-[#0A3A77] w-full text-white py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
            08 — EDITIONS
          </h2>
          <h3 className="font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]">
            {items.length === 1 ? 'One way to read this mountain.' : `${items.length > 1 ? `${items.length} ways` : 'Ways'} to read this mountain.`}
          </h3>
        </div>

        <div className="flex flex-col border-t border-white/20">
          {items.map((ed, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-12 py-12 border-b border-white/20 items-start md:items-center hover:bg-white/[0.02] transition-colors cursor-pointer group">
              <div className="md:w-1/12 flex items-center justify-center">
                <span className="font-['Radley'] font-light text-[80px] lg:text-[100px] leading-none text-[#C8CDD2] group-hover:text-white transition-colors">
                  {ed.letter}
                </span>
              </div>
              <div className="md:w-3/12 flex flex-col gap-2">
                <h3 className="font-['Radley'] font-light text-[28px] text-white">{ed.name}</h3>
                <span className="font-['Lexend'] font-light text-[13px] text-[#C8CDD2]">{ed.subtitle}</span>
              </div>
              <div className="md:w-4/12">
                <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[14px] leading-relaxed pr-8">
                  "{ed.positioning}"
                </p>
              </div>
              <div className="md:w-2/12 flex items-center">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2]">
                  {ed.targetAudience}
                </span>
              </div>
              <div className="md:w-2/12 flex justify-end">
                <span className="font-['Lexend'] font-light text-[13px] text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
                  Read Edition →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
