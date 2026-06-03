import { Users, Mountain, UserCheck } from 'lucide-react'
import { OptionCard } from '../OptionCard'
import type { DesignOption } from '../../../../lib/queries'

interface Step3Props {
  trekGuideOptions: DesignOption[]
  climbGuideOptions: DesignOption[]
  sherpaRatioOptions: DesignOption[]
  trekGuide: string | null
  climbGuide: string | null
  sherpaRatio: string | null
  onTrekGuideChange: (value: string) => void
  onClimbGuideChange: (value: string) => void
  onSherpaRatioChange: (value: string) => void
  onBack: () => void
  onContinue: () => void
}

export function Step3Guiding({
  trekGuideOptions,
  climbGuideOptions,
  sherpaRatioOptions,
  trekGuide,
  climbGuide,
  sherpaRatio,
  onTrekGuideChange,
  onClimbGuideChange,
  onSherpaRatioChange,
  onBack,
  onContinue,
}: Step3Props) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-['Cormorant_Garamond'] font-light text-3xl text-white mb-2">
          Guiding &amp; Climbing Support
        </h2>
        <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-lg">
          Define your guiding structure and Sherpa support ratio.
        </p>
      </div>

      {/* Trek Guide */}
      {trekGuideOptions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-[#5A6673]" strokeWidth={1.5} />
            <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673]">
              Guiding Preference — Trek
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {trekGuideOptions.map((opt) => (
              <OptionCard
                key={opt.value}
                {...opt}
                selected={trekGuide === opt.value}
                onSelect={onTrekGuideChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Climb Guide */}
      {climbGuideOptions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Mountain className="w-4 h-4 text-[#5A6673]" strokeWidth={1.5} />
            <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673]">
              Guiding Preference — Climbing
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {climbGuideOptions.map((opt) => (
              <OptionCard
                key={opt.value}
                {...opt}
                selected={climbGuide === opt.value}
                onSelect={onClimbGuideChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sherpa Ratio */}
      {sherpaRatioOptions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <UserCheck className="w-4 h-4 text-[#5A6673]" strokeWidth={1.5} />
            <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673]">
              Climbing Support — Member : Sherpa Ratio
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sherpaRatioOptions.map((opt) => (
              <OptionCard
                key={opt.value}
                {...opt}
                selected={sherpaRatio === opt.value}
                onSelect={onSherpaRatioChange}
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
