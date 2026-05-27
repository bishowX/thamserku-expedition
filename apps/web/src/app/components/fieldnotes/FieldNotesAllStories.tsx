import type { SanityFieldNote, FieldNotesPageFields } from '../../../lib/queries';

export const FieldNotesAllStories = ({ page, fieldNotes }: { page: FieldNotesPageFields; fieldNotes: SanityFieldNote[] }) => {

  return (
 <section className="bg-[#F4F2EC] section-padding">
      <div className="max-w-[1320px] mx-auto flex flex-col">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 mb-16 md:mb-24">
          <div className="md:col-span-5 flex flex-col">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
              {page.archiveEyebrow}
            </span>
            <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[16ch]">
              {page.archiveHeadline}
            </h2>
          </div>
          <div className="md:col-span-7 flex flex-col justify-end">
            <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[56ch] md:pb-4">
              {page.archiveSubline}
            </p>
          </div>
        </div>

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

        <div className="w-full flex flex-col border-t border-[#5A6673]/30 mb-20">
          {fieldNotes.map((note) => (
            <div
              key={note._id}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 py-[50px] md:py-[70px] border-b border-[#5A6673]/30 relative"
            >
              <div className="md:col-span-1">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77]">
                  {note.code}
                </span>
              </div>

              <div className="md:col-span-2 flex flex-col">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-2">
                  FIELD NOTE
                </span>
              </div>

              <div className="md:col-span-6 flex flex-col md:px-8">
                <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-[#1A1A1A] leading-[1.2] max-w-[56ch] mb-4">
                  {note.title}
                </h3>
                <p className="font-['Lexend'] font-light text-[15px] text-[#5A6673] leading-[1.5] max-w-[60ch] truncate">
                  {note.excerpt}
                </p>
              </div>

              <div className="md:col-span-2 flex items-start md:pt-1">
                <span className="font-['Lexend'] font-light text-[14px] text-[#5A6673]">
                  {note.byline}
                </span>
              </div>

              <div className="md:col-span-1 flex justify-start md:justify-end md:pt-1">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                  {note.readTime} MIN
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] cursor-pointer hover:text-[#1A1A1A] transition-colors">
            LOAD OLDER PIECES →
          </span>
        </div>

      </div>
    </section>
  );
};
