import type { DiagramStep, DiagramTimingNote } from "../../../lib/queries";

type PageData = {
  diagramEyebrow?: string;
  diagramHeadline?: string;
  diagramSubheading?: string;
  diagramSteps?: DiagramStep[];
  diagramTimingNotes?: DiagramTimingNote[];
};

export const PathwayTwoExpeditionDiagram = ({ page }: { page?: PageData }) => {
  const eyebrow = page?.diagramEyebrow;
  const headline = page?.diagramHeadline;
  const subheading = page?.diagramSubheading;
  const steps = page?.diagramSteps ?? [];
  const timingNotes = page?.diagramTimingNotes ?? [];

  if (!eyebrow || !headline || steps.length === 0 || timingNotes.length === 0) return null;

  const midIdx = Math.floor(steps.length / 2);

  return (
    <section className="bg-[#2E353C] section-padding">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">

        <div className="flex flex-col items-center mb-10 md:mb-32">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-8">
            {eyebrow}
          </span>
          <h2 className="font-['Radley'] font-light text-[48px] md:text-[56px] lg:text-[72px] text-white leading-[1.1] text-center max-w-[22ch] mb-6">
            {headline}
          </h2>
          {subheading && (
            <p className="font-['Cormorant_Garamond'] italic text-[#C8CDD2] text-[22px] text-center max-w-[56ch]">
              {subheading}
            </p>
          )}
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex w-full relative mb-32 pt-12 pb-12">
          <div className="absolute top-[56px] left-[16.66%] right-[16.66%] h-[1px] bg-white z-0" />
          {steps.map((step, idx) => {
            const isMiddle = idx === midIdx;
            return (
              <div key={step._key} className="flex-1 flex flex-col items-center relative z-10 px-4">
                <span className="absolute -top-10 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white bg-[#2E353C] px-2">
                  {step.altitudeLabel}
                </span>
                <div className="w-4 h-4 rounded-full border border-white bg-[#2E353C] mb-8" />
                <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] text-center mb-4">
                  {step.stepLabel}
                </span>
                <h3 className={`font-['Radley'] font-light leading-[1.2] mb-4 ${isMiddle ? "text-[24px] text-[#C8CDD2]" : "text-[28px] text-white"}`}>
                  {step.title}
                </h3>
                <p className="font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65] text-center max-w-[28ch]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex flex-col gap-10 mb-10 md:mb-24 w-full px-4 relative">
          <div className="absolute top-0 bottom-0 left-[23px] w-[1px] bg-white z-0" />
          {steps.map((step, idx) => {
            const isMiddle = idx === midIdx;
            return (
              <div key={step._key} className="flex gap-8 relative z-10">
                <div className="flex flex-col items-center pt-2 w-4">
                  <div className="w-4 h-4 rounded-full border border-white bg-[#2E353C]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-white mb-2">
                    {step.altitudeLabel}
                  </span>
                  <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2] mb-2">
                    {step.stepLabel}
                  </span>
                  <h3 className={`font-['Radley'] font-light leading-[1.2] mb-4 ${isMiddle ? "text-[24px] text-[#C8CDD2]" : "text-[28px] text-white"}`}>
                    {step.title}
                  </h3>
                  <p className="font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timing Notes */}
        <div className="w-full max-w-[1180px] grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {timingNotes.map((note) => (
            <div key={note._key} className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#C8CDD2] mb-4">
                {note.label}
              </span>
              <p className="font-['Lexend'] font-light text-[14px] text-[#C8CDD2] leading-[1.65]">
                {note.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
