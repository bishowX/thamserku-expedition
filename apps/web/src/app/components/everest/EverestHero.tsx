import { ArrowRight, ArrowDown } from "lucide-react";
import { Nav } from "../Nav";
import { urlFor } from "../../../lib/sanity";

type Props = { heroImage?: { asset: { _ref: string } } | null };

export function EverestHero({ heroImage }: Props) {
  const bgSrc = heroImage ? urlFor(heroImage).width(1920).url() : null;

  return (
 <section className="relative w-full h-screen bg-[#1A1A1A] flex flex-col justify-end text-white overflow-hidden py-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {bgSrc && (
          <img
            src={bgSrc}
            alt="Everest south face at dawn"
            className="w-full h-full object-cover object-center"
          />
        )}
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
        
        <h1 className="font-['Radley'] font-light text-fluid-display tracking-tight leading-[1.1] mb-6 max-w-[18ch]">
          Everest Expedition — the highest journey on earth, guided by Himalayan wisdom.
        </h1>

        <div className="mb-12">
          <p className="font-['Lexend'] font-light text-[#C8CDD2] text-fluid-body leading-relaxed max-w-[60ch]">
            A disciplined passage to the summit of the world, shaped by Sherpa leadership, weather judgement and nearly four decades of Thamserku field experience.
          </p>
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

    </section>
  );
}
