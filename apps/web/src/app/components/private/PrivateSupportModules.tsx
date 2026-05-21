
const MODULES = [
  {
    numeral: "I.",
    eyebrow: "MODULE I — DISCRETION",
    title: "Privacy as a standard, not a feature.",
    body: "Names, photographs, expedition details, and field communications are protected by default. Public attribution is by your written invitation only. Many of our private expeditions remain entirely private — across years, seasons, and the public archive.",
    practice: "In practice: no expedition is published without written permission. No images are shared without written permission. Staff discretion is contracted, not implied."
  },
  {
    numeral: "II.",
    eyebrow: "MODULE II — DEDICATED SUPPORT",
    title: "A senior advisor, from first letter to descent.",
    body: "Every private expedition is assigned a senior advisor as the single point of contact for the duration of the engagement. From the first private conversation, through planning, expedition, and aftercare — the advisor remains constant.",
    practice: "In practice: no shared inboxes. No junior gatekeepers. Direct line to senior expedition staff at every stage."
  },
  {
    numeral: "III.",
    eyebrow: "MODULE III — PRIVATE PLANNING",
    title: "Designed quietly, end-to-end.",
    body: "Logistics, route preparation, communications, hospitality, and aftercare are all designed in private for your expedition. Permits, transport, supply chains, and field movement are shaped specifically — nothing is templated, nothing is shared.",
    practice: "In practice: a tailored proposal, written for your expedition only. A planning document that does not live in any shared system."
  },
  {
    numeral: "IV.",
    eyebrow: "MODULE IV — CONTINUITY",
    title: "The same hands, season after season.",
    body: "Sherpa leadership, medical advisor, expedition director, and senior operations staff remain involved across private expeditions. If you climb with us a second time, you climb with the same team. Continuity is the deepest layer of safety we offer.",
    practice: "In practice: by the second expedition, our senior staff know your rhythm, your preferences, your medical considerations, and your way of climbing."
  },
  {
    numeral: "V.",
    eyebrow: "MODULE V — AFTERCARE",
    title: "The expedition does not end at the summit.",
    body: "Descent, debrief, transit, and post-expedition continuity are part of every private expedition by default. Documentation of the climb — written, photographic, archival — is prepared only with your consent. Recovery and quiet follow-up are part of how the engagement closes.",
    practice: "In practice: we follow up. We hold the documentation privately until you tell us otherwise. We are available when you are ready to plan the next one."
  }
];

export const PrivateSupportModules = () => {
  return (
    <section className="relative w-full bg-[#1A1A1A] py-[140px] md:py-[180px] px-8 overflow-hidden">
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

      <div className="relative z-10 max-w-[1320px] mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            PRIVATE SUPPORT — § IV
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6">
            Five quiet systems, working at all times.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]">
            Built around the climber. Held by senior staff.
          </p>
        </div>

        {/* Five support modules */}
        <div className="w-full flex flex-col border-t border-[#C8CDD2]/30">
          {MODULES.map((mod, idx) => (
            <div 
              key={idx} 
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 py-[60px] md:py-[80px] border-b border-[#C8CDD2]/30"
            >
              {/* Left 3 cols */}
              <div className="md:col-span-3 flex flex-col items-start pr-8">
                <span className="font-['JetBrains_Mono'] font-light text-[32px] text-[#C8CDD2] mb-4">
                  {mod.numeral}
                </span>
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                  {mod.eyebrow}
                </span>
              </div>

              {/* Centre 6 cols */}
              <div className="md:col-span-6 flex flex-col items-start pr-0 md:pr-12">
                <h3 className="font-['Radley'] font-light text-[32px] md:text-[40px] text-white leading-[1.1] max-w-[18ch] mb-6">
                  {mod.title}
                </h3>
                <p className="font-['Lexend'] font-light text-[15.5px] text-[#C8CDD2] leading-[1.7] max-w-[56ch]">
                  {mod.body}
                </p>
              </div>

              {/* Right 3 cols */}
              <div className="md:col-span-3 flex flex-col items-start pt-2 md:pt-4">
                <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[18px] leading-[1.45] max-w-[28ch]">
                  {mod.practice}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};