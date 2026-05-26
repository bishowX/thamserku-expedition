
const appointmentUrl = import.meta.env.VITE_GOOGLE_CALENDAR_URL as string | undefined;

export const ScheduleCalendar = () => {
  return (
 <section id="calendar" className="w-full bg-[#F4F2EC] py-24 px-8 flex justify-center">
      <div className="w-full max-w-[1080px] flex flex-col items-center">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
            SELECT A CONSULTATION TIME — PATH I
          </span>
          <h2 className="font-['Radley'] font-light text-[56px] md:text-[72px] text-[#1A1A1A] leading-[1.1] max-w-[22ch] mb-6">
            "Choose a time. We will write back personally."
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#0A3A77] text-[22px] max-w-[56ch]">
            Consultations run 45 minutes. By video, by phone, or by WhatsApp.
          </p>
        </div>

        {/* Google Calendar Appointment Scheduling */}
        <div className="w-full max-w-[880px] flex flex-col items-center text-center">
          <p className="font-['Lexend'] text-[#5A6673] text-[15px] leading-[1.65] max-w-[56ch] mb-10">
            Once you select a time, we will send you a confirmation and the conversation begins. The senior advisor who responds will be your single point of contact through your expedition.
          </p>
          {appointmentUrl ? (
            <a
              href={appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] text-[#0A3A77] border border-[#0A3A77] px-8 py-4 hover:bg-[#2E353C] hover:text-white transition-colors"
            >
              OPEN BOOKING CALENDAR →
            </a>
          ) : (
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]/60">
              CALENDAR BOOKING COMING SOON
            </span>
          )}
        </div>

        {/* Skip to letter path */}
        <div className="mt-16 flex flex-col items-center">
          <a
            href="#letter-path"
            className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] hover:text-[#1A1A1A] transition-colors border-b border-[#5A6673]/30 hover:border-[#1A1A1A] pb-1"
          >
            PREFER TO WRITE A LETTER INSTEAD? → SKIP TO LETTER PATH
          </a>
        </div>

      </div>
    </section>
  );
};
