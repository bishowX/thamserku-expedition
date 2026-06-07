// Seed each expedition's `configMatrix` from docs/expeditions-2027.json.
//
// SAFETY: per-cell edition alignment in the source docx is unreliable. We only
// write edition summaries where the extractor kept all 5 values (the `cells`
// map is non-null). For lossy rows we create the row + blank A–E cells and stash
// the raw, UNALIGNED fragments in editor-only `helpText` so a human can fill them
// in Studio. We never assert a guessed alignment. Prices are left unset.
//
// Run from apps/web:  node ../../scripts/seed-config-matrix.mjs [--dry] [--only=everest]

import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../../..') // repo root (apps/web/scripts → up 3)

const argv = process.argv.slice(2)
const DRY = argv.includes('--dry')
const ONLY = (argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || null

// ── token from apps/web/.env ────────────────────────────────────────────────
const env = readFileSync(resolve(root, 'apps/web/.env'), 'utf8')
const token = (env.match(/^SANITY_WRITE_TOKEN=(.+)$/m) || [])[1]?.trim()
if (!token && !DRY) {
  console.error('No SANITY_WRITE_TOKEN found in apps/web/.env')
  process.exit(1)
}

const client = createClient({
  projectId: 'ugjhuor8',
  dataset: 'production',
  apiVersion: '2026-05-21',
  useCdn: false,
  token,
})

const data = JSON.parse(readFileSync(resolve(root, 'docs/expeditions-2027.json'), 'utf8'))
const EDITIONS = ['A', 'B', 'C', 'D', 'E']

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'feature'

const isNa = (v) => /\bn\/?a\b/i.test(v || '')

// Map an add-on cell's verbatim text to a behavioural state.
function addonState(v) {
  if (!v || !v.trim()) return 'fixed'
  if (isNa(v)) return 'na'
  if (/included/i.test(v)) return 'included'
  if (/add-?on|available|exclusive|customis|customiz/i.test(v)) return 'addon'
  return 'fixed'
}

function uniqueKeys() {
  const seen = new Map()
  return (base) => {
    const n = seen.get(base) ?? 0
    seen.set(base, n + 1)
    return n === 0 ? base : `${base}-${n + 1}`
  }
}

// Build editions[] — always 5 cells (A–E) so authors fill existing slots.
// Summaries only where the extractor aligned all 5 (cellsMap present).
function buildCells(cellsMap, category) {
  return EDITIONS.map((e) => {
    const raw = cellsMap && cellsMap[e] != null ? String(cellsMap[e]).trim() : ''
    const state = category === 'addon' ? addonState(raw) : isNa(raw) ? 'na' : 'fixed'
    return { _type: 'configCell', _key: e, edition: e, summary: raw, state }
  })
}

function buildFeature(name, row, category, key) {
  const cells = buildCells(row.cells, category)
  const feature = {
    _type: 'configFeature',
    _key: key,
    key,
    label: name,
    category,
    control: category === 'addon' ? 'toggle' : 'display',
    editions: cells,
  }
  if (category === 'addon') feature.group = 'Add-on Services'
  // Preserve raw, unaligned fragments for the author when we couldn't align.
  if (!row.cells && Array.isArray(row.values) && row.values.length) {
    feature.helpText = `Extracted (unaligned — verify): ${row.values.join('  |  ')}`.slice(0, 300)
  }
  return feature
}

function buildMatrix(peak) {
  const nextKey = uniqueKeys()
  const core = (peak.coreFeatures || []).map((r) =>
    buildFeature(r.feature, r, 'core', nextKey(slugify(r.feature))),
  )
  const addons = (peak.addons || []).map((r) =>
    buildFeature(r.service, r, 'addon', nextKey(slugify(r.service))),
  )
  return [...core, ...addons]
}

const peaks = data.peaks.filter((p) => !ONLY || p.slug === ONLY)
let totalRows = 0
let totalFilled = 0
let totalAlignedRows = 0

for (const peak of peaks) {
  const matrix = buildMatrix(peak)
  const filledCells = matrix.reduce((n, f) => n + f.editions.filter((c) => c.summary).length, 0)
  const alignedRows = matrix.filter((f) => f.editions.some((c) => c.summary)).length
  totalRows += matrix.length
  totalFilled += filledCells
  totalAlignedRows += alignedRows

  // Fetch the full published doc so the draft we create is a complete copy
  // (publishing a partial draft would wipe the other fields).
  const pub = await client.fetch(`*[_type=="expedition" && slug.current==$slug][0]`, { slug: peak.slug })
  if (!pub?._id) {
    console.log(`✗ ${peak.name.padEnd(18)} — no expedition doc for slug "${peak.slug}"`)
    continue
  }
  const draftId = `drafts.${pub._id}`

  if (DRY) {
    console.log(`· ${peak.name.padEnd(18)} ${String(matrix.length).padStart(2)} rows · ${alignedRows} aligned · ${filledCells} filled cells → ${draftId}  [DRY]`)
    continue
  }

  // Ensure a draft exists (mirroring published, untouched if one already exists),
  // then patch our configMatrix onto it. Published stays as-is until a human publishes.
  const { _rev, _createdAt, _updatedAt, ...rest } = pub
  await client
    .transaction()
    .createIfNotExists({ ...rest, _id: draftId })
    .patch(draftId, (p) => p.set({ configMatrix: matrix }))
    .commit()
  console.log(`✓ ${peak.name.padEnd(18)} ${String(matrix.length).padStart(2)} rows · ${alignedRows} aligned · ${filledCells} filled cells → draft`)
}

console.log(
  `\n${DRY ? 'DRY — ' : ''}${peaks.length} peaks · ${totalRows} rows · ${totalFilled} filled cells · ${totalAlignedRows} rows with data` +
    `\nWritten to DRAFTS — review & publish each peak in Studio. Lossy rows carry raw fragments in helpText.`,
)
