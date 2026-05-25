# Dossier Page — CMS Wiring Implementation Spec

## Goal

Wire up the full expedition dossier page to Sanity CMS and make it available for all 5 expeditions (not just Everest). Replace the hardcoded `/everest` static route with a dynamic `/expeditions/[slug]` route. Wire the Atlas index to CMS at the same time.

---

## Decisions

- The "dossier page" is the full expedition page — all 14 sections
- All 14 sections use the same universal template, populated with per-expedition CMS data
- Route: dynamic `/expeditions/:slug` (e.g. `/expeditions/everest`, `/expeditions/manaslu`)
- Remove the static `route('everest', ...)` in `routes.ts` entirely — project is not live
- Extend the existing `expedition` Sanity schema (do not create a separate dossier document)
- **SafetySupport, Preparation, and Inclusions stay hardcoded** — content is universal across all expeditions
- Lead Sherpa is a separate `sherpa` document type (referenced from expedition), not a nested object
- Availability modelled as Option A: simple `availableSeasons[]` array (name + dates). No per-edition slot matrix yet
- All 5 expeditions (Everest, Manaslu, Dhaulagiri, Makalu, Himchuli) will have content entered in Sanity
- Atlas index (`AtlasIndex.tsx`) wired to CMS at the same time as the dossier

---

## Repo Structure (relevant paths)

```
apps/
  studio/
    schemaTypes/
      documents/
        expedition.ts       ← extend this
        edition.ts          ← already has letter, name, subtitle, positioning, targetAudience — no changes needed
        sherpa.ts           ← CREATE THIS
      objects/
        audienceTile.ts     ← CREATE THIS
        journeyStage.ts     ← CREATE THIS
        routeWaypoint.ts    ← CREATE THIS
        availableSeason.ts  ← CREATE THIS
        faqItem.ts          ← CREATE THIS
      index.ts              ← register all new types
  web/
    src/
      routes.ts             ← remove /everest, add /expeditions/:slug
      lib/
        queries.ts          ← add getExpeditionBySlug(), add getExpeditions()
      app/
        pages/
          Everest.tsx        ← DELETE (replaced by ExpeditionDossier.tsx)
          ExpeditionDossier.tsx ← CREATE THIS
        components/
          everest/           ← refactor all components to accept props
          atlas/
            AtlasIndex.tsx   ← wire to CMS
```

---

## 1. New Sanity Object Types

### `audienceTile`
```ts
{ label: string, subline: string, description: string }
```

### `journeyStage`
```ts
{ title: string, description: string, image: image }
```

### `routeWaypoint`
```ts
{ name: string, altitude: string }
// e.g. { name: "Base Camp", altitude: "5,364 m" }
```

### `availableSeason`
```ts
{ name: string, dates: string }
// e.g. { name: "SPRING 2026", dates: "(Apr–May)" }
```

### `faqItem`
```ts
{ question: string, answer: text }
```

---

## 2. New Sanity Document Type: `sherpa`

Fields:
- `name` (string, required)
- `portrait` (image, hotspot: true) — note in studio: no AI-generated images
- `region` (string) — e.g. "Khumbu, Solukhumbu"
- `yearsActive` (string) — e.g. "22 seasons"
- `mountainsSupported` (string) — e.g. "Everest · Manaslu · Lhotse"
- `philosophyLine` (text) — short quote from the Sherpa

---

## 3. Extend `expedition` Schema

Add the following fields to `apps/studio/schemaTypes/documents/expedition.ts`.

Group them clearly in the studio (use `groups` if desired, or just descriptive `description` strings).

### Hero
- `heroImage` (image, hotspot: true) — full-width hero background
- `heroTagline` (string) — the large h1 text, e.g. "Everest Expedition — the highest journey on earth, guided by Himalayan wisdom."
- `heroSubtext` (text, rows: 3) — paragraph shown below the h1

### Quick Facts
The existing fields `altitude`, `region`, `season` already cover 3 of the 6 facts. Add:
- `duration` (string) — e.g. "60–65 days"
- `expeditionStyleFact` (string) — e.g. "Sherpa-led, oxygen-supported" (different from existing `style` field which is the short Atlas card label)
- `pricing` (string) — e.g. "By private consultation"

