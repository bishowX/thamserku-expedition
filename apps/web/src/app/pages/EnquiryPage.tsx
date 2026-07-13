import { useLoaderData, useActionData } from 'react-router';
import { useQuery } from '@sanity/react-loader';
import type { QueryResponseInitial } from '@sanity/react-loader';
import { EnquiryHero } from '../components/enquiry/EnquiryHero';
import { TrustStatement } from '../components/enquiry/TrustStatement';
import { EnquiryForm } from '../components/enquiry/EnquiryForm';
import { EnquiryProcess } from '../components/enquiry/EnquiryProcess';
import { EnquiryAlternative } from '../components/enquiry/EnquiryAlternative';
import { EnquiryClosing } from '../components/enquiry/EnquiryClosing';
import { Footer } from '../components/Footer';
import { CONSULTATION_QUERY, type ConsultationPageData } from '../../lib/queries';
import { getPreviewData } from '../../lib/preview.server';
import { loadQuery } from '../../lib/loader.server';
import { serverClient } from '../../lib/sanity.server';
import { writeClient } from '../../lib/sanity.write';
import { sendEnquiryEmail } from '../../lib/email.server';
import type { Route } from "./+types/EnquiryPage";
import { pageMeta } from "../../lib/seo";

export async function loader({ request }: { request: Request }) {
  const { options } = await getPreviewData(request);
  const initial = await loadQuery<ConsultationPageData>(CONSULTATION_QUERY, {}, options);
  return { initial };
}

export function meta({ data }: Route.MetaArgs) {
  const d = (data as { initial: QueryResponseInitial<ConsultationPageData> } | undefined)?.initial.data;
  return pageMeta({
    title: d?.consultationPage?.heroHeadline ?? "Plan Your Expedition",
    description: d?.consultationPage?.heroSubheading,
    image: d?.consultationPage?.heroImage,
  });
}

type ActionErrors = { fullName?: string; email?: string; agreedToTerms?: string };

export async function action({ request }: { request: Request }): Promise<
  | { success: true }
  | { success: false; errors: ActionErrors }
> {
  const formData = await request.formData();

  const fullName = (formData.get('fullName') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const agreedToTerms = formData.get('agreedToTerms') === 'on';

  const errors: ActionErrors = {};
  if (!fullName) errors.fullName = 'Please enter your name.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';
  if (!agreedToTerms) errors.agreedToTerms = 'You must agree to the Terms & Conditions to continue.';

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const submittedAt = new Date().toISOString();

  await writeClient.create({
    _type: 'enquiry',
    submittedAt,
    fullName,
    email,
    phone: (formData.get('phone') as string)?.trim() || undefined,
    countryOfResidence: (formData.get('countryOfResidence') as string) || undefined,
    preferredContact: (formData.get('preferredContact') as string) || undefined,
  });

  try {
    const enquiryEmail = await serverClient.fetch<string | undefined>(
      `*[_type == "siteSettings"][0].enquiryEmail`
    );
    if (enquiryEmail) {
      await sendEnquiryEmail(enquiryEmail, {
        fullName,
        email,
        phone: (formData.get('phone') as string)?.trim() || undefined,
        countryOfResidence: (formData.get('countryOfResidence') as string) || undefined,
        preferredContact: (formData.get('preferredContact') as string) || undefined,
        submittedAt,
      });
    }
  } catch (err) {
    console.error('[email] sendEnquiryEmail failed:', err)
  }

  return { success: true };
}

export default function EnquiryPage() {
  const { initial } = useLoaderData() as { initial: QueryResponseInitial<ConsultationPageData> };
  const { data } = useQuery<ConsultationPageData>(CONSULTATION_QUERY, {}, { initial });
  const actionData = useActionData<typeof action>();
  const page = data.consultationPage ?? undefined;
  const submitted = actionData?.success === true;
  const errors = actionData && !actionData.success ? (actionData as { success: false; errors: ActionErrors }).errors : undefined;

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <EnquiryHero data={page} />
<TrustStatement data={page} />
      <EnquiryForm data={page} submitted={submitted} errors={errors} />
      <EnquiryProcess data={page} />
      <EnquiryAlternative data={page} />
      <EnquiryClosing data={page} />
      <Footer />
    </main>
  );
}
