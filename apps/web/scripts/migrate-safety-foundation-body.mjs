// Migrate safetyPage foundationBody from string[] to blockContent.
//
// Run from apps/web:  node scripts/migrate-safety-foundation-body.mjs [--dry]

import { createClient } from '@sanity/client'
import { randomBytes } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../../..')

const DRY = process.argv.slice(2).includes('--dry')

const env = readFileSync(resolve(root, 'apps/web/.env'), 'utf8')
const token = (env.match(/^SANITY_WRITE_TOKEN=(.+)$/m) || [])[1]?.trim()
const projectId =
  (env.match(/^VITE_SANITY_PROJECT_ID=(.+)$/m) || [])[1]?.trim() || 'dh94bf5m'
const dataset =
  (env.match(/^VITE_SANITY_DATASET=(.+)$/m) || [])[1]?.trim() || 'production'

if (!token && !DRY) {
  console.error('No SANITY_WRITE_TOKEN found in apps/web/.env')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-21',
  useCdn: false,
  token,
})

const blockKey = () => randomBytes(6).toString('hex')

function span(text, marks = []) {
  return { _type: 'span', _key: blockKey(), text, marks }
}

function normalBlock(text) {
  return {
    _type: 'block',
    _key: blockKey(),
    style: 'normal',
    markDefs: [],
    children: [span(text)],
  }
}

function convertFoundationBody(body) {
  if (!body) return body
  if (Array.isArray(body) && body[0]?._type === 'block') return body

  if (Array.isArray(body)) {
    return body
      .flatMap((item) => {
        if (typeof item !== 'string') return []
        return item
          .split(/\n\n+/)
          .map((s) => s.trim())
          .filter(Boolean)
      })
      .map(normalBlock)
  }

  if (typeof body === 'string') {
    return body
      .split(/\n\n+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map(normalBlock)
  }

  return body
}

const doc = await client.fetch(`*[_type == "safetyPage"][0]`)
if (!doc?._id) {
  console.error('safetyPage document not found')
  process.exit(1)
}

const foundationBody = convertFoundationBody(doc.foundationBody)

console.log(JSON.stringify(foundationBody, null, 2))

if (DRY) {
  console.log('\nDry run — no changes written.')
  process.exit(0)
}

await client.patch(doc._id).set({ foundationBody }).commit()

console.log('\nMigrated safetyPage foundationBody to blockContent.')
