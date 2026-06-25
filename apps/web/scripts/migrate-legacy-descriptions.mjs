// Migrate legacyPage timeline chapter descriptions from plain text to blockContent.
//
// Run from apps/web:  node scripts/migrate-legacy-descriptions.mjs [--dry]

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

function strongBlock(text) {
  return {
    _type: 'block',
    _key: blockKey(),
    style: 'normal',
    markDefs: [],
    children: [span(text, ['strong'])],
  }
}

function bulletBlock(text) {
  return {
    _type: 'block',
    _key: blockKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [span(text)],
  }
}

function convertDescription(text) {
  if (!text || typeof text !== 'string') return text
  if (Array.isArray(text)) return text

  const blocks = []
  const chunks = text
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean)

  for (const chunk of chunks) {
    if (chunk.startsWith('**Notable milestones**')) {
      const lines = chunk.split('\n').map((s) => s.trim()).filter(Boolean)
      const heading = lines[0].replace(/^\*\*|\*\*$/g, '')
      blocks.push(strongBlock(heading))

      const itemsText = lines.slice(1).join(' ').trim()
      if (!itemsText) continue

      if (itemsText.includes(' · ')) {
        for (const item of itemsText.split(' · ').map((s) => s.trim()).filter(Boolean)) {
          blocks.push(bulletBlock(item))
        }
      } else {
        blocks.push(bulletBlock(itemsText))
      }
      continue
    }

    blocks.push(normalBlock(chunk))
  }

  return blocks
}

const doc = await client.fetch(`*[_type == "legacyPage"][0]`)
if (!doc?._id) {
  console.error('legacyPage document not found')
  process.exit(1)
}

const chapters = (doc.timelineChapters ?? []).map((chapter) => ({
  ...chapter,
  title: typeof chapter.title === 'string' ? chapter.title.trim() : chapter.title,
  description: convertDescription(chapter.description),
}))

console.log(JSON.stringify(chapters.map((c) => ({ title: c.title, description: c.description })), null, 2))

if (DRY) {
  console.log('\nDry run — no changes written.')
  process.exit(0)
}

await client
  .patch(doc._id)
  .set({ timelineChapters: chapters })
  .commit()

console.log('\nMigrated legacyPage timeline chapter descriptions to blockContent.')
