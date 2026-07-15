import { Chip, ChipRow } from './Chip'
import { Stepper } from './Stepper'
import {
  formatRange,
  type ConfiguratorGroup,
  type ConfigCell,
  type ConfigFeature,
  type SelectionValue,
} from '../../../lib/configMatrix'

export type NumberedGroup = { number: number; group: ConfiguratorGroup }

interface ConfiguratorStepProps {
  groups: NumberedGroup[]
  selections: Record<string, SelectionValue>
  onChange: (key: string, value: SelectionValue) => void
}

/** One wizard step: a run of numbered matrix sections rendered as chip rows. */
export function ConfiguratorStep({ groups, selections, onChange }: ConfiguratorStepProps) {
  return (
    <div className="space-y-16">
      {groups.map(({ number, group }) => (
        <section key={group.group}>
          <h2 className="font-['Fraunces'] font-light text-display-m text-white mb-4">
            {number}. {group.group}
          </h2>
          <div className="space-y-9">
            {group.features.map(({ feature, cell }, i) => (
              <FeatureField
                key={feature.key}
                label={`${number}.${i + 1} ${feature.label}`}
                feature={feature}
                cell={cell}
                value={selections[feature.key]}
                onChange={(v) => onChange(feature.key, v)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function FieldShell({ label, helpText, children }: { label: string; helpText?: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#5A6673] mb-4">
        {label}
      </p>
      {children}
      {helpText && (
        <p className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.12em] text-[#3A3A3A] mt-3">
          {helpText}
        </p>
      )}
    </div>
  )
}

function FeatureField({
  label,
  feature,
  cell,
  value,
  onChange,
}: {
  label: string
  feature: ConfigFeature
  cell: ConfigCell
  value: SelectionValue
  onChange: (value: SelectionValue) => void
}) {
  if (feature.control === 'select') {
    const selected = (value as string) ?? ''
    return (
      <FieldShell label={label} helpText={feature.helpText}>
        <ChipRow>
          {(cell.options ?? []).map((opt) => (
            <Chip key={opt.value} label={opt.label} selected={selected === opt.value} onClick={() => onChange(opt.value)} />
          ))}
        </ChipRow>
      </FieldShell>
    )
  }

  if (feature.control === 'multiselect') {
    const selected = (value as string[]) ?? []
    const toggle = (v: string) =>
      onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v])
    return (
      <FieldShell label={label} helpText={feature.helpText}>
        <ChipRow>
          {/* "Not Included" reset — active when nothing is chosen. */}
          <Chip label="Not Included" selected={selected.length === 0} onClick={() => onChange([])} />
          {(cell.options ?? []).map((opt) => (
            <Chip key={opt.value} label={opt.label} selected={selected.includes(opt.value)} onClick={() => toggle(opt.value)} />
          ))}
        </ChipRow>
      </FieldShell>
    )
  }

  if (feature.control === 'range') {
    const r = cell.range ?? {}
    const min = r.min ?? 0
    const max = r.max ?? 16
    const step = r.step ?? 1
    const n = typeof value === 'number' ? value : r.defaultValue ?? min
    return (
      <FieldShell label={label} helpText={feature.helpText}>
        <Stepper value={n} min={min} max={max} step={step} display={formatRange(cell, n)} onChange={onChange} />
      </FieldShell>
    )
  }

  return null
}
