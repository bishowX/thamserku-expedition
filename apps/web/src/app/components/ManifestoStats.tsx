type Stat = { value: string; label: string };

export function ManifestoStats({ stats }: { stats?: Stat[] | null }) {
  if (!stats?.length) return null;
  const items = stats;

  return (
    <section className="w-full bg-[#2E353C] py-6 px-4 md:py-10 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 md:gap-0 md:justify-between">
        {items.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 min-w-[80px]"
          >
            <span className="font-['Radley'] text-white text-[28px] leading-[1.33] md:text-[42px]">
              {stat.value}
            </span>
            <span className="font-['Lexend'] font-light text-[#C8CDD2] text-[12px] leading-[1.95] md:text-[16px]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
