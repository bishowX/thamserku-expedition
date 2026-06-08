import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { getNewsletterData, type NewsletterData } from "../../lib/queries";
import { Nav } from "../components/Nav";
import { NewsletterSection } from "../components/NewsletterSection";
import { Footer } from "../components/Footer";

export async function loader() {
  return getNewsletterData();
}

export default function NewsletterPage() {
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
