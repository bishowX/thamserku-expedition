import type { SafetyPageData } from '../../../lib/queries';

type Props = { page: SafetyPageData['safetyPage'] };

export const SafetyNumbersMeaning = ({ page }: Props) => {
  const cards = page?.numbersCards ?? [];

  return (
    <section className="bg-[#F4F2EC] section-padding">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center gap-12 md:gap-16">
        <h2 className="font-['Fraunces'] text-display-l text-[#1A1A1A] text-center max-w-[20ch]">
          {page?.numbersHeading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 w-full">
          {cards.map((card, i) => (
            <div key={i} className="flex flex-col items-start gap-6 md:gap-8">
              <h3 className="font-['Fraunces'] text-display-m text-[#1A1A1A] max-w-[16ch] md:min-h-[62px]">
                {card.title}
              </h3>
              <p className="font-['DM_Sans'] font-light text-body text-[#5A6673] leading-[1.7]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
