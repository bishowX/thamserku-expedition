// Render the EXACT booking-notification email (same buildBookingHtml the live
// action uses) to apps/web/booking-email-preview.html — no Resend, no domain,
// no inbox needed. Open the file in a browser to verify every detail/section.
//
// Run from apps/web:  node scripts/preview-booking-email.mjs

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { buildBookingHtml, buildClimberHtml } from '../src/lib/email.server.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = resolve(__dirname, '../booking-email-preview.html')
const climberOut = resolve(__dirname, '../booking-email-climber-preview.html')

// A fully-populated example (every section + multiselects with several items).
const html = buildBookingHtml({
  fullName: 'Bishow Pandey',
  email: 'pandeybishow306@gmail.com',
  phone: '+977 9800000000',
  expeditionName: 'Everest',
  expeditionType: 'private',
  numberOfClimbers: '2',
  season: 'custom',
  startDate: '2027-04-23',
  endDate: '2027-05-30',
  specialObjectives: 'Ski / Snowboard Descent; Speed Record Attempt; First documented winter line',
  editionLetter: 'D',
  editionName: 'Definitive',
  lineItems: [
    { label: 'Additional Climbs', chosenLabel: 'Acclimatisation Climb · Lobuche Peak, Lhotse Climb, Ski / Snowboard Descent, Kasara Jungle Resort (Retreat)', priceDelta: 0 },
    { label: 'Kathmandu', chosenLabel: 'Selected Comfort Hotel, BB', priceDelta: 0 },
    { label: 'During Trekking', chosenLabel: 'Enhanced Lodges', priceDelta: 0 },
    { label: 'Trekking Guide', chosenLabel: 'Group Guide', priceDelta: 0 },
    { label: 'Lead Climbing Guide', chosenLabel: '1:4 Nationally Accredited Guide', priceDelta: 0 },
    { label: 'Support Sherpa', chosenLabel: '1:2 Shared (1 Sherpa for 2 members)', priceDelta: 0 },
    { label: 'Expedition Camera Person', chosenLabel: '1 Personal Expedition Camera Person', priceDelta: 0 },
    { label: 'Oxygen Bottles ×4L', chosenLabel: 'As Per Standard Program (4)', priceDelta: 0 },
    { label: 'Helicopter', chosenLabel: 'KTM–Lukla, 1 Round Trip for Recovery (BC–BC), BC–KTM', priceDelta: 0 },
  ],
  basePrice: 95000,
  estimatedTotal: 95000, // Definitive base + $0 deltas
  estimatedLow: 85500, // −10%
  estimatedHigh: 104500, // +10%
  currency: 'USD',
  message: 'Live end-to-end test of the Everest configurator.',
  submittedAt: new Date().toISOString(),
})

writeFileSync(out, html)
console.log('Wrote', out)

// Climber confirmation — payload with several EMPTY fields (shared expedition →
// no climbers; autumn → no dates; no phone, no message) to show they're dropped.
const climberHtml = buildClimberHtml({
  fullName: 'Bishow Pandey',
  email: 'pandeybishow306@gmail.com',
  phone: undefined,
  expeditionName: 'Himlung Himal',
  expeditionType: 'shared',
  numberOfClimbers: undefined,
  season: 'autumn',
  startDate: undefined,
  endDate: undefined,
  specialObjectives: 'Ski / Snowboard Descent; First 7000m',
  editionLetter: 'C',
  editionName: 'Crafted',
  lineItems: [
    { label: 'Additional Climbs', chosenLabel: 'Acclimatisation Climb · Pisang Peak, Ski / Snowboard Descent', priceDelta: 0 },
    { label: 'Kathmandu', chosenLabel: '5-Star, Single, BB', priceDelta: 0 },
    { label: 'During Trekking', chosenLabel: 'Best Available Lodges', priceDelta: 0 },
    { label: 'Trekking Guide', chosenLabel: '1:3 Guide', priceDelta: 0 },
    { label: 'Lead Climbing Guide', chosenLabel: '1:4 IFMGA/UIAGM', priceDelta: 0 },
    { label: 'Support Sherpa', chosenLabel: '1:1 Personal (1 personal climbing Sherpa)', priceDelta: 0 },
    { label: 'Expedition Camera Person', chosenLabel: 'Not Included', priceDelta: 0 },
    { label: 'Oxygen Bottles ×4L', chosenLabel: '2 × 4L', priceDelta: 0 },
    { label: 'Helicopter', chosenLabel: 'KTM–Koto (fly-in to road head)', priceDelta: 0 },
  ],
  basePrice: 15000,
  estimatedTotal: 15000, // Crafted base + $0 deltas
  estimatedLow: 13500, // −10%
  estimatedHigh: 16500, // +10%
  currency: 'USD',
  message: undefined,
  submittedAt: new Date().toISOString(),
})
writeFileSync(climberOut, climberHtml)
console.log('Wrote', climberOut)
