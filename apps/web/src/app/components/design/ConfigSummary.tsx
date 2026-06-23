export type SummaryItem = { label: string; chosenLabel: string | string[] };

interface ConfigSummaryProps {
  expeditionName?: string;
  editionLabel?: string;
  items: SummaryItem[];
}

function Row({ label, value }: { label: string; value: string | string[] }) {
  if (Array.isArray(value)) {
    const lines = value.length > 0 ? value : ['—'];
    return (
      <div className="border-b border-[rgba(255,255,255,0.2)] py-4 flex flex-col gap-3">
        <span className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#8f8f8f]">
          {label}
        </span>
        <div className="flex flex-col">
          {lines.map((line, i) => (
            <p key={i} className="font-['Fraunces'] text-body leading-6 text-white">
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="border-b border-[rgba(255,255,255,0.2)] flex gap-8 items-center py-3">
      <span className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#8f8f8f] w-[45%] shrink-0">
        {label}
      </span>
      <p className="flex-1 min-w-0 font-['Fraunces'] text-body leading-6 text-white">
        {value || '—'}
      </p>
    </div>
  );
}

function Rows({ expeditionName, editionLabel, items }: ConfigSummaryProps) {
  return (
    <div className="border-t border-[rgba(255,255,255,0.2)]">
      <Row label="Edition" value={editionLabel ?? "—"} />
      <Row label="Peak" value={expeditionName ?? "—"} />
      {items.map((it) => (
        <Row key={it.label} label={it.label} value={it.chosenLabel} />
      ))}
      <div className="border-b border-[rgba(255,255,255,0.2)] flex flex-col gap-3 py-4">
        <span className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#8f8f8f]">
          Investment
        </span>
        <p className="font-['Fraunces'] text-body leading-6 text-white">
          We do not believe in quoting a number before understanding your climb. Submit your configuration and we will build the right proposal.
        </p>
      </div>
    </div>
  );
}

/** Sticky desktop summary panel. */
export function ConfigSummary(props: ConfigSummaryProps) {
  return (
    <aside className="hidden lg:block w-[369px] shrink-0">
      <div className="sticky top-10 bg-[rgba(46,53,60,0.5)] p-8 flex flex-col gap-7">
        <p className="font-['Fraunces'] text-display-m text-white">
          Your Configuration
        </p>
        <Rows {...props} />
      </div>
    </aside>
  );
}

/** Fixed mobile bar — peak · edition at a glance. */
export function MobileConfigBar(props: ConfigSummaryProps) {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[rgba(46,53,60,0.9)] border-t border-[rgba(255,255,255,0.1)] px-6 py-3">
      <p className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.14em] text-[#8f8f8f]">
        {props.expeditionName ?? "Select a peak"}
        {props.editionLabel ? (
          <span className="text-white"> · {props.editionLabel}</span>
        ) : null}
      </p>
    </div>
  );
}
