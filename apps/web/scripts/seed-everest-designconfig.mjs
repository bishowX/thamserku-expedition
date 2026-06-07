// Author Everest's EDITION-MAJOR `designConfig` from the clean "Expedition
// Design Form" CSV (Everest tab) and PUBLISH it.
//
// Each edition (B/C/D) is authored independently with the five categories:
//   Acclimatisation & Helicopter → pick-many options (each included or add-on)
//   Accommodation & Guiding       → named pick-one items (one option included)
//   Oxygen                         → default bottle count + range
//
// Alpine (A) & Explorer (E) are "Project Dependent" — no config here.
// Base prices are PLACEHOLDERS (no prices in source) — desk must replace.
// All priceDeltas 0 until the desk provides real upgrade/add-on prices.
//
// Run from apps/web:  node scripts/seed-everest-designconfig.mjs [--dry]

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

const client = createClient({ projectId: 'ugjhuor8', dataset: 'production', apiVersion: '2026-05-21', useCdn: false, token })

// ── builders ─────────────────────────────────────────────────────────────────
const slug = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
const incd = (label) => ({ _type: 'configOption', _key: slug(label), label, included: true, priceDelta: 0 })
const add = (label, priceDelta = 0) => ({ _type: 'configOption', _key: slug(label), label, included: false, priceDelta })
const item = (name, options) => ({ _type: 'configItem', _key: slug(name), name, options })
const oxygen = (defaultBottles, opts = {}) => ({ _type: 'oxygenEdition', defaultBottles, min: 0, max: 16, pricePerBottle: 0, ...opts })

// Helicopter is a SINGLE item in the CSV: "Add-on" at B/C, and an included
// 3-flight package at D (KTM–Lukla · Recovery BC–BC · BC–KTM).
const HELI = 'KTM–Lukla · 1 Round Trip for Recovery (BC–BC) · BC–KTM'

// ── per-edition configs ──────────────────────────────────────────────────────
const B = {
  _type: 'editionConfig',
  acclimatisation: [add('Lobuche Peak'), add('Lhotse Climb'), add('Ski / Snowboard Descent')],
  accommodation: [
    item('Kathmandu', [incd('5-star, Twin, BB'), add('Selected Comfort Hotel, BB')]),
    item('During Trekking', [incd('Standard Teahouse'), add('Enhanced Lodges')]),
  ],
  guiding: [
    item('Trekking', [incd('1:4 Guide'), add('Group Guide')]),
    item('Lead Climbing Guide', [incd('1:4 Nationally Accredited Guide')]),
    item('Support Sherpa', [incd('1:2 Shared (1 Sherpa for 2 members)')]),
    item('Expedition Camera Person', [incd('Not Included'), add('1 Personal Expedition Camera Person')]),
  ],
  oxygen: oxygen(6),
  helicopter: [add(HELI)],
}

const C = {
  _type: 'editionConfig',
  acclimatisation: [incd('Lobuche Peak'), add('Lhotse Climb'), add('Ski / Snowboard Descent')],
  accommodation: [
    item('Kathmandu', [incd('5-star, Single, BB'), add('Selected Comfort Hotel, BB')]),
    item('During Trekking', [incd('Full circuit, MLN + Enhanced Lodges'), add('Enhanced Lodges')]),
  ],
  guiding: [
    item('Trekking', [incd('1:3 Guide'), add('Group Guide')]),
    item('Lead Climbing Guide', [incd('1:4 IFMGA/UIAGM')]),
    item('Support Sherpa', [incd('1:1 Personal (1 personal climbing Sherpa)')]),
    item('Expedition Camera Person', [incd('Not Included'), add('1 Personal Expedition Camera Person')]),
  ],
  oxygen: oxygen(8),
  helicopter: [add(HELI)],
}

const D = {
  _type: 'editionConfig',
  acclimatisation: [incd('Lobuche Peak'), add('Lhotse Climb'), add('Ski / Snowboard Descent')],
  accommodation: [
    item('Kathmandu', [incd('5-star Premium, FB'), add('Selected Comfort Hotel, BB')]),
    item('During Trekking', [incd('Full circuit, MLN + Enhanced Lodges'), add('Enhanced Lodges')]),
  ],
  guiding: [
    item('Trekking', [incd('1:1 Private Trek Guide'), add('Group Guide')]),
    item('Lead Climbing Guide', [incd('1:1 IFMGA/UIAGM Guide')]),
    item('Support Sherpa', [incd('2:1 Dedicated Sherpas (2 Sherpas per member)')]),
    // Bundled at Definitive, but the climber may opt out. priceDelta is the
    // CREDIT when removed (negative) — stubbed at 0; desk to set the real credit.
    item('Expedition Camera Person', [incd('1 Personal Expedition Camera Person'), add('Not Included', 0)]),
  ],
  oxygen: oxygen(13, { unlimitedThreshold: 13 }),
  helicopter: [incd(HELI)],
}

const designConfig = {
  _type: 'designConfig',
  basePrices: { B: 45000, C: 65000, D: 95000 }, // PLACEHOLDER — desk to replace
  b: B,
  c: C,
  d: D,
}

const pub = await client.fetch(`*[_type=="expedition" && slug.current=="everest"][0]{_id}`)
if (!pub?._id) {
  console.error('No published Everest expedition found.')
  process.exit(1)
}
const draftId = `drafts.${pub._id}`
console.log(`Everest (${pub._id}) — edition-major designConfig · basePrices`, designConfig.basePrices)
if (DRY) {
  console.log('[DRY] would set designConfig, unset legacy configMatrix, and delete the stale draft.')
  process.exit(0)
}
await client.patch(pub._id).set({ designConfig }).unset(['configMatrix']).commit()
try {
  await client.delete(draftId)
  console.log(`✓ published designConfig set · stale draft ${draftId} removed`)
} catch {
  console.log('✓ published designConfig set (no draft to remove)')
}
