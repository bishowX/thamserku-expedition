import { MoveRight } from "lucide-react";

const editions = [
  {
    letter: "A",
    name: "Alpine Edition",
    sub: "The essential expedition",
    positioning: "The essential Thamserku expedition experience, run with disciplined professional support.",
    who: "FOR EXPERIENCED CLIMBERS SEEKING A DISCIPLINED, PROFESSIONALLY MANAGED EXPEDITION.",
  },
  {
    letter: "B",
    name: "Bespoke Edition",
    sub: "A more personal expedition",
    positioning: "A more personal expedition shaped around individual goals, schedule, and pace.",
    who: "FOR PRIVATE CLIMBERS, COUPLES, OR SMALL GROUPS SEEKING FLEXIBILITY AND CUSTOMIZATION.",
  },
  {
    letter: "C",
    name: "Crafted Edition",
    sub: "Service, comfort, storytelling",
    positioning: "An elevated expedition with deeper service, comfort, and documented storytelling.",
    who: "FOR HNW CLIENTS, EXECUTIVES, AND CLIMBERS WHO WANT TECHNICAL SERIOUSNESS WITH RICHER SERVICE.",
  },
  {
    letter: "D",
    name: "Definitive Edition",
    sub: "The most exclusive private expedition",
    positioning: "The most exclusive premium luxury Thamserku experience, designed around privacy and rare access.",
    who: "FOR UHNW INDIVIDUALS, PRIVATE FAMILIES, AND ELITE ADVENTURERS REQUIRING MAXIMUM PRIVACY.",
  },
  {
    letter: "E",
    name: "Explorer Edition",
    sub: "The Himalayas beyond the summit",
    positioning: "For those seeking the Himalayas beyond the summit — softer, slower, more cultural.",
    who: "FOR TRAVELLERS, FAMILIES, LEADERS, PHOTOGRAPHERS, AND CULTURAL EXPLORERS.",
  }
];

export function EditionsPreview() {
  return (
    <section id="editions" className="w-full bg-[#0A3A77] text-white py-32 px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start mb-12">
          <div className="md:w-1/4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              05 — EDITIONS
            </span>
          </div>
          <div className="md:w-1/2">
            <h2 className="font-['Radley'] font-light text-4xl md:text-5xl leading-[1.1] mb-6">
              Five lenses through which to read the same mountain.
            </h2>
          </div>
          <div className="md:w-1/4">
            <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.6]">
              From Alpine discipline to the Definitive private expedition, each edition is shaped around intent, privacy, and preparation.
            </p>
          </div>
        </div>

        <div className="flex flex-col border-b border-white/10">
          {editions.map((ed, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col md:flex-row border-t border-white/10 hover:bg-white/5 transition-colors duration-300 items-start md:items-center py-8 gap-8"
            >
              <div className="md:w-1/12 font-['Radley'] text-[64px] text-[#C8CDD2] font-light leading-none">
                {ed.letter}
              </div>
              
              <div className="md:w-3/12 flex flex-col gap-1">
                <h3 className="font-['Radley'] font-light text-[28px] leading-tight">
                  {ed.name}
                </h3>
                <span className="font-['Lexend'] font-light text-[13px] text-[#C8CDD2]">
                  {ed.sub}
                </span>
              </div>
              
              <div className="md:w-3/12">
                <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[14px] leading-relaxed">
                  "{ed.positioning}"
                </p>
              </div>
              
              <div className="md:w-3/12">
                <p className="font-['JetBrains_Mono'] uppercase tracking-[0.1em] text-[10px] text-[#C8CDD2] leading-relaxed max-w-[40ch]">
                  {ed.who}
                </p>
              </div>
              
              <div className="md:w-2/12 flex md:justify-end">
                <button className="flex items-center gap-2 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors border-b border-transparent hover:border-[#C8CDD2] pb-1">
                  Read Edition <MoveRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}