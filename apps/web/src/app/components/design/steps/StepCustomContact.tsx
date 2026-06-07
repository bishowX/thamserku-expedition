import { Chip, ChipRow } from '../Chip'

type ContactErrors = { fullName?: string; email?: string }

export const OBJECTIVE_OPTIONS = [
  'Ski / Snowboard Descent',
  'Parapente / Speed Fly',
  'Traverse / Link-up',
  'Scientific Research',
  'Speed Record Attempt',
  'Winter Ascent',
  'Media / Documentation',
  'New Route / New Ascent',
]

interface StepCustomContactProps {
  errors?: ContactErrors
  /** Hidden fields submitted with the form (ids, edition, format, selections JSON). */
  hiddenFields: Record<string, string>
  objectives: string[]
  objectivesNote: string
  onToggleObjective: (value: string) => void
  onNoteChange: (value: string) => void
  /** 'project' = A/E or custom peak (no configuration). */
  isProject: boolean
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-['Cormorant_Garamond'] font-light text-3xl md:text-[2.1rem] text-white mb-8">{children}</h2>
  )
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#5A6673] mb-4">
      {children}
      {required && <span className="text-white"> ·</span>}
    </p>
  )
}

const lineInput =
  "w-full bg-transparent border-b border-[#3A3A3A] pb-3 text-white font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-white transition-colors placeholder:text-[#3A3A3A]"

export function StepCustomContact({
  errors,
  hiddenFields,
  objectives,
  objectivesNote,
  onToggleObjective,
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
          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-lg -mt-6 mb-8">
            This edition is shaped entirely around your objective — tell us what you have in mind and our desk will design it with you.
          </p>
        )}
        <div className="space-y-9">
          <div>
            <FieldLabel>Special Objectives</FieldLabel>
            <ChipRow>
              {OBJECTIVE_OPTIONS.map((opt) => (
                <Chip key={opt} label={opt} selected={objectives.includes(opt)} onClick={() => onToggleObjective(opt)} />
              ))}
            </ChipRow>
            <input
              type="text"
              value={objectivesNote}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="Anything else — route, style, aerial activity, traverse…"
              className={`${lineInput} mt-6`}
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
              placeholder="How would you like us to address you?"
              className={`${lineInput} ${errors?.fullName ? 'border-red-500' : ''}`}
            />
            {errors?.fullName && (
              <p className="font-['JetBrains_Mono'] text-[10px] text-red-400 mt-2 uppercase tracking-[0.12em]">
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
                placeholder="name@domain.com"
                className={`${lineInput} ${errors?.email ? 'border-red-500' : ''}`}
              />
              {errors?.email && (
                <p className="font-['JetBrains_Mono'] text-[10px] text-red-400 mt-2 uppercase tracking-[0.12em]">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <FieldLabel>WhatsApp</FieldLabel>
              <input
                type="tel"
                name="phone"
                placeholder="Number with country code"
                className={lineInput}
              />
              <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.12em] text-[#3A3A3A] mt-2">
                Optional
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
