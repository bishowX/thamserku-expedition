import { ChevronDown, MoveRight } from "lucide-react";

export function AtlasControls() {
  return (
    <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] sticky top-0 z-30 border-b border-[#1A1A1A]/10">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex justify-between items-center py-6">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            02 — ATLAS CONTROLS
          </span>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] hidden md:block">
            5 EXPEDITIONS · INDEXED BY THE THAMSERKU DESK
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A]/10 border-t border-[#1A1A1A]/10">
          {[
            { label: "MOUNTAIN", value: "All" },
            { label: "ALTITUDE", value: "All" },
            { label: "REGION", value: "All" },
            { label: "SEASON", value: "All" },
            { label: "TECHNICAL LEVEL", value: "All" },
            { label: "EDITION", value: "All" }
          ].map((filter, i) => (
            <div key={i} className={`py-4 ${i === 0 ? "md:pr-6" : "md:px-6"}`}>
              <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-1">
                {filter.label}
              </div>
              <button className="font-['Lexend'] font-light text-[14px] flex items-center gap-2 border-b border-[#1A1A1A]/30 pb-0.5 hover:border-[#1A1A1A] transition-colors group">
                {filter.value} <ChevronDown className="w-3 h-3 text-[#5A6673] group-hover:text-[#1A1A1A]" />
              </button>
            </div>
          ))}
        </div>

        <div className="py-4 border-t border-[#1A1A1A]/10 flex justify-end">
          <button className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] hover:text-[#1A1A1A] transition-colors flex items-center gap-2">
            Reset Atlas <MoveRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
}