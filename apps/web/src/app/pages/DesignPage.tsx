import { useState } from 'react'
import { useLoaderData, useSearchParams, useActionData, Form } from 'react-router'
import type { ShouldRevalidateFunction } from 'react-router'
import { writeClient } from '../../lib/sanity.write'
import { serverClient } from '../../lib/sanity.server'
import { getDesignPageData, getExpeditionConfig } from '../../lib/queries'
import type { DesignPageData, SanityExpeditionForDesign, SanityEditionForDesign } from '../../lib/queries'
import { sendBookingEmail } from '../../lib/email.server'
import {
  computeEstimate,
  configuratorGroups,
  defaultSelections,
  chosenLabelFor,
  type EditionLetter,
  type SelectionValue,
} from '../../lib/configMatrix'
import { Step1PeakEdition } from '../components/design/steps/Step1PeakEdition'
import { Step5Contact } from '../components/design/steps/Step5Contact'
import { ConfiguratorStep } from '../components/design/ConfiguratorStep'
import { ConfigSummary, MobileConfigBar, type SummaryItem } from '../components/design/ConfigSummary'

export async function loader() {
  return getDesignPageData()
}

// Loader data never depends on search params — suppress revalidation on step navigation
export const shouldRevalidate: ShouldRevalidateFunction = () => false

type ActionErrors = { fullName?: string; contact?: string }

export async function action({ request }: { request: Request }): Promise<
  { success: true } | { success: false; errors: ActionErrors }
> {
  const formData = await request.formData()

  const fullName = (formData.get('fullName') as string | null)?.trim() ?? ''
  const email = (formData.get('email') as string | null)?.trim() ?? ''
  const phone = (formData.get('phone') as string | null)?.trim() ?? ''
  const message = (formData.get('message') as string | null)?.trim() || undefined

  const errors: ActionErrors = {}
  if (!fullName) errors.fullName = 'Please enter your name.'
  if (!email && !phone) errors.contact = 'Please enter an email address or phone number.'
  if (Object.keys(errors).length > 0) return { success: false, errors }

  const expeditionId = (formData.get('expeditionId') as string)?.trim() || undefined
  const editionId = (formData.get('editionId') as string)?.trim() || undefined
  const editionLetter = ((formData.get('editionLetter') as string)?.trim() || '') as EditionLetter
  const editionName = (formData.get('editionName') as string)?.trim() || undefined

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
    : { basePrice: null, total: null, currency: 'USD', lineItems: [] }

  const submittedAt = new Date().toISOString()

  await writeClient.create({
    _type: 'booking',
    submittedAt,
    fullName,
    email: email || undefined,
    phone: phone || undefined,
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
    currency: estimate.currency,
  })

  try {
    const enquiryEmail = await serverClient.fetch<string | undefined>(
      `*[_type == "siteSettings"][0].enquiryEmail`,
    )
    if (enquiryEmail) {
      await sendBookingEmail(enquiryEmail, {
        fullName,
        email: email || undefined,
        phone: phone || undefined,
        message,
        expeditionName: config?.name,
        editionLetter: editionLetter || undefined,
        editionName,
        lineItems: estimate.lineItems,
        basePrice: estimate.basePrice ?? undefined,
        estimatedTotal: estimate.total ?? undefined,
        currency: estimate.currency,
        submittedAt,
      })
    }
  } catch {
    // Non-fatal — booking is already saved in Sanity
  }

  return { success: true }
}

