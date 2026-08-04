type ContactErrors = { fullName?: string; email?: string }

interface StepCustomContactProps {
  errors?: ContactErrors
  /** Hidden fields submitted with the form (ids, edition, format, selections JSON). */
  hiddenFields: Record<string, string>
  objectivesNote: string
  onNoteChange: (value: string) => void
  /** 'project' = A/E or custom peak (no configuration). */
  isProject: boolean
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-['Fraunces'] font-light text-display-m text-white mb-4">{children}</h2>
  )
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <p className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#8C97A3] mb-4">
      {children}
      {required && <span className="text-white"> ·</span>}
    </p>
  )
}

const lineInput =
  "w-full bg-transparent border-b border-[#3A3A3A] pb-3 text-white font-['Fraunces'] italic text-body-lg focus:outline-none focus:border-white transition-colors placeholder:text-[#C8CDD2]/50"

export function StepCustomContact({
  errors,
  hiddenFields,
  objectivesNote,
  onNoteChange,
  isProject,
}: StepCustomContactProps) {
  return (
    <div className="space-y-16">
      {Object.entries(hiddenFields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      {/* Custom Fields */}
      <section>
        <SectionTitle>Custom Fields</SectionTitle>
        {isProject && (
          <p className="font-['Fraunces'] italic text-[#8C97A3] text-body mb-8">
            This edition is shaped entirely around your objective — tell us what you have in mind and our desk will design it with you.
          </p>
        )}
        <div className="space-y-9">
          <div>
            <FieldLabel>Special Objectives</FieldLabel>
            <p className="font-['Fraunces'] italic text-[#8C97A3] text-body mb-6">
              Ski or snowboard descent, parapente / speed fly, traverse or link-up, scientific
              research, speed record attempt, winter ascent, media and documentation, a new route
              or new ascent — whatever shapes the climb.
            </p>
            <input
              type="text"
              value={objectivesNote}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="Special objectives"
              className={lineInput}
            />
          </div>

          <div>
            <FieldLabel>Additional Requirements / Messages</FieldLabel>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us about your climbing experience, preparatory requirements, or any other details…"
              className={`${lineInput} resize-none`}
            />
          </div>
        </div>
      </section>

      {/* About You */}
      <section>
        <SectionTitle>About You</SectionTitle>
        <div className="space-y-9">
          <div>
            <FieldLabel required>Full Name</FieldLabel>
            <input
              type="text"
              name="fullName"
              autoComplete="name"
              placeholder="How would you like us to address you?"
              className={`${lineInput} ${errors?.fullName ? 'border-red-500' : ''}`}
            />
            {errors?.fullName && (
              <p className="font-['DM_Mono'] text-[11px] text-red-400 mt-2 uppercase tracking-[0.12em]">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-9">
            <div>
              <FieldLabel required>Email Address</FieldLabel>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="name@domain.com"
                className={`${lineInput} ${errors?.email ? 'border-red-500' : ''}`}
              />
              {errors?.email && (
                <p className="font-['DM_Mono'] text-[11px] text-red-400 mt-2 uppercase tracking-[0.12em]">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <FieldLabel>WhatsApp</FieldLabel>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="Number with country code"
                className={lineInput}
              />
              <p className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.12em] text-[#8C97A3] mt-2">
                Optional
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
