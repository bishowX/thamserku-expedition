import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import type { DesignOption, SanityEditionForDesign, SanityExpeditionForDesign } from '../../../lib/queries'

interface MobileConfigBarProps {
  expedition: SanityExpeditionForDesign | null
  edition: SanityEditionForDesign | null
  ktmHotel: string | null
  trekLodge: string | null
  trekGuide: string | null
  climbGuide: string | null
  sherpaRatio: string | null
  oxygenBottles: number | null
  oxygenUnit: string
  oxygenUnlimitedThreshold: number
  helicopterInclusions: string[]
  ktmHotelOptions: DesignOption[]
  trekLodgeOptions: DesignOption[]
  trekGuideOptions: DesignOption[]
  climbGuideOptions: DesignOption[]
  sherpaRatioOptions: DesignOption[]
  helicopterOptions: DesignOption[]
}

function findLabel(options: DesignOption[], value: string | null): string {
  if (!value) return '—'
  return options.find((o) => o.value === value)?.label ?? value
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-[#2A2A2A]">
      <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#5A6673] shrink-0">{label}</span>
      <span className="font-['JetBrains_Mono'] text-[12px] text-[#C8CDD2] text-right">{value}</span>
    </div>
  )
}

export function MobileConfigBar({
  expedition,
  edition,
  ktmHotel,
  trekLodge,
  trekGuide,
  climbGuide,
  sherpaRatio,
  oxygenBottles,
  oxygenUnit,
  oxygenUnlimitedThreshold,
  helicopterInclusions,
  ktmHotelOptions,
  trekLodgeOptions,
  trekGuideOptions,
  climbGuideOptions,
  sherpaRatioOptions,
  helicopterOptions,
}: MobileConfigBarProps) {
  const [open, setOpen] = useState(false)

  const summaryParts = [
    edition ? `${edition.letter} · ${edition.name}` : null,
    expedition?.name ?? null,
  ].filter(Boolean)

  const oxygenLabel =
    oxygenBottles != null
      ? oxygenBottles >= oxygenUnlimitedThreshold
        ? `Unlimited`
        : `${oxygenBottles}${oxygenUnit}`
      : '—'

  const helicopterLabel =
    helicopterInclusions.length > 0
      ? helicopterInclusions
          .map((v) => helicopterOptions.find((o) => o.value === v)?.label ?? v)
          .join(', ')
      : 'None selected'

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[#2A2A2A] bg-[#111111]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-5 py-3"
      >
        <div className="flex items-center gap-3">
          <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-[0.14em] text-[#E8710A] border border-[#E8710A]/40 px-2 py-0.5 rounded-sm">
            Config
          </span>
          <span className="font-['JetBrains_Mono'] text-[12px] text-[#9CA3AF]">
            {summaryParts.length > 0 ? summaryParts.join(' · ') : 'Not configured'}
          </span>
        </div>
        {open ? (
          <ChevronDown className="w-4 h-4 text-[#5A6673]" />
        ) : (
          <ChevronUp className="w-4 h-4 text-[#5A6673]" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 max-h-[60vh] overflow-y-auto">
          <Row label="Edition" value={edition ? `${edition.letter} · ${edition.name}` : '—'} />
          <Row label="Peak" value={expedition?.name ?? '—'} />
          <Row label="KTM Hotel" value={findLabel(ktmHotelOptions, ktmHotel)} />
          <Row label="Trek Lodges" value={findLabel(trekLodgeOptions, trekLodge)} />
          <Row label="Trek Guide" value={findLabel(trekGuideOptions, trekGuide)} />
          <Row label="Climb Guide" value={findLabel(climbGuideOptions, climbGuide)} />
          <Row label="Sherpa Ratio" value={findLabel(sherpaRatioOptions, sherpaRatio)} />
          <Row label="Oxygen" value={oxygenLabel} />
          <div className="py-2 border-b border-[#2A2A2A]">
            <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#5A6673] block mb-1">Helicopter</span>
            <span className="font-['JetBrains_Mono'] text-[12px] text-[#C8CDD2]">{helicopterLabel}</span>
          </div>
        </div>
      )}
    </div>
  )
}
