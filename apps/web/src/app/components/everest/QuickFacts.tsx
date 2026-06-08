type Props = {
  altitude?: string;
  difficulty?: string;
  groupSize?: string;
  duration?: string;
  baseCamp?: string;
  leadGuide?: string;
};

export function QuickFacts({
  altitude,
  difficulty,
  groupSize,
  duration,
  baseCamp,
  leadGuide,
}: Props) {
  return (
    <section id="dossier-facts" className="bg-[#1A1A1A] w-full text-white border-b border-white/10 scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-8 pt-6 pb-4">
        <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
          02 — DOSSIER FACTS
        </h2>
      </div>
      <div className="w-full border-t border-white/20">
        <div className="max-w-[1440px] mx-auto flex items-center h-[117px] divide-x divide-white/20">
          <Fact title="ALTITUDE" value={altitude || "—"} />
          <Fact title="DIFFICULTY" value={difficulty || "—"} />
          <Fact title="GROUP SIZE" value={groupSize || "—"} />
          <Fact title="DURATION" value={duration || "—"} />
          <Fact title="BASE CAMP" value={baseCamp || "—"} />
          <Fact title="LEAD GUIDE" value={leadGuide || "—"} />
        </div>
      </div>
    </section>
  );
}

function Fact({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex-1 flex flex-col justify-center gap-[10px] px-8 h-[76px]">
      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] whitespace-nowrap">
        {title}
      </span>
      <span className="font-['Radley'] text-[28px] text-white font-normal leading-[1.375] whitespace-nowrap">
        {value}
      </span>
    </div>
  );
}
