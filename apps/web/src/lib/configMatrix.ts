// ── Per-peak configuration matrix ───────────────────────────────────────────
// Single source of truth shared by the trek-details comparison tables and the
// Design configurator. Mirrors the Sanity object types configFeature/configCell.
// Used on BOTH client (render, defaults, live preview) and server (authoritative
// price + snapshot at submit time).

export type EditionLetter = 'A' | 'B' | 'C' | 'D' | 'E'
export const EDITION_LETTERS: EditionLetter[] = ['A', 'B', 'C', 'D', 'E']

export type ControlType = 'display' | 'select' | 'multiselect' | 'range' | 'toggle'
export type CellState = 'fixed' | 'choosable' | 'included' | 'addon' | 'na'
export type FeatureCategory = 'core' | 'addon'

export type ConfigOption = { value: string; label: string; priceDelta?: number }

export type ConfigRange = {
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  unit?: string
  unlimitedThreshold?: number
  includedUnits?: number
  pricePerUnit?: number
}

export type ConfigCell = {
  edition: EditionLetter
  summary?: string
  state: CellState
  options?: ConfigOption[]
  defaultValue?: string
  range?: ConfigRange
  priceDelta?: number
}

export type ConfigFeature = {
  key: string
  label: string
  category: FeatureCategory
  group?: string
  control: ControlType
  helpText?: string
  editions: ConfigCell[]
}

export type ConfigMatrix = ConfigFeature[]
export type BasePrices = Partial<Record<EditionLetter, number | null>>

// A single selection value, by control type.
export type SelectionValue = string | string[] | number | boolean

// ── Lookups ─────────────────────────────────────────────────────────────────

export function cellFor(feature: ConfigFeature, edition: EditionLetter): ConfigCell | undefined {
  return feature.editions?.find((c) => c.edition === edition)
}

/** A cell the user actually interacts with (renders a control). */
export function isInteractive(cell: ConfigCell | undefined): boolean {
  return cell?.state === 'choosable' || cell?.state === 'addon'
}

const DEFAULT_GROUP = 'Configuration'

export type ConfiguratorGroup = {
  group: string
  features: Array<{ feature: ConfigFeature; cell: ConfigCell }>
}

/**
 * Ordered, grouped list of the interactive features for one edition. Matrix order
 * is preserved; groups appear in first-seen order. Empty when the edition has no
 * interactive cells (A/E) — the page then routes straight to the contact form.
 */
export function configuratorGroups(matrix: ConfigMatrix, edition: EditionLetter): ConfiguratorGroup[] {
  const order: string[] = []
  const byGroup = new Map<string, ConfiguratorGroup>()
  for (const feature of matrix ?? []) {
    const cell = cellFor(feature, edition)
    if (!isInteractive(cell) || !cell) continue
    const group = feature.group?.trim() || DEFAULT_GROUP
    if (!byGroup.has(group)) {
      byGroup.set(group, { group, features: [] })
      order.push(group)
    }
    byGroup.get(group)!.features.push({ feature, cell })
  }
  return order.map((g) => byGroup.get(g)!)
}

export function hasConfigurator(matrix: ConfigMatrix, edition: EditionLetter): boolean {
  return configuratorGroups(matrix, edition).length > 0
}

// ── Defaults ────────────────────────────────────────────────────────────────

export function defaultSelection(feature: ConfigFeature, cell: ConfigCell): SelectionValue {
  switch (feature.control) {
    case 'select':
      return cell.defaultValue ?? cell.options?.[0]?.value ?? ''
    case 'multiselect':
      return []
    case 'range':
      return cell.range?.defaultValue ?? cell.range?.min ?? 0
    case 'toggle':
      return false
    default:
      return ''
  }
}

/** Build the default selection map for every interactive feature of an edition. */
export function defaultSelections(matrix: ConfigMatrix, edition: EditionLetter): Record<string, SelectionValue> {
  const out: Record<string, SelectionValue> = {}
  for (const { features } of configuratorGroups(matrix, edition)) {
    for (const { feature, cell } of features) {
      out[feature.key] = defaultSelection(feature, cell)
    }
  }
  return out
}

// ── Pricing & labels ────────────────────────────────────────────────────────

