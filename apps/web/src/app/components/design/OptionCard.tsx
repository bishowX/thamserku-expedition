import { CheckCircle, Circle } from 'lucide-react'

interface OptionCardProps {
  value: string
  label: string
  description?: string
  selected: boolean
  onSelect: (value: string) => void
  multi?: boolean
}

export function OptionCard({ value, label, description, selected, onSelect, multi = false }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`w-full flex items-start gap-3 p-4 rounded border text-left transition-colors ${
        selected
          ? 'border-[#E8710A] bg-[#E8710A]/10'
          : 'border-[#2E2E2E] bg-[#1E1E1E] hover:border-[#4A4A4A]'
      }`}
    >
      <div className="mt-0.5 shrink-0">
        {selected ? (
          <CheckCircle className="w-5 h-5 text-[#E8710A]" strokeWidth={2} fill="currentColor" />
        ) : (
          <Circle className={`w-5 h-5 ${multi ? 'text-[#3A3A3A]' : 'text-[#3A3A3A]'}`} strokeWidth={1.5} />
        )}
      </div>
      <div>
        <p className={`font-['JetBrains_Mono'] text-[13px] font-medium leading-tight ${selected ? 'text-white' : 'text-[#C8CDD2]'}`}>
          {label}
        </p>
        {description && (
          <p className="font-['JetBrains_Mono'] text-[11px] text-[#5A6673] mt-1 leading-snug">{description}</p>
        )}
      </div>
    </button>
  )
}
