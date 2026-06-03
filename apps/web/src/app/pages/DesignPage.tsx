import { useState } from 'react'
import { useLoaderData, useSearchParams, useActionData, Form } from 'react-router'
import type { ShouldRevalidateFunction } from 'react-router'
import { writeClient } from '../../lib/sanity.write'
import { serverClient } from '../../lib/sanity.server'
import { getDesignPageData } from '../../lib/queries'
import type { DesignPageData, SanityExpeditionForDesign, SanityEditionForDesign } from '../../lib/queries'
import { sendBookingEmail } from '../../lib/email.server'
import { StepIndicator } from '../components/design/StepIndicator'
import { ConfigSidebar } from '../components/design/ConfigSidebar'
import { MobileConfigBar } from '../components/design/MobileConfigBar'
import { Step1PeakEdition } from '../components/design/steps/Step1PeakEdition'
import { Step2Accommodation } from '../components/design/steps/Step2Accommodation'
import { Step3Guiding } from '../components/design/steps/Step3Guiding'
import { Step4OxygenHelicopter } from '../components/design/steps/Step4OxygenHelicopter'
import { Step5Contact } from '../components/design/steps/Step5Contact'

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

  const errors: ActionErrors = {}
  if (!fullName) errors.fullName = 'Please enter your name.'
  if (!email && !phone) errors.contact = 'Please enter an email address or phone number.'

  if (Object.keys(errors).length > 0) return { success: false, errors }

  const expeditionId = (formData.get('expeditionId') as string)?.trim() || undefined
  const editionId = (formData.get('editionId') as string)?.trim() || undefined
  const helicopterRaw = (formData.get('helicopterInclusions') as string | null) ?? ''
  const helicopterInclusions = helicopterRaw.split(',').filter(Boolean)
  const oxygenRaw = formData.get('oxygenBottles')
  const oxygenBottles = oxygenRaw ? Number(oxygenRaw) : undefined

  const submittedAt = new Date().toISOString()

  await writeClient.create({
    _type: 'booking',
    submittedAt,
    fullName,
    email: email || undefined,
    phone: phone || undefined,
    message: (formData.get('message') as string | null)?.trim() || undefined,
    expedition: expeditionId ? { _type: 'reference', _ref: expeditionId } : undefined,
    edition: editionId ? { _type: 'reference', _ref: editionId } : undefined,
    ktmHotel: (formData.get('ktmHotel') as string) || undefined,
    trekLodge: (formData.get('trekLodge') as string) || undefined,
    trekGuide: (formData.get('trekGuide') as string) || undefined,
    climbGuide: (formData.get('climbGuide') as string) || undefined,
    sherpaRatio: (formData.get('sherpaRatio') as string) || undefined,
    oxygenBottles,
    helicopterInclusions: helicopterInclusions.length > 0 ? helicopterInclusions : undefined,
  })

  try {
    const settings = await serverClient.fetch<{
      enquiryEmail?: string
      expeditionName?: string
      editionName?: string
      editionLetter?: string
      oxygenUnit?: string
    }>(`{
      "enquiryEmail": *[_type == "siteSettings"][0].enquiryEmail,
      "expeditionName": *[_type == "expedition" && _id == $expId][0].name,
      "editionName": *[_type == "edition" && _id == $edId][0].name,
      "editionLetter": *[_type == "edition" && _id == $edId][0].letter,
      "oxygenUnit": *[_type == "designSettings"][0].oxygenUnit,
      "oxygenUnlimitedThreshold": *[_type == "designSettings"][0].oxygenUnlimitedThreshold
    }`, { expId: expeditionId ?? '', edId: editionId ?? '' })

    if (settings?.enquiryEmail) {
      await sendBookingEmail(settings.enquiryEmail, {
        fullName,
        email: email || undefined,
        phone: phone || undefined,
        message: (formData.get('message') as string | null)?.trim() || undefined,
        expeditionName: settings.expeditionName,
        editionLetter: settings.editionLetter,
        editionName: settings.editionName,
        ktmHotel: (formData.get('ktmHotel') as string) || undefined,
        trekLodge: (formData.get('trekLodge') as string) || undefined,
        trekGuide: (formData.get('trekGuide') as string) || undefined,
        climbGuide: (formData.get('climbGuide') as string) || undefined,
        sherpaRatio: (formData.get('sherpaRatio') as string) || undefined,
        oxygenBottles,
        oxygenUnit: settings.oxygenUnit,
        helicopterInclusions,
        submittedAt,
      })
    }
  } catch {
    // Non-fatal — booking is already saved in Sanity
  }

  return { success: true }
}

