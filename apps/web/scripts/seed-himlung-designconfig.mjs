// Author Himlung Himal's EDITION-MAJOR `designConfig` and PUBLISH it.
// Peak-appropriate DRAFT adapted from Everest (no source CSV): Pisang Peak
// acclimatisation, Nar Phu lodging, mostly No-O₂ (reserve only at D), KTM–Koto
// helicopter. Flag for desk review. Base prices are PLACEHOLDERS.
//
// Run from apps/web:  node scripts/seed-himlung-designconfig.mjs [--dry]

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

const slug = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
const incd = (label) => ({ _type: 'configOption', _key: slug(label), label, included: true, priceDelta: 0 })
const add = (label, priceDelta = 0) => ({ _type: 'configOption', _key: slug(label), label, included: false, priceDelta })
const item = (name, options) => ({ _type: 'configItem', _key: slug(name), name, options })
const oxygen = (defaultBottles, opts = {}) => ({ _type: 'oxygenEdition', defaultBottles, min: 0, max: 8, pricePerBottle: 0, ...opts })

const B = {
  _type: 'editionConfig',
  acclimatisation: [add('Pisang Peak'), add('Ski / Snowboard Descent'), add('Nar Phu Cultural Extension')],
  accommodation: [
    item('Kathmandu', [incd('5-star, Twin, BB'), add('Selected Comfort Hotel, BB')]),
    item('During Trekking', [incd('Standard Teahouse')]),
  ],
  guiding: [
    item('Trekking', [incd('1:4 Guide'), add('Group Guide')]),
    item('Lead Climbing Guide', [incd('1:4 Nationally Accredited Guide')]),
    item('Support Sherpa', [incd('1:2 Shared (1 Sherpa for 2 members)')]),
    item('Expedition Camera Person', [incd('Not Included'), add('1 Personal Expedition Camera Person')]),
  ],
  oxygen: oxygen(0),
  helicopter: [add('KTM–Koto (fly-in to road head)'), add('1 Round Trip for Recovery (BC–BC)'), add('BC–KTM')],
}

const C = {
  _type: 'editionConfig',
  acclimatisation: [incd('Pisang Peak'), add('Ski / Snowboard Descent'), add('Nar Phu Cultural Extension')],
  accommodation: [
    item('Kathmandu', [incd('5-star, Single, BB'), add('Selected Comfort Hotel, BB')]),
    item('During Trekking', [incd('Best Available Lodges')]),
  ],
  guiding: [
    item('Trekking', [incd('1:3 Guide'), add('Group Guide')]),
    item('Lead Climbing Guide', [incd('1:4 IFMGA/UIAGM')]),
    item('Support Sherpa', [incd('1:1 Personal (1 personal climbing Sherpa)')]),
    item('Expedition Camera Person', [incd('Not Included'), add('1 Personal Expedition Camera Person')]),
  ],
  oxygen: oxygen(0),
  helicopter: [add('KTM–Koto (fly-in to road head)'), add('1 Round Trip for Recovery (BC–BC)'), add('BC–KTM')],
}

const D = {
  _type: 'editionConfig',
  acclimatisation: [incd('Pisang Peak'), add('Ski / Snowboard Descent'), add('Nar Phu Cultural Extension')],
  accommodation: [
    item('Kathmandu', [incd('5-star Premium, FB'), add('Selected Comfort Hotel, BB')]),
    item('During Trekking', [incd('Private Camp Setup')]),
  ],
  guiding: [
    item('Trekking', [incd('1:1 Private Trek Guide'), add('Group Guide')]),
    item('Lead Climbing Guide', [incd('1:1 IFMGA/UIAGM Guide')]),
    item('Support Sherpa', [incd('2:1 Dedicated Sherpas (2 Sherpas per member)')]),
    // Bundled at Definitive, but opt-out-able. priceDelta = CREDIT when removed
    // (negative) — stubbed at 0; desk to set the real credit.
    item('Expedition Camera Person', [incd('1 Personal Expedition Camera Person'), add('Not Included', 0)]),
  ],
  oxygen: oxygen(2), // reserve only
  helicopter: [incd('KTM–Koto (fly-in to road head)'), incd('1 Round Trip for Recovery (BC–BC)'), incd('BC–KTM')],
}

const designConfig = {
  _type: 'designConfig',
  basePrices: { B: 11000, C: 15000, D: 22000 }, // PLACEHOLDER — desk to replace
  b: B,
  c: C,
  d: D,
}

const pub = await client.fetch(`*[_type=="expedition" && slug.current=="himlung-himal"][0]{_id, name}`)
if (!pub?._id) {
  console.error('No published Himlung Himal expedition found.')
  process.exit(1)
}
const draftId = `drafts.${pub._id}`
console.log(`${pub.name} (${pub._id}) — edition-major designConfig · basePrices`, designConfig.basePrices)
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