export default function DesignPage() {
  const data = useLoaderData<DesignPageData>()
  const actionData = useActionData<typeof action>()
  const [searchParams, setSearchParams] = useSearchParams()

  const { expeditions, editions } = data

  const [expedition, setExpedition] = useState<SanityExpeditionForDesign | null>(
    () => expeditions.find((e) => e.slug === searchParams.get('expedition')) ?? null,
  )
  const [edition, setEdition] = useState<SanityEditionForDesign | null>(
    () => editions.find((e) => e.letter === searchParams.get('edition')) ?? null,
  )
  const [selections, setSelections] = useState<Record<string, SelectionValue>>(() => {
    const exp = expeditions.find((e) => e.slug === searchParams.get('expedition')) ?? null
    const ed = editions.find((e) => e.letter === searchParams.get('edition')) ?? null
    return exp && ed ? defaultSelections(exp.configMatrix, ed.letter as EditionLetter) : {}
  })

  // Dynamic steps: peak/edition → one per interactive group → contact.
  const groups = expedition && edition ? configuratorGroups(expedition.configMatrix, edition.letter as EditionLetter) : []
  const stepKeys = ['peakEdition', ...groups.map((g) => g.group), 'contact']
  const isProject = Boolean(expedition && edition) && groups.length === 0

  const rawStep = Number(searchParams.get('step') ?? '0')
  const step = expedition && edition ? Math.min(Math.max(rawStep, 0), stepKeys.length - 1) : 0

  function syncToUrl(n: number) {
    setSearchParams(
      (prev) => {
        prev.set('step', String(n))
        if (expedition) prev.set('expedition', expedition.slug)
        else prev.delete('expedition')
        if (edition) prev.set('edition', edition.letter)
        else prev.delete('edition')
        return prev
      },
      { replace: true },
    )
  }

  function handleExpeditionChange(slug: string) {
    const exp = expeditions.find((e) => e.slug === slug) ?? null
    setExpedition(exp)
    setSelections(exp && edition ? defaultSelections(exp.configMatrix, edition.letter as EditionLetter) : {})
  }

  function handleEditionChange(letter: string) {
    const ed = editions.find((e) => e.letter === letter) ?? null
    setEdition(ed)
    setSelections(expedition && ed ? defaultSelections(expedition.configMatrix, ed.letter as EditionLetter) : {})
  }

  function setSelection(key: string, value: SelectionValue) {
    setSelections((prev) => ({ ...prev, [key]: value }))
  }

  const submitted = actionData?.success === true
  const actionErrors = actionData && !actionData.success ? actionData.errors : undefined

  // ── Summary + submit payload ───────────────────────────────────────────────
  const summaryItems: SummaryItem[] = groups.flatMap((g) =>
    g.features.map(({ feature, cell }) => ({
      label: feature.label,
      chosenLabel: chosenLabelFor(feature, cell, selections[feature.key]),
    })),
  )
  const editionLabel = edition ? `${edition.letter} · ${edition.name}` : undefined
  const summaryProps = { expeditionName: expedition?.name, editionLabel, items: summaryItems }

  const interactiveKeys = new Set(groups.flatMap((g) => g.features.map((f) => f.feature.key)))
  const hiddenFields: Record<string, string> = {
    expeditionId: expedition?._id ?? '',
    editionId: edition?._id ?? '',
    editionLetter: edition?.letter ?? '',
    editionName: edition?.name ?? '',
    selectionsJson: JSON.stringify(
      Object.fromEntries(Object.entries(selections).filter(([k]) => interactiveKeys.has(k))),
    ),
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-6">
        <div className="text-center max-w-[48ch]">
          <div className="w-12 h-12 rounded-full border border-[#E8710A]/40 flex items-center justify-center mx-auto mb-10">
            <svg className="w-5 h-5 text-[#E8710A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#1A1A1A] pb-24 lg:pb-0">
      {/* Header */}
      <div className="border-b border-[#1F1F1F] py-10 px-6 md:px-12 text-center">
        <h1 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-5xl text-white mb-4">
          Design Your Expedition.
        </h1>
        <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-lg max-w-[60ch] mx-auto">
          Select your Edition first — it sets the standards. Then personalise every detail. We do not quote a number
          before understanding your climb.
        </p>
      </div>

      {/* Step indicator */}
      <div className="px-6 md:px-12 py-8 flex justify-start lg:justify-center">
        <StepDots stepKeys={stepKeys} current={step} />
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 pb-12">
        <div className="flex gap-10 max-w-[1100px] mx-auto">
          <div className="flex-1 min-w-0">
            <Form method="post">
              {step === 0 && (
                <Step1PeakEdition
                  expeditions={expeditions}
                  editions={editions}
                  selectedExpedition={expedition}
                  selectedEdition={edition}
                  onExpeditionChange={handleExpeditionChange}
                  onEditionChange={handleEditionChange}
                  onContinue={() => syncToUrl(1)}
                />
              )}

              {step >= 1 && step <= groups.length && (
                <div className="space-y-10">
                  <ConfiguratorStep group={groups[step - 1]} selections={selections} onChange={setSelection} />
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => syncToUrl(step - 1)}
                      className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#5A6673] hover:text-white transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => syncToUrl(step + 1)}
                      className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] bg-[#E8710A] text-white px-8 py-4 rounded hover:bg-[#D4630A] transition-colors"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {step === stepKeys.length - 1 && step !== 0 && (
                <Step5Contact
                  errors={actionErrors}
                  onBack={() => syncToUrl(step - 1)}
                  hiddenFields={hiddenFields}
                  variant={isProject ? 'project' : 'config'}
                />
              )}
            </Form>
          </div>

          <ConfigSummary {...summaryProps} />
        </div>
      </div>

      <MobileConfigBar {...summaryProps} />
    </main>
  )
}

function StepDots({ stepKeys, current }: { stepKeys: string[]; current: number }) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto">
      {stepKeys.map((key, i) => {
        const label = key === 'peakEdition' ? 'Peak & Edition' : key === 'contact' ? 'Contact' : key
        const active = i === current
        const done = i < current
        return (
          <div key={`${key}-${i}`} className="flex items-center gap-3 shrink-0">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-['JetBrains_Mono'] text-[10px] ${
                active
                  ? 'bg-[#E8710A] text-white'
                  : done
                    ? 'border border-[#E8710A]/50 text-[#E8710A]'
                    : 'border border-[#2E2E2E] text-[#5A6673]'
              }`}
            >
              {i + 1}
            </span>
            <span
              className={`font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.14em] ${
                active ? 'text-white' : 'text-[#5A6673]'
              }`}
            >
              {label}
            </span>
            {i < stepKeys.length - 1 && <span className="w-6 h-px bg-[#2A2A2A]" />}
          </div>
        )
      })}
    </div>
  )
}
