import { useState } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { useNavigation, Form } from 'react-router';
import type { ConsultationPage } from '../../../lib/queries';

type Errors = { fullName?: string; email?: string };

const appointmentUrl = import.meta.env.VITE_GOOGLE_CALENDAR_URL as string | undefined;

export const EnquiryForm = ({
  data,
  submitted,
  errors,
}: {
  data?: ConsultationPage;
  submitted?: boolean;
  errors?: Errors;
}) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [contactMethod, setContactMethod] = useState<string>('');

  const alternativeLabel = data?.formAlternativeLabel;
  const alternativeSubheading = data?.formAlternativeSubheading;
  const sectionLabel = data?.formSectionLabel;
  const chapterATitle = data?.formChapterATitle;
  const contactOptions = data?.formContactOptions ?? [];

  if (submitted) {
    return (
      <section id="letter-path" className="bg-white py-24">
        <div className="max-w-[880px] mx-auto px-8 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full border border-[#C8CDD2] flex items-center justify-center mb-12">
            <CheckCircle className="w-5 h-5 text-[#2E353C]" strokeWidth={1.5} />
          </div>
          <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
            LETTER RECEIVED
          </p>
          <h2 className="font-['Cormorant_Garamond'] font-light text-4xl md:text-[56px] leading-[1.1] mb-8 text-[#1A1A1A] max-w-[22ch]">
            Your letter is in our hands.
          </h2>
          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[20px] max-w-[52ch] mb-16">
            We read every enquiry personally. You will hear from our desk within 48 hours.
          </p>
          <div className="h-[1px] w-24 bg-[#C8CDD2] mb-8" />
          <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
            THAMSERKU EXPEDITIONS <span className="mx-2">·</span> DESK
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="letter-path" className="bg-white py-24">
      <div className="max-w-[880px] mx-auto px-8">

        {/* Alternative Path Header */}
        <div className="mb-8 flex flex-col items-center text-center gap-4">
          <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            {alternativeLabel}
          </span>
          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[22px] max-w-[56ch]">
            {alternativeSubheading}
          </p>
        </div>

        {/* Section Label */}
        <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-8">
          {sectionLabel}
        </p>

        <div className="h-[1px] w-full bg-[#E5E7EB] mb-8" />

        <Form method="post" className="space-y-8">

          <input type="hidden" name="preferredContact" value={contactMethod} />

          {/* Chapter A — Who you are */}
          <div className="space-y-12">
            <h3 className="font-['Cormorant_Garamond'] text-[28px] text-[#1A1A1A]">{chapterATitle}</h3>

            <div className="space-y-10">
              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  A.1 — FULL NAME <span className="ml-1">·</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="How would you like us to address you?"
                  className={`w-full bg-transparent border-b pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none transition-colors placeholder:text-[#5A6673]/50 ${errors?.fullName ? 'border-red-400 focus:border-red-500' : 'border-[#5A6673] focus:border-[#2E353C]'}`}
                />
                {errors?.fullName && (
                  <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-red-500 mt-2">{errors.fullName}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">
                  A.2 — EMAIL <span className="ml-1">·</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  className={`w-full bg-transparent border-b pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none transition-colors placeholder:text-[#5A6673]/50 ${errors?.email ? 'border-red-400 focus:border-red-500' : 'border-[#5A6673] focus:border-[#2E353C]'}`}
                />
                {errors?.email && (
                  <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-red-500 mt-2">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">A.3 — PHONE / WHATSAPP</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your number with country code"
                  className="w-full bg-transparent border-b border-[#5A6673] pb-3 text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl focus:outline-none focus:border-[#2E353C] transition-colors placeholder:text-[#5A6673]/50"
                />
                <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] mt-3">OPTIONAL · USED ONLY IF YOU PREFER VOICE OR WHATSAPP CONTACT.</p>
              </div>

              <div className="flex flex-col relative">
                <label className="font-['JetBrains_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">A.4 — COUNTRY OF RESIDENCE <span className="ml-1">·</span></label>
                <div className="relative border-b border-[#5A6673] pb-3 cursor-pointer group">
                  <select
                    name="countryOfResidence"
                    defaultValue=""
                    className="w-full bg-transparent text-[#1A1A1A] font-['Cormorant_Garamond'] italic text-xl appearance-none focus:outline-none cursor-pointer group-hover:text-[#2E353C] transition-colors text-[#5A6673]/50"
                  >
                    <option value="" disabled>Select country</option>
                    <option value="us" className="not-italic font-sans text-base">United States</option>
                    <option value="uk" className="not-italic font-sans text-base">United Kingdom</option>
                    <option value="other" className="not-italic font-sans text-base">Other</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1 w-5 h-5 text-[#5A6673] group-hover:text-[#2E353C] pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-['JetBrains_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-4">A.5 — PREFERRED METHOD OF CONTACT <span className="ml-1">·</span></label>
                <div className="flex flex-wrap gap-4">
                  {contactOptions.map(method => (
                    <button key={method} type="button" onClick={() => setContactMethod(method)}
                      className={`px-6 py-3 border font-['JetBrains_Mono'] font-medium text-[11px] uppercase tracking-[0.22em] transition-colors ${contactMethod === method ? 'bg-[#2E353C] text-white border-[#2E353C]' : 'bg-transparent text-[#1A1A1A] border-[#C8CDD2] hover:border-[#1A1A1A]'}`}>
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submission Row */}
          <div className="pt-4 border-t border-[#E5E7EB]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 py-4">
              <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10.5px] text-[#5A6673] max-w-[60ch]">
                BY SUBMITTING, YOU AGREE TO OUR PRIVACY TERMS <span className="mx-2">·</span> WE WILL NEVER SHARE YOUR DETAILS.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="shrink-0 font-['JetBrains_Mono'] font-medium uppercase tracking-[0.22em] text-[11px] text-[#2E353C] border border-[#2E353C] px-8 py-6 hover:bg-[#2E353C] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SENDING…' : 'SEND THE LETTER →'}
              </button>
            </div>
          </div>

        </Form>

        {/* Or just — Book a Virtual Call */}
        <div className="mt-8 flex flex-col items-center gap-6">
          <p className="font-['Cormorant_Garamond'] italic text-[#5A6673] text-[22px]">
            Or just
          </p>
          {appointmentUrl ? (
            <a
              href={appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['JetBrains_Mono'] font-medium uppercase tracking-[0.22em] text-[12px] text-[#2E353C] border border-[#2E353C] px-8 py-4 hover:bg-[#2E353C] hover:text-white transition-colors"
            >
              Book a Virtual Call
            </a>
          ) : (
            <span className="font-['JetBrains_Mono'] font-medium uppercase tracking-[0.22em] text-[12px] text-[#2E353C] border border-[#2E353C] px-8 py-4 opacity-50 cursor-default">
              Book a Virtual Call
            </span>
          )}
        </div>

      </div>
    </section>
  );
};
