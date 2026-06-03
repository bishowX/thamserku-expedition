const STEPS = ['Peak & Edition', 'Accommodation', 'Guiding', 'Oxygen & Helicopter', 'Contact']

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-0 w-full max-w-[600px]">
      {STEPS.map((_, i) => {
        const step = i + 1
        const isActive = step === currentStep
        const isCompleted = step < currentStep
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border text-xs font-['JetBrains_Mono'] font-medium transition-colors ${
                isActive
                  ? 'bg-[#E8710A] border-[#E8710A] text-white'
                  : isCompleted
                  ? 'bg-[#E8710A] border-[#E8710A] text-white'
                  : 'bg-transparent border-[#3A3A3A] text-[#5A6673]'
              }`}
            >
              {step}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-1 transition-colors ${
                  isCompleted ? 'bg-[#E8710A]' : 'bg-[#2A2A2A]'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
