export function QuickFacts() {
  return (
    <section className="bg-[#1A1A1A] w-full text-white pt-16 pb-0 md:pt-24 border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-8 mb-8">
        <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
          02 — DOSSIER FACTS
        </h2>
      </div>
      <div className="w-full border-t border-white/20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-white/20">
          <Fact title="ALTITUDE" value="8,848.86 m" />
          <Fact title="REGION" value="Khumbu, Nepal" />
          <Fact title="DURATION" value="60–65 days" />
          <Fact title="SEASON" value="Spring, April–May" />
          <Fact title="EXPEDITION STYLE" value="Sherpa-led, oxygen-supported" />
          <Fact title="PRICING" value="By private consultation" />
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-8 py-4 border-t border-white/10">
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
          [CLIENT TO CONFIRM] — EACH DOSSIER FACT VALUE PENDING VERIFICATION.
        </span>
      </div>
    </section>
  );
}

function Fact({ title, value }: { title: string; value: string }) {
  return (
    <div className="px-6 py-8 md:px-8 md:py-10 flex flex-col justify-between h-full gap-4">
      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
        {title}
      </span>
      <span className="font-['Radley'] text-2xl lg:text-[28px] text-white font-light leading-snug">
        {value}
      </span>
    </div>
  );
}
