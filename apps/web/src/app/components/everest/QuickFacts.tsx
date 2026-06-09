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
  const facts = [
    { title: "ALTITUDE", value: altitude || "—" },
    { title: "DIFFICULTY", value: difficulty || "—" },
    { title: "GROUP SIZE", value: groupSize || "—" },
    { title: "DURATION", value: duration || "—" },
    { title: "BASE CAMP", value: baseCamp || "—" },
    { title: "LEAD GUIDE", value: leadGuide || "—" },
  ];

  return (
    <section id="dossier-facts" className="bg-[#1A1A1A] w-full text-white border-b border-white/10 scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-8 pt-6 pb-4">
        <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
          02 — DOSSIER FACTS
        </h2>
      </div>
      <div className="w-full border-t border-white/20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-3 md:flex md:items-center md:h-[117px] md:divide-x md:divide-white/20">
          {facts.map((fact, i) => (
            <Fact
              key={fact.title}
              title={fact.title}
              value={fact.value}
              borderRight={i % 3 !== 2}
              borderBottom={i < 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Fact({
  title,
  value,
  borderRight,
  borderBottom,
}: {
  title: string;
  value: string;
  borderRight: boolean;
  borderBottom: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-center gap-[8px] px-4 py-4
        md:flex-1 md:gap-[10px] md:px-8 md:py-0 md:h-[76px] md:border-r-0 md:border-b-0
        ${borderRight ? "border-r border-white/20" : ""}
        ${borderBottom ? "border-b border-white/20" : ""}`}
    >
      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] md:text-[11px] text-[#C8CDD2] whitespace-nowrap">
        {title}
      </span>
      <span className="font-['Radley'] text-[22px] md:text-[28px] text-white font-normal leading-[1.375] whitespace-nowrap">
        {value}
      </span>
    </div>
  );
}
