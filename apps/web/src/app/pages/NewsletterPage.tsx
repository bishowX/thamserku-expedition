import { useEffect } from "react";
import { useLoaderData, useActionData } from "react-router";
import { useQuery } from "@sanity/react-loader";
import type { QueryResponseInitial } from "@sanity/react-loader";
import { NEWSLETTER_QUERY, type NewsletterData } from "../../lib/queries";
import { getPreviewData } from "../../lib/preview.server";
import { loadQuery } from "../../lib/loader.server";
import { serverClient } from "../../lib/sanity.server";
import { writeClient } from "../../lib/sanity.write";
import { Nav } from "../components/Nav";
import { NewsletterSection } from "../components/NewsletterSection";
import { Footer } from "../components/Footer";
import type { Route } from "./+types/NewsletterPage";
import { pageMeta, rootSettings } from "../../lib/seo";

export async function loader({ request }: { request: Request }) {
  const { options } = await getPreviewData(request);
  const initial = await loadQuery<NewsletterData | null>(NEWSLETTER_QUERY, {}, options);
  return { initial };
}

export function meta({ data, matches }: Route.MetaArgs) {
  const d = (data as { initial: QueryResponseInitial<NewsletterData | null> } | undefined)?.initial.data;
  return pageMeta({
    // No newsletterPage document exists — this route's SEO lives in Site Settings.
    seo: rootSettings(matches)?.newsletterSeo,
    title: d?.newsletterHeading ?? "Field Notes Newsletter",
    description: d?.newsletterBody,
    matches,
  });
}

export type NewsletterActionData =
  | { success: true; alreadySubscribed?: boolean }
  | { success: false; error: string };

export async function action({ request }: { request: Request }): Promise<NewsletterActionData> {
  const formData = await request.formData();
  const email = (formData.get("email") as string | null)?.trim() ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const existing = await serverClient.fetch(
    `*[_type == "newsletterSubscriber" && email == $email][0]._id`,
    { email }
  );

  if (existing) {
    return { success: true, alreadySubscribed: true };
  }

  await writeClient.create({
    _type: "newsletterSubscriber",
    email,
    subscribedAt: new Date().toISOString(),
  });

  return { success: true };
}

export default function NewsletterPage() {
  const { initial } = useLoaderData() as { initial: QueryResponseInitial<NewsletterData | null> };
  const { data: newsletter } = useQuery<NewsletterData | null>(NEWSLETTER_QUERY, {}, { initial });
  const data = newsletter ?? {};
  const actionData = useActionData() as NewsletterActionData | undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <div className="pt-20" />
      <NewsletterSection data={data} actionData={actionData} />
      <Footer />
    </main>
  );
}
