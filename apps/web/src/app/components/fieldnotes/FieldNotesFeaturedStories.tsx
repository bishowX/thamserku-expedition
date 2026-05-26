import { Link } from 'react-router';
import type { SanityFieldNote } from '../../../lib/queries';

const STORIES = [
  {
    imageType: "TRAIL APPROACH — KHUMBU",
    eyebrow: "THE APPROACH · 8 MIN READ",
    title: "The Khumbu Approach",
    excerpt: "A walk-in is never only a walk-in. It is the first read of weather, of body, of crew, and of how the mountain is breathing this season. Notes from our spring approach to Everest Base Camp.",
    byline: "EXPEDITION DESK · KATHMANDU"
  },
  {
    imageType: "SHERPA AT WORK — ROUTE PREP",
    eyebrow: "SHERPA NOTES · 9 MIN READ",
    title: "Sherpa Route Judgement",
    excerpt: "The quiet calculations that decide whether a day is a climbing day. From senior Sirdars whose judgement has been earned across decades of seasons. A field reading on how decisions are made at altitude.",
    byline: "SIRDAR NOTES · FIELD TEAM"
  },
  {
    imageType: "WEATHERED MAP — FORECAST DESK",
    eyebrow: "ROUTE JUDGEMENT · 6 MIN READ",
    title: "Weather Windows",
    excerpt: "Reading the Himalaya in hours, not days. Why patience is the most undervalued piece of equipment we carry. From our forecast desk and senior expedition staff.",
    byline: "FORECAST DESK · KATHMANDU"
  }
];

export const FieldNotesFeaturedStories = ({ fieldNotes }: { fieldNotes?: SanityFieldNote[] }) => {
  const hasSanity = fieldNotes && fieldNotes.length > 0;
  const featured = hasSanity ? fieldNotes.slice(0, 3) : null;

  return (
 <section className="bg-[#1A1A1A] py-24 px-8">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">

        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            FEATURED — § II
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6">
            Three stories, read first.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]">
            Recent dispatches from the expedition desk and field team.
          </p>
        </div>

        {/* Featured grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featured
            ? featured.map((note) => (
                <div
                  key={note._id}
                  className="flex flex-col border-y border-[#5A6673]/30 px-6 py-8"
                >
                  {/* Image Placeholder */}
                  <div className="w-full aspect-[4/5] border border-[#5A6673] flex flex-col items-center justify-center p-4 mb-8">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2">
                      [IMAGE PLACEHOLDER]
                    </span>
                  </div>

                  {/* Eyebrow & Title */}
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-4 block">
                    {note.code} · {note.readTime} MIN READ
                  </span>
                  <h3 className="font-['Radley'] font-light text-[24px] md:text-[28px] text-white leading-[1.2] mb-6">
                    {note.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65] flex-grow mb-10">
                    {note.excerpt}
                  </p>

                  {/* Footer row */}
                  <div className="flex justify-between items-center border-t border-[#5A6673]/30 pt-4">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
                      {note.byline}
                    </span>
                    <Link to={`/field-notes/${note.slug?.current ?? '#'}`} className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] hover:text-white transition-colors">
                      READ THE PIECE →
                    </Link>
                  </div>
                </div>
              ))
            : STORIES.map((story, idx) => (
                <div
                  key={idx}
                  className="flex flex-col border-y border-[#5A6673]/30 px-6 py-8"
                >
                  {/* Image Placeholder */}
                  <div className="w-full aspect-[4/5] border border-[#5A6673] flex flex-col items-center justify-center p-4 mb-8">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2">
                      [IMAGE PLACEHOLDER]
                    </span>
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center opacity-60">
                      [{story.imageType}]
                    </span>
                  </div>

                  {/* Eyebrow & Title */}
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-4 block">
                    {story.eyebrow}
                  </span>
                  <h3 className="font-['Radley'] font-light text-[24px] md:text-[28px] text-white leading-[1.2] mb-6">
                    {story.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65] flex-grow mb-10">
                    {story.excerpt}
                  </p>

                  {/* Footer row */}
                  <div className="flex justify-between items-center border-t border-[#5A6673]/30 pt-4">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
                      {story.byline}
                    </span>
                    <Link to="#" className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] hover:text-white transition-colors">
                      READ THE PIECE →
                    </Link>
                  </div>

                  {/* Dummy marker */}
                  <div className="w-full flex justify-end mt-4">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] opacity-40">
                      [DUMMY CONTENT]
                    </span>
                  </div>
                </div>
              ))
          }
        </div>

      </div>
    </section>
  );
};