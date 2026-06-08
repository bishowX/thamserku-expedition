import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { getNewsletterData, type NewsletterData } from "../../lib/queries";
import { Nav } from "../components/Nav";
import { NewsletterSection } from "../components/NewsletterSection";
import { Footer } from "../components/Footer";
import type { Route } from "./+types/NewsAndBlogsPage";
import { pageMeta } from "../../lib/seo";

export async function loader() {
  return getNewsletterData();
}

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: "News & Field Reports",
    description: "Dispatches, updates, and field notes from Thamserku Expedition's operations across the Himalayas.",
  });
}

export default function NewsAndBlogsPage() {
  const data = useLoaderData() as NewsletterData;

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
