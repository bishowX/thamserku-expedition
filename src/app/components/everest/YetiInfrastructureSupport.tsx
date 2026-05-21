import { Link } from "react-router";
import { MoveRight } from "lucide-react";

export function YetiInfrastructureSupport() {
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

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-5 flex flex-col">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
              YETI INFRASTRUCTURE SUPPORT — EVEREST
            </span>
            <h2 className="font-['Radley'] font-light text-[56px] md:text-[72px] leading-[1.05] text-white max-w-[18ch]">
              "The infrastructure behind every Everest expedition."
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-col md:pt-16">
            <p className="font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.65] max-w-[56ch]">
              Every Thamserku Everest expedition is supported by the Yeti Group operating foundation — quietly, throughout the season. Air coordination, mountain lodges, regional permits, and field continuity work in the background so the climb in front of you receives our full attention.
            </p>
          </div>
        </div>

        {/* Pillar grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {/* Pillar 1 */}
          <div className="flex flex-col border-t border-[#C8CDD2]/30 bg-[#2A3036]/20 p-8 md:p-10">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
              AIR · EVEREST
            </span>
            <h3 className="font-['Radley'] font-light text-[22px] md:text-[28px] leading-[1.2] text-white mb-4">
              Helicopter coordination for the Khumbu.
            </h3>
            <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]">
              Helicopter access between Kathmandu, Lukla, and the Khumbu — coordinated through the Yeti Group's aviation network. Rescue and rotational support available when conditions require.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col border-t border-[#C8CDD2]/30 bg-[#2A3036]/20 p-8 md:p-10">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
              LODGES · KHUMBU APPROACH
            </span>
            <h3 className="font-['Radley'] font-light text-[22px] md:text-[28px] leading-[1.2] text-white mb-4">
              Rest and acclimatisation, considered.
            </h3>
            <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]">
              Yeti Group lodges along the Khumbu approach — Lukla, Namche, Tengboche, Dingboche — used for considered acclimatisation rhythm and recovery before Base Camp.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="flex flex-col border-t border-[#C8CDD2]/30 bg-[#2A3036]/20 p-8 md:p-10">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
              PERMITS & ACCESS
            </span>
            <h3 className="font-['Radley'] font-light text-[22px] md:text-[28px] leading-[1.2] text-white mb-4">
              Decades of regional presence.
            </h3>
            <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]">
              Continuous regional presence in the Khumbu and Solukhumbu — backed by decades of permits, partnerships, and quiet field relationships.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="flex flex-col border-t border-[#C8CDD2]/30 bg-[#2A3036]/20 p-8 md:p-10">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
              FIELD CONTINUITY
            </span>
            <h3 className="font-['Radley'] font-light text-[22px] md:text-[28px] leading-[1.2] text-white mb-4">
              Kathmandu to Base Camp, unbroken.
            </h3>
            <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]">
              A multi-generational field team coordinated from Kathmandu, supporting the same standards of care from first letter to descent — across every Everest season we run.
            </p>
          </div>
        </div>

        {/* Section closer */}
        <div className="flex justify-end mb-16">
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

        {/* Placeholder note */}
        <div className="w-full">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
            [CLIENT TO CONFIRM] — OPERATIONAL CLAIMS AND PARTNERSHIPS TO BE VERIFIED BEFORE PUBLICATION.
          </span>
        </div>
      </div>
    </section>
  );
}