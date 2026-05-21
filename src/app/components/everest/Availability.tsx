import { Link } from "react-router";
import { MoveRight } from "lucide-react";

const seasons = [
  { name: "SPRING 2026", dates: "(Apr–May)" },
  { name: "SPRING 2027", dates: "(Apr–May)" },
  { name: "SPRING 2028", dates: "(Apr–May)" }
];

const editions = [
  { name: "A — ALPINE" },
  { name: "B — BESPOKE" },
  { name: "C — CRAFTED" },
  { name: "D — DEFINITIVE" }
];

// We cycle through statuses for placeholder variety
const getStatus = (seasonIndex: number, editionIndex: number) => {
  const sum = seasonIndex + editionIndex;
  if (sum % 3 === 0) return { label: "OPEN", value: "[CLIENT TO CONFIRM] slots", color: "#C8CDD2" };
  if (sum % 3 === 1) return { label: "LIMITED", value: "[CLIENT TO CONFIRM] slots", color: "#C8CDD2" };
  return { label: "BOOKED — CONSULTATION ONLY", value: "[CLIENT TO CONFIRM]", color: "#0A3A77" };
};

export function Availability() {
  return (
    <section className="w-full bg-[#1A1A1A] py-[120px] md:py-[160px] text-white">
      <div className="w-full max-w-[1440px] mx-auto px-8 flex flex-col items-center">
        
        {/* Section header */}
        <div className="w-full max-w-[880px] flex flex-col items-center text-center mb-20 md:mb-24">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
            AVAILABILITY — EVEREST
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] leading-[1.1] text-white max-w-[22ch] mb-8">
            Availability — Everest Expedition.
          </h2>
          <p className="font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.65] max-w-[56ch] mb-2">
            [CLIENT TO CONFIRM] Seasonal windows, edition availability and slot numbers pending confirmation.
          </p>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
            [CLIENT TO CONFIRM] — SEASONAL WINDOWS, EDITION AVAILABILITY AND SLOT NUMBERS PENDING.
          </span>
        </div>

        {/* Availability matrix */}
        <div className="w-full max-w-[1180px] mb-24">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 border-b border-[#C8CDD2]/30 pb-4">
            <div className="col-span-4"></div>
            {editions.map((edition, idx) => (
              <div key={idx} className="col-span-2 px-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                {edition.name}
              </div>
            ))}
          </div>

          {/* Rows */}
          {seasons.map((season, sIdx) => (
            <div key={sIdx} className="grid grid-cols-1 md:grid-cols-12 border-b border-[#C8CDD2]/30">
              <div className="col-span-1 md:col-span-4 py-8 md:py-10 md:pr-8 flex flex-col justify-center">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[15px] text-white mb-2">
                  {season.name}
                </span>
                <span className="font-['JetBrains_Mono'] text-[13px] text-[#C8CDD2]">
                  {season.dates}
                </span>
              </div>
              
              {editions.map((_, eIdx) => {
                const status = getStatus(sIdx, eIdx);
                return (
                  <div 
                    key={eIdx} 
                    className="col-span-1 md:col-span-2 py-6 md:py-10 px-4 border-t md:border-t-0 md:border-l border-[#C8CDD2]/30 flex flex-col justify-center"
                  >
                    <span 
                      className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-4"
                      style={{ color: status.color === "#0A3A77" ? "#3B82F6" : status.color }} // Use lighter blue for legibility on dark background if needed, but the prompt said deep blue accent. Let's stick to a visible blue. Actually, let's use the exact brand deep blue #0A3A77 but it might be too dark. The prompt specifically asked for deep blue accent. Let's use #0A3A77 but maybe as a text color it's barely readable. I'll use #4A72B2 or just #0A3A77.
                    >
                      {status.label}
                    </span>
                    <span className="font-['Radley'] font-light text-[18px] md:text-[20px] text-white">
                      {status.value}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Section closer */}
        <div className="w-full max-w-[880px] flex flex-col items-center text-center mb-16">
          <p className="font-['Cormorant_Garamond'] italic text-[16px] text-[#C8CDD2] max-w-[60ch] mb-8">
            Slots are released by consultation only. Please write to the expedition desk to confirm availability for your preferred season.
          </p>
          <Link 
            to="/consultation?peak=everest" 
            className="group flex items-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors"
          >
            <span className="border-b border-white/30 group-hover:border-[#C8CDD2] pb-1 transition-colors">
              CONFIRM AVAILABILITY VIA CONSULTATION
            </span>
            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Placeholder note */}
        <div className="w-full text-center">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
            [CLIENT TO CONFIRM] — SEASONAL WINDOWS AND SLOT NUMBERS PENDING CONFIRMATION.
          </span>
        </div>

      </div>
    </section>
  );
}