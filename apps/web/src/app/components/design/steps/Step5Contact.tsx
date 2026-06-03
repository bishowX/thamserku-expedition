import { useNavigation } from 'react-router'

type ContactErrors = { fullName?: string; contact?: string }

interface Step5Props {
  errors?: ContactErrors
  onBack: () => void
  // Hidden config values passed as form fields
  expeditionId: string
  editionId: string
  ktmHotel: string
  trekLodge: string
  trekGuide: string
  climbGuide: string
  sherpaRatio: string
  oxygenBottles: number
  helicopterInclusions: string[]
}

export function Step5Contact({
  errors,
  onBack,
  expeditionId,
  editionId,
  ktmHotel,
  trekLodge,
  trekGuide,
  climbGuide,
  sherpaRatio,
  oxygenBottles,
  helicopterInclusions,
}: Step5Props) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-['Cormorant_Garamond'] font-light text-3xl text-white mb-2">
          Almost There
        </h2>
        <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-lg">
          Tell us who you are and we'll reach out with your proposal.
        </p>
      </div>

      {/* Hidden config fields */}
      <input type="hidden" name="expeditionId" value={expeditionId} />
      <input type="hidden" name="editionId" value={editionId} />
      <input type="hidden" name="ktmHotel" value={ktmHotel} />
      <input type="hidden" name="trekLodge" value={trekLodge} />
      <input type="hidden" name="trekGuide" value={trekGuide} />
      <input type="hidden" name="climbGuide" value={climbGuide} />
      <input type="hidden" name="sherpaRatio" value={sherpaRatio} />
      <input type="hidden" name="oxygenBottles" value={String(oxygenBottles)} />
      <input type="hidden" name="helicopterInclusions" value={helicopterInclusions.join(',')} />

      <div className="space-y-8">
        {/* Full Name */}
        <div>
          <label className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673] mb-3 block">
            Full Name <span className="text-[#E8710A]">·</span>
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="How would you like us to address you?"
            className={`w-full bg-transparent border-b pb-3 text-white font-['Cormorant_Garamond'] italic text-xl focus:outline-none transition-colors placeholder:text-[#3A3A3A] ${
              errors?.fullName ? 'border-red-500' : 'border-[#3A3A3A] focus:border-[#E8710A]'
            }`}
          />
          {errors?.fullName && (
            <p className="font-['JetBrains_Mono'] text-[10px] text-red-400 mt-2 uppercase tracking-[0.12em]">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673] mb-3 block">
            Email <span className="text-[#E8710A]">·</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="name@domain.com"
            className={`w-full bg-transparent border-b pb-3 text-white font-['Cormorant_Garamond'] italic text-xl focus:outline-none transition-colors placeholder:text-[#3A3A3A] ${
              errors?.contact ? 'border-red-500' : 'border-[#3A3A3A] focus:border-[#E8710A]'
            }`}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673] mb-3 block">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Your number with country code"
            className="w-full bg-transparent border-b border-[#3A3A3A] pb-3 text-white font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#E8710A] transition-colors placeholder:text-[#3A3A3A]"
          />
          <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#3A3A3A] mt-2">
            Optional · provide email or phone
          </p>
          {errors?.contact && (
            <p className="font-['JetBrains_Mono'] text-[10px] text-red-400 mt-1 uppercase tracking-[0.12em]">
              {errors.contact}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673] mb-3 block">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="Anything else you'd like us to know about your climb…"
            className="w-full bg-transparent border-b border-[#3A3A3A] pb-3 text-white font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#E8710A] transition-colors placeholder:text-[#3A3A3A] resize-none"
          />
          <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#3A3A3A] mt-2">
            Optional
          </p>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#5A6673] hover:text-white transition-colors"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] bg-[#E8710A] text-white px-8 py-4 rounded hover:bg-[#D4630A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting…' : 'Submit Configuration →'}
        </button>
      </div>
    </div>
  )
}