// Validates a value against available options; returns null if invalid
function resolveOption(options: { value: string }[], value: string | null): string | null {
  if (!value) return null
  return options.some((o) => o.value === value) ? value : null
}

export default function DesignPage() {
  const data = useLoaderData<DesignPageData>()
  const actionData = useActionData<typeof action>()
  const [searchParams, setSearchParams] = useSearchParams()

  const { expeditions, editions, designSettings } = data
  const settings = designSettings ?? {
    ktmHotelOptions: [], trekGuideOptions: [], climbGuideOptions: [],
    sherpaRatioOptions: [], oxygenMin: 6, oxygenMax: 20, oxygenStep: 1,
    oxygenUnlimitedThreshold: 20, oxygenUnit: '× 4L bottles',
  }

  const step = Math.min(Math.max(Number(searchParams.get('step') ?? '1'), 1), 5)

  // Local state initialized from URL params — updates are instant, URL syncs on step transitions
  const [expedition, setExpedition] = useState<SanityExpeditionForDesign | null>(
    () => expeditions.find((e) => e.slug === searchParams.get('expedition')) ?? null
  )
  const [edition, setEdition] = useState<SanityEditionForDesign | null>(
    () => editions.find((e) => e.letter === searchParams.get('edition')) ?? null
  )
  const [ktmHotel, setKtmHotel] = useState<string | null>(
    () => resolveOption(settings.ktmHotelOptions, searchParams.get('ktmHotel'))
  )
  const [trekLodge, setTrekLodge] = useState<string | null>(() => {
    const initExp = expeditions.find((e) => e.slug === searchParams.get('expedition')) ?? null
    return resolveOption(initExp?.trekLodgeOptions ?? [], searchParams.get('trekLodge'))
  })
  const [trekGuide, setTrekGuide] = useState<string | null>(
    () => resolveOption(settings.trekGuideOptions, searchParams.get('trekGuide'))
  )
  const [climbGuide, setClimbGuide] = useState<string | null>(
    () => resolveOption(settings.climbGuideOptions, searchParams.get('climbGuide'))
  )
  const [sherpaRatio, setSherpaRatio] = useState<string | null>(
    () => resolveOption(settings.sherpaRatioOptions, searchParams.get('sherpaRatio'))
  )
  const [oxygenBottles, setOxygenBottles] = useState<number>(() => {
    const raw = searchParams.get('oxygen')
    return raw
      ? Math.min(Math.max(Number(raw), settings.oxygenMin), settings.oxygenMax)
      : settings.oxygenMin
  })
  const [helicopterInclusions, setHelicopterInclusions] = useState<string[]>(() => {
    const raw = searchParams.get('helicopter') ?? ''
    const initExp = expeditions.find((e) => e.slug === searchParams.get('expedition')) ?? null
    return raw
      ? raw.split(',').filter((v) => (initExp?.helicopterInclusions ?? []).some((o) => o.value === v))
      : []
  })

  function syncToUrl(n: number) {
    setSearchParams((prev) => {
      prev.set('step', String(n))
      if (expedition) prev.set('expedition', expedition.slug); else prev.delete('expedition')
      if (edition) prev.set('edition', edition.letter); else prev.delete('edition')
      if (ktmHotel) prev.set('ktmHotel', ktmHotel); else prev.delete('ktmHotel')
      if (trekLodge) prev.set('trekLodge', trekLodge); else prev.delete('trekLodge')
      if (trekGuide) prev.set('trekGuide', trekGuide); else prev.delete('trekGuide')
      if (climbGuide) prev.set('climbGuide', climbGuide); else prev.delete('climbGuide')
      if (sherpaRatio) prev.set('sherpaRatio', sherpaRatio); else prev.delete('sherpaRatio')
      prev.set('oxygen', String(oxygenBottles))
      if (helicopterInclusions.length > 0) prev.set('helicopter', helicopterInclusions.join(','))
      else prev.delete('helicopter')
      return prev
    }, { replace: true })
  }

  function goToStep(n: number) {
    syncToUrl(n)
  }

  function handleExpeditionChange(slug: string) {
    const exp = expeditions.find((e) => e.slug === slug) ?? null
    setExpedition(exp)
    setTrekLodge(null)
    setHelicopterInclusions([])
  }

  function handleEditionChange(letter: string) {
    const ed = editions.find((e) => e.letter === letter) ?? null
    setEdition(ed)
    if (ed?.designDefaults) {
      const d = ed.designDefaults
      if (d.ktmHotel) setKtmHotel(d.ktmHotel)
      if (d.trekLodge) setTrekLodge(d.trekLodge)
      if (d.trekGuide) setTrekGuide(d.trekGuide)
      if (d.climbGuide) setClimbGuide(d.climbGuide)
      if (d.sherpaRatio) setSherpaRatio(d.sherpaRatio)
      if (d.oxygenBottles != null) setOxygenBottles(d.oxygenBottles)
    }
  }

  function toggleHelicopter(value: string) {
    setHelicopterInclusions((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    )
  }

  const submitted = actionData?.success === true
  const actionErrors = actionData && !actionData.success
    ? (actionData as { success: false; errors: ActionErrors }).errors
    : undefined

  const sidebarProps = {
    expedition, edition, ktmHotel, trekLodge, trekGuide, climbGuide, sherpaRatio,
    oxygenBottles, oxygenUnit: settings.oxygenUnit,
    oxygenUnlimitedThreshold: settings.oxygenUnlimitedThreshold,
    helicopterInclusions,
    ktmHotelOptions: settings.ktmHotelOptions,
    trekLodgeOptions: expedition?.trekLodgeOptions ?? [],
    trekGuideOptions: settings.trekGuideOptions,
    climbGuideOptions: settings.climbGuideOptions,
    sherpaRatioOptions: settings.sherpaRatioOptions,
    helicopterOptions: expedition?.helicopterInclusions ?? [],
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
          Select your Edition first — it pre-configures the standards. Then personalise every detail. We do not believe in quoting a number before understanding your climb.
        </p>
      </div>

      {/* Step indicator */}
      <div className="px-6 md:px-12 py-8 flex justify-start lg:justify-center">
        <StepIndicator currentStep={step} />
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 pb-12">
        <div className="flex gap-10 max-w-[1100px] mx-auto">
          {/* Form area */}
          <div className="flex-1 min-w-0">
            <Form method="post">
              {step === 1 && (
                <Step1PeakEdition
                  expeditions={expeditions}
                  editions={editions}
                  selectedExpedition={expedition}
                  selectedEdition={edition}
                  onExpeditionChange={handleExpeditionChange}
                  onEditionChange={handleEditionChange}
                  onContinue={() => goToStep(2)}
                />
              )}
              {step === 2 && (
                <Step2Accommodation
                  ktmHotelOptions={settings.ktmHotelOptions}
                  selectedExpedition={expedition}
                  ktmHotel={ktmHotel}
                  trekLodge={trekLodge}
                  onKtmHotelChange={(v) => setKtmHotel(v)}
                  onTrekLodgeChange={(v) => setTrekLodge(v)}
                  onBack={() => goToStep(1)}
                  onContinue={() => goToStep(3)}
                />
              )}
              {step === 3 && (
                <Step3Guiding
                  trekGuideOptions={settings.trekGuideOptions}
                  climbGuideOptions={settings.climbGuideOptions}
                  sherpaRatioOptions={settings.sherpaRatioOptions}
                  trekGuide={trekGuide}
                  climbGuide={climbGuide}
                  sherpaRatio={sherpaRatio}
                  onTrekGuideChange={(v) => setTrekGuide(v)}
                  onClimbGuideChange={(v) => setClimbGuide(v)}
                  onSherpaRatioChange={(v) => setSherpaRatio(v)}
                  onBack={() => goToStep(2)}
                  onContinue={() => goToStep(4)}
                />
              )}
              {step === 4 && (
                <Step4OxygenHelicopter
                  selectedExpedition={expedition}
                  oxygenBottles={oxygenBottles}
                  oxygenMin={settings.oxygenMin}
                  oxygenMax={settings.oxygenMax}
                  oxygenStep={settings.oxygenStep}
                  oxygenUnit={settings.oxygenUnit}
                  oxygenUnlimitedThreshold={settings.oxygenUnlimitedThreshold}
                  helicopterInclusions={helicopterInclusions}
                  onOxygenChange={setOxygenBottles}
                  onHelicopterToggle={toggleHelicopter}
                  onBack={() => goToStep(3)}
                  onContinue={() => goToStep(5)}
                />
              )}
              {step === 5 && (
                <Step5Contact
                  errors={actionErrors}
                  onBack={() => goToStep(4)}
                  expeditionId={expedition?._id ?? ''}
                  editionId={edition?._id ?? ''}
                  ktmHotel={ktmHotel ?? ''}
                  trekLodge={trekLodge ?? ''}
                  trekGuide={trekGuide ?? ''}
                  climbGuide={climbGuide ?? ''}
                  sherpaRatio={sherpaRatio ?? ''}
                  oxygenBottles={oxygenBottles}
                  helicopterInclusions={helicopterInclusions}
                />
              )}
            </Form>
          </div>

          {/* Desktop sidebar */}
          <ConfigSidebar {...sidebarProps} />
        </div>
      </div>

      {/* Mobile sticky bar */}
      <MobileConfigBar {...sidebarProps} />
    </main>
  )
}