function optionByValue(cell: ConfigCell, value: string): ConfigOption | undefined {
  return cell.options?.find((o) => o.value === value)
}

export function priceDeltaFor(feature: ConfigFeature, cell: ConfigCell, value: SelectionValue): number {
  switch (feature.control) {
    case 'select':
      return optionByValue(cell, value as string)?.priceDelta ?? 0
    case 'multiselect':
      return ((value as string[]) ?? []).reduce((sum, v) => sum + (optionByValue(cell, v)?.priceDelta ?? 0), 0)
    case 'range': {
      const n = (value as number) ?? 0
      const included = cell.range?.includedUnits ?? 0
      const per = cell.range?.pricePerUnit ?? 0
      return Math.max(0, n - included) * per
    }
    case 'toggle':
      return value ? cell.priceDelta ?? 0 : 0
    default:
      return 0
  }
}

export function formatRange(cell: ConfigCell, n: number): string {
  const unit = cell.range?.unit ? ` ${cell.range.unit}` : ''
  const threshold = cell.range?.unlimitedThreshold
  if (threshold != null && n >= threshold) return `Unlimited${unit}`
  return `${n}${unit}`
}

export function chosenLabelFor(feature: ConfigFeature, cell: ConfigCell, value: SelectionValue): string {
  switch (feature.control) {
    case 'select':
      return optionByValue(cell, value as string)?.label ?? ''
    case 'multiselect': {
      const labels = ((value as string[]) ?? []).map((v) => optionByValue(cell, v)?.label ?? v)
      return labels.length ? labels.join(', ') : '—'
    }
    case 'range':
      return formatRange(cell, (value as number) ?? 0)
    case 'toggle':
      return value ? 'Added' : '—'
    default:
      return cell.summary ?? ''
  }
}

/** True when this selection should appear as a line in the snapshot/email. */
function isMeaningful(feature: ConfigFeature, value: SelectionValue): boolean {
  if (feature.control === 'multiselect') return ((value as string[]) ?? []).length > 0
  if (feature.control === 'toggle') return value === true
  if (feature.control === 'select') return Boolean(value)
  return true
}

export type LineItem = { key: string; label: string; group: string; chosenLabel: string; priceDelta: number }

export type Estimate = {
  basePrice: number | null
  total: number | null
  currency: string
  lineItems: LineItem[]
}

/**
 * Authoritative estimate for an edition given the user's raw selection map.
 * `total` is null (→ "price on request") when no base price is set for the edition.
 */
export function computeEstimate(
  matrix: ConfigMatrix,
  edition: EditionLetter,
  basePrices: BasePrices | undefined,
  selections: Record<string, SelectionValue>,
): Estimate {
  const lineItems: LineItem[] = []
  let deltaSum = 0
  for (const { group, features } of configuratorGroups(matrix, edition)) {
    for (const { feature, cell } of features) {
      const value = selections[feature.key]
      if (value === undefined || !isMeaningful(feature, value)) continue
      const priceDelta = priceDeltaFor(feature, cell, value)
      deltaSum += priceDelta
      lineItems.push({ key: feature.key, label: feature.label, group, chosenLabel: chosenLabelFor(feature, cell, value), priceDelta })
    }
  }
  const base = basePrices?.[edition]
  const basePrice = typeof base === 'number' ? base : null
  return {
    basePrice,
    total: basePrice == null ? null : basePrice + deltaSum,
    currency: 'USD',
    lineItems,
  }
}

// ── Comparison tables ───────────────────────────────────────────────────────

export type TableRow = {
  key: string
  label: string
  group?: string
  cells: Partial<Record<EditionLetter, { summary: string; state: CellState }>>
}

/** Rows for a comparison table (one category), all 5 editions, display-only. */
export function tableRows(matrix: ConfigMatrix, category: FeatureCategory): TableRow[] {
  return (matrix ?? [])
    .filter((f) => f.category === category)
    .map((f) => {
      const cells: TableRow['cells'] = {}
      for (const c of f.editions ?? []) {
        cells[c.edition] = { summary: c.summary ?? (c.state === 'na' ? 'N/A' : ''), state: c.state }
      }
      return { key: f.key, label: f.label, group: f.group, cells }
    })
}
