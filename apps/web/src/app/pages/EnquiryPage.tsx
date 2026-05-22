import { useLoaderData, useActionData } from 'react-router';
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
import { serverClient } from '../../lib/sanity.server';
import { writeClient } from '../../lib/sanity.write';
import { sendEnquiryEmail } from '../../lib/email.server';

export async function loader() {
  return getConsultationPageData();
}

type ActionErrors = { fullName?: string; email?: string };

export async function action({ request }: { request: Request }): Promise<
  | { success: true }
  | { success: false; errors: ActionErrors }
> {
  const formData = await request.formData();

  const fullName = (formData.get('fullName') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';

  const errors: ActionErrors = {};
  if (!fullName) errors.fullName = 'Please enter your name.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // Upload climbing CV to Sanity if present
  let climbingCv: { _type: 'file'; asset: { _type: 'reference'; _ref: string } } | undefined;
  const cvFile = formData.get('climbingCv') as File | null;
  if (cvFile && cvFile.size > 0) {
    try {
      const asset = await writeClient.assets.upload('file', cvFile, {
        filename: cvFile.name,
        contentType: cvFile.type || 'application/octet-stream',
      });
      climbingCv = { _type: 'file', asset: { _type: 'reference', _ref: asset._id } };
    } catch {
      // Non-fatal — proceed without the file
    }
  }

  const expeditionInterest = (formData.getAll('expeditionInterest') as string[]).filter(Boolean);
  const altitudeExperience = (formData.getAll('altitudeExperience') as string[]).filter(Boolean);
  const guestsRaw = formData.get('numberOfGuests') as string | null;
  const numberOfGuests = guestsRaw ? Number(guestsRaw) || undefined : undefined;

  const submittedAt = new Date().toISOString();

  await writeClient.create({
    _type: 'enquiry',
    submittedAt,
    fullName,
    email,
    phone: (formData.get('phone') as string)?.trim() || undefined,
    countryOfResidence: (formData.get('countryOfResidence') as string) || undefined,
    preferredContact: (formData.get('preferredContact') as string) || undefined,
    expeditionInterest: expeditionInterest.length ? expeditionInterest : undefined,
    otherExpeditionNote: (formData.get('otherExpeditionNote') as string)?.trim() || undefined,
    preferredEdition: (formData.get('preferredEdition') as string) || undefined,
    trekkingExperience: (formData.get('trekkingExperience') as string) || undefined,
    altitudeExperience: altitudeExperience.length ? altitudeExperience : undefined,
    fitnessBackground: (formData.get('fitnessBackground') as string)?.trim() || undefined,
    climbingCv,
    preferredSeason: (formData.get('preferredSeason') as string) || undefined,
    numberOfGuests,
    groupPreference: (formData.get('groupPreference') as string) || undefined,
    privacyLevel: (formData.get('privacyLevel') as string) || undefined,
    medicalConsiderations: (formData.get('medicalConsiderations') as string)?.trim() || undefined,
    messageToDesk: (formData.get('messageToDesk') as string)?.trim() || undefined,
  });

  // Fire notification email (best-effort)
  try {
    const settings = await serverClient.fetch<{ enquiryEmail?: string }>(
      `*[_type == "siteSettings"][0]{ enquiryEmail }`
    );
    if (settings?.enquiryEmail) {
      await sendEnquiryEmail(settings.enquiryEmail, {
        fullName,
        email,
        phone: (formData.get('phone') as string)?.trim() || undefined,
        countryOfResidence: (formData.get('countryOfResidence') as string) || undefined,
        preferredContact: (formData.get('preferredContact') as string) || undefined,
        expeditionInterest: expeditionInterest.length ? expeditionInterest : undefined,
        otherExpeditionNote: (formData.get('otherExpeditionNote') as string)?.trim() || undefined,
        preferredEdition: (formData.get('preferredEdition') as string) || undefined,
        trekkingExperience: (formData.get('trekkingExperience') as string) || undefined,
        altitudeExperience: altitudeExperience.length ? altitudeExperience : undefined,
        fitnessBackground: (formData.get('fitnessBackground') as string)?.trim() || undefined,
        hasClimbingCv: !!climbingCv,
        preferredSeason: (formData.get('preferredSeason') as string) || undefined,
        numberOfGuests,
        groupPreference: (formData.get('groupPreference') as string) || undefined,
        privacyLevel: (formData.get('privacyLevel') as string) || undefined,
        medicalConsiderations: (formData.get('medicalConsiderations') as string)?.trim() || undefined,
        messageToDesk: (formData.get('messageToDesk') as string)?.trim() || undefined,
        submittedAt,
      });
    }
  } catch {
    // Non-fatal — enquiry is already saved in Sanity
  }

  return { success: true };
}

export default function EnquiryPage() {
  const data = useLoaderData() as ConsultationPageData;
  const actionData = useActionData<typeof action>();
  const page = data.consultationPage ?? undefined;
  const submitted = actionData?.success === true;
  const errors = actionData && !actionData.success ? (actionData as { success: false; errors: ActionErrors }).errors : undefined;

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <EnquiryHero data={page} />
      <EnquiryInvitation data={page} />
      <TrustStatement data={page} />
      <ScheduleCalendar />
      <EnquiryForm data={page} expeditions={data.expeditions} submitted={submitted} errors={errors} />
      <WhatTheCallCovers data={page} />
      <EnquiryProcess data={page} />
      <EnquiryAlternative data={page} />
      <EnquiryClosing data={page} />
      <Footer />
    </main>
  );
}
