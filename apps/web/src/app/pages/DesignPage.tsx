import { useState } from 'react'
import { useLoaderData, useSearchParams, useActionData, useNavigation, Form } from 'react-router'
import type { ShouldRevalidateFunction } from 'react-router'
import { useQuery } from '@sanity/react-loader'
import type { QueryResponseInitial } from '@sanity/react-loader'
import { stegaClean } from '@sanity/client/stega'
import { Nav } from '../components/Nav'
import { urlFor } from '../../lib/sanity'
import { writeClient } from '../../lib/sanity.write'
import { serverClient } from '../../lib/sanity.server'
import { DESIGN_QUERY, normalizeDesignPageData } from '../../lib/queries'
import { getExpeditionConfig } from '../../lib/queries.server'
import { getPreviewData } from '../../lib/preview.server'
import { loadQuery } from '../../lib/loader.server'
import { pageMeta } from "../../lib/seo";
import type { RawDesignPageData, SanityExpeditionForDesign, SanityEditionForDesign } from '../../lib/queries'
import { sendBookingEmail, sendBookingConfirmationEmail } from '../../lib/email.server'
import {
  computeEstimate,
  configuratorGroups,
  defaultSelections,
  chosenLabelFor,
  chosenLabelsArr,
  type EditionLetter,
  type SelectionValue,
} from '../../lib/configMatrix'
import { StepFormat, CUSTOM_PEAK, type FormatValue } from '../components/design/steps/StepFormat'
import { StepCustomContact } from '../components/design/steps/StepCustomContact'
import { ConfiguratorStep, type NumberedGroup } from '../components/design/ConfiguratorStep'
import { ConfigSummary, MobileConfigBar, type SummaryItem } from '../components/design/ConfigSummary'
import { StepTimelineA } from '../components/design/StepTimeline'

export async function loader({ request }: { request: Request }) {
  const { options } = await getPreviewData(request)
  const initial = await loadQuery<RawDesignPageData>(DESIGN_QUERY, {}, options)
  return { initial }
}

// Loader data never depends on search params — suppress revalidation on step navigation
export function meta() {
  return pageMeta({
    title: "Design Your Expedition",
    description: "Configure your custom high-altitude expedition — choose your peak, edition, accommodation, guiding, and oxygen preferences.",
  });
}

export const shouldRevalidate: ShouldRevalidateFunction = () => false

// Which matrix groups fall on which configuration step. Group names that aren't
// listed here are appended to the last configuration step, so the flow degrades
// gracefully if a peak introduces a new section.
const STEP_A_GROUPS = ['Acclimatisation & Additional Climb', 'Accommodation Preferences']
const STEP_B_GROUPS = ['Guiding Configurations', 'Oxygen Preferences', 'Helicopter Inclusion']

const shortEdition = (name: string) => name.replace(/\s*Edition$/i, '')

type ActionErrors = { fullName?: string; email?: string }

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export async function action({ request }: { request: Request }): Promise<
  { success: true } | { success: false; errors: ActionErrors }
