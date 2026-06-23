type Stat = { value: string; label: string };

export function ManifestoStats({ stats }: { stats?: Stat[] | null }) {
  if (!stats?.length) return null;
  const items = stats;

  return (
    <section className="w-full bg-[#2E353C] py-4 px-4 md:py-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 md:gap-0 md:justify-between">
        {items.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 min-w-[80px]"
          >
            <span className="font-['Fraunces'] font-[250] text-white text-stat">
              {stat.value}
            </span>
            <span className="font-['DM_Sans'] font-light text-[#C8CDD2] text-body leading-[1.95]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
