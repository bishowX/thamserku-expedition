import { EnquiryHero } from '../components/enquiry/EnquiryHero';
import { EnquiryInvitation } from '../components/enquiry/EnquiryInvitation';
import { TrustStatement } from '../components/enquiry/TrustStatement';
import { ScheduleCalendar } from '../components/enquiry/ScheduleCalendar';
import { EnquiryForm } from '../components/enquiry/EnquiryForm';
import { WhatTheCallCovers } from '../components/enquiry/WhatTheCallCovers';
import { EnquiryProcess } from '../components/enquiry/EnquiryProcess';
import { EnquiryAlternative } from '../components/enquiry/EnquiryAlternative';
import { EnquiryClosing } from '../components/enquiry/EnquiryClosing';
import { Footer } from '../components/Footer';

export default function EnquiryPage() {
  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <EnquiryHero />
      <EnquiryInvitation />
      <TrustStatement />
      <ScheduleCalendar />
      <EnquiryForm />
      <WhatTheCallCovers />
      <EnquiryProcess />
      <EnquiryAlternative />
      <EnquiryClosing />
      <Footer />
    </main>
  );
};
