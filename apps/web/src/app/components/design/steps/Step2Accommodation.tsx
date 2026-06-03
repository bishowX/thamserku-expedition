import { Hotel, MapPin } from 'lucide-react'
import { OptionCard } from '../OptionCard'
import type { DesignOption, SanityExpeditionForDesign } from '../../../../lib/queries'

interface Step2Props {
  ktmHotelOptions: DesignOption[]
  selectedExpedition: SanityExpeditionForDesign | null
  ktmHotel: string | null
  trekLodge: string | null
  onKtmHotelChange: (value: string) => void
  onTrekLodgeChange: (value: string) => void
  onBack: () => void
  onContinue: () => void
}

export function Step2Accommodation({
  ktmHotelOptions,
  selectedExpedition,
  ktmHotel,
  trekLodge,
  onKtmHotelChange,
  onTrekLodgeChange,
  onBack,
  onContinue,
}: Step2Props) {
  const trekLodgeOptions = selectedExpedition?.trekLodgeOptions ?? []

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-['Cormorant_Garamond'] font-light text-3xl text-white mb-2">
          Accommodation Preferences
        </h2>
        <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-lg">
          Your Edition's standard is pre-selected. Upgrade or downgrade as you wish.
        </p>
      </div>

      {/* KTM Hotel */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Hotel className="w-4 h-4 text-[#5A6673]" strokeWidth={1.5} />
          <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673]">
            Kathmandu
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ktmHotelOptions.map((opt) => (
            <OptionCard
              key={opt.value}
              {...opt}
              selected={ktmHotel === opt.value}
              onSelect={onKtmHotelChange}
            />
          ))}
        </div>
      </div>

      {/* Trek Lodge */}
      {trekLodgeOptions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#5A6673]" strokeWidth={1.5} />
            <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673]">
              During Trekking
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {trekLodgeOptions.map((opt) => (
              <OptionCard
                key={opt.value}
                {...opt}
                selected={trekLodge === opt.value}
                onSelect={onTrekLodgeChange}
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
