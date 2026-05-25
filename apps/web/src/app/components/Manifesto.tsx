type ManifestoData = {
  manifestoHeading?: string
  manifestoBody?: string
}

const DEFAULT_HEADING_PART1 = "The Himalayas are not entered through ambition alone."
const DEFAULT_HEADING_PART2 = "They are entered through knowledge."
const DEFAULT_BODY = "Thamserku is a heritage Himalayan expedition house, refined for a global audience. We guide through trust, safety, Sherpa mastery and transformation — not adrenaline, not volume, not noise."

function splitAtLastSentence(text: string): [string, string] {
  const idx = text.lastIndexOf('. ')
  if (idx === -1) return [text, '']
  return [text.slice(0, idx + 1), text.slice(idx + 2)]
}

export function Manifesto({ data }: { data?: ManifestoData }) {
  const [part1, part2] = data?.manifestoHeading
    ? splitAtLastSentence(data.manifestoHeading)
    : [DEFAULT_HEADING_PART1, DEFAULT_HEADING_PART2]
  const body = data?.manifestoBody ?? DEFAULT_BODY

  return (
    <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-32 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="md:w-1/4">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            02 — MANIFESTO
          </span>
        </div>
        <div className="md:w-3/4 flex flex-col gap-10">
          <h2 className="font-['Radley'] font-light text-fluid-heading leading-[1.2] max-w-3xl">
            {part1}{" "}
            <em className="text-[#0A3A77] italic">{part2}</em>
          </h2>
          <p className="font-['Lexend'] font-light text-[#5A6673] text-fluid-body leading-[1.8] max-w-[56ch]">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
