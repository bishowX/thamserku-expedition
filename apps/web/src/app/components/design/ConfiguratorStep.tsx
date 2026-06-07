import { OptionCard } from './OptionCard'
import {
  formatRange,
  type ConfiguratorGroup,
  type ConfigCell,
  type ConfigFeature,
  type SelectionValue,
} from '../../../lib/configMatrix'

interface ConfiguratorStepProps {
  group: ConfiguratorGroup
  selections: Record<string, SelectionValue>
  onChange: (key: string, value: SelectionValue) => void
}

/** Renders the interactive controls for one group of the matrix. */
export function ConfiguratorStep({ group, selections, onChange }: ConfiguratorStepProps) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-['Cormorant_Garamond'] font-light text-3xl text-white mb-2">{group.group}</h2>
        <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-lg">
          Personalise the standards for this section.
        </p>
      </div>

      <div className="space-y-10">
        {group.features.map(({ feature, cell }) => (
          <FeatureField
            key={feature.key}
            feature={feature}
            cell={cell}
            value={selections[feature.key]}
            onChange={(v) => onChange(feature.key, v)}
          />
        ))}
      </div>
    </div>
  )
}

function FieldShell({ feature, children }: { feature: ConfigFeature; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673] mb-3 block">
        {feature.label}
      </label>
      {children}
      {feature.helpText && (
        <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#3A3A3A] mt-2">
          {feature.helpText}
        </p>
      )}
    </div>
  )
}

function FeatureField({
  feature,
  cell,
  value,
  onChange,
}: {
  feature: ConfigFeature
  cell: ConfigCell
  value: SelectionValue
  onChange: (value: SelectionValue) => void
}) {
  if (feature.control === 'select') {
    const selected = (value as string) ?? ''
    return (
      <FieldShell feature={feature}>
        <div className="space-y-3">
          {(cell.options ?? []).map((opt) => (
            <OptionCard
              key={opt.value}
              value={opt.value}
              label={opt.label}
              description={opt.priceDelta ? `+ $${opt.priceDelta.toLocaleString()}` : undefined}
              selected={selected === opt.value}
              onSelect={(v) => onChange(v)}
            />
          ))}
        </div>
      </FieldShell>
    )
  }

  if (feature.control === 'multiselect') {
    const selected = (value as string[]) ?? []
    return (
      <FieldShell feature={feature}>
        <div className="space-y-3">
          {(cell.options ?? []).map((opt) => (
            <OptionCard
              key={opt.value}
              value={opt.value}
              label={opt.label}
              description={opt.priceDelta ? `+ $${opt.priceDelta.toLocaleString()}` : undefined}
              selected={selected.includes(opt.value)}
              multi
              onSelect={(v) =>
                onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v])
              }
            />
          ))}
        </div>
      </FieldShell>
    )
  }

  if (feature.control === 'range') {
    const r = cell.range ?? {}
    const min = r.min ?? 0
    const max = r.max ?? 100
    const step = r.step ?? 1
    const n = (value as number) ?? min
    return (
      <FieldShell feature={feature}>
        <div className="flex items-center gap-5">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={n}
            onChange={(e) => onChange(Number(e.target.value))}
            className="flex-1 accent-[#E8710A]"
          />
          <span className="font-['JetBrains_Mono'] text-[13px] text-white whitespace-nowrap min-w-[7rem] text-right">
            {formatRange(cell, n)}
          </span>
        </div>
      </FieldShell>
    )
  }

  if (feature.control === 'toggle') {
    const on = value === true
    return (
      <FieldShell feature={feature}>
        <button
          type="button"
          onClick={() => onChange(!on)}
          className={`w-full flex items-center justify-between gap-3 p-4 rounded border text-left transition-colors ${
            on ? 'border-[#E8710A] bg-[#E8710A]/10' : 'border-[#2E2E2E] bg-[#1E1E1E] hover:border-[#4A4A4A]'
          }`}
        >
          <span className={`font-['JetBrains_Mono'] text-[13px] ${on ? 'text-white' : 'text-[#C8CDD2]'}`}>
            {cell.summary || feature.label}
            {cell.priceDelta ? <span className="text-[#5A6673]"> · + ${cell.priceDelta.toLocaleString()}</span> : null}
          </span>
          <span
            className={`shrink-0 w-9 h-5 rounded-full relative transition-colors ${on ? 'bg-[#E8710A]' : 'bg-[#3A3A3A]'}`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${on ? 'left-[1.125rem]' : 'left-0.5'}`}
            />
          </span>
        </button>
      </FieldShell>
    )
  }

  return null
}
