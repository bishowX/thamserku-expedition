import { MoveRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import everestImage from "../../../assets/images/Everest_for_Breakfast_(8).jpg";

const entries = [
  {
    code: "EXP / 01 — EVR",
    season: "SEASON · SPRING",
    name: "Everest",
    positioning: "The highest mountain on earth asks for more than strength. It asks for patience, judgement, and respect.",
    altitude: "8,848.86 m",
    region: "Khumbu, Nepal",
    seasonDetail: "Spring",
    style: "Disciplined passage",
    editions: "A · B · C · D",
    image: everestImage,
    isDark: true,
    link: "/everest"
  },
  {
    code: "EXP / 02 — MAN",
    season: "SEASON · AUTUMN",
    name: "Manaslu",
    positioning: "A powerful 8,000m expedition for climbers seeking scale, beauty, and progression.",
    altitude: "8,163 m",
    region: "Gorkha, Nepal",
    seasonDetail: "Autumn",
    style: "Progression climb",
    editions: "A · B · C",
    image: "https://images.unsplash.com/photo-1650221293568-82a9823d938a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYW5hc2x1JTIwV2lkZSUyMHJpZGdlJTIwc2lsaG91ZXR0ZSUyMHVuZGVyJTIwYXV0dW1uJTIwbGlnaHR8ZW58MXx8fHwxNzc3NDUyMTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isDark: false,
    link: "#"
  },
  {
    code: "EXP / 03 — DHA",
    season: "SEASON · SPRING",
    name: "Dhaulagiri",
    positioning: "Remote, immense, and uncompromising — a mountain for solitude and strength.",
    altitude: "8,167 m",
    region: "Dhaulagiri, Nepal",
    seasonDetail: "Spring",
    style: "Solitude climb",
    editions: "B · C · D",
    image: "https://images.unsplash.com/photo-1768876833110-3254591724ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEaGF1bGFnaXJpJTIwaXNvbGF0ZWQlMjBtb3VudGFpbnxlbnwxfHx8fDE3Nzc0NTIxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isDark: true,
    link: "#"
  },
  {
    code: "EXP / 04 — MAK",
    season: "SEASON · SPRING",
    name: "Makalu",
    positioning: "A striking Himalayan giant for experienced climbers seeking technical elegance and isolation.",
    altitude: "8,485 m",
    region: "Mahalangur, Nepal",
    seasonDetail: "Spring",
    style: "Technical climb",
    editions: "B · C · D",
    image: "https://images.unsplash.com/photo-1657376921110-8fb3ff3c2cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWthbHUlMjBtb3VudGFpbnxlbnwxfHx8fDE3Nzc0NTIxNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isDark: false,
    link: "#"
  },
  {
    code: "EXP / 05 — HIM",
    season: "SEASON · SPRING · AUTUMN",
    name: "Himchuli",
    positioning: "A quieter Himalayan objective for climbers seeking a less commercial expedition experience.",
    altitude: "TBC",
    region: "Annapurna, Nepal",
    seasonDetail: "Spring · Autumn",
    style: "Quiet objective",
    editions: "A · B · E",
    image: "https://images.unsplash.com/photo-1581447547509-711eb65cd5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YSUyMG1vdW50YWluJTIwcXVpZXRlciUyMHBhcnRpYWwlMjBjbG91ZCUyMGxlc3MlMjBoZXJvaWN8ZW58MXx8fHwxNzc3NDUyMTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isDark: true,
    link: "#"
  }
];

export function AtlasIndex() {
  return (
    <div className="w-full flex flex-col">
      {entries.map((entry, idx) => (
        <section 
          key={idx} 
          className={`w-full py-24 md:py-48 px-8 ${entry.isDark ? 'bg-[#1A1A1A] text-white' : 'bg-[#F4F2EC] text-[#1A1A1A]'}`}
        >
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-center">
            
            {/* Left 6 cols: Image */}
            <div className="md:col-span-6 relative aspect-[4/3] w-full overflow-hidden">
              <ImageWithFallback 
                src={entry.image} 
                alt={entry.name} 
                className="w-full h-full object-cover grayscale-[30%] opacity-90 transition-opacity duration-700 hover:opacity-100" 
              />
              <div className="absolute bottom-0 left-0 p-6 text-white"><span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] bg-white/10 backdrop-blur-sm px-4 py-2 text-white">ALT · {entry.altitude.toUpperCase()}</span></div>
            </div>

            {/* Right 6 cols: Dossier Content */}
            <div className="md:col-span-6 flex flex-col justify-center">
              {/* Eyebrow */}
              <div className={`w-full border-t ${entry.isDark ? 'border-white/20 text-[#C8CDD2]' : 'border-[#1A1A1A]/20 text-[#5A6673]'} pt-4 mb-16 flex justify-between items-start`}>
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px]">{entry.code}</span>
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px]">{entry.season}</span>
              </div>

              {/* Title & Positioning */}
              <h2 className="font-['Radley'] font-light text-6xl md:text-[72px] leading-[1] mb-8 tracking-tight">
                {entry.name}
              </h2>
              <p className={`font-['Radley'] text-[18px] italic leading-relaxed max-w-[38ch] mb-16 ${entry.isDark ? 'text-[#C8CDD2]' : 'text-[#5A6673]'}`}>
                "{entry.positioning}"
              </p>

              {/* Fact Grid */}
              <div className={`grid grid-cols-2 gap-8 mb-12 ${entry.isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                <div>
                  <div className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-2 ${entry.isDark ? 'text-[#5A6673]' : 'text-[#5A6673]'}`}>Altitude</div>
                  <div className="font-['Radley'] text-2xl">{entry.altitude}</div>
                </div>
                <div>
                  <div className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-2 ${entry.isDark ? 'text-[#5A6673]' : 'text-[#5A6673]'}`}>Region</div>
                  <div className="font-['Radley'] text-2xl">{entry.region}</div>
                </div>
                <div>
                  <div className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-2 ${entry.isDark ? 'text-[#5A6673]' : 'text-[#5A6673]'}`}>Season</div>
                  <div className="font-['Radley'] text-2xl">{entry.seasonDetail}</div>
                </div>
                <div>
                  <div className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] mb-2 ${entry.isDark ? 'text-[#5A6673]' : 'text-[#5A6673]'}`}>Style</div>
                  <div className="font-['Radley'] text-2xl">{entry.style}</div>
                </div>
              </div>

              {/* Editions */}
              <div className={`font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] mb-16 pb-6 border-b ${entry.isDark ? 'border-white/10 text-[#C8CDD2]' : 'border-[#1A1A1A]/10 text-[#5A6673]'}`}>
                EDITIONS AVAILABLE <span className="mx-4 font-light">·</span> {entry.editions}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to={entry.link} className={`border px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors flex items-center justify-center gap-3 ${
                  entry.isDark 
                    ? 'border-white bg-white text-[#0A3A77] hover:bg-transparent hover:text-white' 
                    : 'border-[#0A3A77] bg-[#0A3A77] text-white hover:bg-transparent hover:text-[#0A3A77]'
                }`}>
                  Read the Dossier <MoveRight className="w-4 h-4" strokeWidth={1} />
                </Link>
                <Link to="/consultation" className={`border px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] transition-colors flex items-center justify-center gap-3 ${
                  entry.isDark 
                    ? 'border-white/30 text-white hover:border-white' 
                    : 'border-[#0A3A77]/30 text-[#0A3A77] hover:border-[#0A3A77]'
                }`}>
                  Schedule a Consultation <MoveRight className="w-4 h-4" strokeWidth={1} />
                </Link>
              </div>

            </div>
          </div>
        </section>
      ))}
    </div>
  );
}