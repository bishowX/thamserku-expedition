import { Link, useRouteLoaderData } from "react-router";
import { Instagram, Facebook } from "lucide-react";
import ThamserkuLogo from "./logo/ThamserkuLogo";
import type { loader } from "../../root";

export function Footer() {
  const root = useRouteLoaderData<typeof loader>("root");
  const contactEmail = root?.settings?.contactEmail ?? "info@thamserkuexpedition.com";
  const contactEmailKushal = root?.settings?.contactEmailKushal ?? "kushal@thamserkuexpedition.com";
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
            </div>
          </div>

          <div className="w-full md:w-2/12 flex flex-col gap-6 font-['DM_Sans'] font-light text-body">
            <h4 className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673] mb-2">
              EXPEDITIONS
            </h4>
            <Link
              to="/expeditions/everest"
              className="hover:text-white transition-colors"
            >
              Everest
            </Link>
            <Link
              to="/expeditions/ama-dablam"
              className="hover:text-white transition-colors"
            >
              Ama Dablam
            </Link>
            <Link
              to="/expeditions/manaslu"
              className="hover:text-white transition-colors"
            >
              Manaslu
            </Link>
            <Link
              to="/expeditions/api-himal"
              className="hover:text-white transition-colors"
            >
              Api Himal
            </Link>
            <Link
              to="/expeditions/himlung-himal"
              className="hover:text-white transition-colors"
            >
              Himlung Himal
            </Link>
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
                <img src="/images/payments/visa.svg" alt="Visa" className="size-9" />
                <img
                  src="/images/payments/mastercard.svg"
                  alt="Mastercard"
                  className="size-9"
                />
                <img
                  src="/images/payments/amex.svg"
                  alt="American Express"
                  className="size-9"
                />
                <img src="/images/payments/jcb.svg" alt="JCB" className="size-9" />
                <img
                  src="/images/payments/paypal.svg"
                  alt="PayPal"
                  className="size-9"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#5A6673]/30 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
          <div className="flex flex-col gap-2">
            <div>© THAMSERKU EXPEDITION · YETI GROUP</div>
            <div>KATHMANDU - NEPAL</div>
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
              className="hover:text-[#C8CDD2] transition-colors normal-case tracking-normal"
            >
              {contactEmail}
            </a>
            {contactEmailKushal && (
              <a
                href={`mailto:${contactEmailKushal}`}
                className="hover:text-[#C8CDD2] transition-colors normal-case tracking-normal"
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
