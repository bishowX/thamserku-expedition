// Seed the `achievementsPage` singleton with the Achievements page content.
//
// Run from apps/web:  node scripts/seed-achievements-page.mjs [--dry]

import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../../..') // repo root (apps/web/scripts → up 3)

const DRY = process.argv.slice(2).includes('--dry')

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

const key = (n) => `ach-${n}`

const doc = {
  _id: 'achievementsPage',
  _type: 'achievementsPage',
  heroHeadline: 'A history written in altitude.',
  heroSubheading:
    'A structured record of the Himalayan expeditions our house has been part of — across nearly four decades of seasons, summits, and quiet days on the mountain.',
  stats: [
    { _key: key('s1'), _type: 'statItem', value: '37+', label: 'Years' },
    { _key: key('s2'), _type: 'statItem', value: '800+', label: 'Expeditions' },
    { _key: key('s3'), _type: 'statItem', value: '66+', label: 'Peaks' },
    { _key: key('s4'), _type: 'statItem', value: '42+', label: 'Nations' },
  ],
  decades: [
    {
      _key: key('d1'),
      _type: 'achievementDecade',
      years: '1987 – 1992',
      title: 'Founding Years',
      body:
        "Thamserku Expedition launched in 1987 with expeditions to Dhaulagiri I, Pumori, and Sita Chuchura — immediately signalling intent to operate at the highest technical levels of Himalayan mountaineering.\n\nIn its very first year, the company facilitated Marc Batard's record-breaking speed ascent of Everest — the fastest ever recorded — and his achievement of summiting four 8,000m peaks in under nine months. The founding years established the operational framework across the Khumbu Himal that would define the company for generations.",
      meta: '17 expeditions · Dhaulagiri, Pumori, Everest, Makalu, Baruntse',
    },
    {
      _key: key('d2'),
      _type: 'achievementDecade',
      years: '1993 – 2001',
      title: 'Growth and Diversification',
      body:
        "The decade saw Thamserku expand dramatically — adding Cho Oyu (which would become the single most operated peak with 217 expeditions), Kangchenjunga, Nuptse, Tilicho, Putha Hiunchuli, Manaslu, Himlung Himal, and numerous technical objectives across all major regions.\n\n1993: Pasang Lhamu Sherpa becomes the first Nepalese woman to summit Everest — a defining moment for Nepali mountaineering. 1996: Hans Kammerlander completes the first ski descent from Everest's summit. 2000: Jean-Christophe Lafaille's first solo ascent of Manaslu. 2001: First paragliding descent from Everest's summit.",
      meta: '160+ expeditions · 25+ distinct peaks',
    },
    {
      _key: key('d3'),
      _type: 'achievementDecade',
      years: '2002 – 2011',
      title: 'The Peak Years',
      body:
        'The highest operational volume decade — peaking at 78 expeditions in 2006 alone. Cho Oyu dominated with 20+ simultaneous or sequential expeditions per season, while Everest operations grew in scope and international reach.\n\n2003: Juanito Oiarzabal becomes the first person to summit all fourteen 8,000ers 20 times under Thamserku support. 2004: First Greek citizen on Everest. 2005: First Muslim woman on Everest. 2006: First Philippines expedition, first British couple together, first Type 1 diabetic on the summit. 2009: Piano at 7,400m on Cho Oyu.',
      meta: '444 expeditions · Peak: 78 in 2006',
    },
    {
      _key: key('d4'),
      _type: 'achievementDecade',
      years: '2012 – Present',
      title: 'Selective Excellence',
      body:
        'A deliberate shift toward fewer expeditions with greater depth of service — reflecting evolving industry standards and a more discerning international client base. The company continued supporting significant expeditions through the 2020s, including notable ascents on Everest in 2022.\n\nThis era represents the transition to the current Thamserku identity: the five-Edition architecture, the focus on luxury expedition experiences, and the integration with the broader Thamserku Group ecosystem (Yeti Airlines, Tara Air, Mountain Lodges of Nepal).',
      meta: 'Quality over quantity · New brand architecture',
    },
  ],
}

if (DRY) {
  console.log(JSON.stringify(doc, null, 2))
  console.log('\n[dry] would createOrReplace achievementsPage')
  process.exit(0)
}

const res = await client.createOrReplace(doc)
console.log('✓ seeded', res._id)
