import { Wind, PlaneTakeoff } from 'lucide-react'
import { OptionCard } from '../OptionCard'
import type { DesignOption, SanityExpeditionForDesign } from '../../../../lib/queries'

interface Step4Props {
  selectedExpedition: SanityExpeditionForDesign | null
  oxygenBottles: number
  oxygenMin: number
  oxygenMax: number
  oxygenStep: number
  oxygenUnit: string
  oxygenUnlimitedThreshold: number
  helicopterInclusions: string[]
  onOxygenChange: (value: number) => void
  onHelicopterToggle: (value: string) => void
  onBack: () => void
  onContinue: () => void
}

export function Step4OxygenHelicopter({
  selectedExpedition,
  oxygenBottles,
  oxygenMin,
  oxygenMax,
  oxygenStep,
  oxygenUnit,
  oxygenUnlimitedThreshold,
  helicopterInclusions,
  onOxygenChange,
  onHelicopterToggle,
  onBack,
  onContinue,
}: Step4Props) {
  const helicopterOptions = selectedExpedition?.helicopterInclusions ?? []
  const oxygenIsUnlimited = oxygenBottles >= oxygenUnlimitedThreshold
  const sliderPercent = ((oxygenBottles - oxygenMin) / (oxygenMax - oxygenMin)) * 100

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-['Cormorant_Garamond'] font-light text-3xl text-white mb-2">
          Oxygen &amp; Helicopter Services
        </h2>
        <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-lg">
          Critical safety infrastructure. Configure based on your comfort level and Edition standard.
        </p>
      </div>

      {/* Oxygen */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Wind className="w-4 h-4 text-[#5A6673]" strokeWidth={1.5} />
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673]">
            Oxygen Support
          </span>
        </div>
        <div className="border border-[#2E2E2E] rounded bg-[#1E1E1E] p-6">
          <div className="flex items-baseline justify-between mb-6">
            <div className="flex items-baseline gap-2">
              <span className="font-['Cormorant_Garamond'] text-[64px] font-light text-white leading-none">
                {oxygenIsUnlimited ? '∞' : oxygenBottles}
              </span>
              <span className="font-['JetBrains_Mono'] text-[12px] text-[#9CA3AF]">{oxygenUnit}</span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#5A6673] border border-[#2E2E2E] px-2 py-1 rounded">
              Per Member
            </span>
          </div>
          <div className="relative mb-3">
            <input
              type="range"
              min={oxygenMin}
              max={oxygenMax}
              step={oxygenStep}
              value={oxygenBottles}
              onChange={(e) => onOxygenChange(Number(e.target.value))}
              className="w-full appearance-none h-[3px] rounded-full outline-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #E8710A 0%, #E8710A ${sliderPercent}%, #2E2E2E ${sliderPercent}%, #2E2E2E 100%)`,
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#5A6673]">{oxygenMin} bottles</span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#5A6673]">
              {oxygenMax} = Unlimited
            </span>
          </div>
        </div>
      </div>

      {/* Helicopter */}
      {helicopterOptions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <PlaneTakeoff className="w-4 h-4 text-[#5A6673]" strokeWidth={1.5} />
            <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673]">
              Helicopter Inclusions
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {helicopterOptions.map((opt) => (
              <OptionCard
                key={opt.value}
                {...opt}
                selected={helicopterInclusions.includes(opt.value)}
                onSelect={onHelicopterToggle}
                multi
              />
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#5A6673] hover:text-white transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] bg-[#E8710A] text-white px-8 py-4 rounded hover:bg-[#D4630A] transition-colors"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
