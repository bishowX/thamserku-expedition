export function Manifesto() {
  return (
    <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-32 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="md:w-1/4">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            02 — MANIFESTO
          </span>
        </div>
        <div className="md:w-3/4 flex flex-col gap-10">
          <h2 className="font-['Radley'] font-light text-4xl md:text-[48px] leading-[1.2] max-w-3xl">
            The Himalayas are not entered through ambition alone.{" "}
            <em className="text-[#0A3A77] italic">They are entered through knowledge.</em>
          </h2>
          <p className="font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-[1.8] max-w-[56ch]">
            Thamserku is a heritage Himalayan expedition house, refined for a global audience. We guide through trust, safety, Sherpa mastery and transformation — not adrenaline, not volume, not noise.
          </p>
        </div>
      </div>
    </section>
  );
}