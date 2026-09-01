import { Link } from "react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { pageMeta } from "../../lib/seo";
import type { Route } from "./+types/NotFound";

// Splat route. Anything that matches no other route lands here and returns a
// real 404 — previously unknown URLs either fell through to React Router's
// generic error screen or, on /expeditions/*, redirected to the homepage with
// HTTP 200.
export function loader() {
  throw new Response("Not Found", { status: 404, statusText: "Not Found" });
}

export function meta({ matches }: Route.MetaArgs) {
  return pageMeta({
    seo: { noIndex: true },
    title: "Page not found",
    matches,
  });
}

export default function NotFoundRoute() {
  return <NotFound />;
}

/** Shared by the splat route and the root ErrorBoundary. */
export function NotFound({
  title = "This route doesn't exist.",
  body = "The page you're looking for has moved or was never here. The peaks below are all still where we left them.",
  status = "404",
}: {
  title?: string;
  body?: string;
  status?: string;
}) {
  return (
    <main className="min-h-screen bg-[#1A1A1A] flex flex-col">
      <Nav />
      <div className="flex-1 flex items-center justify-center px-6 py-40">
        <div className="text-center max-w-[52ch]">
          <p className="font-['DM_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#5A6673] mb-6">
            Error {status}
          </p>
          <h1 className="font-['Fraunces'] font-light text-display-m text-white mb-6">
            {title}
          </h1>
          <p className="font-['Fraunces'] italic text-[#5A6673] text-body mb-10">
            {body}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/"
              className="inline-block font-['DM_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#1A1A1A] bg-white border border-white px-10 py-4 rounded hover:bg-[#C8CDD2] transition-colors"
            >
              Return Home →
            </Link>
            <Link
              to="/editions"
              className="inline-block font-['DM_Mono'] text-[11px] uppercase tracking-[0.18em] text-white border border-[#3A3A3A] px-10 py-4 rounded hover:border-white transition-colors"
            >
              Browse Expeditions
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
