
type PrivateAudience = { title: string; subtitle: string; body: string; _key?: string };

const AUDIENCES = [
  {
    eyebrow: "READER I — UHNI PRINCIPALS",
    title: "Individuals climbing privately.",
    desc: "Senior individuals — entrepreneurs, executives, public figures — whose presence is recognisable, whose schedules are protected, and who require an expedition that is unobtrusive from first conversation to descent."
  },
  {
    eyebrow: "READER II — FAMILY OFFICES",
    title: "Planning on behalf of principals.",
    desc: "Family office advisors and chief-of-staff figures coordinating expeditions on behalf of principals. We work directly with your office, with the same discretion that defines the rest of your engagements."
  },
  {
    eyebrow: "READER III — PRIVATE FAMILY GROUPS",
    title: "Two to six climbers, related or trusted.",
    desc: "Families and small private groups climbing together — sometimes generationally, sometimes ceremonially. The expedition is built around the group's rhythm and pace, not standardised."
  },
  {
    eyebrow: "READER IV — EXECUTIVE & CORPORATE PARTIES",
    title: "Senior leadership teams or principals.",
    desc: "Boards, senior executive teams, and private partnerships using a Himalayan expedition as the setting for a decision, a milestone, or a transition. Privacy and dedicated support are non-negotiable."
  }
];

export const PrivateWhoItIsFor = ({ audiences }: { audiences?: PrivateAudience[] }) => {
  const displayAudiences = audiences && audiences.length > 0
    ? audiences.map((a) => ({ eyebrow: a.title, title: a.subtitle, desc: a.body }))
    : AUDIENCES;

  return (
 <section className="bg-[#1A1A1A] py-24 px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">

        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            WHO IT IS FOR — § II
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6">
            Four readers. One quiet door.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]">
            Private expeditions are read by a small set of clients, each with their own reasons for arriving here.
          </p>
        </div>

        {/* Audience grid */}
        <div className="w-full max-w-[1320px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {displayAudiences.map((audience, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-[#2E353C]/30 border-t border-[#C8CDD2]/30 px-6 py-10"
            >
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-6 block min-h-[3em]">
                {audience.eyebrow}
              </span>
              <h3 className="font-['Radley'] font-light text-[22px] md:text-[26px] text-white leading-[1.2] mb-6">
                {audience.title}
              </h3>
              <p className="font-['Lexend'] font-light text-[15px] text-[#C8CDD2] leading-[1.65]">
                {audience.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};