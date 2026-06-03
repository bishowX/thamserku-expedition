import { ChevronDown } from 'lucide-react'
import type { SanityEditionForDesign, SanityExpeditionForDesign } from '../../../../lib/queries'

interface Step1Props {
  expeditions: SanityExpeditionForDesign[]
  editions: SanityEditionForDesign[]
  selectedExpedition: SanityExpeditionForDesign | null
  selectedEdition: SanityEditionForDesign | null
  onExpeditionChange: (slug: string) => void
  onEditionChange: (letter: string) => void
  onContinue: () => void
}

export function Step1PeakEdition({
  expeditions,
  editions,
  selectedExpedition,
  selectedEdition,
  onExpeditionChange,
  onEditionChange,
  onContinue,
}: Step1Props) {
  const canContinue = selectedExpedition !== null && selectedEdition !== null

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-['Cormorant_Garamond'] font-light text-3xl text-white mb-2">
          Select Your Peak &amp; Edition
        </h2>
        <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-lg">
          Choose your mountain and service tier to begin designing your expedition.
        </p>
      </div>

      <div className="space-y-8">
        {/* Peak */}
        <div>
          <label className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673] mb-3 block">
            Peak
          </label>
          <div className="relative">
            <select
              value={selectedExpedition?.slug ?? ''}
              onChange={(e) => onExpeditionChange(e.target.value)}
              className="w-full bg-[#1E1E1E] border border-[#2E2E2E] text-white font-['JetBrains_Mono'] text-[13px] px-4 py-3.5 rounded appearance-none focus:outline-none focus:border-[#E8710A] transition-colors cursor-pointer"
            >
              <option value="" disabled className="text-[#5A6673]">
                Select a mountain
              </option>
              {expeditions.map((exp) => (
                <option key={exp._id} value={exp.slug} className="bg-[#1E1E1E]">
                  {exp.name} — {exp.altitude}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6673] pointer-events-none" />
          </div>
        </div>

        {/* Edition */}
        <div>
          <label className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673] mb-3 block">
            Edition
          </label>
          <div className="relative">
            <select
              value={selectedEdition?.letter ?? ''}
              onChange={(e) => onEditionChange(e.target.value)}
              className="w-full bg-[#1E1E1E] border border-[#2E2E2E] text-white font-['JetBrains_Mono'] text-[13px] px-4 py-3.5 rounded appearance-none focus:outline-none focus:border-[#E8710A] transition-colors cursor-pointer"
            >
              <option value="" disabled className="text-[#5A6673]">
                Select an edition
              </option>
              {editions.map((ed) => (
                <option key={ed._id} value={ed.letter} className="bg-[#1E1E1E]">
                  {ed.letter} · {ed.name}
                  {ed.positioning ? ` — ${ed.positioning}` : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6673] pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] bg-[#E8710A] text-white px-8 py-4 rounded hover:bg-[#D4630A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