### Overview
- `overviewHeadline` (text, rows: 3) — the large italic headline
- `overviewBody` (text, rows: 5) — the body paragraph
- `overviewSideImage` (image, hotspot: true) — the small marginal photograph

### Who It Is For
- `whoItIsForHeadline` (string) — e.g. "Everest is not for everyone. It is for the prepared."
- `audienceTiles` (array of `audienceTile` objects, max 4)

### Journey Stages
- `journeyStages` (array of `journeyStage` objects) — ordered list of stages

### Route
- `routeWaypoints` (array of `routeWaypoint` objects) — ordered list of waypoints used to render the elevation diagram
- `routePhilosophy` (text, rows: 3) — the "Route Philosophy" caption
- `acclimatisationNote` (text, rows: 3) — the "Acclimatisation Cycle" caption
- `summitWindowNote` (text, rows: 3) — the "Summit Window" caption

### Yeti Infrastructure
Already exists: `yetiAirNote`, `yetiLodgesNote`, `yetiAccessNote`, `yetiContinuityNote` — no changes needed.

### Editions
Already exists: `editions[]` (references to `edition` documents) — no changes needed.

### Lead Sherpa
- `leadSherpa` (reference to `sherpa` document)

### Availability
- `availableSeasons` (array of `availableSeason` objects)

### FAQ
- `faqs` (array of `faqItem` objects)

### Closing
- `closingImage` (image, hotspot: true) — the silhouette/twilight background
- `closingStatement` (text, rows: 3) — the body paragraph in the closing section

---

## 4. Register New Types in `index.ts`

Import and register: `sherpa`, `audienceTile`, `journeyStage`, `routeWaypoint`, `availableSeason`, `faqItem`.

---

## 5. GROQ Queries (`apps/web/src/lib/queries.ts`)

### `getExpeditionBySlug(slug: string)`

```groq
*[_type == "expedition" && slug.current == $slug][0]{
  number,
  code,
  name,
  slug,
  altitude,
  region,
  season,
  style,
  positioning,
  image,
  heroImage,
  heroTagline,
  heroSubtext,
  duration,
  expeditionStyleFact,
  pricing,
  overviewHeadline,
  overviewBody,
  overviewSideImage,
  whoItIsForHeadline,
  audienceTiles[]{label, subline, description},
  journeyStages[]{title, description, image},
  routeWaypoints[]{name, altitude},
  routePhilosophy,
  acclimatisationNote,
  summitWindowNote,
  yetiAirNote,
  yetiLodgesNote,
  yetiAccessNote,
  yetiContinuityNote,
  editions[]->{letter, name, subtitle, positioning, targetAudience},
  leadSherpa->{name, portrait, region, yearsActive, mountainsSupported, philosophyLine},
  availableSeasons[]{name, dates},
  faqs[]{question, answer},
  closingImage,
  closingStatement
}
```

### `getExpeditions()`

```groq
*[_type == "expedition"] | order(number asc) {
  number,
  code,
  name,
  slug,
  altitude,
  region,
  season,
  style,
  positioning,
  image,
  editions[]->{letter, name}
}
```

---

## 6. Routing (`apps/web/src/routes.ts`)

- **Remove** `route('everest', './app/pages/Everest.tsx')`
- **Add** `route('expeditions/:slug', './app/pages/ExpeditionDossier.tsx')`

---

## 7. New Page: `ExpeditionDossier.tsx`

Create `apps/web/src/app/pages/ExpeditionDossier.tsx`.

- Uses React Router's `useParams` to get `slug`
- Has a loader function that calls `getExpeditionBySlug(slug)`
- Renders all 14 section components in order, passing CMS data as props
- If no expedition is found for the slug, render a 404 or redirect

Section render order:
1. `ExpeditionHero` (was EverestHero)
2. `QuickFacts`
3. `Overview`
4. `WhoItIsFor`
5. `ExpeditionEditions` (was EverestEditions)
6. `JourneyStages`
7. `RouteMap`
8. `SafetySupport` — **no props, stays hardcoded**
9. `YetiInfrastructureSupport`
10. `Preparation` — **no props, stays hardcoded**
11. `LeadSherpa` (was LeadSherpaPlaceholder)
12. `Availability`
13. `Inclusions` — **no props, stays hardcoded**
14. `ExpeditionFAQ`
15. `ExpeditionClosing` (was EverestClosing)
16. `Footer`

