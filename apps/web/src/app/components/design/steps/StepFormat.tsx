import { Chip, ChipRow } from '../Chip'
import type { SanityEditionForDesign, SanityExpeditionForDesign } from '../../../../lib/queries'

export const CUSTOM_PEAK = '__custom__'

export interface FormatValue {
  expeditionType: 'private' | 'shared' | ''
  numberOfClimbers: string
  season: 'spring' | 'autumn' | 'custom' | ''
  startDate: string
  endDate: string
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
  const isCustomSeason = format.season === 'custom'
  const isPrivate = format.expeditionType === 'private'

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
                <Chip label="Private Expedition" selected={isPrivate} onClick={() => onFormatChange({ expeditionType: 'private' })} />
                <Chip
                  label="Shared Expedition (Individual)"
                  selected={format.expeditionType === 'shared'}
                  onClick={() => onFormatChange({ expeditionType: 'shared', numberOfClimbers: '' })}
                />
              </ChipRow>
            </div>
            {isPrivate && (
              <div className="flex-1 min-w-[12rem]">
                <FieldLabel>Number of Climbers</FieldLabel>
                <input
                  type="text"
                  value={format.numberOfClimbers}
                  onChange={(e) => onFormatChange({ numberOfClimbers: e.target.value })}
                  placeholder="e.g. 1–12"
                  className={lineInput}
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
              <Chip label="Spring" selected={format.season === 'spring'} onClick={() => onFormatChange({ season: 'spring' })} />
              <Chip label="Autumn" selected={format.season === 'autumn'} onClick={() => onFormatChange({ season: 'autumn' })} />
              <Chip label="Custom" selected={isCustomSeason} onClick={() => onFormatChange({ season: 'custom' })} />
            </ChipRow>
          </div>
          {isCustomSeason && (
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-9">
              <div>
                <FieldLabel>Preferred Start Date</FieldLabel>
                <input
                  type="date"
                  value={format.startDate}
                  onChange={(e) => onFormatChange({ startDate: e.target.value })}
                  className={lineInput}
                />
              </div>
              <div>
                <FieldLabel>Preferred End Date</FieldLabel>
                <input
                  type="date"
                  value={format.endDate}
                  onChange={(e) => onFormatChange({ endDate: e.target.value })}
                  className={lineInput}
                />
              </div>
            </div>
          )}
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
