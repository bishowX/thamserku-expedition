import type { SanitySherpa } from '../../../lib/queries';

type SanitySherpaSupertype = SanitySherpa & { _id: string; role?: string; expertise?: string; languages?: string };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function TeamField({ sherpas: _sherpas }: { sherpas?: SanitySherpaSupertype[] }) {
  const fieldTeam = [
    { role: "CLIMBING SHERPA", name: "[Placeholder Name]", region: "Khumbu", years: "14", mountains: "11", philosophy: "A camp runs on rhythm, not hurry." },
    { role: "BASE CAMP MANAGER", name: "[Placeholder Name]", region: "Khumbu", years: "20", mountains: "8", philosophy: "Logistics is invisible when it is done well." },
    { role: "KITCHEN TEAM", name: "[Placeholder Name]", region: "Solukhumbu", years: "22", mountains: "18", philosophy: "The food on a long expedition is half of the route." },
    { role: "CLIMBING SHERPA", name: "[Placeholder Name]", region: "Mahalangur", years: "18", mountains: "14", philosophy: "We climb with the mountain, not against it." },
    { role: "LOGISTICS COORDINATOR", name: "[Placeholder Name]", region: "Kathmandu", years: "15", mountains: "0", philosophy: "A summit begins in the warehouse." },
    { role: "SUPPORT TEAM", name: "[Placeholder Name]", region: "Solukhumbu", years: "10", mountains: "5", philosophy: "You carry less when the team carries together." },
    { role: "CLIMBING SHERPA", name: "[Placeholder Name]", region: "Manaslu", years: "8", mountains: "6", philosophy: "Silence at high camps means everyone knows their job." },
    { role: "KITCHEN TEAM", name: "[Placeholder Name]", region: "Kathmandu", years: "10", mountains: "12", philosophy: "Warm tea is the first medicine of the morning." },
    { role: "BASE CAMP MANAGER", name: "[Placeholder Name]", region: "Manaslu", years: "12", mountains: "9", philosophy: "A quiet camp is a well-run camp." },
    { role: "CLIMBING SHERPA", name: "[Placeholder Name]", region: "Dhaulagiri", years: "16", mountains: "12", philosophy: "The fixed line is only as strong as the one who sets it." },
    { role: "SUPPORT TEAM", name: "[Placeholder Name]", region: "Khumbu", years: "7", mountains: "4", philosophy: "Speed comes from knowing the path, not from rushing." },
    { role: "LOGISTICS COORDINATOR", name: "[Placeholder Name]", region: "Kathmandu", years: "9", mountains: "0", philosophy: "Anticipate the weather, don't just react to it." },
  ];

  return (
 <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] section-padding">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Header */}
        <div className="flex flex-col gap-6">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] block">
            04 — THE FIELD TEAM
          </span>
          <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[56px] leading-tight text-[#1A1A1A] max-w-[22ch]">
            The wider team that holds the season.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[20px] text-[#5A6673] max-w-[56ch] mt-4">
            *Climbing Sherpas, base camp managers, kitchen team, logistics coordinators, and support staff — multi-generational, Nepal-based, and trained over years rather than seasons.*
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {fieldTeam.map((member, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              
              <div className="w-full aspect-square bg-gray-200 overflow-hidden grayscale-[0.6] sepia-[0.2]" />
              
              <div className="flex flex-col">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  {member.role}
                </span>
                
                <h3 className="font-['Cormorant_Garamond'] text-[22px] text-[#1A1A1A] mb-6 flex items-center gap-3">
                  {member.name}
                  <span className="text-[9px] text-[#5A6673] tracking-widest uppercase font-['JetBrains_Mono'] border border-[#5A6673]/30 px-1.5 py-[2px] inline-block">PLACEHOLDER</span>
                </h3>
                
                <div className="flex flex-col border-y border-[#1A1A1A]/10 divide-y divide-[#1A1A1A]/10 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                  <div className="py-3">
                    REGION · {member.region}
                  </div>
                  <div className="py-3">
                    YEARS · {member.years} <span className="mx-2 font-light">·</span> MOUNTAINS · {member.mountains}
                  </div>
                </div>

                <p className="font-['Cormorant_Garamond'] italic text-[16px] text-[#5A6673] max-w-[28ch] mt-6">
                  "{member.philosophy}"
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 border-t border-[#1A1A1A]/10 pt-8">
          <p className="font-['Cormorant_Garamond'] italic text-[16px] text-[#5A6673] max-w-[60ch]">
            Note · This grid shows a representative sample of our field team. The full team for your expedition is selected and named in your private proposal.
          </p>
        </div>

      </div>
    </section>
  );
}
