import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
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

export interface FormatValue {
  expeditionType: 'private' | 'shared' | ''
  numberOfClimbers: string
  season: SeasonValue | ''
  customPeakName: string
  /** ISO yyyy-mm-dd from the date input; only offered on editions A and E. */
  startDate: string
  endDate: string
}

/** Editions whose dates are fixed with the climber rather than by the season calendar. */
export const DATED_EDITIONS = ['A', 'E']

/** "2027-04-09" → "04-09-2027" (MM-DD-YYYY). */
export const toMDY = (iso: string) => {
  const [y, m, d] = iso.split('-')
  return y && m && d ? `${m}-${d}-${y}` : ''
}

/** "8,848.86m" → 8848.86 */
export const altitudeMeters = (altitude?: string) => parseFloat((altitude ?? '').replace(/[^\d.]/g, '')) || 0

const BANDS = [
  { label: 'All', min: 0, max: Infinity },
  { label: '8000ers', min: 8000, max: 9000 },
  { label: '7000ers', min: 7000, max: 8000 },
  { label: '6000ers', min: 6000, max: 7000 },
]

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
            <PeakSelect expeditions={expeditions} selectedPeak={selectedPeak} onPeakChange={onPeakChange} />
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
          {DATED_EDITIONS.includes(stegaClean(selectedEdition)) && (
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-9">
              <div>
                <FieldLabel>2.2 Preferred Start Date</FieldLabel>
                <DateField
                  value={format.startDate}
                  max={format.endDate || undefined}
                  onChange={(startDate) => onFormatChange({ startDate })}
                />
              </div>
              <div>
                <FieldLabel>2.3 Preferred End Date</FieldLabel>
                <DateField
                  value={format.endDate}
                  min={format.startDate || undefined}
                  onChange={(endDate) => onFormatChange({ endDate })}
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

const optionClass = (active: boolean) =>
  `w-full text-left flex items-baseline justify-between gap-4 px-4 py-3 font-['DM_Mono'] text-[11px] uppercase tracking-[0.12em] transition-colors ${
    active ? 'bg-white text-[#1A1A1A]' : 'text-[#C8CDD2] hover:bg-[#2A2A2A]'
  }`

/** Peak dropdown with a name search and elevation-band filter. */
function PeakSelect({
  expeditions,
  selectedPeak,
  onPeakChange,
}: {
  expeditions: SanityExpeditionForDesign[]
  selectedPeak: string
  onPeakChange: (slug: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [band, setBand] = useState(BANDS[0])
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    searchRef.current?.focus()
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const q = query.trim().toLowerCase()
  const visible = expeditions.filter((exp) => {
    const m = altitudeMeters(exp.altitude)
    return exp.name.toLowerCase().includes(q) && m >= band.min && m < band.max
  })

  const selected = expeditions.find((e) => e.slug === selectedPeak)
  const display = selected
    ? `${selected.name.trim()} · ${selected.altitude}`
    : selectedPeak === CUSTOM_PEAK
      ? 'Custom Peak Name'
      : 'Select a peak'

  const choose = (slug: string) => {
    onPeakChange(slug)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${lineInput} flex items-center justify-between gap-4 text-left ${selectedPeak ? '' : 'text-[#C8CDD2]/50'}`}
      >
        <span className="truncate">{display}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 text-[#8C97A3] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-40 left-0 right-0 mt-2 bg-[#1F1F1F] border border-[#3A3A3A] rounded shadow-2xl">
          <div className="p-4 space-y-4 border-b border-[#2E2E2E]">
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name"
              aria-label="Search peaks by name"
              className="w-full bg-transparent border-b border-[#3A3A3A] pb-2 text-white font-['Fraunces'] italic text-body focus:outline-none focus:border-white transition-colors placeholder:text-[#C8CDD2]/50"
            />
            <ChipRow>
              {BANDS.map((b) => (
                <Chip key={b.label} label={b.label} selected={band.label === b.label} onClick={() => setBand(b)} />
              ))}
            </ChipRow>
          </div>
          <ul role="listbox" aria-label="Peaks" className="max-h-72 overflow-y-auto py-2" data-lenis-prevent>
            {visible.map((exp) => (
              <li key={exp._id} role="option" aria-selected={selectedPeak === exp.slug}>
                <button type="button" onClick={() => choose(exp.slug)} className={optionClass(selectedPeak === exp.slug)}>
                  <span>{exp.name}</span>
                  <span className="shrink-0 opacity-70">{exp.altitude}</span>
                </button>
              </li>
            ))}
            {visible.length === 0 && (
              <li className="px-4 py-3 font-['DM_Mono'] text-[11px] uppercase tracking-[0.12em] text-[#5A6673]">
                No peaks match
              </li>
            )}
            <li role="option" aria-selected={selectedPeak === CUSTOM_PEAK} className="border-t border-[#2E2E2E] mt-2 pt-2">
              <button type="button" onClick={() => choose(CUSTOM_PEAK)} className={optionClass(selectedPeak === CUSTOM_PEAK)}>
                <span>Custom Peak Name</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

/**
 * Shows the date as MM-DD-YYYY regardless of browser locale, while the
 * transparent native input on top still provides the platform date picker.
 */
function DateField({
  value,
  min,
  max,
  onChange,
}: {
  value: string
  min?: string
  max?: string
  onChange: (iso: string) => void
}) {
  return (
    <div className={`${lineInput} relative ${value ? '' : 'text-[#C8CDD2]/50'}`}>
      {value ? toMDY(value) : 'MM-DD-YYYY'}
      <input
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => {
          try {
            e.currentTarget.showPicker()
          } catch {
            // Older browsers: the native control still opens on its own.
          }
        }}
        aria-label="MM-DD-YYYY"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  )
}
