import { useState } from "react";
import { ChevronDown, MoveRight } from "lucide-react";

type AtlasControlsData = {
  controlsEyebrow?: string;
  controlsSubline?: string;
};

type Option = { value: string; label: string };

type Props = {
  mountains: string[];
  technicalLevels: string[];
  editions: Option[];
  mountain: string;
  technicalLevel: string;
  edition: string;
  setMountain: (v: string) => void;
  setTechnicalLevel: (v: string) => void;
  setEdition: (v: string) => void;
  onReset: () => void;
  filteredCount: number;
  data?: AtlasControlsData;
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<string | Option>;
  onChange: (v: string) => void;
}) {
  const normalized = options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );
  return (
    <div className="py-4">
      <div className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
        {label}
      </div>
      <div className="relative block w-full md:inline-block md:w-auto">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-transparent font-['Lexend'] font-light text-[14px] text-[#1A1A1A] pr-6 pb-1 border-b border-[#1A1A1A]/30 cursor-pointer focus:outline-none hover:border-[#1A1A1A] transition-colors w-full md:w-auto"
        >
          <option value="All">All</option>
          {normalized.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-[#5A6673] pointer-events-none" />
      </div>
    </div>
  );
}

export function AtlasControls({
  mountains,
  technicalLevels,
  editions,
  mountain,
  technicalLevel,
  edition,
  setMountain,
  setTechnicalLevel,
  setEdition,
  onReset,
  filteredCount,
  data,
}: Props) {
  const eyebrow = data?.controlsEyebrow ?? "02 — ATLAS CONTROLS";
  const subline = data?.controlsSubline ?? "INDEXED BY THE THAMSERKU DESK";
  const isFiltered =
    mountain !== "All" || technicalLevel !== "All" || edition !== "All";
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] sticky top-0 z-30 border-b border-[#1A1A1A]/10">
      <div className="max-w-[1440px] mx-auto px-8">
        <div
          className="flex justify-between items-center py-6 md:cursor-default cursor-pointer"
          onClick={() => setFiltersOpen((o) => !o)}
          role="button"
          aria-expanded={filtersOpen}
          aria-controls="atlas-filters"
        >
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            {eyebrow}
          </span>
          <div className="flex items-center gap-3">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] hidden md:block">
              {filteredCount} EXPEDITIONS · {subline}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#5A6673] md:hidden transition-transform duration-200 ${filtersOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </div>

        <div
          id="atlas-filters"
          className={`md:block ${filtersOpen ? "block" : "hidden"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A]/10 border-t border-[#1A1A1A]/10">
            <div className="md:pr-8">
              <FilterSelect
                label="Mountain"
                value={mountain}
                options={mountains}
                onChange={setMountain}
              />
            </div>
            <div className="md:px-8">
              <FilterSelect
                label="Technical Level"
                value={technicalLevel}
                options={technicalLevels}
                onChange={setTechnicalLevel}
              />
            </div>
            <div className="md:pl-8">
              <FilterSelect
                label="Edition"
                value={edition}
                options={editions}
                onChange={setEdition}
              />
            </div>
          </div>

          <div className="py-4 border-t border-[#1A1A1A]/10 flex justify-end">
            <button
              onClick={(e) => { e.stopPropagation(); onReset(); }}
              disabled={!isFiltered}
              className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] hover:text-[#1A1A1A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              Reset Atlas <MoveRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
