import { Link } from "react-router";
import { MoveRight } from "lucide-react";

type Props = {
  name?: string;
  airNote?: string;
  lodgesNote?: string;
  accessNote?: string;
  continuityNote?: string;
};

const PILLAR_LABELS = [
  { key: 'air', label: 'AIR' },
  { key: 'lodges', label: 'LODGES · APPROACH' },
  { key: 'access', label: 'PERMITS & ACCESS' },
  { key: 'continuity', label: 'FIELD CONTINUITY' },
] as const;

export function YetiInfrastructureSupport({ name, airNote, lodgesNote, accessNote, continuityNote }: Props) {
  const notes = [airNote, lodgesNote, accessNote, continuityNote];

  return (
    <section className="relative w-full bg-[#1A1A1A] py-24 overflow-hidden text-white">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #C8CDD2 1px, transparent 1px), linear-gradient(to bottom, #C8CDD2 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-5 flex flex-col">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
              YETI INFRASTRUCTURE SUPPORT{name ? ` — ${name.toUpperCase()}` : ''}
            </span>
            <h2 className="font-['Radley'] font-light text-[56px] md:text-[72px] leading-[1.05] text-white max-w-[18ch]">
              "The infrastructure behind every expedition."
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-col md:pt-16">
            <p className="font-['Lexend'] font-light text-[16px] text-[#C8CDD2] leading-[1.65] max-w-[56ch]">
              Every Thamserku expedition is supported by the Yeti Group operating foundation — quietly, throughout the season. Air coordination, mountain lodges, regional permits, and field continuity work in the background so the climb in front of you receives our full attention.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {PILLAR_LABELS.map(({ label }, idx) => (
            <div key={idx} className="flex flex-col border-t border-[#C8CDD2]/30 bg-[#2A3036]/20 p-8 md:p-10">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6">
                {label}{name ? ` · ${name.toUpperCase()}` : ''}
              </span>
              {notes[idx] && (
                <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]">
                  {notes[idx]}
                </p>
              )}
            </div>
          ))}
        </div>

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
      </div>
    </section>
  );
}