> {
  const formData = await request.formData()
  const str = (k: string) => (formData.get(k) as string | null)?.trim() || undefined

  const fullName = str('fullName') ?? ''
  const email = str('email') ?? ''
  const phone = str('phone') ?? ''
  const message = str('message')

  const errors: ActionErrors = {}
  if (!fullName) errors.fullName = 'Please enter your name.'
  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'
  if (Object.keys(errors).length > 0) return { success: false, errors }

  const expeditionId = str('expeditionId')
  const editionId = str('editionId')
  const editionLetter = (str('editionLetter') ?? '') as EditionLetter
  const editionName = str('editionName')

  // Universal expedition-format fields (not part of the per-peak matrix).
  const customPeakName = str('customPeakName')
  const expeditionType = str('expeditionType')
  const numberOfClimbers = str('numberOfClimbers')
  const season = str('season')
  const startDate = str('startDate')
  const endDate = str('endDate')
  const specialObjectives = str('specialObjectives')

  // Parse the raw selection map, then price it server-side from the live matrix
  // (never trust client-supplied prices).
  let rawSelections: Record<string, SelectionValue> = {}
  try {
    rawSelections = JSON.parse((formData.get('selectionsJson') as string) || '{}')
  } catch {
    rawSelections = {}
  }

  const config = expeditionId ? await getExpeditionConfig(expeditionId) : null
  const estimate = config
    ? computeEstimate(config.configMatrix, editionLetter, config.basePrices, rawSelections)
    : { basePrice: null, total: null, low: null, high: null, currency: 'USD', lineItems: [] }

  const submittedAt = new Date().toISOString()

  await writeClient.create({
    _type: 'booking',
    submittedAt,
    fullName,
    email: email || undefined,
    phone: phone || undefined,
    customPeakName,
    expeditionType,
    numberOfClimbers,
    season,
    startDate,
    endDate,
    specialObjectives,
    message,
    expedition: expeditionId ? { _type: 'reference', _ref: expeditionId } : undefined,
    edition: editionId ? { _type: 'reference', _ref: editionId } : undefined,
    selections: estimate.lineItems.map((li) => ({
      _key: li.key,
      _type: 'bookingSelection',
      key: li.key,
      label: li.label,
      group: li.group,
      chosenLabel: li.chosenLabel,
      priceDelta: li.priceDelta,
    })),
    basePrice: estimate.basePrice ?? undefined,
    estimatedTotal: estimate.total ?? undefined,
    estimatedLow: estimate.low ?? undefined,
    estimatedHigh: estimate.high ?? undefined,
    currency: estimate.currency,
  })

  const emailData = {
    fullName,
    email: email || undefined,
    phone: phone || undefined,
    message,
    expeditionName: config?.name,
    customPeakName,
    expeditionType,
    numberOfClimbers,
    season,
    startDate,
    endDate,
    specialObjectives,
    editionLetter: editionLetter || undefined,
    editionName,
    lineItems: estimate.lineItems,
    basePrice: estimate.basePrice ?? undefined,
    estimatedTotal: estimate.total ?? undefined,
    estimatedLow: estimate.low ?? undefined,
    estimatedHigh: estimate.high ?? undefined,
    currency: estimate.currency,
    submittedAt,
  }

  // Desk notification — to the enquiry inbox configured in Sanity siteSettings.
  try {
    const enquiryEmail = await serverClient.fetch<string | undefined>(
      `*[_type == "siteSettings"][0].enquiryEmail`
    )
    console.log('[email] desk enquiryEmail from Sanity =', enquiryEmail ?? '(not set)')
    if (enquiryEmail) await sendBookingEmail(enquiryEmail, emailData)
    else console.warn('[email] sendBookingEmail skipped: enquiryEmail not configured in Sanity siteSettings')
  } catch (err) {
    console.error('[email] sendBookingEmail failed:', err)
  }

  // Confirmation to the climber (email is required, so always present).
  console.log('[email] climber confirmation to =', email)
  try {
    await sendBookingConfirmationEmail(email, emailData)
  } catch (err) {
    console.error('[email] sendBookingConfirmationEmail failed:', err)
  }

  return { success: true }
}

// edition.letter comes from Sanity and may carry stega hidden characters. Strip
// them before using the letter as an EditionLetter key in the config matrix.
const cleanLetter = (letter: string): EditionLetter => stegaClean(letter) as EditionLetter

const EMPTY_FORMAT: FormatValue = {
  expeditionType: '',
  numberOfClimbers: '',
  season: '',
  startDate: '',
  endDate: '',
  customPeakName: '',
}

