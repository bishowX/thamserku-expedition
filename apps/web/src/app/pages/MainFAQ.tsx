import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { getFAQPageData, type FAQPageData } from "../../lib/queries";
import { Nav } from '../components/Nav';
import { FAQHero } from '../components/faq/FAQHero';
import { FAQCategoryNavigation } from '../components/faq/FAQCategoryNavigation';
import { FAQList } from '../components/faq/FAQList';
import { FAQRelatedPages } from '../components/faq/FAQRelatedPages';
import { FAQNewsletterBanner } from '../components/faq/FAQNewsletterBanner';
import { FAQClosing } from '../components/faq/FAQClosing';
import { Footer } from '../components/Footer';

export async function loader() {
  return getFAQPageData();
}

export default function MainFAQ() {
  const data = useLoaderData() as FAQPageData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <FAQHero page={data.faqPage ?? undefined} />
      <FAQCategoryNavigation categories={data.faqPage?.categories ?? []} />
      <FAQList categories={data.faqPage?.categories ?? []} />
      <FAQRelatedPages />
      <FAQNewsletterBanner />
      <FAQClosing page={data.faqPage ?? undefined} />
      <Footer />
    </main>
  );
};
