import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { useQuery } from "@sanity/react-loader";
import type { QueryResponseInitial } from "@sanity/react-loader";
import { FAQ_QUERY, type FAQPageData } from "../../lib/queries";
import { getPreviewData } from "../../lib/preview.server";
import { loadQuery } from "../../lib/loader.server";
import { FAQHero } from "../components/faq/FAQHero";
import { FAQCategoryNavigation } from "../components/faq/FAQCategoryNavigation";
import { FAQList } from "../components/faq/FAQList";
import { FAQQuickSection } from "../components/faq/FAQQuickSection";
import { FAQRelatedPages } from "../components/faq/FAQRelatedPages";
import { FAQNewsletterBanner } from "../components/faq/FAQNewsletterBanner";
import { FAQClosing } from "../components/faq/FAQClosing";
import { Footer } from "../components/Footer";
import type { Route } from "./+types/MainFAQ";
import { pageMeta } from "../../lib/seo";

export async function loader({ request }: { request: Request }) {
  const { options } = await getPreviewData(request);
  const initial = await loadQuery<FAQPageData>(FAQ_QUERY, {}, options);
  return { initial };
}

export function meta({ data }: Route.MetaArgs) {
  const d = (data as { initial: QueryResponseInitial<FAQPageData> } | undefined)?.initial.data;
  return pageMeta({
    title: d?.faqPage?.heroHeadline ?? "Frequently Asked Questions",
    description: d?.faqPage?.heroSubline,
  });
}

export default function MainFAQ() {
  const { initial } = useLoaderData() as { initial: QueryResponseInitial<FAQPageData> };
  const { data } = useQuery<FAQPageData>(FAQ_QUERY, {}, { initial });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <FAQHero page={data.faqPage ?? undefined} />
      <FAQCategoryNavigation
        page={data.faqPage ?? undefined}
        categories={data.faqPage?.categories ?? []}
      />
      <FAQList
        page={data.faqPage ?? undefined}
        categories={data.faqPage?.categories ?? []}
      />
      <FAQQuickSection page={data.faqPage ?? undefined} />
      <FAQNewsletterBanner page={data.faqPage ?? undefined} />
      <FAQClosing page={data.faqPage ?? undefined} />
      <Footer />
    </main>
  );
}
