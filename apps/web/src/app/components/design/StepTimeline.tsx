import { Fragment } from 'react'

export interface StepTimelineProps {
  steps: string[]
  currentStep: number // 0-indexed
}

// ── Variant A: Nodes ──────────────────────────────────────────────────────────
// Numbered circles connected by lines — classic progress chain.
// Completed = white fill + check; active = white fill + number; future = dark ring.
export function StepTimelineA({ steps, currentStep }: StepTimelineProps) {
  return (
    <div className="flex items-start w-full">
      {steps.map((label, i) => {
        const done = i < currentStep
        const active = i === currentStep

        return (
          <Fragment key={i}>
            {i > 0 && (
              <div className="flex-1 self-start" style={{ paddingTop: '15px' }}>
                <div
                  className="h-px w-full transition-colors duration-500"
                  style={{ background: done || active ? '#FFFFFF' : '#4A4A4A' }}
                />
              </div>
            )}

            <div className="flex flex-col items-center flex-none">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300 ${
                  done || active ? 'bg-white border-white' : 'bg-transparent border-[#4A4A4A]'
                }`}
              >
                {done ? (
                  <svg
                    className="w-3 h-3 text-[#1A1A1A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span
                    className={`font-['JetBrains_Mono'] text-[10px] leading-none transition-colors duration-300 ${
                      active ? 'text-[#1A1A1A]' : 'text-[#6A6A6A]'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                )}
              </div>

              <span
                className={`mt-2 font-['JetBrains_Mono'] text-[8px] uppercase tracking-[0.18em] text-center max-w-[80px] leading-tight transition-colors duration-300 ${
                  active ? 'text-white' : done ? 'text-[#5A6673]' : 'text-[#4A4A4A]'
                }`}
              >
                {label}
              </span>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}

// ── Variant B: Strata ─────────────────────────────────────────────────────────
// Rectangular segmented bar — geological strata / map-grid aesthetic.
// Active = white block; completed = dim fill; future = empty.
export function StepTimelineB({ steps, currentStep }: StepTimelineProps) {
  return (
    <div className="flex divide-x divide-[#2E2E2E] border border-[#2E2E2E]">
      {steps.map((label, i) => {
        const done = i < currentStep
        const active = i === currentStep

        return (
          <div
            key={i}
            className={`flex-1 px-4 py-3 transition-colors duration-300 ${
              active ? 'bg-white' : done ? 'bg-[#222222]' : 'bg-transparent'
            }`}
          >
            <div
              className={`font-['JetBrains_Mono'] text-[8px] uppercase tracking-[0.25em] mb-1.5 transition-colors duration-300 ${
                active ? 'text-[#888888]' : done ? 'text-[#3A3A3A]' : 'text-[#2A2A2A]'
              }`}
            >
              {done ? '✓' : String(i + 1).padStart(2, '0')}
            </div>
            <div
              className={`font-['JetBrains_Mono'] text-[9px] uppercase tracking-[0.14em] leading-tight transition-colors duration-300 ${
                active ? 'text-[#1A1A1A]' : done ? 'text-[#5A6673]' : 'text-[#2E2E2E]'
              }`}
            >
              {label}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Variant C: Meridian ───────────────────────────────────────────────────────
// Single progress rail with tick marks — navigational log / compass-bearing aesthetic.
// Current step name in italic serif; step count in mono; animated fill line.
export function StepTimelineC({ steps, currentStep }: StepTimelineProps) {
  const pct = steps.length <= 1 ? 100 : (currentStep / (steps.length - 1)) * 100

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-['Cormorant_Garamond'] italic text-white text-xl leading-none">
          {steps[currentStep]}
        </span>
        <span className="font-['JetBrains_Mono'] text-[10px] text-[#5A6673] tracking-[0.2em]">
          {String(currentStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
        </span>
      </div>

      <div className="relative h-px bg-[#2E2E2E]">
        {/* Filled portion */}
        <div
          className="absolute inset-y-0 left-0 bg-white transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />

        {/* Tick marks at each step */}
        {steps.map((_, i) => {
          const pos = steps.length === 1 ? 100 : (i / (steps.length - 1)) * 100
          const isDone = i <= currentStep
          return (
            <div
              key={i}
              className={`absolute top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full border transition-colors duration-300 ${
                isDone ? 'bg-white border-white' : 'bg-[#1A1A1A] border-[#3A3A3A]'
              }`}
              style={{ left: `calc(${pos}% - 2.5px)` }}
            />
          )
        })}
      </div>

      {/* Step labels beneath rail */}
      <div className="relative mt-2">
        {steps.map((label, i) => {
          const pos = steps.length === 1 ? 100 : (i / (steps.length - 1)) * 100
          const isDone = i < currentStep
          const isActive = i === currentStep
          return (
            <span
              key={i}
              className={`absolute font-['JetBrains_Mono'] text-[8px] uppercase tracking-[0.15em] -translate-x-1/2 transition-colors duration-300 whitespace-nowrap ${
                isActive ? 'text-white' : isDone ? 'text-[#3A3A3A]' : 'text-[#242424]'
              }`}
              style={{ left: `${pos}%` }}
            >
              {label}
            </span>
          )
        })}
      </div>
    </div>
  )
}
