# Deploying to AWS Amplify

This monorepo deploys as **two** AWS Amplify Hosting apps from the same GitHub repo:

| Amplify app | App root | Platform | Output |
|-------------|----------|----------|--------|
| **Website** | `apps/web` | WEB_COMPUTE (SSR, Node 20 Lambda) | `.amplify-hosting/` |
| **Studio**  | `apps/studio` | Static (SPA) | `dist/` |

The website is a React Router 7 SSR app. `vite-plugin-react-router-amplify-hosting`
(in `apps/web/vite.config.ts`) bundles the server into `.amplify-hosting/compute/default/server.mjs`
and writes `deploy-manifest.json`, which is what Amplify's compute runtime reads.

Build spec for both apps lives in the repo-root [`amplify.yml`](../amplify.yml).

---

## 1. Create the two apps

In the Amplify console → **Create new app → Host web app** → connect GitHub → pick this repo.
Do this **twice**, once per app. In each app's build settings set the **monorepo app root**:

- Website app → app root `apps/web`
- Studio app → app root `apps/studio`

Amplify reads the matching `applications:` block from `amplify.yml` automatically.

The website app should be detected as **WEB_COMPUTE** (because `.amplify-hosting/deploy-manifest.json`
is present in the artifacts). If it deploys as static instead, set the platform to `WEB_COMPUTE`
(console: App settings → General, or CLI: `aws amplify update-app --app-id <id> --platform WEB_COMPUTE`).

## 2. Environment variables

Set these in each app's **App settings → Environment variables**.

### Website (`apps/web`)

Build-time (`VITE_*`, baked into the client bundle — must exist when the build runs):

- `VITE_SANITY_PROJECT_ID` = `dh94bf5m`
- `VITE_SANITY_DATASET` = `production`
- `VITE_SANITY_STUDIO_URL` = the Studio app URL, e.g. `https://<studio-domain>/studio`
- `VITE_GOOGLE_CALENDAR_URL`

Runtime (server / Lambda — read from `process.env` inside `server.mjs`):

- `SANITY_API_READ_TOKEN`
- `SANITY_WRITE_TOKEN`
- `SESSION_SECRET`
- `SITE_URL` = the production website URL
- `ZOHO_EMAIL`, `ZOHO_APP_PASSWORD` (email sending)

> Amplify injects the app's environment variables into the SSR compute at runtime. If a
> server var ever comes back `undefined` in the Lambda, add it to the app's
> **environment variables allowlist** (App settings → Environment variables → Manage variables).

### Studio (`apps/studio`)

`projectId`/`dataset` are hardcoded in `sanity.cli.ts` / `sanity.config.ts`, so no env vars are
strictly required to build. The build does bundle `SANITY_STUDIO_PREVIEW_ORIGIN` (used for
Presentation/preview) — set it to the website URL if you use visual editing, otherwise it's optional.

## 3. Redirects & rewrites (website app)

The old `vercel.json` redirects/rewrites were converted to Amplify format in
[`amplify-redirects.json`](./amplify-redirects.json) (regenerate with
`node scripts/vercel-to-amplify-redirects.mjs`).

In the **website** app → **App settings → Rewrites and redirects → Open text editor**, paste the
contents of `amplify-redirects.json`.

Before pasting, fix the Studio proxy target: the last two rules point at
`REPLACE_WITH_STUDIO_AMPLIFY_DOMAIN`. Set it to your Studio app's domain and regenerate:

```bash
STUDIO_ORIGIN=https://<studio-domain> node scripts/vercel-to-amplify-redirects.mjs
```

These two rules (`/studio/<*>` and `/static/<*>`, status `200`) proxy the Studio into the website
under `/studio`, matching the Studio's `basePath: '/studio'`.

## 4. Redirects (studio app)

The Studio is a client-routed SPA served under `/studio`. Add this SPA fallback rule in the
**studio** app → Rewrites and redirects so deep links resolve:

```json
[
  {
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp|avif)$)([^.]+$)/>",
    "target": "/index.html",
    "status": "200"
  }
]
```

## 5. Image cache headers (optional)

`vercel.json` set `Cache-Control: public, max-age=86400, stale-while-revalidate=604800` on
`/images/*`. To reproduce, add a **Custom header** in the website app (App settings → Custom
headers) for pattern `/images/**`. (Amplify already fingerprints and long-caches hashed `/assets/*`.)

## 6. Deploy

Push to the connected branch. Each app builds independently. Verify on the website:

- SSR pages render (view source shows server-rendered HTML)
- The consultation/contact form sends email (exercises `email.server.ts` in the Lambda)
- `/studio` loads the Studio through the proxy rewrite

---

### Local build check

```bash
pnpm --filter @thamserku/web build   # produces apps/web/.amplify-hosting/
pnpm --filter @thamserku/studio build # produces apps/studio/dist/
```
