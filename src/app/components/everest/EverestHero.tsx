import { ArrowRight, ArrowDown } from "lucide-react";
import { Nav } from "../Nav";

export function EverestHero() {
  return (
    <section className="relative w-full h-screen bg-[#1A1A1A] flex flex-col justify-end text-white overflow-hidden pb-16 md:pb-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1716746022735-d8ed8d6ca81a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVyZXN0JTIwc3VucmlzZSUyMG1vdW50YWluJTIwcGVha3xlbnwxfHx8fDE3Nzc0NDg4NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Everest south face at dawn"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradients for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-transparent to-[#1A1A1A]/90" />
      </div>

      <Nav />

      {/* Grid Lines */}
      <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-20">
        <div className="w-full h-full border-l border-r border-[#C8CDD2]/30 max-w-[1440px] mx-auto relative grid grid-cols-4 md:grid-cols-12 gap-5 px-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-r border-[#C8CDD2]/20 hidden md:block" />
          ))}
        </div>
      </div>

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 flex flex-col justify-end h-full mt-24">
        
        <h1 className="font-['Radley'] font-light text-5xl md:text-7xl lg:text-[88px] leading-[1.1] mb-6 max-w-[18ch]">
          Everest Expedition — the highest journey on earth, guided by Himalayan wisdom.
        </h1>
        
        <div className="flex flex-col gap-2 mb-12">
          <p className="font-['Lexend'] font-light text-[#C8CDD2] text-[17px] leading-relaxed max-w-[60ch]">
            A disciplined passage to the summit of the world, shaped by Sherpa leadership, weather judgement and nearly four decades of Thamserku field experience.
          </p>
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
            [CLIENT TO CONFIRM] — FOUR DECADES FIELD EXPERIENCE CLAIM PENDING.
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <button className="border border-white bg-white text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:bg-transparent hover:text-white transition-colors flex items-center justify-center gap-3">
            Request a Private Everest Consultation <ArrowRight className="w-4 h-4" strokeWidth={1} />
          </button>
          <button className="border border-white/30 text-white px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] hover:border-white transition-colors flex items-center justify-center gap-3">
            Read the Dossier <ArrowDown className="w-4 h-4" strokeWidth={1} />
          </button>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full z-20 border-y border-white/20 bg-[#1A1A1A]/30 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
          <div className="px-8 py-5">ALTITUDE · 8,848.86 m</div>
          <div className="px-8 py-5">REGION · Khumbu, Nepal</div>
          <div className="px-8 py-5">SEASON · Spring (Apr–May)</div>
          <div className="px-8 py-5">STYLE · Disciplined passage</div>
        </div>
      </div>
    </section>
  );
}
