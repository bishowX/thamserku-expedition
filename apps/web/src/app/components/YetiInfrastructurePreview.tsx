import { Link } from "react-router";
import { MoveRight } from "lucide-react";
import type { SanityYetiPillar } from "../../lib/queries";

type YetiData = {
  infrastructureEyebrow?: string;
  infrastructureHeading?: string;
  infrastructureIntro?: string;
  infrastructurePillars?: SanityYetiPillar[];
};

const FALLBACK_PILLARS = [
  {
    eyebrow: "PILLAR I — AIR SUPPORT",
    title: "Helicopter coordination and aerial logistics.",
    desc: "Helicopter access, rescue support, and aerial logistics coordinated through the Yeti Group's aviation network — among the most experienced in the Nepal Himalaya.",
  },
  {
    eyebrow: "PILLAR II — MOUNTAIN LODGES",
    title: "Rest, recovery, and continuity at altitude.",
    desc: "Operational lodges and rest points along approach routes, allowing acclimatisation rhythm and recovery without compromising on standards or privacy.",
  },
  {
    eyebrow: "PILLAR III — REGIONAL ACCESS",
    title: "Permits, regions, and quiet passage.",
    desc: "Continuous regional presence across Khumbu, Manaslu, Dhaulagiri, Mahalangur, and Annapurna — backed by decades of permits, partnerships, and quiet field relationships.",
  },
  {
    eyebrow: "PILLAR IV — FIELD CONTINUITY",
    title: "Multi-generational, on the ground.",
    desc: "A multi-generational field team supported by Kathmandu-based operations, allowing the same standards of care from first letter to descent.",
  },
];

export function YetiInfrastructurePreview({ data }: { data?: YetiData }) {
  const eyebrow =
    data?.infrastructureEyebrow ?? "SECTION III — YETI INFRASTRUCTURE";
  const heading =
    data?.infrastructureHeading ??
    "An operating foundation behind every expedition.";
  const intro =
    data?.infrastructureIntro ??
    "Thamserku draws on the Yeti Infrastructure: air support, mountain lodges, regional access and field continuity that quietly support every expedition we run.";
  const pillars = data?.infrastructurePillars
    ? data.infrastructurePillars.map((p) => ({
        eyebrow: `PILLAR ${p.number} — ${p.name.toUpperCase()}`,
        title: p.subtitle,
        desc: p.body,
      }))
    : FALLBACK_PILLARS;

  return (
    <section className="relative w-full bg-[#1A1A1A] py-[80px] overflow-hidden text-white">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #202121 1px, transparent 1px), linear-gradient(to bottom, #202121 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24 md:mb-32">
          <div className="md:col-span-5 flex flex-col">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
              {eyebrow}
            </span>
            <h2 className="font-['Radley'] font-light text-fluid-section leading-[1.05] text-white max-w-[18ch]">
              {heading}
            </h2>
          </div>

          <div className="md:col-span-7 flex flex-col md:pt-12">
            <p className="font-['Lexend'] font-light text-fluid-body text-[#C8CDD2] leading-[1.65] max-w-[56ch]">
              {intro}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-16">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-[#24282c59] border-t border-r last:border-r-0 border-b lg:border-b-0 border-[#c8cdd24d] p-8"
            >
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-12">
                {pillar.eyebrow}
              </span>
              <h3 className="font-['Radley'] font-light text-fluid-md leading-[1.3] text-white mb-6">
                {pillar.title}
              </h3>
              <p className="font-['Lexend'] font-light text-fluid-body text-[#C8CDD2] leading-[1.65]">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full mx-auto flex justify-end">
          <Link
            to="/yeti-infrastructure"
            className="group flex items-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors"
          >
            <span className="border-b border-white/30 group-hover:border-[#C8CDD2] pb-1 transition-colors">
              READ THE FULL YETI INFRASTRUCTURE PAGE
            </span>
            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
