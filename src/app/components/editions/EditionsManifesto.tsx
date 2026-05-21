export function EditionsManifesto() {
  return (
    <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-24 md:py-48 px-8">
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
        
        {/* Left Column: Eyebrow */}
        <div className="col-span-1 md:col-span-4 lg:col-span-5">
          <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            02 — THE READING
          </p>
        </div>
        
        {/* Right Column: Pull-quote & Paragraph */}
        <div className="col-span-1 md:col-span-8 lg:col-span-7 flex flex-col gap-12">
          <h2 className="font-['Radley'] font-light text-4xl md:text-[52px] leading-[1.1] max-w-[30ch] tracking-tight text-[#1A1A1A]">
            A Thamserku edition is not an upgrade. <span className="italic text-[#0A3A77]">It is a way of reading the mountain.</span>
          </h2>
          
          <p className="font-['Lexend'] font-light text-[#5A6673] text-[16px] leading-relaxed max-w-[60ch]">
            From Alpine discipline to the Definitive private expedition, each edition is shaped around intent, privacy, and preparation. The mountain remains constant. What changes is how you arrive at it, who walks beside you, and what is taken care of quietly behind the line.
          </p>
        </div>

      </div>
    </section>
  );
}
