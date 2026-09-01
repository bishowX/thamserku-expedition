import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { useQuery } from "@sanity/react-loader";
import type { QueryResponseInitial } from "@sanity/react-loader";
import { NEWSLETTER_QUERY, type NewsletterData } from "../../lib/queries";
import { getPreviewData } from "../../lib/preview.server";
import { loadQuery } from "../../lib/loader.server";
import { Nav } from "../components/Nav";
import { NewsletterSection } from "../components/NewsletterSection";
import { Footer } from "../components/Footer";
import type { Route } from "./+types/NewsAndBlogsPage";
import { pageMeta, rootSettings } from "../../lib/seo";

export async function loader({ request }: { request: Request }) {
  const { options } = await getPreviewData(request);
  const initial = await loadQuery<NewsletterData | null>(NEWSLETTER_QUERY, {}, options);
  return { initial };
}

export function meta({ matches }: Route.MetaArgs) {
  return pageMeta({
    // No newsPage document exists — this route's SEO lives in Site Settings.
    seo: rootSettings(matches)?.newsAndBlogsSeo,
    title: "News & Field Reports",
    description: "Dispatches, updates, and field notes from Thamserku Expedition's operations across the Himalayas.",
    matches,
  });
}

export default function NewsAndBlogsPage() {
  const { initial } = useLoaderData() as { initial: QueryResponseInitial<NewsletterData | null> };
  const { data: newsletter } = useQuery<NewsletterData | null>(NEWSLETTER_QUERY, {}, { initial });
  const data = newsletter ?? {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <div className="pt-20" />
      <NewsletterSection data={data} />
      <Footer />
    </main>
  );
}