---

## 8. Refactor Everest Components

All components live in `apps/web/src/app/components/everest/`. Refactor each to accept props instead of using hardcoded values. Rename as noted.

### `EverestHero.tsx` → `ExpeditionHero.tsx`
Props: `name`, `heroImage`, `heroTagline`, `heroSubtext`, `altitude`, `region`, `season`, `style`, `slug` (for consultation link `?peak=slug`)

### `QuickFacts.tsx`
Props: `altitude`, `region`, `duration`, `season`, `expeditionStyleFact`, `pricing`

### `Overview.tsx`
Props: `overviewHeadline`, `overviewBody`, `overviewSideImage`

### `WhoItIsFor.tsx`
Props: `whoItIsForHeadline`, `audienceTiles: { label, subline, description }[]`

### `EverestEditions.tsx` → `ExpeditionEditions.tsx`
Props: `editions: { letter, name, subtitle, positioning, targetAudience }[]`
Map `subtitle` → `sub`, `targetAudience` → `for` in the render.

### `JourneyStages.tsx`
Props: `stages: { title, description, image }[]`
The stage number is derived from array index (idx + 1, zero-padded).

### `RouteMap.tsx`
Props: `waypoints: { name, altitude }[]`, `routePhilosophy`, `acclimatisationNote`, `summitWindowNote`

### `SafetySupport.tsx`
No changes — stays fully hardcoded.

### `YetiInfrastructureSupport.tsx`
Props: `airNote`, `lodgesNote`, `accessNote`, `continuityNote`

### `Preparation.tsx`
No changes — stays fully hardcoded.

### `LeadSherpaPlaceholder.tsx` → `LeadSherpa.tsx`
Props: `sherpa: { name, portrait, region, yearsActive, mountainsSupported, philosophyLine } | null`
If `sherpa` is null, render the existing placeholder layout.

### `Availability.tsx`
Props: `expeditionName: string`, `availableSeasons: { name, dates }[]`, `slug` (for consultation link)
The editions columns (A, B, C, D) and status cells remain as placeholder hardcoded UI — only the season rows become CMS-driven.

### `Inclusions.tsx`
No changes — stays fully hardcoded.

### `ExpeditionFAQ.tsx`
Props: `faqs: { question, answer }[]`, `expeditionName: string`

### `EverestClosing.tsx` → `ExpeditionClosing.tsx`
Props: `name`, `closingImage`, `closingStatement`, `slug` (for consultation link)

---

## 9. Wire Atlas (`AtlasIndex.tsx`)

- Remove the hardcoded `entries` array
- Accept `expeditions` as a prop (fetched via `getExpeditions()` in the Atlas page loader)
- Map CMS expedition fields to the card layout
- Update the "Read the Dossier" link to `/expeditions/${expedition.slug.current}`
- The "Schedule a Consultation" link stays as `/consultation`
- Use `expedition.image` (Sanity image URL via `urlFor`) for the card image
- The `isDark` alternating pattern can be derived from the array index (even = dark, odd = light) or added as a field — derive from index to keep it simple

---

## 10. Delete

- `apps/web/src/app/pages/Everest.tsx` — replaced by `ExpeditionDossier.tsx`

---

## Notes

- The `edition` schema already has all fields needed by `ExpeditionEditions` — no schema changes required there
- The existing `yeti*` fields on `expedition` already cover the `YetiInfrastructureSupport` section — no new schema fields needed there
- The `expeditionStyleFact` field is intentionally separate from the existing `style` field. `style` is the short Atlas card label (e.g. "Disciplined passage"); `expeditionStyleFact` is the longer QuickFacts value (e.g. "Sherpa-led, oxygen-supported")
- For Sanity image URLs in the web app, use the existing `urlFor` helper pattern already used in the project
- All 5 expedition documents should be created/updated in Sanity with full content once schema is deployed
