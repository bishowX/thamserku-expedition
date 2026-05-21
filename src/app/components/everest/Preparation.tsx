export function Preparation() {
  return (
    <section className="bg-[#1A1A1A] w-full text-white py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col gap-24">
        
        {/* Header */}
        <div className="flex flex-col gap-8">
          <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            09 — PREPARATION
          </h2>
          <h3 className="font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]">
            What an Everest year actually asks of you.
          </h3>
        </div>

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-16">
          <PrepColumn
            title="Body"
            items={[
              "Aerobic base",
              "Strength endurance",
              "6,000m + 7,000m altitude history",
              "Carrying load practice"
            ]}
          />
          <PrepColumn
            title="Time"
            items={[
              "12+ months training runway",
              "60–65 days expedition window",
              "Pre-departure call sequence"
            ]}
          />
          <PrepColumn
            title="Mind"
            items={[
              "Acceptance of weather authority",
              "Patience for rotation",
              "Willingness to turn back",
              "Discipline at altitude"
            ]}
          />
        </div>

      </div>
    </section>
  );
}

function PrepColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-8">
      <h4 className="font-['Radley'] font-light text-[32px] text-white">
        {title}
      </h4>
      <div className="flex flex-col">
        {items.map((item, idx) => (
          <div key={idx} className="py-4 border-t border-white/10 last:border-b font-['Lexend'] font-light text-[#C8CDD2] text-[15px]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
