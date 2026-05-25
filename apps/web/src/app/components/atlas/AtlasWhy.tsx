export function AtlasWhy() {
  return (
    <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-24 px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        <div className="md:w-1/3">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            06 — THE THAMSERKU READING
          </span>
        </div>

        <div className="md:w-2/3">
          <h2 className="font-['Radley'] font-light text-4xl md:text-[44px] leading-[1.2] max-w-[28ch] text-[#1A1A1A] mb-12">
            Thamserku does not maintain a long catalogue. We read{" "}
            <span className="italic text-[#0A3A77]">
              selected mountains carefully
            </span>{" "}
            — and lead the climbers who choose to read them with us.
          </h2>

          <p className="font-['Lexend'] font-light text-[#5A6673] text-[16px] leading-relaxed max-w-[60ch]">
            Each expedition in this atlas is shaped around Sherpa leadership,
            conservative weather judgement, and nearly four decades of Himalayan
            logistics. We do not add mountains to grow. We deepen the mountains
            we already understand.
          </p>
        </div>
      </div>
    </section>
  );
}
