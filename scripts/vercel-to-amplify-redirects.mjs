// Converts apps/web/vercel.json redirects + rewrites into Amplify Hosting
// "Rewrites and redirects" JSON (paste into the Amplify console, or manage via IaC).
//
// Vercel -> Amplify mapping:
//   redirect permanent:true  -> status "301"
//   redirect permanent:false -> status "302"
//   rewrite                  -> status "200"
//   source ":path*"          -> "<*>"   (Amplify wildcard)
//
// Usage: node scripts/vercel-to-amplify-redirects.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const vercel = JSON.parse(
  readFileSync(resolve(root, 'apps/web/vercel.json'), 'utf8'),
)

// Amplify wildcard is <*>; a trailing "/:path*" or "/:slug*" becomes "/<*>".
const toAmplifyPath = (p) =>
  p
    .replace(/\/:[A-Za-z0-9_]+\*/g, '/<*>')
    .replace(/:[A-Za-z0-9_]+\*/g, '<*>')

// The studio proxy target lives on its own Amplify app. Set this after you
// create the studio app, then re-run this script (or edit the JSON in place).
const STUDIO_ORIGIN =
  process.env.STUDIO_ORIGIN ?? 'https://REPLACE_WITH_STUDIO_AMPLIFY_DOMAIN'

const rules = []

for (const r of vercel.redirects ?? []) {
  rules.push({
    source: toAmplifyPath(r.source),
    target: toAmplifyPath(r.destination),
    status: r.permanent ? '301' : '302',
  })
}

for (const w of vercel.rewrites ?? []) {
  rules.push({
    source: toAmplifyPath(w.source),
    target: toAmplifyPath(
      w.destination.replace(
        'https://thamserku-expedition-studio.vercel.app',
        STUDIO_ORIGIN,
      ),
    ),
    status: '200', // rewrite (proxy), not a redirect
  })
}

const out = resolve(root, 'docs/amplify-redirects.json')
writeFileSync(out, JSON.stringify(rules, null, 2) + '\n')
console.log(`Wrote ${rules.length} rules -> ${out}`)
