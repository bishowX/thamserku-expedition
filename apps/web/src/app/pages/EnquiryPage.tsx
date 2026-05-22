import { useLoaderData } from 'react-router';
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
import { getConsultationPageData, type ConsultationPageData } from '../../lib/queries';

export async function loader() {
  return getConsultationPageData();
}

export default function EnquiryPage() {
  const data = useLoaderData() as ConsultationPageData;
  const page = data.consultationPage ?? undefined;

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <EnquiryHero data={page} />
      <EnquiryInvitation data={page} />
      <TrustStatement data={page} />
      <ScheduleCalendar />
      <EnquiryForm data={page} expeditions={data.expeditions} />
      <WhatTheCallCovers data={page} />
      <EnquiryProcess data={page} />
      <EnquiryAlternative data={page} />
      <EnquiryClosing data={page} />
      <Footer />
    </main>
  );
}