export default function DesignPage() {
  const { initial } = useLoaderData() as { initial: QueryResponseInitial<RawDesignPageData> }
  const { data: raw } = useQuery<RawDesignPageData>(DESIGN_QUERY, {}, { initial })
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const [searchParams, setSearchParams] = useSearchParams()

  // Live updates return the raw payload; reattach config matrices + sort here.
  const { expeditions, editions, page } = normalizeDesignPageData(raw)

  const heroHeadline = page?.heroHeadline || 'Design your Expedition'
  const heroSubheading = page?.heroSubheading || 'Select your Edition first — it pre-configures the standards. Then personalise every detail. We do not believe in quoting a number before understanding your climb.'
  const bgImageSrc = page?.heroBgImage ? urlFor(page.heroBgImage).width(1920).url() : undefined

  const [selectedPeak, setSelectedPeak] = useState<string>(() => searchParams.get('expedition') ?? '')
  const [edition, setEdition] = useState<SanityEditionForDesign | null>(
    () => editions.find((e) => e.letter === searchParams.get('edition')) ?? null,
  )
  const [format, setFormat] = useState<FormatValue>(EMPTY_FORMAT)
  const [objectives, setObjectives] = useState<string[]>([])
  const [objectivesNote, setObjectivesNote] = useState('')

  const expedition: SanityExpeditionForDesign | null =
    selectedPeak && selectedPeak !== CUSTOM_PEAK ? expeditions.find((e) => e.slug === selectedPeak) ?? null : null
  const isCustomPeak = selectedPeak === CUSTOM_PEAK

  const [selections, setSelections] = useState<Record<string, SelectionValue>>(() => {
    const exp = expeditions.find((e) => e.slug === searchParams.get('expedition')) ?? null
    const ed = editions.find((e) => e.letter === searchParams.get('edition')) ?? null
    return exp && ed ? defaultSelections(exp.configMatrix, cleanLetter(ed.letter)) : {}
  })

  // ── Steps: format → (configure steps) → custom+contact ──────────────────────
  const allGroups = expedition && edition ? configuratorGroups(expedition.configMatrix, cleanLetter(edition.letter)) : []
  const numbered: NumberedGroup[] = allGroups.map((group, i) => ({ number: 4 + i, group }))
  const stepA = numbered.filter((n) => STEP_A_GROUPS.includes(n.group.group))
  const stepBNamed = numbered.filter((n) => STEP_B_GROUPS.includes(n.group.group))
  const unlisted = numbered.filter(
    (n) => !STEP_A_GROUPS.includes(n.group.group) && !STEP_B_GROUPS.includes(n.group.group),
  )
  const configSteps = [stepA, [...stepBNamed, ...unlisted]].filter((s) => s.length > 0)

  const stepKeys = ['format', ...configSteps.map((_, i) => `configure-${i}`), 'custom']
  const isProject = Boolean(edition) && configSteps.length === 0

  const stepLabels = stepKeys.map((key) => {
    if (key === 'format') return 'Expedition Format'
    if (key === 'custom') return 'Your Details'
    const idx = parseInt(key.split('-')[1] ?? '0')
    return idx === 0 ? 'Acclimatisation' : 'Guiding & Oxygen'
  })

  // Before an edition is chosen, configSteps is empty and stepLabels collapses to
  // ['Expedition Format', 'Your Details']. Show the full expected flow as a placeholder
  // so the user sees where they're headed before committing to an edition tier.
  const timelineLabels = edition
    ? stepLabels
    : ['Expedition Format', 'Acclimatisation', 'Guiding & Oxygen', 'Your Details']

  const rawStep = Number(searchParams.get('step') ?? '0')
  const step = Math.min(Math.max(rawStep, 0), stepKeys.length - 1)
  const isLast = step === stepKeys.length - 1

  function syncToUrl(n: number) {
    setSearchParams(
      (prev) => {
        prev.set('step', String(n))
        if (selectedPeak) prev.set('expedition', selectedPeak)
        else prev.delete('expedition')
        if (edition) prev.set('edition', cleanLetter(edition.letter))
        else prev.delete('edition')
        return prev
      },
      { replace: true },
    )
  }

  function reseed(peakSlug: string, ed: SanityEditionForDesign | null) {
    const exp = peakSlug && peakSlug !== CUSTOM_PEAK ? expeditions.find((e) => e.slug === peakSlug) ?? null : null
    setSelections(exp && ed ? defaultSelections(exp.configMatrix, cleanLetter(ed.letter)) : {})
  }

  function handlePeakChange(slug: string) {
    setSelectedPeak(slug)
    reseed(slug, edition)
  }

  function handleEditionChange(letter: string) {
    const ed = editions.find((e) => e.letter === letter) ?? null
    setEdition(ed)
    reseed(selectedPeak, ed)
  }

  function setSelection(key: string, value: SelectionValue) {
    setSelections((prev) => ({ ...prev, [key]: value }))
  }

  function toggleObjective(value: string) {
    setObjectives((prev) => (prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]))
  }

  const submitted = actionData?.success === true
  const actionErrors = actionData && !actionData.success ? actionData.errors : undefined
  const isSubmitting = navigation.state === 'submitting'

  // ── Summary + submit payload ───────────────────────────────────────────────
  // Only reveal items from config steps the user has already reached.
  // step 0 = format (none shown); step 1 = configure-0; step 2 = configure-1; etc.
  const reachedGroups = configSteps
    .slice(0, Math.min(step, configSteps.length))
    .flat()
    .map((n) => n.group)
  const summaryItems: SummaryItem[] = reachedGroups.flatMap((g) =>
    g.features.map(({ feature, cell }) => {
      const arr = chosenLabelsArr(feature, cell, selections[feature.key])
      return {
        label: feature.label,
        chosenLabel: arr !== null ? arr : chosenLabelFor(feature, cell, selections[feature.key]),
      }
    }),
  )
  const editionLabel = edition ? `${cleanLetter(edition.letter)} · ${shortEdition(edition.name)}` : undefined
  const summaryPeak = isCustomPeak
    ? format.customPeakName || 'Custom Peak'
    : expedition
      ? `${expedition.name} ${expedition.altitude}`
      : undefined
  const summaryProps = { expeditionName: summaryPeak, editionLabel, items: summaryItems }

  const combinedObjectives = [...objectives, objectivesNote.trim()].filter(Boolean).join('; ')
  const interactiveKeys = new Set(allGroups.flatMap((g) => g.features.map((f) => f.feature.key)))
  const hiddenFields: Record<string, string> = {
    expeditionId: expedition?._id ?? '',
    editionId: edition?._id ?? '',
    editionLetter: edition ? cleanLetter(edition.letter) : '',
    editionName: edition ? shortEdition(edition.name) : '',
    customPeakName: isCustomPeak ? format.customPeakName : '',
    expeditionType: format.expeditionType,
    numberOfClimbers: format.numberOfClimbers,
    season: format.season,
    startDate: format.startDate,
    endDate: format.endDate,
    specialObjectives: combinedObjectives,
    selectionsJson: JSON.stringify(
      Object.fromEntries(Object.entries(selections).filter(([k]) => interactiveKeys.has(k))),
    ),
  }

  // Can advance past the format step?
  const peakChosen = Boolean(expedition) || (isCustomPeak && format.customPeakName.trim().length > 0)
  const canAdvanceFormat = peakChosen && Boolean(edition)
  const nextDisabled = step === 0 && !canAdvanceFormat

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#1A1A1A]">
        <Nav />
        <div className="flex items-center justify-center px-6 py-40">
          <div className="text-center max-w-[48ch]">
            <div className="w-12 h-12 rounded-full border border-[#3A3A3A] flex items-center justify-center mx-auto mb-10">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#5A6673] mb-6">
              Configuration Received
            </p>
            <h1 className="font-['Cormorant_Garamond'] font-light text-4xl text-white mb-6">
              Your expedition is taking shape.
            </h1>
            <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-lg leading-relaxed">
              We have your configuration and will build the right proposal. You will hear from our desk within 48 hours.
            </p>
            <div className="h-px w-16 bg-[#2A2A2A] mx-auto mt-10 mb-6" />
            <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#3A3A3A]">
              Thamserku Expeditions · Desk
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#1A1A1A] pb-24 lg:pb-0">
      <Nav />

      <div className="relative px-6 md:px-12 pt-28 md:pt-36 pb-12">
        {bgImageSrc && (
          <img
            src={bgImageSrc}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.08] grayscale pointer-events-none select-none"
          />
        )}
        <div className="relative flex gap-12 max-w-[1440px] mx-auto">
          <div className="flex-1 min-w-0">
            {/* Persistent title */}
            <header className="mb-14">
              <h1 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-5xl text-white mb-3">
                {heroHeadline}
              </h1>
              <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-lg">
                {heroSubheading}
              </p>
            </header>

            <div className="sticky top-0 z-30 bg-[#1A1A1A] -mx-6 px-6 md:mx-0 md:px-0 py-4 mb-8">
              <StepTimelineA steps={timelineLabels} currentStep={step} />
            </div>

            <Form method="post">
              {step === 0 && (
                <StepFormat
                  expeditions={expeditions}
                  editions={editions}
                  selectedPeak={selectedPeak}
                  selectedEdition={edition?.letter ?? ''}
                  format={format}
                  onPeakChange={handlePeakChange}
                  onEditionChange={handleEditionChange}
                  onFormatChange={(patch) => setFormat((prev) => ({ ...prev, ...patch }))}
                />
              )}

              {step >= 1 && step <= configSteps.length && (
                <ConfiguratorStep groups={configSteps[step - 1]} selections={selections} onChange={setSelection} />
              )}

              {isLast && step !== 0 && (
                <StepCustomContact
                  errors={actionErrors}
                  hiddenFields={hiddenFields}
                  objectives={objectives}
                  objectivesNote={objectivesNote}
                  onToggleObjective={toggleObjective}
                  onNoteChange={setObjectivesNote}
                  isProject={isProject}
                />
              )}

              {/* Nav */}
              <div className="pt-14 flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-end gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => syncToUrl(step - 1)}
                  disabled={step === 0}
                  className="w-full sm:w-auto whitespace-nowrap font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#C8CDD2] border border-[#2E2E2E] px-6 sm:px-10 md:px-16 py-4 rounded hover:border-[#5A6673] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous ←
                </button>
                {isLast ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto whitespace-nowrap font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#1A1A1A] bg-white border border-white px-6 sm:px-10 md:px-16 py-4 rounded hover:bg-[#C8CDD2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting…' : 'Submit Your Expedition →'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => syncToUrl(step + 1)}
                    disabled={nextDisabled}
                    className="w-full sm:w-auto whitespace-nowrap font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#C8CDD2] border border-[#2E2E2E] px-6 sm:px-10 md:px-16 py-4 rounded hover:border-[#5A6673] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                )}
              </div>
            </Form>
          </div>

          <ConfigSummary {...summaryProps} />
        </div>
      </div>

      <MobileConfigBar {...summaryProps} />
    </main>
  )
}
