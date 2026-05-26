import type { SanityFieldNote } from '../../../lib/queries';

const DUMMY_STORIES = [
  { ref: "FN.01", cat: "THE APPROACH", date: "Spring 2025", title: "The Khumbu Approach", excerpt: "A walk-in is never only a walk-in. It is the first read of weather...", byline: "Expedition Desk · Kathmandu", time: "8 MIN" },
  { ref: "FN.02", cat: "SHERPA NOTES", date: "Spring 2025", title: "Sherpa Route Judgement", excerpt: "The quiet calculations that decide whether a day is a climbing day.", byline: "Sirdar Notes · Field Team", time: "9 MIN" },
  { ref: "FN.03", cat: "ROUTE JUDGEMENT", date: "Spring 2025", title: "Weather Windows", excerpt: "Reading the Himalaya in hours, not days. Why patience is the most undervalued...", byline: "Forecast Desk · Kathmandu", time: "6 MIN" },
  { ref: "FN.04", cat: "FIELD REPORTS", date: "Autumn 2024", title: "A Manaslu Autumn", excerpt: "Dispatch from Camp II on the mountain's quietest season in a decade.", byline: "Field Team · Manaslu", time: "11 MIN" },
  { ref: "FN.05", cat: "THE APPROACH", date: "Autumn 2024", title: "On Pace and Acclimatisation", excerpt: "Why speed is a liability in the early weeks of an 8,000m expedition.", byline: "Expedition Desk · Kathmandu", time: "7 MIN" },
  { ref: "FN.06", cat: "CULTURAL READINGS", date: "Spring 2024", title: "Notes from a Tengboche Morning", excerpt: "The monastery is more than a waypoint. It is the cultural ground we walk on.", byline: "Cultural Notes · Khumbu", time: "5 MIN" },
  { ref: "FN.07", cat: "LEGACY & ARCHIVE", date: "Spring 2024", title: "On Continuity — Forty Years in the Khumbu", excerpt: "How relationships built in the 1980s still define our logistics today.", byline: "The Chairman", time: "12 MIN" },
  { ref: "FN.08", cat: "ROUTE JUDGEMENT", date: "Autumn 2023", title: "The Cost of Pushing On", excerpt: "When the summit window closes, the hardest decision is the only right one.", byline: "Senior Sirdar · Field Notes", time: "9 MIN" }
];

export const FieldNotesAllStories = ({ fieldNotes }: { fieldNotes?: SanityFieldNote[] }) => {
  const hasSanity = fieldNotes && fieldNotes.length > 0;

  return (
 <section className="bg-[#F4F2EC] py-24 px-8">
      <div className="max-w-[1320px] mx-auto flex flex-col">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 mb-16 md:mb-24">
          <div className="md:col-span-5 flex flex-col">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
              ALL STORIES — § III
            </span>
            <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[16ch]">
              The archive.
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-col justify-end">
            <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[56ch] md:pb-4">
              Every Field Notes piece, from the expedition desk and the field. Filtered by category, sorted by most recent.
            </p>
          </div>
        </div>

        {/* Compact filter strip */}
        <div className="w-full flex flex-col md:flex-row justify-between border-y border-[#5A6673]/30 py-4 mb-16 gap-4 md:gap-0">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#5A6673]/30 flex-grow max-w-[800px]">
            <div className="py-2 md:py-0 md:pr-8 flex items-center cursor-pointer group">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] group-hover:text-[#1A1A1A] transition-colors">
                FILTER BY CATEGORY <span className="mx-2">·</span> ALL CATEGORIES
              </span>
              <svg className="w-3 h-3 ml-2 text-[#5A6673]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            <div className="py-2 md:py-0 md:px-8 flex items-center cursor-pointer group">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] group-hover:text-[#1A1A1A] transition-colors">
                SORT BY <span className="mx-2">·</span> MOST RECENT
              </span>
              <svg className="w-3 h-3 ml-2 text-[#5A6673]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            <div className="py-2 md:py-0 md:px-8 flex items-center cursor-pointer group">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] group-hover:text-[#1A1A1A] transition-colors">
                READING TIME <span className="mx-2">·</span> ANY LENGTH
              </span>
              <svg className="w-3 h-3 ml-2 text-[#5A6673]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <div className="flex items-center pt-2 md:pt-0 border-t md:border-t-0 border-[#5A6673]/30 md:border-transparent cursor-pointer hover:opacity-70 transition-opacity">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77]">
              RESET →
            </span>
          </div>
        </div>

        {/* All-stories list */}
        <div className="w-full flex flex-col border-t border-[#5A6673]/30 mb-20">
          {hasSanity
            ? fieldNotes!.map((note) => (
                <div
                  key={note._id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 py-[50px] md:py-[70px] border-b border-[#5A6673]/30 relative"
                >
                  {/* Col 1 */}
                  <div className="md:col-span-1">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77]">
                      {note.code}
                    </span>
                  </div>

                  {/* Col 2 */}
                  <div className="md:col-span-2 flex flex-col">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-2">
                      FIELD NOTE
                    </span>
                  </div>

                  {/* Col 3 */}
                  <div className="md:col-span-6 flex flex-col md:px-8">
                    <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-[#1A1A1A] leading-[1.2] max-w-[56ch] mb-4">
                      {note.title}
                    </h3>
                    <p className="font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.5] max-w-[60ch] truncate">
                      {note.excerpt}
                    </p>
                  </div>

                  {/* Col 4 */}
                  <div className="md:col-span-2 flex items-start md:pt-1">
                    <span className="font-['Lexend'] font-light text-[14px] text-[#5A6673]">
                      {note.byline}
                    </span>
                  </div>

                  {/* Col 5 */}
                  <div className="md:col-span-1 flex justify-start md:justify-end md:pt-1">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                      {note.readTime} MIN
                    </span>
                  </div>
                </div>
              ))
            : DUMMY_STORIES.map((story, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 py-[50px] md:py-[70px] border-b border-[#5A6673]/30 relative"
                >
                  {/* Col 1 */}
                  <div className="md:col-span-1">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77]">
                      {story.ref}
                    </span>
                  </div>

                  {/* Col 2 */}
                  <div className="md:col-span-2 flex flex-col">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-2">
                      {story.cat}
                    </span>
                    <span className="font-['Radley'] font-light text-[15px] text-[#1A1A1A]">
                      {story.date}
                    </span>
                  </div>

                  {/* Col 3 */}
                  <div className="md:col-span-6 flex flex-col md:px-8">
                    <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-[#1A1A1A] leading-[1.2] max-w-[56ch] mb-4">
                      {story.title}
                    </h3>
                    <p className="font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.5] max-w-[60ch] truncate">
                      {story.excerpt}
                    </p>
                  </div>

                  {/* Col 4 */}
                  <div className="md:col-span-2 flex items-start md:pt-1">
                    <span className="font-['Lexend'] font-light text-[14px] text-[#5A6673]">
                      {story.byline}
                    </span>
                  </div>

                  {/* Col 5 */}
                  <div className="md:col-span-1 flex justify-start md:justify-end md:pt-1">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                      {story.time}
                    </span>
                  </div>

                  {/* Dummy Indicator */}
                  <div className="absolute right-0 bottom-4">
                    <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[8px] text-[#5A6673] opacity-30">
                      [DUMMY CONTENT]
                    </span>
                  </div>
                </div>
              ))
          }
        </div>

        {/* Load More */}
        <div className="w-full flex justify-center">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] cursor-pointer hover:text-[#1A1A1A] transition-colors">
            LOAD OLDER PIECES →
          </span>
        </div>

      </div>
    </section>
  );
};