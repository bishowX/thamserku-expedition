// ── Per-peak configuration matrix (internal IR) ─────────────────────────────
// The rendering/pricing model shared by the comparison tables and the Design
// configurator, on BOTH client (render, defaults, live preview) and server
// (authoritative price + snapshot at submit time).
//
// This is NOT how the data is stored. Studio authors a compact, category-named
// `designConfig` (objects/designConfig); `normalizeDesignConfig` (below) maps
// that storage shape into this IR at the query boundary. Editors never see
// keys/control-types/groups — those are synthesized here.

export type EditionLetter = 'A' | 'B' | 'C' | 'D' | 'E'
export const EDITION_LETTERS: EditionLetter[] = ['A', 'B', 'C', 'D', 'E']

export type ControlType = 'display' | 'select' | 'multiselect' | 'range' | 'toggle'
export type CellState = 'fixed' | 'choosable' | 'included' | 'addon' | 'na'
export type FeatureCategory = 'core' | 'addon'

export type ConfigOption = { value: string; label: string; priceDelta?: number; included?: boolean }

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
  defaultSelected?: string[]
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
      return cell.defaultSelected ? [...cell.defaultSelected] : []
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
    case 'multiselect': {
      // An option contributes only when its state differs from its default:
      // included options default ON  → removing applies the delta (negative = credit);
      // optional options default OFF → adding applies the delta (a surcharge).
      const selected = new Set((value as string[]) ?? [])
      let sum = 0
      for (const o of cell.options ?? []) {
        if (selected.has(o.value) !== !!o.included) sum += o.priceDelta ?? 0
      }
      return sum
    }
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
  if (threshold != null && n >= threshold) return 'Unlimited'
  return `${n}${unit}`
}

/** For multiselect features, returns each chosen label as a separate string. Returns null for other control types. */
export function chosenLabelsArr(feature: ConfigFeature, cell: ConfigCell, value: SelectionValue): string[] | null {
  if (feature.control !== 'multiselect') return null
  return ((value as string[]) ?? []).map((v) => optionByValue(cell, v)?.label ?? v)
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
  /** "Starting from" floor = calculated total ∓10%, rounded to the nearest 100. */
  low: number | null
  currency: string
  lineItems: LineItem[]
}

const round100 = (n: number) => Math.round(n / 100) * 100

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
      if (value === undefined) continue
      // Always price interactive features (a removed bundled item can carry a
      // credit even when the resulting selection is "empty"); list it when it's
      // a real choice or when it shifts the price.
      const priceDelta = priceDeltaFor(feature, cell, value)
      deltaSum += priceDelta
      if (isMeaningful(feature, value) || priceDelta !== 0) {
        lineItems.push({ key: feature.key, label: feature.label, group, chosenLabel: chosenLabelFor(feature, cell, value), priceDelta })
      }
    }
  }
  const base = basePrices?.[edition]
  const basePrice = typeof base === 'number' ? base : null
  const total = basePrice == null ? null : basePrice + deltaSum
  return {
    basePrice,
    total,
    low: total == null ? null : round100(total * 0.9),
    currency: 'USD',
    lineItems,
  }
}

// ── Raw storage shape (Sanity `designConfig`) → internal matrix IR ───────────
// Studio authors EDITION-MAJOR (see studio designConfig): each edition (B/C/D)
// holds the five categories and its own options. The whole app downstream
// consumes the feature-major ConfigMatrix above, so we MERGE the three editions
// into per-feature cells here, once, at the query boundary.

export type RawOption = { label?: string; included?: boolean; priceDelta?: number }
export type RawItem = { name?: string; options?: RawOption[] }
export type RawOxygenEdition = {
  defaultBottles?: number
  min?: number
  max?: number
  unlimitedThreshold?: number
  pricePerBottle?: number
}
export type RawEditionConfig = {
  acclimatisation?: RawOption[]
  accommodation?: RawItem[]
  guiding?: RawItem[]
  oxygen?: RawOxygenEdition
  helicopter?: RawOption[]
}
export type DesignConfig = {
  basePrices?: { B?: number | null; C?: number | null; D?: number | null }
  b?: RawEditionConfig
  c?: RawEditionConfig
  d?: RawEditionConfig
}

// Fixed group labels — MUST match the step-split constants in DesignPage.tsx.
const GROUP_ACCLIMATISATION = 'Acclimatisation & Additional Climb'
const GROUP_ACCOMMODATION = 'Accommodation Preferences'
const GROUP_GUIDING = 'Guiding Configurations'
const GROUP_OXYGEN = 'Oxygen Preferences'
const GROUP_HELICOPTER = 'Helicopter Inclusion'

const BCD: EditionLetter[] = ['B', 'C', 'D']

const slug = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'x'

const editionOf = (dc: DesignConfig, ed: EditionLetter): RawEditionConfig | undefined =>
  ed === 'B' ? dc.b : ed === 'C' ? dc.c : ed === 'D' ? dc.d : undefined

// Ordered union of names/labels across editions (first-seen order).
function orderedUnion(lists: (string | undefined)[][]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const list of lists) for (const name of list) {
    if (!name) continue
    const k = name.trim()
    if (!seen.has(k)) { seen.add(k); out.push(k) }
  }
  return out
}

