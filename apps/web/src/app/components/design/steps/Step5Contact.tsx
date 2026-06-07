import { useNavigation } from 'react-router'

type ContactErrors = { fullName?: string; contact?: string }

interface Step5Props {
  errors?: ContactErrors
  onBack: () => void
  /** Hidden fields submitted with the form (ids, edition letter/name, selections JSON). */
  hiddenFields: Record<string, string>
  /** 'project' = A/E bespoke editions (no configuration); 'config' = B/C/D. */
  variant?: 'config' | 'project'
}

export function Step5Contact({ errors, onBack, hiddenFields, variant = 'config' }: Step5Props) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const isProject = variant === 'project'

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-['Cormorant_Garamond'] font-light text-3xl text-white mb-2">
          {isProject ? 'A Bespoke Project' : 'Almost There'}
        </h2>
        <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-lg">
          {isProject
            ? "This edition is shaped entirely around your objective. Tell us about your project and we'll design it with you."
            : "Tell us who you are and we'll reach out with your proposal."}
        </p>
      </div>

      {Object.entries(hiddenFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

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
            {isProject ? 'Your Project' : 'Message'} {isProject && <span className="text-[#E8710A]">·</span>}
          </label>
          <textarea
            name="message"
            rows={isProject ? 6 : 4}
            placeholder={
              isProject
                ? 'Describe your objective — route, timing, style, and any record, research or media goals…'
                : "Anything else you'd like us to know about your climb…"
            }
            className="w-full bg-transparent border-b border-[#3A3A3A] pb-3 text-white font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#E8710A] transition-colors placeholder:text-[#3A3A3A] resize-none"
          />
          <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#3A3A3A] mt-2">
            {isProject ? 'Tell us as much as you can' : 'Optional'}
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
          {isSubmitting ? 'Submitting…' : isProject ? 'Send Enquiry →' : 'Submit Configuration →'}
        </button>
      </div>
    </div>
  )
}
