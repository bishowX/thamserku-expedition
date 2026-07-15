import { stegaClean } from '@sanity/client/stega'
import { Chip, ChipRow } from '../Chip'
import { Stepper } from '../Stepper'
import type { SanityEditionForDesign, SanityExpeditionForDesign } from '../../../../lib/queries'

export const CUSTOM_PEAK = '__custom__'

export const MIN_CLIMBERS = 2
export const MAX_CLIMBERS = 15

export type SeasonValue = 'spring' | 'autumn' | 'winter' | 'summer'

export const SEASONS: { value: SeasonValue; label: string }[] = [
  { value: 'spring', label: 'Spring (Mar–May)' },
  { value: 'autumn', label: 'Autumn (Sep–Nov)' },
  { value: 'winter', label: 'Winter (Dec–Feb)' },
  { value: 'summer', label: 'Summer (Jun–Aug)' },
]

/**
 * Coerce a Sanity `defaultSeason` into a season chip value. The raw string may
 * carry stega hidden characters in live preview, and is unset on most peaks, so
 * anything unrecognised falls back to '' (no preselection).
 */
export function toSeasonValue(raw: string | undefined | null): SeasonValue | '' {
  const clean = stegaClean(raw ?? '')
  return SEASONS.some((s) => s.value === clean) ? (clean as SeasonValue) : ''
}

export interface FormatValue {
  expeditionType: 'private' | 'shared' | ''
  numberOfClimbers: string
  season: SeasonValue | ''
  customPeakName: string
}

interface StepFormatProps {
  expeditions: SanityExpeditionForDesign[]
  editions: SanityEditionForDesign[]
  selectedPeak: string // expedition slug, or CUSTOM_PEAK, or ''
  selectedEdition: string // edition letter, or ''
  format: FormatValue
  onPeakChange: (slug: string) => void
  onEditionChange: (letter: string) => void
  onFormatChange: (patch: Partial<FormatValue>) => void
}

// Short edition label for the chips; C is the recommended/standard tier.
function editionChipLabel(ed: SanityEditionForDesign): string {
  const short = ed.name.replace(/\s*Edition$/i, '')
  return ed.letter === 'C' ? `${short} [Standard]` : short
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#8C97A3] mb-4">{children}</p>
  )
}

const lineInput =
  "w-full bg-transparent border-b border-[#3A3A3A] pb-3 text-white font-['Fraunces'] italic text-xl focus:outline-none focus:border-white transition-colors placeholder:text-[#C8CDD2]/50 [color-scheme:dark]"

export function StepFormat({
  expeditions,
  editions,
  selectedPeak,
  selectedEdition,
  format,
  onPeakChange,
  onEditionChange,
  onFormatChange,
}: StepFormatProps) {
  const isCustomPeak = selectedPeak === CUSTOM_PEAK
  const isPrivate = format.expeditionType === 'private'
  // numberOfClimbers stays a string end-to-end (booking doc + email). Older
  // free-text values ("e.g. 1–12") won't parse, so fall back to the minimum.
  const parsedClimbers = parseInt(format.numberOfClimbers, 10)
  const climberCount = Number.isNaN(parsedClimbers)
    ? MIN_CLIMBERS
    : Math.max(MIN_CLIMBERS, Math.min(MAX_CLIMBERS, parsedClimbers))

  return (
    <div className="space-y-16">
      {/* 1. Expedition Format */}
      <section>
        <h2 className="font-['Fraunces'] font-light text-display-m text-white mb-4">
          1. Expedition Format
        </h2>

        <div className="space-y-9">
          <div>
            <FieldLabel>1.0 Choose Your Peak</FieldLabel>
            <ChipRow>
              {expeditions.map((exp) => (
                <Chip
                  key={exp._id}
                  label={`${exp.name} · ${exp.altitude}`}
                  selected={selectedPeak === exp.slug}
                  onClick={() => onPeakChange(exp.slug)}
                />
              ))}
              <Chip label="Custom Peak Name" selected={isCustomPeak} onClick={() => onPeakChange(CUSTOM_PEAK)} />
            </ChipRow>
            {isCustomPeak && (
              <input
                type="text"
                value={format.customPeakName}
                onChange={(e) => onFormatChange({ customPeakName: e.target.value })}
                placeholder="Name your objective"
                className={`${lineInput} mt-6`}
              />
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-x-12 gap-y-9">
            <div className="shrink-0">
              <FieldLabel>1.2 Expedition Type</FieldLabel>
              <ChipRow>
                <Chip
                  label="Individual (Shared Expedition)"
                  selected={format.expeditionType === 'shared'}
                  onClick={() => onFormatChange({ expeditionType: 'shared', numberOfClimbers: '' })}
                />
                {/* Seed the count so what the stepper shows is what gets submitted. */}
                <Chip
                  label="Private Expedition"
                  selected={isPrivate}
                  onClick={() =>
                    onFormatChange({
                      expeditionType: 'private',
                      numberOfClimbers: format.numberOfClimbers || String(MIN_CLIMBERS),
                    })
                  }
                />
              </ChipRow>
            </div>
            {isPrivate && (
              <div className="flex-1 min-w-[12rem]">
                <FieldLabel>Number of Climbers</FieldLabel>
                <Stepper
                  value={climberCount}
                  min={MIN_CLIMBERS}
                  max={MAX_CLIMBERS}
                  display={`${climberCount} Climbers`}
                  onChange={(n) => onFormatChange({ numberOfClimbers: String(n) })}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Season */}
      <section>
        <h2 className="font-['Fraunces'] font-light text-display-m text-white mb-4">
          2. Season
        </h2>
        <div className="space-y-9">
          <div>
            <FieldLabel>2.1 Preferred Season</FieldLabel>
            <ChipRow>
              {SEASONS.map((s) => (
                <Chip
                  key={s.value}
                  label={s.label}
                  selected={format.season === s.value}
                  onClick={() => onFormatChange({ season: s.value })}
                />
              ))}
            </ChipRow>
          </div>
        </div>
      </section>

      {/* 3. Edition Selection */}
      <section>
        <h2 className="font-['Fraunces'] font-light text-display-m text-white mb-4">
          3. Edition Selection
        </h2>
        <div>
          <FieldLabel>3.1 Choose Your Edition</FieldLabel>
          <p className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.14em] text-[#8C97A3] mb-5 -mt-2">
            This pre-configures your expedition standards. You can customise everything in the next steps.
          </p>
          <ChipRow>
            {editions.map((ed) => (
              <Chip
                key={ed._id}
                label={editionChipLabel(ed)}
                selected={selectedEdition === ed.letter}
                onClick={() => onEditionChange(ed.letter)}
              />
            ))}
          </ChipRow>
        </div>
      </section>
    </div>
  )
}
