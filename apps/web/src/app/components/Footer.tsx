import { Link, useRouteLoaderData } from "react-router";
import { Instagram, Facebook } from "lucide-react";
import ThamserkuLogo from "./logo/ThamserkuLogo";
import type { loader } from "../../root";

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round((size * 1227) / 1200)}
      viewBox="0 0 1200 1227"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z" />
    </svg>
  );
}

export function Footer() {
  const root = useRouteLoaderData<typeof loader>("root");
  const contactEmail = root?.settings?.contactEmail ?? "info@thamserkuexpedition.com";
  const contactEmailKushal = root?.settings?.contactEmailKushal ?? "kushal@thamserkuexpedition.com";
  // Read from Sanity rather than hardcoded. The old static list had drifted:
  // it linked /expeditions/himlung-himal, but the slug is `himlung`, so a 404
  // sat in the footer of every page on the site. It also linked five of the
  // thirteen peaks, leaving the other eight reachable only via the sitemap.
  const expeditions = root?.expeditions ?? [];
  return (
    <footer className="w-full bg-[#2E353C] text-[#C8CDD2] pt-16 md:pt-24 pb-8 px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-24">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
          <div className="w-full md:w-4/12 flex flex-col items-start gap-8 justify-between self-stretch">
            <div className="block h-9 md:h-10 aspect-[1115.63/208]">
              <ThamserkuLogo />
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/thamserkuexpedition/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white hover:text-[#5A6673] hover:bg-white/5 hover:border-white/10 transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/thamserkuexpedition"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white hover:text-[#5A6673] hover:bg-white/5 hover:border-white/10 transition-all"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://x.com/Thamserku_Exped"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white hover:text-[#5A6673] hover:bg-white/5 hover:border-white/10 transition-all"
              >
                <XIcon size={14} />
              </a>
            </div>
          </div>

          <div className="w-full md:w-2/12 flex flex-col gap-6 font-['DM_Sans'] font-light text-body">
            <h4 className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-2">
              EXPEDITIONS
            </h4>
            {expeditions.map((e) => (
              <Link
                key={e.slug}
                to={`/expeditions/${e.slug}`}
                className="hover:text-white transition-colors"
              >
                {e.name}
              </Link>
            ))}
          </div>

          <div className="w-full md:w-3/12 flex flex-col gap-6 font-['DM_Sans'] font-light text-body">
            <h4 className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-2">
              THE HOUSE
            </h4>
            <Link to="/legacy" className="hover:text-white transition-colors">
              Legacy
            </Link>
            <Link to="/safety" className="hover:text-white transition-colors">
              Safety
            </Link>
            <Link
              to="/heritage-and-achievements"
              className="hover:text-white transition-colors"
            >
              Heritage & Achievements
            </Link>
            <Link
              to="/yeti-infrastructure"
              className="hover:text-white transition-colors"
            >
              Yeti Infrastructure
            </Link>
          </div>

          <div className="w-full md:w-2/12 flex flex-col gap-6 font-['DM_Sans'] font-light text-body">
            <h4 className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-2">
              EDITORIAL & HELP
            </h4>
            <Link
              to="/news-and-blogs"
              className="hover:text-white transition-colors"
            >
              News and Blogs
            </Link>
            <Link to="/faq" className="hover:text-white transition-colors">
              Main FAQ
            </Link>
            <Link
              to="/design-your-expedition"
              className="hover:text-white transition-colors"
            >
              Design Your Expedition
            </Link>
            <Link
              to="/consultation"
              className="hover:text-white transition-colors"
            >
              Enquire
            </Link>

            <div className="flex flex-col items-start gap-5 pt-4 md:pt-10">
              <h4 className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
                WE ACCEPT
              </h4>
              <div className="flex items-center gap-5">
                <img src="/images/payments/visa.png" alt="Visa" className="size-8" />
                <img
                  src="/images/payments/mastercard.png"
                  alt="Mastercard"
                  className="size-8"
                />
                <img
                  src="/images/payments/amex.png"
                  alt="American Express"
                  className="size-8"
                />
                <img
                  src="/images/payments/unionpay.png"
                  alt="UnionPay"
                  className="h-8 w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#5A6673]/30 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
          <div className="flex flex-col gap-2">
            <div>© THAMSERKU EXPEDITION · YETI GROUP · KATHMANDU - NEPAL</div>
            <Link
              to="/terms-and-conditions"
              className="hover:text-[#C8CDD2] transition-colors"
            >
              TERMS & CONDITIONS
            </Link>
          </div>
          <div className="flex flex-col gap-2 md:text-right">
            <a
              href={`mailto:${contactEmail}`}
              className="hover:text-[#C8CDD2] transition-colors normal-case tracking-normal text-[13px]"
            >
              {contactEmail}
            </a>
            {contactEmailKushal && (
              <a
                href={`mailto:${contactEmailKushal}`}
                className="hover:text-[#C8CDD2] transition-colors normal-case tracking-normal text-[13px]"
              >
                {contactEmailKushal}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
