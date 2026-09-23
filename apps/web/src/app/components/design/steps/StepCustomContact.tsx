import { Check, ChevronDown } from 'lucide-react'
import { COUNTRIES } from '../../../../lib/countries'

type ContactErrors = { fullName?: string; email?: string; notRobot?: string }

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

// Native select styled as a line input; the chevron is drawn by the wrapper.
const lineSelect = `${lineInput} appearance-none cursor-pointer pr-8 [color-scheme:dark] [&:has(option[value='']:checked)]:text-[#C8CDD2]/50`
const optionClass = "not-italic font-sans text-base bg-[#1A1A1A] text-white"

function SelectShell({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <ChevronDown className="absolute right-0 top-1 w-5 h-5 text-[#8C97A3] pointer-events-none" />
    </div>
  )
}

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

          <div>
            <FieldLabel>Country</FieldLabel>
            <SelectShell>
              <select name="nationality" defaultValue="" className={lineSelect}>
                <option value="" className={optionClass}>
                  Select country
                </option>
                {COUNTRIES.map((c) => (
                  <option key={c.iso} value={c.name} className={optionClass}>
                    {c.name}
                  </option>
                ))}
              </select>
            </SelectShell>
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
              <div className="flex gap-4">
                <SelectShell className="w-44 shrink-0">
                  <select name="phoneCountry" defaultValue="" aria-label="Country code" className={lineSelect}>
                    <option value="" className={optionClass}>
                      Code
                    </option>
                    {COUNTRIES.map((c) => (
                      <option key={c.iso} value={c.iso} className={optionClass}>
                        {c.name} (+{c.dial})
                      </option>
                    ))}
                  </select>
                </SelectShell>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel-national"
                  placeholder="Number"
                  className={`${lineInput} min-w-0`}
                />
              </div>
              <p className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.12em] text-[#8C97A3] mt-2">
                Optional
              </p>
            </div>
          </div>

          <div>
            <label className="inline-flex items-center gap-3 cursor-pointer">
              <span className="relative shrink-0 w-4 h-4">
                <input
                  type="checkbox"
                  name="notRobot"
                  required
                  className="peer appearance-none w-4 h-4 border border-[#8C97A3] rounded-sm cursor-pointer checked:bg-white checked:border-white"
                />
                <Check
                  className="pointer-events-none absolute inset-0 m-auto w-3 h-3 text-[#1A1A1A] opacity-0 peer-checked:opacity-100"
                  strokeWidth={3}
                />
              </span>
              <span className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#C8CDD2]">
                I am not a robot
              </span>
            </label>
            {errors?.notRobot && (
              <p className="font-['DM_Mono'] text-[11px] text-red-400 mt-2 uppercase tracking-[0.12em]">
                {errors.notRobot}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
