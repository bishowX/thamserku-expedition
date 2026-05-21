import { useState } from 'react';
import { ChevronDown, Upload } from 'lucide-react';

export const EnquiryForm = () => {
  const [activeInterest, setActiveInterest] = useState<string[]>([]);
  const [activeEdition, setActiveEdition] = useState<string>('');
  const [trekkingExp, setTrekkingExp] = useState<string>('');
  const [altitudeExp, setAltitudeExp] = useState<string[]>([]);
  const [preferredSeason, setPreferredSeason] = useState<string>('');
  const [privateGroup, setPrivateGroup] = useState<string>('');
  const [privacyLevel, setPrivacyLevel] = useState<string>('');
  const [contactMethod, setContactMethod] = useState<string>('');

  const toggleInterest = (interest: string) => {
    if (activeInterest.includes(interest)) {
      setActiveInterest(activeInterest.filter(i => i !== interest));
    } else {
      setActiveInterest([...activeInterest, interest]);
    }
  };

  const toggleAltitude = (alt: string) => {
    if (altitudeExp.includes(alt)) {
      setAltitudeExp(altitudeExp.filter(a => a !== alt));
    } else {
      setAltitudeExp([...altitudeExp, alt]);
    }
  };

  return (
    <section id="letter-path" className="bg-white py-24 md:py-48">
      <div className="max-w-[880px] mx-auto px-8">
        
        {/* Alternative Path Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
            OR WRITE TO US — PATH II
          </span>
          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[22px] max-w-[56ch]">
            Prefer to write to us in your own words? The letter path is below — read carefully by the senior expedition desk.
          </p>
        </div>

        {/* Section Header */}
        <div className="mb-24">
          <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
            03 — THE REQUEST
          </p>
          <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[56px] leading-[1.1] mb-6 text-[#1A1A1A] max-w-[22ch]">
            A short, considered letter to our expedition desk.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[20px] max-w-[56ch]">
            Six chapters. Fewer questions, asked carefully.
          </p>
          <div className="h-[1px] w-full bg-[#E5E7EB] mt-12" />
        </div>

        <form className="space-y-32">
          
          {/* Chapter A */}
          <div className="space-y-12">
            <div className="mb-12">
              <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                CHAPTER A
              </p>
              <h3 className="font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A]">
                Who you are.
              </h3>
            </div>

            <div className="space-y-10">
              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  A.1 — FULL NAME <span className="ml-1">·</span>
                </label>
                <input 
                  type="text" 
                  placeholder="How would you like us to address you?"
                  className="w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  A.2 — EMAIL <span className="ml-1">·</span>
                </label>
                <input 
                  type="email" 
                  placeholder="name@domain.com"
                  className="w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  A.3 — PHONE / WHATSAPP
                </label>
                <input 
                  type="tel" 
                  placeholder="Your number with country code"
                  className="w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50"
                />
                <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mt-3">
                  OPTIONAL · USED ONLY IF YOU PREFER VOICE OR WHATSAPP CONTACT.
                </p>
              </div>

              <div className="flex flex-col relative">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  A.4 — COUNTRY OF RESIDENCE <span className="ml-1">·</span>
                </label>
                <div className="relative border-b border-[#5A6673] pb-3 cursor-pointer group">
                  <select defaultValue="" className="w-full bg-transparent text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl appearance-none focus:outline-none cursor-pointer group-hover:text-[#0A3A77] transition-colors text-[#5A6673]/50">
                    <option value="" disabled>Select country</option>
                    <option value="us" className="not-italic font-sans text-base">United States</option>
                    <option value="uk" className="not-italic font-sans text-base">United Kingdom</option>
                    <option value="other" className="not-italic font-sans text-base">Other</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1 w-5 h-5 text-[#5A6673] group-hover:text-[#0A3A77] pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  A.5 — PREFERRED METHOD OF CONTACT <span className="ml-1">·</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {['EMAIL', 'PHONE', 'WHATSAPP'].map(method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setContactMethod(method)}
                      className={`px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${
                        contactMethod === method 
                          ? 'bg-[#0A3A77] text-white border-[#0A3A77]' 
                          : 'bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chapter B */}
          <div className="space-y-12">
            <div className="mb-12">
              <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                CHAPTER B
              </p>
              <h3 className="font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A]">
                The mountain you have in mind.
              </h3>
            </div>

            <div className="space-y-10">
              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
                  B.1 — EXPEDITION INTEREST <span className="ml-1">·</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {['EVEREST', 'MANASLU', 'DHAULAGIRI', 'MAKALU', 'HIMCHULI', 'OTHER · NOT SURE'].map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${
                        activeInterest.includes(interest)
                          ? 'bg-[#0A3A77] text-white border-[#0A3A77]' 
                          : 'bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mt-4">
                  SELECT ONE OR MORE. IF UNSURE, LEAVE THE FINAL OPTION CHECKED.
                </p>
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  B.2 — IF "OTHER · NOT SURE", A FEW WORDS ON WHAT YOU ARE LOOKING FOR
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. a first 8,000m peak, a quieter Himalayan objective, a non-summit Himalayan journey..."
                  className="w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50"
                />
              </div>
            </div>
          </div>

          {/* Chapter C */}
          <div className="space-y-12">
            <div className="mb-12">
              <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                CHAPTER C
              </p>
              <h3 className="font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A]">
                The edition you have in mind.
              </h3>
            </div>

            <div className="space-y-10">
              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
                  C.1 — PREFERRED EDITION <span className="ml-1">·</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {['A — ALPINE', 'B — BESPOKE', 'C — CRAFTED', 'D — DEFINITIVE', 'E — EXPLORER', 'NOT SURE YET'].map(edition => (
                    <button
                      key={edition}
                      type="button"
                      onClick={() => setActiveEdition(edition)}
                      className={`px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${
                        activeEdition === edition
                          ? 'bg-[#0A3A77] text-white border-[#0A3A77]' 
                          : 'bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {edition}
                    </button>
                  ))}
                </div>
                <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[15px] mt-4 max-w-[52ch]">
                  If you are unsure, leave it open. Editions are best chosen in conversation with our desk.
                </p>
              </div>
            </div>
          </div>

          {/* Chapter D */}
          <div className="space-y-12">
            <div className="mb-12">
              <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                CHAPTER D
              </p>
              <h3 className="font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A] mb-4">
                Your background in altitude.
              </h3>
              <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] max-w-[56ch]">
                We ask this carefully — not to filter you, but to recommend the right edition and the right rhythm of preparation.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
                  D.1 — TREKKING EXPERIENCE <span className="ml-1">·</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {['LIMITED', 'INTERMEDIATE', 'EXTENSIVE'].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setTrekkingExp(level)}
                      className={`px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${
                        trekkingExp === level
                          ? 'bg-[#0A3A77] text-white border-[#0A3A77]' 
                          : 'bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
                  D.2 — ALTITUDE EXPERIENCE
                </label>
                <div className="flex flex-wrap gap-4">
                  {['BELOW 4,000 M', '4,000 — 6,000 M', '6,000 — 7,000 M', '7,000 — 8,000 M', 'ABOVE 8,000 M'].map(alt => (
                    <button
                      key={alt}
                      type="button"
                      onClick={() => toggleAltitude(alt)}
                      className={`px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${
                        altitudeExp.includes(alt)
                          ? 'bg-[#0A3A77] text-white border-[#0A3A77]' 
                          : 'bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {alt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  D.3 — FITNESS & TRAINING BACKGROUND <span className="ml-1">·</span>
                </label>
                <textarea 
                  rows={4}
                  placeholder="A short paragraph about your training rhythm — running, hiking, strength, altitude exposure, anything relevant."
                  className="w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50 resize-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  D.4 — UPLOAD CLIMBING CV OR PRIOR EXPEDITION DETAILS
                </label>
                <div className="w-full border border-[#C8CDD2] hover:border-[#1A1A1A] transition-colors p-8 flex flex-col items-center justify-center cursor-pointer group">
                  <Upload className="w-5 h-5 text-[#5A6673] group-hover:text-[#1A1A1A] mb-4 transition-colors" />
                  <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#1A1A1A] mb-2">
                    OPTIONAL · PDF · DOC · IMAGES · MAX 10 MB
                  </p>
                  <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[16px] text-center max-w-[48ch]">
                    If you have a climbing CV, prior expedition reports, or photographs, attach them here. They help our desk write a more accurate first response.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter E */}
          <div className="space-y-12">
            <div className="mb-12">
              <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                CHAPTER E
              </p>
              <h3 className="font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A]">
                Travel preferences.
              </h3>
            </div>

            <div className="space-y-10">
              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
                  E.1 — PREFERRED SEASON
                </label>
                <div className="flex flex-wrap gap-4">
                  {['SPRING', 'AUTUMN', 'OPEN'].map(season => (
                    <button
                      key={season}
                      type="button"
                      onClick={() => setPreferredSeason(season)}
                      className={`px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${
                        preferredSeason === season
                          ? 'bg-[#0A3A77] text-white border-[#0A3A77]' 
                          : 'bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  E.2 — NUMBER OF GUESTS <span className="ml-1">·</span>
                </label>
                <input 
                  type="number" 
                  min="1"
                  max="10"
                  placeholder="1"
                  className="w-full max-w-[120px] bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
                  E.3 — PRIVATE OR GROUP PREFERENCE <span className="ml-1">·</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {['PRIVATE', 'SMALL GROUP', 'OPEN'].map(pref => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setPrivateGroup(pref)}
                      className={`px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${
                        privateGroup === pref
                          ? 'bg-[#0A3A77] text-white border-[#0A3A77]' 
                          : 'bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-6">
                  E.4 — PRIVACY LEVEL
                </label>
                <div className="flex flex-wrap gap-4">
                  {['STANDARD', 'HIGH', 'MAXIMUM'].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setPrivacyLevel(level)}
                      className={`px-6 py-3 border font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] transition-colors ${
                        privacyLevel === level
                          ? 'bg-[#0A3A77] text-white border-[#0A3A77]' 
                          : 'bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[15px] mt-4">
                  Optional. If you require maximum discretion, please indicate it here.
                </p>
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  E.5 — MEDICAL CONSIDERATIONS <span className="ml-1">·</span> OPTIONAL
                </label>
                <textarea 
                  rows={3}
                  placeholder="Any medical history, medications, or considerations our team should be aware of when planning."
                  className="w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50 resize-none"
                />
                <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mt-3">
                  HANDLED CONFIDENTIALLY · BY OUR SAFETY & MEDICAL ADVISOR ONLY.
                </p>
              </div>
            </div>
          </div>

          {/* Chapter F */}
          <div className="space-y-12">
            <div className="mb-12">
              <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                CHAPTER F
              </p>
              <h3 className="font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A]">
                Anything you would like us to know.
              </h3>
            </div>

            <div className="space-y-10">
              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  F.1 — A MESSAGE TO THE DESK <span className="ml-1">·</span>
                </label>
                <textarea 
                  rows={6}
                  placeholder="Write to us in your own words — your timing, your intention, anything that matters to you about this journey."
                  className="w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#0A3A77] transition-colors placeholder:text-[#5A6673]/50 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submission Row */}
          <div className="pt-16 border-t border-[#E5E7EB] mt-32">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673]">
                BY SUBMITTING, YOU AGREE TO OUR PRIVACY TERMS <span className="mx-2">·</span> WE WILL NEVER SHARE YOUR DETAILS.
              </p>
              <button 
                type="submit"
                className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#0A3A77] border border-[#0A3A77] px-8 py-4 hover:bg-[#0A3A77] hover:text-white transition-colors"
              >
                SEND THE LETTER →
              </button>
            </div>
          </div>

        </form>
      </div>
    </section>
  );
};
