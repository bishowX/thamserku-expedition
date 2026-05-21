
export const ScheduleCalendar = () => {
  return (
    <section id="calendar" className="w-full bg-[#F4F2EC] py-[140px] md:py-[180px] px-8 flex justify-center">
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

        {/* Calendar Widget Placeholder */}
        <div className="w-full max-w-[880px] flex flex-col items-center">
          
          {/* Calendar Header Strip */}
          <div className="w-full flex justify-between items-center border-b border-[#5A6673]/30 pb-4 mb-8">
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A]">
              MAY 2026
            </span>
            <div className="flex gap-4">
              <button type="button" className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] hover:text-[#1A1A1A] transition-colors">
                ← PREV
              </button>
              <button type="button" className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] hover:text-[#1A1A1A] transition-colors">
                NEXT →
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="w-full mb-12">
            <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <div key={day} className="text-center font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
                  {day} <span className="hidden md:inline">·</span>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-y-6 md:gap-y-8 gap-x-2 md:gap-x-4 text-center">
              {Array.from({ length: 35 }).map((_, i) => {
                // Dummy logic for a month grid (5 rows x 7 cols)
                const dateNum = i - 3 > 0 && i - 3 <= 31 ? i - 3 : null;
                const isAvailable = [7, 8, 12, 13, 14, 19, 21, 25].includes(dateNum as number);
                const isLimited = [15, 28, 29].includes(dateNum as number);
                const isSelected = dateNum === 14;

                if (!dateNum) {
                  return <div key={i} className="h-16"></div>;
                }

                return (
                  <div key={i} className="flex flex-col items-center h-16">
                    <span className={`font-['Radley'] text-[20px] ${isAvailable || isLimited ? 'text-[#1A1A1A]' : 'text-[#5A6673]/50'}`}>
                      {dateNum}
                    </span>
                    {isAvailable && !isLimited && (
                      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#5A6673] mt-2">
                        OPEN
                      </span>
                    )}
                    {isLimited && (
                      <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[9px] text-[#0A3A77] mt-2">
                        LIMITED
                      </span>
                    )}
                    {isSelected && (
                      <div className="w-1 h-1 bg-[#1A1A1A] rounded-full mt-2"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Slot Row */}
          <div className="w-full flex flex-col items-center border-t border-[#5A6673]/30 pt-10 mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {['09:00 KTM', '11:00 KTM', '13:00 KTM', '15:00 KTM', '17:00 KTM', '19:00 KTM'].map(time => (
                <button
                  key={time}
                  type="button"
                  className="px-4 py-2 border border-[#5A6673]/30 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors bg-transparent"
                >
                  {time}
                </button>
              ))}
            </div>
            <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
              TIMES SHOWN IN NEPAL STANDARD TIME (NPT). CONFIRMATION IN YOUR LOCAL TIME ZONE.
            </span>
          </div>

          {/* Booking Action Row */}
          <div className="w-full flex flex-col items-center text-center">
            <p className="font-['Lexend'] text-[#5A6673] text-[15px] leading-[1.65] max-w-[56ch] mb-8">
              Once you select a time, we will send you a confirmation and the conversation begins. The senior advisor who responds will be your single point of contact through your expedition.
            </p>
            <button 
              type="button"
              className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[12px] text-[#0A3A77] border border-[#0A3A77] px-8 py-4 hover:bg-[#0A3A77] hover:text-white transition-colors mb-6"
            >
              CONFIRM CONSULTATION TIME →
            </button>
            <a href="#letter-path" className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] hover:text-[#1A1A1A] transition-colors border-b border-[#5A6673]/30 hover:border-[#1A1A1A] pb-1">
              PREFER TO WRITE A LETTER INSTEAD? → SKIP TO LETTER PATH
            </a>
          </div>

          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mt-24">
            [CLIENT TO CONFIRM] — REAL CALENDAR AVAILABILITY AND BOOKING INTEGRATION PENDING. WIDGET SHOWN IS PLACEHOLDER ONLY.
          </span>
          
        </div>
      </div>
    </section>
  );
};
