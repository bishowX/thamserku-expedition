import { useEffect } from "react";
import { useLoaderData, useActionData } from "react-router";
import { getNewsletterData, type NewsletterData } from "../../lib/queries";
import { serverClient } from "../../lib/sanity.server";
import { writeClient } from "../../lib/sanity.write";
import { Nav } from "../components/Nav";
import { NewsletterSection } from "../components/NewsletterSection";
import { Footer } from "../components/Footer";
import type { Route } from "./+types/NewsletterPage";
import { pageMeta } from "../../lib/seo";

export async function loader() {
  return getNewsletterData();
}

export function meta({ data }: Route.MetaArgs) {
  const d = data as NewsletterData | undefined;
  return pageMeta({
    title: d?.newsletterHeading ?? "Field Notes Newsletter",
    description: d?.newsletterBody,
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
  const data = useLoaderData() as NewsletterData;
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
