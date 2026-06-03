import type { DesignOption, SanityEditionForDesign, SanityExpeditionForDesign } from '../../../lib/queries'

interface ConfigSidebarProps {
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

export function ConfigSidebar({
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
}: ConfigSidebarProps) {
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
    <aside className="w-[300px] shrink-0 hidden lg:block">
      <div className="sticky top-8 border border-[#2A2A2A] rounded bg-[#171717] p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673]">
            Your Configuration
          </span>
          <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-[0.14em] text-[#E8710A] border border-[#E8710A]/40 px-2 py-0.5 rounded-sm">
            Live
          </span>
        </div>

        <div className="space-y-0">
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

        <div className="mt-6 pt-4 border-t border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#5A6673]">Investment</span>
            <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#E8710A]">On Inquiry</span>
          </div>
          <p className="font-['Cormorant_Garamond'] italic text-[13px] text-[#5A6673] leading-relaxed">
            We do not believe in quoting a number before understanding your climb. Submit your configuration and we will build the right proposal.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#2A2A2A]">
          <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#5A6673] mb-3">Prefer to Talk?</p>
          <p className="font-['Cormorant_Garamond'] text-[14px] text-[#9CA3AF] mb-3">
            Speak directly with our expedition team.
          </p>
          <a
            href="tel:+9779705216623"
            className="font-['JetBrains_Mono'] text-[12px] text-[#E8710A] hover:underline block"
          >
            +977 9705 216 623
          </a>
          <a
            href="mailto:expeditions@thamserku.com"
            className="font-['JetBrains_Mono'] text-[11px] text-[#5A6673] hover:text-[#9CA3AF] transition-colors block mt-1"
          >
            expeditions@thamserku.com
          </a>
        </div>
      </div>
    </aside>
  )
}
