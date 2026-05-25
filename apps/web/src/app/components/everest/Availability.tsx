import { Link } from "react-router";
import { MoveRight } from "lucide-react";

type Season = {
  name: string;
  dates: string;
  statusAlpine?: string;
  statusBespoke?: string;
  statusCrafted?: string;
  statusDefinitive?: string;
};

type Props = {
  expeditionName?: string;
  availableSeasons?: Season[];
  slug?: string;
};

const EDITIONS = [
  { name: "A — ALPINE",      statusKey: "statusAlpine" as const },
  { name: "B — BESPOKE",     statusKey: "statusBespoke" as const },
  { name: "C — CRAFTED",     statusKey: "statusCrafted" as const },
  { name: "D — DEFINITIVE",  statusKey: "statusDefinitive" as const },
];

const STATUS_DISPLAY: Record<string, { label: string; value: string }> = {
  OPEN:               { label: "OPEN",              value: "Enquire for slots" },
  LIMITED:            { label: "LIMITED",            value: "Limited availability" },
  CONSULTATION_ONLY:  { label: "CONSULTATION ONLY",  value: "Write to the desk" },
  CLOSED:             { label: "CLOSED",             value: "Not available" },
};

const FALLBACK_STATUS = (seasonIndex: number, editionIndex: number) => {
  const sum = seasonIndex + editionIndex;
  if (sum % 3 === 0) return STATUS_DISPLAY.OPEN;
  if (sum % 3 === 1) return STATUS_DISPLAY.LIMITED;
  return STATUS_DISPLAY.CONSULTATION_ONLY;
};

export function Availability({ expeditionName, availableSeasons, slug }: Props) {
  const seasons = availableSeasons ?? [];
  return (
    <section className="w-full bg-[#1A1A1A] py-[120px] md:py-[160px] text-white">
      <div className="w-full max-w-[1440px] mx-auto px-8 flex flex-col items-center">
        <div className="w-full max-w-[880px] flex flex-col items-center text-center mb-20 md:mb-24">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-8">
            AVAILABILITY{expeditionName ? ` — ${expeditionName.toUpperCase()}` : ''}
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[64px] leading-[1.1] text-white max-w-[22ch] mb-8">
            Availability — {expeditionName ? `${expeditionName} Expedition` : 'Expedition'}.
          </h2>
        </div>

        {seasons.length > 0 && (
          <div className="w-full max-w-[1180px] mb-24">
            <div className="hidden md:grid grid-cols-12 border-b border-[#C8CDD2]/30 pb-4">
              <div className="col-span-4" />
              {EDITIONS.map((ed, idx) => (
                <div key={idx} className="col-span-2 px-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                  {ed.name}
                </div>
              ))}
            </div>
            {seasons.map((season, sIdx) => (
              <div key={sIdx} className="grid grid-cols-1 md:grid-cols-12 border-b border-[#C8CDD2]/30">
                <div className="col-span-1 md:col-span-4 py-8 md:py-10 md:pr-8 flex flex-col justify-center">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[15px] text-white mb-2">
                    {season.name}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[13px] text-[#C8CDD2]">{season.dates}</span>
                </div>
                {EDITIONS.map((ed, eIdx) => {
                  const rawStatus = season[ed.statusKey];
                  const status = rawStatus && STATUS_DISPLAY[rawStatus]
                    ? STATUS_DISPLAY[rawStatus]
                    : FALLBACK_STATUS(sIdx, eIdx);
                  return (
                    <div key={eIdx} className="col-span-1 md:col-span-2 py-6 md:py-10 px-4 border-t md:border-t-0 md:border-l border-[#C8CDD2]/30 flex flex-col justify-center">
                      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] mb-4">
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
        )}

        <div className="w-full max-w-[880px] flex flex-col items-center text-center mb-16">
          <p className="font-['Cormorant_Garamond'] italic text-[16px] text-[#C8CDD2] max-w-[60ch] mb-8">
            Slots are released by consultation only. Please write to the expedition desk to confirm availability for your preferred season.
          </p>
          <Link
            to={`/consultation${slug ? `?peak=${slug}` : ''}`}
            className="group flex items-center gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-white hover:text-[#C8CDD2] transition-colors"
          >
            <span className="border-b border-white/30 group-hover:border-[#C8CDD2] pb-1 transition-colors">
              CONFIRM AVAILABILITY VIA CONSULTATION
            </span>
            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
