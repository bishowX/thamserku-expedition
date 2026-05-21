import { Link } from "react-router";
import { MoveRight } from "lucide-react";

export function YetiInfrastructurePreview() {
  return (
    <section className="relative w-full bg-[#1A1A1A] py-[140px] md:py-[180px] overflow-hidden text-white">
      {/* Background cartographic grid overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 flex flex-col">
        {/* Section header row (top of section, two columns) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24 md:mb-32">
          {/* Left column (5 cols) */}
          <div className="md:col-span-5 flex flex-col">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
              SECTION III — YETI INFRASTRUCTURE
            </span>
            <h2 className="font-['Radley'] font-light text-5xl md:text-[56px] lg:text-[72px] leading-[1.05] text-white max-w-[18ch]">
              An operating foundation behind every expedition.
            </h2>
          </div>
          
          {/* Right column (7 cols) */}
          <div className="md:col-span-7 flex flex-col md:pt-12">
            <p className="font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.65] max-w-[56ch] mb-4">
              Thamserku draws on the Yeti Infrastructure: air support, mountain lodges, regional access and field continuity that quietly support every expedition we run.
            </p>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
              [CLIENT TO CONFIRM] — OPERATIONAL CLAIMS AND PARTNERSHIPS PENDING.
            </span>
          </div>
        </div>

        {/* Pillar grid (4-column horizontal grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-24">
          {[
            {
              eyebrow: "PILLAR I — AIR SUPPORT",
              title: "Helicopter coordination and aerial logistics.",
              desc: "Helicopter access, rescue support, and aerial logistics coordinated through the Yeti Group's aviation network — among the most experienced in the Nepal Himalaya."
            },
            {
              eyebrow: "PILLAR II — MOUNTAIN LODGES",
              title: "Rest, recovery, and continuity at altitude.",
              desc: "Operational lodges and rest points along approach routes, allowing acclimatisation rhythm and recovery without compromising on standards or privacy."
            },
            {
              eyebrow: "PILLAR III — REGIONAL ACCESS",
              title: "Permits, regions, and quiet passage.",
              desc: "Continuous regional presence across Khumbu, Manaslu, Dhaulagiri, Mahalangur, and Annapurna — backed by decades of permits, partnerships, and quiet field relationships."
            },
            {
              eyebrow: "PILLAR IV — FIELD CONTINUITY",
              title: "Multi-generational, on the ground.",
              desc: "A multi-generational field team supported by Kathmandu-based operations, allowing the same standards of care from first letter to descent."
            }
          ].map((pillar, idx) => (
            <div 
              key={idx} 
              className="flex flex-col bg-[#2E353C]/20 border-t border-r last:border-r-0 border-b lg:border-b-0 border-[#C8CDD2]/30 p-8 lg:p-10"
            >
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-12">
                {pillar.eyebrow}
              </span>
              <h3 className="font-['Radley'] font-light text-2xl lg:text-[28px] leading-[1.15] text-white mb-6">
                {pillar.title}
              </h3>
              <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Section closer */}
        <div className="w-full max-w-[880px] mx-auto flex justify-end">
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
