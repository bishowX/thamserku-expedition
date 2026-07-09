// One-time migration: derive `expedition.servicesConfig` (the new, separate
// comparison-table pipeline) from each expedition's EXISTING published
// `designConfig`, so the dossier page's Services/Add-on tabs aren't empty
// while desk authors additional content on top.
//
// Mirrors the exact "summary" formulas configMatrix.ts used to render these
// as comparison-table cells before designConfig was decoupled from the table:
//   accommodation/guiding item  -> included option's label (else first option)
//   acclimatisation/helicopter  -> comma-joined included option labels (else "Add-on")
//   oxygen                      -> "Unlimited" or "{defaultBottles} × 4L"
//
// accommodation/guiding/oxygen  -> servicesConfigRow category "service"
// acclimatisation/helicopter    -> servicesConfigRow category "addon"
//
// designConfig itself is left completely untouched — this only ADDS
// servicesConfig to the published document. Drafts are not touched.
//
// Run from apps/web:  node scripts/migrate-designconfig-to-servicesconfig.mjs [--dry]

import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../../..')
const DRY = process.argv.slice(2).includes('--dry')

const env = readFileSync(resolve(root, 'apps/web/.env'), 'utf8')
const token = (env.match(/^SANITY_WRITE_TOKEN=(.+)$/m) || [])[1]?.trim()
if (!token && !DRY) {
  console.error('No SANITY_WRITE_TOKEN found in apps/web/.env')
  process.exit(1)
}

// NOTE: the live project/dataset actually in use (per apps/web/.env), NOT the
// stale ids some older seed scripts hardcoded.
const client = createClient({ projectId: 'dh94bf5m', dataset: 'production', apiVersion: '2026-05-21', useCdn: false, token })

const slug = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'x'

function itemSummary(options) {
  if (!options?.length) return null
  const included = options.find((o) => o?.included)?.label
  const label = (included ?? options[0]?.label ?? '').trim()
  return label || null
}

function multiSummary(options) {
  const includedLabels = (options ?? []).filter((o) => o?.included && o?.label).map((o) => o.label.trim())
  return includedLabels.length ? includedLabels.join(', ') : 'Add-on'
}

function oxygenSummary(o) {
  if (!o || typeof o.defaultBottles !== 'number') return null
  if (o.unlimitedThreshold != null && o.defaultBottles >= o.unlimitedThreshold) return 'Unlimited'
  return `${o.defaultBottles} × 4L`
}

const row = (name, category, text) => ({ _type: 'servicesConfigRow', _key: slug(name), name, category, text })

function editionRows(ed) {
  const rows = []
  for (const item of ed?.accommodation ?? []) {
    if (!item?.name) continue
    const text = itemSummary(item.options)
    if (text) rows.push(row(item.name.trim(), 'service', text))
  }
  for (const item of ed?.guiding ?? []) {
    if (!item?.name) continue
    const text = itemSummary(item.options)
    if (text) rows.push(row(item.name.trim(), 'service', text))
  }
  const oxText = oxygenSummary(ed?.oxygen)
  if (oxText) rows.push(row('Summit Oxygen ×4L', 'service', oxText))
  if (ed?.acclimatisation?.length) rows.push(row('Additional Climbs', 'addon', multiSummary(ed.acclimatisation)))
  if (ed?.helicopter?.length) rows.push(row('Helicopter', 'addon', multiSummary(ed.helicopter)))
  return rows
}

const expeditions = await client.fetch(
  `*[_type == "expedition" && defined(designConfig)]{ _id, name, designConfig }`,
)

if (!expeditions.length) {
  console.log('No expeditions with designConfig found.')
  process.exit(0)
}

for (const exp of expeditions) {
  const servicesConfig = {
    _type: 'servicesConfig',
    b: editionRows(exp.designConfig?.b),
    c: editionRows(exp.designConfig?.c),
    d: editionRows(exp.designConfig?.d),
  }
  const counts = `b:${servicesConfig.b.length} c:${servicesConfig.c.length} d:${servicesConfig.d.length}`
  console.log(`${exp.name} (${exp._id}) — ${counts}`)
  if (DRY) continue
  await client.patch(exp._id).set({ servicesConfig }).commit()
}

console.log(DRY ? `[DRY] would migrate ${expeditions.length} expedition(s).` : `✓ migrated ${expeditions.length} expedition(s).`)
