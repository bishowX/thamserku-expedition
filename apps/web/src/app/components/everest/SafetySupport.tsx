type SafetyModule = { label: string; title: string; description: string };

type Props = {
  safetySupportHeadline?: string;
  safetyModules?: SafetyModule[] | null;
};

const FALLBACK_MODULES: SafetyModule[] = [
  {
    label: "SHERPA LEADERSHIP",
    title: "Sherpa Leadership",
    description: "Lead climbing Sherpas with documented 8,000m experience. Every expedition is built around their judgement."
  },
  {
    label: "OXYGEN STRATEGY",
    title: "Oxygen Strategy",
    description: "A planned oxygen flow rate per altitude band. Personal masks, redundant regulators, and contingency cylinders staged across high camps."
  },
  {
    label: "MEDICAL PLANNING",
    title: "Medical Planning",
    description: "Expedition doctor on call, medical kits at each camp, hyperbaric chamber at Base Camp, evacuation protocols mapped before departure."
  },
  {
    label: "COMMUNICATION",
    title: "Communication",
    description: "Satellite communication, daily check-ins, weather reporting, and a 24/7 channel between Base Camp and Kathmandu operations."
  },
  {
    label: "WEATHER FORECASTING",
    title: "Weather Forecasting",
    description: "Specialist Himalayan weather service, multi-source modelling, and a conservative bias toward standing down rather than pushing on."
  },
  {
    label: "ACCLIMATISATION",
    title: "Acclimatisation",
    description: "Disciplined rotation schedule, no rushed altitude gain, and a willingness to abandon a window if the body is not yet ready."
  }
];

export function SafetySupport({ safetySupportHeadline, safetyModules }: Props) {
  const modules = safetyModules ?? FALLBACK_MODULES;

  return (
    <section className="bg-[#FFFFFF] w-full text-[#1A1A1A] py-24">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            07 — SAFETY & SUPPORT
          </h2>
          <h3 className="font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]">
            {safetySupportHeadline || "Six quiet systems, working at all times."}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 border-t border-[#1A1A1A]/10 pt-16">
          {modules.map((mod, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                {mod.label}
              </span>
              <h4 className="font-['Radley'] font-light text-[24px] text-[#1A1A1A] leading-[1.3]">
                {mod.title}
              </h4>
              <p className="font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-[1.6]">
                {mod.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
