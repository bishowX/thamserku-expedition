type PrepColumn = { title: string; items: string[] };

type Props = {
  preparationHeadline?: string;
  preparationColumns?: PrepColumn[] | null;
  expeditionName?: string;
};

const FALLBACK_COLUMNS: PrepColumn[] = [
  {
    title: "Body",
    items: [
      "Aerobic base",
      "Strength endurance",
      "6,000m + 7,000m altitude history",
      "Carrying load practice"
    ]
  },
  {
    title: "Time",
    items: [
      "12+ months training runway",
      "60–65 days expedition window",
      "Pre-departure call sequence"
    ]
  },
  {
    title: "Mind",
    items: [
      "Acceptance of weather authority",
      "Patience for rotation",
      "Willingness to turn back",
      "Discipline at altitude"
    ]
  }
];

export function Preparation({ preparationHeadline, preparationColumns, expeditionName }: Props) {
  const columns = preparationColumns ?? FALLBACK_COLUMNS;
  const headline = preparationHeadline || `What ${expeditionName ? `a ${expeditionName}` : 'an expedition'} year actually asks of you.`;

  return (
 <section className="bg-[#1A1A1A] w-full text-white py-24">
      <div className="max-w-[1440px] mx-auto px-8 flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <h2 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            09 — PREPARATION
          </h2>
          <h3 className="font-['Radley'] font-light text-[44px] md:text-[56px] leading-[1.1] max-w-[32ch]">
            {headline}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-16">
          {columns.map((col, idx) => (
            <PrepColumnBlock key={idx} title={col.title} items={col.items} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PrepColumnBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-8">
      <h4 className="font-['Radley'] font-light text-[32px] text-white">
        {title}
      </h4>
      <div className="flex flex-col">
        {items.map((item, idx) => (
          <div key={idx} className="py-4 border-t border-white/10 last:border-b font-['Lexend'] font-light text-[#C8CDD2] text-[15px]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