const optionsToConfig = (opts: RawOption[]): ConfigOption[] =>
  (opts ?? [])
    .filter((o) => o?.label)
    .map((o) => ({ value: slug(o.label!), label: o.label!.trim(), priceDelta: o.priceDelta ?? 0, included: !!o.included }))

// A named pick-one item (Accommodation / Guiding) → one `select` feature whose
// cells are the editions in which the item appears.
function itemFeature(section: string, group: string, name: string, byEdition: Map<EditionLetter, RawItem>): ConfigFeature {
  const editions: ConfigCell[] = []
  for (const ed of BCD) {
    const item = byEdition.get(ed)
    if (!item) continue
    const options = optionsToConfig(item.options ?? [])
    if (options.length === 0) continue
    const included = (item.options ?? []).find((o) => o?.included)?.label
    const defaultValue = included ? slug(included) : options[0].value
    const summary = options.find((o) => o.value === defaultValue)?.label ?? options[0].label
    editions.push({ edition: ed, state: 'choosable', summary, defaultValue, options })
  }
  return { key: `${section}-${slug(name)}`, label: name, category: 'core', group, control: 'select', editions }
}

// A pick-many category (Acclimatisation / Helicopter) → one `multiselect`
// feature; included options are pre-selected, the rest are paid add-ons.
function multiFeature(section: string, group: string, label: string, optsByEdition: Map<EditionLetter, RawOption[]>): ConfigFeature | null {
  const editions: ConfigCell[] = []
  for (const ed of BCD) {
    const raw = optsByEdition.get(ed)
    if (!raw || raw.length === 0) continue
    const options = optionsToConfig(raw)
    const defaultSelected = raw.filter((o) => o?.included && o.label).map((o) => slug(o.label!))
    const includedLabels = raw.filter((o) => o?.included && o.label).map((o) => o.label!.trim())
    editions.push({
      edition: ed,
      state: 'addon',
      summary: includedLabels.length ? includedLabels.join(', ') : 'Add-on',
      options,
      defaultSelected,
    })
  }
  if (editions.length === 0) return null
  return { key: section, label, category: 'addon', group, control: 'multiselect', editions }
}

function oxygenFeature(dc: DesignConfig): ConfigFeature | null {
  const editions: ConfigCell[] = []
  for (const ed of BCD) {
    const o = editionOf(dc, ed)?.oxygen
    if (!o || typeof o.defaultBottles !== 'number') continue
    const dflt = o.defaultBottles
    editions.push({
      edition: ed,
      state: 'choosable',
      summary: o.unlimitedThreshold != null && dflt >= o.unlimitedThreshold ? 'Unlimited' : `${dflt} × 4L`,
      range: {
        min: o.min ?? 0,
        max: o.max ?? 16,
        step: 1,
        defaultValue: dflt,
        unit: '× 4L',
        unlimitedThreshold: o.unlimitedThreshold,
        includedUnits: dflt,
        pricePerUnit: o.pricePerBottle ?? 0,
      },
    })
  }
  if (editions.length === 0) return null
  return { key: 'oxygen-bottles', label: 'Summit Oxygen ×4L', category: 'core', group: GROUP_OXYGEN, control: 'range', editions }
}

// Build pick-one features for a category (accommodation/guiding) by unioning
// item names across editions and collecting each edition's matching item.
function itemFeatures(dc: DesignConfig, section: 'accommodation' | 'guiding', group: string): ConfigFeature[] {
  const names = orderedUnion(BCD.map((ed) => (editionOf(dc, ed)?.[section] ?? []).map((i) => i?.name)))
  return names.map((name) => {
    const byEdition = new Map<EditionLetter, RawItem>()
    for (const ed of BCD) {
      const item = (editionOf(dc, ed)?.[section] ?? []).find((i) => i?.name?.trim() === name)
      if (item) byEdition.set(ed, item)
    }
    return itemFeature(section, group, name, byEdition)
  })
}

function multiByEdition(dc: DesignConfig, section: 'acclimatisation' | 'helicopter'): Map<EditionLetter, RawOption[]> {
  const m = new Map<EditionLetter, RawOption[]>()
  for (const ed of BCD) {
    const opts = editionOf(dc, ed)?.[section]
    if (opts && opts.length) m.set(ed, opts)
  }
  return m
}

/** Map the stored edition-major `designConfig` to the internal matrix + base prices. */
export function normalizeDesignConfig(dc: DesignConfig | undefined | null): {
  configMatrix: ConfigMatrix
  basePrices: BasePrices
} {
  if (!dc) return { configMatrix: [], basePrices: {} }
  const matrix: ConfigMatrix = []

  const acclim = multiFeature('acclimatisation', GROUP_ACCLIMATISATION, 'Additional Climbs', multiByEdition(dc, 'acclimatisation'))
  if (acclim) matrix.push(acclim)

  matrix.push(...itemFeatures(dc, 'accommodation', GROUP_ACCOMMODATION))
  matrix.push(...itemFeatures(dc, 'guiding', GROUP_GUIDING))

  const oxy = oxygenFeature(dc)
  if (oxy) matrix.push(oxy)

  const heli = multiFeature('helicopter', GROUP_HELICOPTER, 'Helicopter', multiByEdition(dc, 'helicopter'))
  if (heli) matrix.push(heli)

  const bp = dc.basePrices ?? {}
  const basePrices: BasePrices = { B: bp.B ?? null, C: bp.C ?? null, D: bp.D ?? null }
  return { configMatrix: matrix, basePrices }
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
