interface ChipProps {
  label: string
  selected: boolean
  onClick: () => void
}

/**
 * The configurator's core selectable pill. Selected = solid white fill / black
 * text; unselected = dark, hairline-bordered. Used for both single-select and
 * multi-select rows (selection semantics live in the caller).
 */
export function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`font-['DM_Mono'] text-[11px] uppercase tracking-[0.12em] px-4 py-2.5 rounded border transition-colors ${
        selected
          ? 'bg-white text-[#1A1A1A] border-white'
          : 'bg-transparent text-[#C8CDD2] border-[#C8CDD2] hover:border-[#5A6673]'
      }`}
    >
      {label}
    </button>
  )
}

/** A wrapping row of chips with the standard gap. */
export function ChipRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-3">{children}</div>
}
