import { Link } from 'react-router';
import type { SanityFieldNote, FieldNotesPageFields } from '../../../lib/queries';

export const FieldNotesFeaturedStories = ({ page, fieldNotes }: { page: FieldNotesPageFields; fieldNotes: SanityFieldNote[] }) => {
  const featured = fieldNotes.slice(0, 3);

  return (
 <section className="bg-[#1A1A1A] py-24 px-8">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">

        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            {page.featuredEyebrow}
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6">
            {page.featuredHeadline}
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]">
            {page.featuredSubline}
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featured.map((note) => (
            <div
              key={note._id}
              className="flex flex-col border-y border-[#5A6673]/30 px-6 py-8"
            >
              <div className="w-full aspect-[4/5] border border-[#5A6673] flex flex-col items-center justify-center p-4 mb-8">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] text-center mb-2">
                  [IMAGE PLACEHOLDER]
                </span>
              </div>

              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-4 block">
                {note.code} · {note.readTime} MIN READ
              </span>
              <h3 className="font-['Radley'] font-light text-[24px] md:text-[28px] text-white leading-[1.2] mb-6">
                {note.title}
              </h3>

              <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65] flex-grow mb-10">
                {note.excerpt}
              </p>

              <div className="flex justify-between items-center border-t border-[#5A6673]/30 pt-4">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
                  {note.byline}
                </span>
                <Link to={`/field-notes/${note.slug?.current ?? '#'}`} className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#0A3A77] hover:text-white transition-colors">
                  READ THE PIECE →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
