export type SummaryItem = { label: string; chosenLabel: string };

interface ConfigSummaryProps {
  expeditionName?: string;
  editionLabel?: string;
  items: SummaryItem[];
}

function Rows({ expeditionName, editionLabel, items }: ConfigSummaryProps) {
  return (
    <div className="space-y-4">
      <Row label="Edition" value={editionLabel ?? "—"} />
      <Row label="Peak" value={expeditionName ?? "—"} />
      {items.length > 0 && <div className="h-px bg-[#2A2A2A] my-2" />}
      {items.map((it) => (
        <Row key={it.label} label={it.label} value={it.chosenLabel || "—"} />
      ))}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#5A6673] shrink-0">
        {label}
      </span>
      <span className="font-['Cormorant_Garamond'] text-[#C8CDD2] text-[15px] text-right leading-snug">
        {value}
      </span>
    </div>
  );
}

function Investment() {
  return (
    <div className="mt-6 pt-6 border-t border-[#2A2A2A]">
      <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#5A6673] mb-3">
        Investment
      </p>
      <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[15px] leading-relaxed">
        We do not believe in quoting a number before understanding your climb.
        Submit your configuration and we will build the right proposal.
      </p>
    </div>
  );
}

/** Sticky desktop summary panel. */
export function ConfigSummary(props: ConfigSummaryProps) {
  return (
    <aside className="hidden lg:block w-[300px] shrink-0">
      <div className="sticky top-10 border border-[#1F1F1F] rounded p-6 bg-[#1C1C1C]">
        <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#5A6673] mb-5">
          Your Configuration
        </p>
        <Rows {...props} />
        <Investment />
      </div>
    </aside>
  );
}

/** Fixed mobile bar — peak · edition at a glance. */
export function MobileConfigBar(props: ConfigSummaryProps) {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#1C1C1C] border-t border-[#1F1F1F] px-6 py-3">
      <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#5A6673]">
        {props.expeditionName ?? "Select a peak"}
        {props.editionLabel ? (
          <span className="text-[#C8CDD2]"> · {props.editionLabel}</span>
        ) : null}
      </p>
    </div>
  );
}
