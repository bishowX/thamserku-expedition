// The −/value/+ stepper shared by the oxygen range control (ConfiguratorStep)
// and the number-of-climbers field (StepFormat), so the two stay identical.
// `display` is the rendered label for the current value — callers format it
// (e.g. "4 Bottles", "2 Climbers").

const btnClass =
  'w-11 h-11 flex items-center justify-center text-lg text-[#C8CDD2] border border-[#2E2E2E] rounded hover:border-[#5A6673] transition-colors disabled:opacity-30 disabled:cursor-not-allowed'

export interface StepperProps {
  value: number
  min: number
  max: number
  step?: number
  display: string
  onChange: (next: number) => void
}

export function Stepper({ value, min, max, step = 1, display, onChange }: StepperProps) {
  const set = (next: number) => onChange(Math.max(min, Math.min(max, next)))
  return (
    <div className="inline-flex items-center gap-4">
      <button type="button" aria-label="Decrease" onClick={() => set(value - step)} disabled={value <= min} className={btnClass}>
        −
      </button>
      <span className="font-['DM_Mono'] text-[13px] uppercase tracking-[0.14em] text-white min-w-[120px] text-center">
        {display}
      </span>
      <button type="button" aria-label="Increase" onClick={() => set(value + step)} disabled={value >= max} className={btnClass}>
        +
      </button>
    </div>
  )
}
