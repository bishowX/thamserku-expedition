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

      {/* Hero */}
      <section className="pt-32 pb-16 px-5 md:px-8">
        <div className="max-w-4xl mx-auto">
          {page?.heroEyebrow && (
            <p className="font-['DM_Mono'] text-[#C8CDD2] text-[11px] uppercase tracking-[0.22em] mb-4">
              {page.heroEyebrow}
            </p>
          )}
          {page?.heroTitle && (
            <h1 className="font-['Fraunces'] text-display-l text-white font-light mb-6">
              {page.heroTitle}
            </h1>
          )}
          {page?.heroIntro?.length ? (
            <div className="max-w-2xl">
              <PortableTextBody value={page.heroIntro} theme="dark" size="lg" />
            </div>
          ) : null}
          {page?.heroNote && (
            <p className="text-body text-[#5A6673] mt-4">{page.heroNote}</p>
          )}
        </div>
      </section>

      {/* Body */}
      {page?.body?.length ? (
        <section className="pb-16 md:pb-24 px-5 md:px-8">
          <div className="max-w-4xl mx-auto">
            <PortableTextBody value={page.body} theme="dark" />
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}
