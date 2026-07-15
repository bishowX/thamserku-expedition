import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { useQuery } from "@sanity/react-loader";
import type { QueryResponseInitial } from "@sanity/react-loader";
import { TERMS_QUERY, type TermsPageData } from "../../lib/queries";
import { getPreviewData } from "../../lib/preview.server";
import { loadQuery } from "../../lib/loader.server";
import { pageMeta } from "../../lib/seo";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { TermsHero } from "../components/terms/TermsHero";
import { PortableTextBody } from "../components/PortableTextBody";
import type { Route } from "./+types/TermsPage";

export async function loader({ request }: { request: Request }) {
  const { options } = await getPreviewData(request);
  const initial = await loadQuery<TermsPageData>(TERMS_QUERY, {}, options);
  return { initial };
}

export function meta({ data }: Route.MetaArgs) {
  const d = (data as { initial: QueryResponseInitial<TermsPageData> } | undefined)?.initial.data;
  const page = d?.termsPage;
  return pageMeta({
    title: page?.heroTitle ?? "Terms & Conditions",
    description: page?.heroNote,
  });
}

export default function TermsPage() {
  const { initial } = useLoaderData() as { initial: QueryResponseInitial<TermsPageData> };
  const { data } = useQuery<TermsPageData>(TERMS_QUERY, {}, { initial });
  const page = data.termsPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Nav />

      <TermsHero page={page} />

      {/* Body */}
      <section className="bg-[#F5F1EA] py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-4xl mx-auto">
          {page?.heroIntro?.length ? (
            <div className="max-w-2xl mb-10">
              <PortableTextBody value={page.heroIntro} theme="light" />
            </div>
          ) : null}
          {page?.heroNote && (
            <p className="text-body text-[#5A6673] mb-10">{page.heroNote}</p>
          )}
          {page?.body?.length ? (
            <PortableTextBody value={page.body} theme="light" variant="document" />
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}
