
const REASONS = [
  {
    eyebrow: "REASON I — ALTITUDE",
    title: "Earned, not assumed.",
    desc: "Above 7,000m, the body does not respond to training the way it responds to sea-level conditioning. A 7,000m ascent is the only way to know how your body actually behaves at altitude — and how it recovers between rotations."
  },
  {
    eyebrow: "REASON II — JUDGEMENT",
    title: "Decisions in thin air.",
    desc: "At altitude, decision-making slows and the cost of every choice rises. A 7,000m peak is where climbers learn what their judgement looks like when oxygen is half of what they are used to. This is the most undertrained skill in expedition climbing."
  },
  {
    eyebrow: "REASON III — FIELD DISCIPLINE",
    title: "Multi-day rhythm.",
    desc: "An 8,000m expedition is run over weeks, not days. A 7,000m peak teaches how to keep your rhythm — eating, sleeping, recovering, communicating — across long field sequences. The habits you build here are the habits you will need above 7,500m."
  },
  {
    eyebrow: "REASON IV — TEAM CONTINUITY",
    title: "Climbing with Thamserku, twice.",
    desc: "A 7,000m ascent with Thamserku introduces you to your Sherpa team, our standards, and our way of reading the mountain — before the larger objective. By the time you arrive at Everest Base Camp, you have already climbed with the people who will lead you to the summit."
  }
];

export const PathwayWhyItMatters = () => {
  return (
    <section className="relative bg-[#1A1A1A] py-[140px] md:py-[180px] px-8 border-t border-[#C8CDD2]/10 overflow-hidden">
      {/* Faint cartographic grid overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #C8CDD2 1px, transparent 1px),
            linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            WHY IT MATTERS — § II
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch]">
            Four reasons a 7,000m peak is read first.
          </h2>
        </div>

        {/* Four-pillar grid */}
        <div className="w-full max-w-[1320px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS.map((reason, idx) => (
            <div 
              key={idx} 
              className="flex flex-col bg-[#2E353C]/30 border-t border-[#C8CDD2]/30 px-6 py-10"
            >
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
                {reason.eyebrow}
              </span>
              <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-[1.2] mb-6">
                {reason.title}
              </h3>
              <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};