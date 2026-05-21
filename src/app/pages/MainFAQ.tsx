import { Nav } from '../components/Nav';
import { FAQHero } from '../components/faq/FAQHero';
import { FAQCategoryNavigation } from '../components/faq/FAQCategoryNavigation';
import { FAQList } from '../components/faq/FAQList';
import { FAQRelatedPages } from '../components/faq/FAQRelatedPages';
import { FAQNewsletterBanner } from '../components/faq/FAQNewsletterBanner';
import { FAQClosing } from '../components/faq/FAQClosing';
import { Footer } from '../components/Footer';

export const MainFAQ = () => {
  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />
      <FAQHero />
      <FAQCategoryNavigation />
      <FAQList />
      <FAQRelatedPages />
      <FAQNewsletterBanner />
      <FAQClosing />
      <Footer />
    </main>
  );
};