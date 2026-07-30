// Amplify WEB_COMPUTE's runtime environment-variable injection into the
// deployed Lambda has proven unreliable — values configured in App settings
// don't always reach `process.env` in the running function, even though the
// CodeBuild build container (where this script runs) consistently has them
// via Amplify's SSM secrets step. This patches only the compiled server
// bundle with `??=` fallbacks so a missing runtime value falls back to
// whatever was present at build time, without ever touching client assets.
//
// It also copies the SSR bundle's lazy chunks (build/server/assets/*) next to
// server.mjs: vite-plugin-react-router-amplify-hosting copies only server.mjs
// into .amplify-hosting/compute/default, so every dynamic import in the server
// bundle (stega encoding, the lazy SanityVisualEditing route chunk, …) throws
// ERR_MODULE_NOT_FOUND in the deployed Lambda.
import { readFileSync, writeFileSync, existsSync, cpSync } from "node:fs";

const SERVER_ENTRY = ".amplify-hosting/compute/default/server.mjs";

const KEYS = [
  "SANITY_WRITE_TOKEN",
  "SANITY_API_READ_TOKEN",
  "ZOHO_EMAIL",
  "ZOHO_APP_PASSWORD",
  "SITE_URL",
  "SESSION_SECRET",
];

if (!existsSync(SERVER_ENTRY)) {
  console.log(`[embed-server-secrets] ${SERVER_ENTRY} not found, skipping (not a compute build)`);
  process.exit(0);
}

const lines = [];
for (const key of KEYS) {
  const value = process.env[key];
  if (!value) {
    console.warn(`[embed-server-secrets] ${key} not set at build time, skipping`);
    continue;
  }
  lines.push(`process.env.${key} ??= ${JSON.stringify(value)};`);
}

const original = readFileSync(SERVER_ENTRY, "utf8");
writeFileSync(SERVER_ENTRY, lines.join("\n") + "\n" + original);
console.log(`[embed-server-secrets] embedded ${lines.length}/${KEYS.length} fallback(s) into ${SERVER_ENTRY}`);

if (existsSync("build/server/assets")) {
  cpSync("build/server/assets", ".amplify-hosting/compute/default/assets", { recursive: true });
  console.log("[embed-server-secrets] copied build/server/assets -> .amplify-hosting/compute/default/assets");
}
