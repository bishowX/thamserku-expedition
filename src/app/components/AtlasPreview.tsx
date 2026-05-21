import { MoveRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const expeditions = [
  {
    code: "EXP / 01 — EVR",
    name: "Everest",
    positioning: "The highest mountain on earth asks for more than strength. It asks for patience, judgement, and respect.",
    altitude: "8,848.86 m",
    region: "Khumbu, Nepal",
    season: "Spring",
    style: "Disciplined passage",
    editions: "Alpine · Bespoke · Crafted · Definitive",
    cols: 6,
    image: "https://images.unsplash.com/photo-1765207142247-d505b2ffc2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNb3VudCUyMEV2ZXJlc3QlMjBzdW1taXQlMjBtb29keSUyMGRhcmt8ZW58MXx8fHwxNzc3NDQ2MzA3fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    code: "EXP / 02 — MAN",
    name: "Manaslu",
    positioning: "A powerful 8,000m expedition for climbers seeking scale, beauty, and progression.",
    altitude: "8,163 m",
    region: "Gorkha, Nepal",
    season: "Autumn",
    style: "Progression climb",
    editions: "Alpine · Bespoke · Crafted",
    cols: 3,
    image: "https://images.unsplash.com/photo-1650221293568-82a9823d938a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYW5hc2x1JTIwbW91bnRhaW4lMjBzbm93JTIwcGVhayUyMGRhcmt8ZW58MXx8fHwxNzc3NDQ2MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    code: "EXP / 03 — DHA",
    name: "Dhaulagiri",
    positioning: "Remote, immense, and uncompromising — a mountain for solitude and strength.",
    altitude: "8,167 m",
    region: "Dhaulagiri, Nepal",
    season: "Spring",
    style: "Solitude climb",
    editions: "Bespoke · Crafted · Definitive",
    cols: 3,
    image: "https://images.unsplash.com/photo-1755015347269-c3969c4a0ae7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEaGF1bGFnaXJpJTIwbW91bnRhaW4lMjByYW5nZSUyMGRhcmt8ZW58MXx8fHwxNzc3NDQ2MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    code: "EXP / 04 — MAK",
    name: "Makalu",
    positioning: "A striking Himalayan giant for experienced climbers seeking technical elegance and isolation.",
    altitude: "8,485 m",
    region: "Mahalangur, Nepal",
    season: "Spring",
    style: "Technical climb",
    editions: "Bespoke · Crafted · Definitive",
    cols: 3,
    image: "https://images.unsplash.com/photo-1745677617575-62b14956f2d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWthbHUlMjBtb3VudGFpbiUyMHBlYWslMjBkcmFtYXRpY3xlbnwxfHx8fDE3Nzc0NDYzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    code: "EXP / 05 — HIM",
    name: "Himchuli",
    positioning: "A quieter Himalayan objective for climbers seeking a less commercial expedition experience.",
    altitude: "TBC",
    region: "Annapurna, Nepal",
    season: "Spring · Autumn",
    style: "Quiet objective",
    editions: "Alpine · Bespoke · Explorer",
    cols: 3,
    image: "https://images.unsplash.com/photo-1764356806887-89cf05d562bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YW4lMjBtb3VudGFpbiUyMHF1aWV0JTIwZGlzdGFudHxlbnwxfHx8fDE3Nzc0NDYzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function AtlasPreview() {
  return (
    <section id="atlas" className="relative w-full bg-[#1A1A1A] text-white py-32 px-8 overflow-hidden">
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          <div className="md:w-1/4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
              03 — EXPEDITION ATLAS
            </span>
          </div>
          <div className="md:w-1/2">
            <h2 className="font-['Radley'] font-light text-4xl md:text-5xl leading-[1.1] mb-6">
              Five mountains. Five different kinds of preparation.
            </h2>
          </div>
          <div className="md:w-1/4">
            <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-[1.6]">
              Each Thamserku expedition is read as a passage, not a package.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {expeditions.map((exp, idx) => (
            <Link 
              to={exp.name === "Everest" ? "/everest" : "#"}
              key={idx} 
              className={`group relative flex flex-col justify-between border border-white/10 bg-[#2E353C]/30 p-8 min-h-[480px] overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
                idx >= 3 ? 'md:col-span-6' : exp.cols === 6 ? 'md:col-span-6' : 'md:col-span-3'
              }`}
            >
              <div className="absolute inset-0 z-0">
                <ImageWithFallback
                  src={exp.image}
                  alt={exp.name}
                  className="w-full h-full object-cover opacity-20 mix-blend-luminosity group-hover:opacity-40 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />
              </div>
              
              <div className="relative z-10">
                <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#C8CDD2] mb-8">
                  {exp.code}
                </div>
                <h3 className="font-['Radley'] font-light text-[44px] leading-none mb-4">
                  {exp.name}
                </h3>
                <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[15px] leading-relaxed max-w-[40ch]">
                  {exp.positioning}
                </p>
              </div>

              <div className="relative z-10 mt-12 flex flex-col gap-4 font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.1em] text-[#5A6673]">
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  <div>ALT: {exp.altitude}</div>
                  <div>REG: {exp.region}</div>
                  <div>SEA: {exp.season}</div>
                  <div>STY: {exp.style}</div>
                </div>
                <div className="pt-4 border-t border-white/10 text-[#C8CDD2] flex justify-between items-center">
                  <span>EDITIONS: {exp.editions}</span>
                  {exp.name === "Everest" && (
                    <MoveRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <Link to="/atlas" className="border border-white/30 px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center gap-3 hover:border-white transition-colors">
            View the full atlas <MoveRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}