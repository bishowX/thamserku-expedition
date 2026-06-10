import { Link } from "react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";
import ThamserkuLogo from "./logo/ThamserkuLogo";

export function Footer() {
  return (
    <footer className="w-full bg-[#2E353C] text-[#C8CDD2] pt-24 pb-8 px-8">
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
                href="https://www.youtube.com/channel/UCBUOrivyxfYEeKC5qSKrK5Q/featured"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white hover:text-[#5A6673] hover:bg-white/5 hover:border-white/10 transition-all"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          <div className="w-full md:w-2/12 flex flex-col gap-6 font-['Lexend'] font-light text-fluid-body-sm">
            <h4 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
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

          <div className="w-full md:w-3/12 flex flex-col gap-6 font-['Lexend'] font-light text-fluid-body-sm">
            <h4 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
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

          <div className="w-full md:w-2/12 flex flex-col gap-6 font-['Lexend'] font-light text-fluid-body-sm">
            <h4 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
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
          </div>
        </div>

        <div className="border-t border-[#5A6673]/30 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
          <div className="flex flex-col gap-2">
            <div>© THAMSERKU EXPEDITION · YETI GROUP</div>
            <div>KATHMANDU - NEPAL</div>
          </div>
          <div className="flex flex-col gap-2 text-right">
            <a
              href="mailto:info@thamserkuexpedition.com"
              className="hover:text-[#C8CDD2] transition-colors normal-case tracking-normal"
            >
              info@thamserkuexpedition.com
            </a>
            <a
              href="mailto:kushal@thamserkuexpedition.com"
              className="hover:text-[#C8CDD2] transition-colors normal-case tracking-normal"
            >
              kushal@thamserkuexpedition.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
