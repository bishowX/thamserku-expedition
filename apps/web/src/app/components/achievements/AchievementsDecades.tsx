import type { AchievementsPageData, AchievementDecade } from "../../../lib/queries";

type PageData = AchievementsPageData['achievementsPage'];

const DEFAULT_DECADES: AchievementDecade[] = [
  {
    _key: '1',
    years: '1987 – 1992',
    title: 'Founding Years',
    body:
      "Thamserku Expedition launched in 1987 with expeditions to Dhaulagiri I, Pumori, and Sita Chuchura — immediately signalling intent to operate at the highest technical levels of Himalayan mountaineering.\n\nIn its very first year, the company facilitated Marc Batard's record-breaking speed ascent of Everest — the fastest ever recorded — and his achievement of summiting four 8,000m peaks in under nine months. The founding years established the operational framework across the Khumbu Himal that would define the company for generations.",
    meta: '17 expeditions · Dhaulagiri, Pumori, Everest, Makalu, Baruntse',
  },
  {
    _key: '2',
    years: '1993 – 2001',
    title: 'Growth and Diversification',
    body:
      'The decade saw Thamserku expand dramatically — adding Cho Oyu (which would become the single most operated peak with 217 expeditions), Kangchenjunga, Nuptse, Tilicho, Putha Hiunchuli, Manaslu, Himlung Himal, and numerous technical objectives across all major regions.\n\n1993: Pasang Lhamu Sherpa becomes the first Nepalese woman to summit Everest — a defining moment for Nepali mountaineering. 1996: Hans Kammerlander completes the first ski descent from Everest\'s summit. 2000: Jean-Christophe Lafaille\'s first solo ascent of Manaslu. 2001: First paragliding descent from Everest\'s summit.',
    meta: '160+ expeditions · 25+ distinct peaks',
  },
  {
    _key: '3',
    years: '2002 – 2011',
    title: 'The Peak Years',
    body:
      'The highest operational volume decade — peaking at 78 expeditions in 2006 alone. Cho Oyu dominated with 20+ simultaneous or sequential expeditions per season, while Everest operations grew in scope and international reach.\n\n2003: Juanito Oiarzabal becomes the first person to summit all fourteen 8,000ers 20 times under Thamserku support. 2004: First Greek citizen on Everest. 2005: First Muslim woman on Everest. 2006: First Philippines expedition, first British couple together, first Type 1 diabetic on the summit. 2009: Piano at 7,400m on Cho Oyu.',
    meta: '444 expeditions · Peak: 78 in 2006',
  },
  {
    _key: '4',
    years: '2012 – Present',
    title: 'Selective Excellence',
    body:
      'A deliberate shift toward fewer expeditions with greater depth of service — reflecting evolving industry standards and a more discerning international client base. The company continued supporting significant expeditions through the 2020s, including notable ascents on Everest in 2022.\n\nThis era represents the transition to the current Thamserku identity: the five-Edition architecture, the focus on luxury expedition experiences, and the integration with the broader Thamserku Group ecosystem (Yeti Airlines, Tara Air, Mountain Lodges of Nepal).',
    meta: 'Quality over quantity · New brand architecture',
  },
];

export function AchievementsDecades({ page }: { page?: PageData }) {
  const decades = page?.decades?.length ? page.decades : DEFAULT_DECADES;

  return (
    <section className="w-full bg-[#1A1A1A] flex justify-center pt-24 pb-24 section-padding">
      <div className="flex flex-col items-center gap-24 w-full">
        {decades.map((decade) => {
          const paragraphs = (decade.body ?? '').split(/\n\s*\n/).filter(Boolean);
          return (
            <article key={decade._key} className="flex flex-col gap-4 items-start w-full max-w-[855px]">
              <div className="flex flex-col gap-1">
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                  {decade.years}
                </span>
                <h3 className="font-['Cormorant_Garamond'] font-medium text-[28px] leading-[35px] text-white">
                  {decade.title}
                </h3>
              </div>

              {paragraphs.length > 0 && (
                <div className="flex flex-col gap-[24.375px]">
                  {paragraphs.map((para, i) => (
                    <p key={i} className="font-['Inter'] font-light text-[15px] leading-[24.375px] text-[#C8CDD2]">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {decade.meta && (
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
                  {decade.meta}
                </span>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
