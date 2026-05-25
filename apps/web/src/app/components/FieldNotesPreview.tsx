import { ImageWithFallback } from "./figma/ImageWithFallback";
import approachImage from "../../assets/images/Copy_of_Nuptse.jpg";
import campImage from "../../assets/images/Copy_of_EBC_PC-Carol_Sachs_(34).jpg";
import type { SanityFieldNote } from "../../lib/queries";

const FALLBACK_NOTES = [
  { code: "FN / 01 — APPROACH", title: "The Khumbu Approach", excerpt: "A walk-in is never only a walk-in. It is the first read of weather, of body, of crew, and of how the mountain is breathing this season.", byline: "EXPEDITION DESK · 8 MIN READ", cols: 6, aspect: "aspect-[4/4]", image: approachImage as string },
  { code: "FN / 02 — CAMP", title: "Life at Base Camp", excerpt: "What an expedition actually feels like when the noise is removed.", byline: "FIELD TEAM · 6 MIN READ", cols: 3, aspect: "aspect-[4/5]", image: campImage as string },
  { code: "FN / 03 — JUDGEMENT", title: "Sherpa Route Judgement", excerpt: "The quiet calculations that decide whether a day is a climbing day.", byline: "SIRDAR NOTES · 9 MIN READ", cols: 3, aspect: "aspect-[4/5]", image: "https://images.unsplash.com/photo-1549364472-0972cec89cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDbGltYmVyJTIwbW91bnRhaW4lMjByaWRnZSUyMHNub3d8ZW58MXx8fHwxNzc3NDQ2MzExfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { code: "FN / 04 — WEATHER", title: "Weather Windows", excerpt: "Understanding the brief moments when the atmosphere allows passage to the summit.", byline: "METEOROLOGY · 7 MIN READ", cols: 6, aspect: "aspect-[4/3]", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" },
]

const LAYOUT = [
  { cols: 6, aspect: "aspect-[4/4]", image: approachImage as string },
  { cols: 3, aspect: "aspect-[4/5]", image: campImage as string },
  { cols: 3, aspect: "aspect-[4/5]", image: "https://images.unsplash.com/photo-1549364472-0972cec89cd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDbGltYmVyJTIwbW91bnRhaW4lMjByaWRnZSUyMHNub3d8ZW58MXx8fHwxNzc3NDQ2MzExfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { cols: 6, aspect: "aspect-[4/3]", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" },
]

function toDisplayNote(note: SanityFieldNote, idx: number) {
  const layout = LAYOUT[idx] ?? LAYOUT[0]
  return {
    code: note.code,
    title: note.title,
    excerpt: note.excerpt,
    byline: note.readTime ? `${note.byline} · ${note.readTime} MIN READ` : note.byline,
    cols: layout.cols,
    aspect: layout.aspect,
    image: layout.image,
  }
}

export function FieldNotesPreview({ fieldNotes }: { fieldNotes?: SanityFieldNote[] }) {
  const notes = fieldNotes && fieldNotes.length > 0
    ? fieldNotes.slice(0, 4).map(toDisplayNote)
    : FALLBACK_NOTES

  return (
    <section id="field-notes" className="w-full bg-white text-[#1A1A1A] py-32 px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          <div className="md:w-1/4">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
              04 — FIELD NOTES
            </span>
          </div>
          <div className="md:w-1/2">
            <h2 className="font-['Radley'] font-light text-fluid-heading leading-[1.1] mb-6">
              Short studies in Himalayan judgement.
            </h2>
          </div>
          <div className="md:w-1/4">
            <p className="font-['Lexend'] font-light text-[#5A6673] text-[15px] leading-[1.6]">
              Editorial dispatches intended to inform how you arrive at the mountain, not to sell it.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {notes.map((note, idx) => (
            <article
              key={idx}
              className={`flex flex-col gap-6 group cursor-pointer ${
                note.cols === 6 ? 'md:col-span-6' : 'md:col-span-3'
              }`}
            >
              <div className={`w-full overflow-hidden bg-[#F4F2EC] ${note.aspect}`}>
                <ImageWithFallback
                  src={note.image}
                  alt={note.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#5A6673]">
                  {note.code}
                </div>
                <h3 className="font-['Radley'] font-light text-fluid-lg leading-[1.2]">
                  {note.title}
                </h3>
                <p className="font-['Lexend'] font-light text-[#5A6673] text-fluid-body leading-relaxed">
                  {note.excerpt}
                </p>
                <div className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.22em] text-[#C8CDD2] mt-4 pt-4 border-t border-[#E5E7EB]">
                  {note.byline}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div id="newsletter" className="w-full mt-12 pt-[80px] md:pt-[100px] pb-[80px] md:pb-[100px] border-t border-[#E5E7EB]">
          <div className="max-w-[720px] mx-auto flex flex-col items-center text-center">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
              FIELD NOTES — NEWSLETTER
            </span>

            <h3 className="font-['Radley'] font-light text-fluid-xl leading-[1.1] text-[#1A1A1A] max-w-[22ch] mb-6">
              Receive Field Notes from the expedition desk.
            </h3>

            <p className="font-['Lexend'] font-light text-fluid-body text-[#5A6673] leading-[1.65] max-w-[56ch] mb-12">
              A quiet quarterly letter of field reports, route judgement and Himalayan readings.
            </p>

            <form className="w-full flex flex-col md:flex-row gap-6 justify-center items-center mb-10" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full md:w-auto flex-1 max-w-[320px] bg-transparent border-0 border-b border-[#1A1A1A]/30 pb-3 px-0 font-['Cormorant_Garamond'] italic text-[20px] text-[#1A1A1A] placeholder:text-[#5A6673]/60 focus:outline-none focus:ring-0 focus:border-[#1A1A1A] transition-colors"
              />
              <button
                type="submit"
                className="w-full md:w-auto border border-[#0A3A77]/30 px-8 py-3.5 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] hover:border-[#0A3A77] transition-colors"
              >
                Subscribe →
              </button>
            </form>

            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
              BY SUBSCRIBING YOU AGREE TO OUR PRIVACY TERMS. WE WILL NEVER SHARE YOUR DETAILS.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
