import { Link } from "react-router";
import ThamserkuLogo from "./logo/ThamserkuLogo";

export function Footer() {
  return (
    <footer className="w-full bg-[#2E353C] text-[#C8CDD2] pt-24 pb-8 px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-24">
        
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
          <div className="w-full md:w-4/12 flex flex-col items-start gap-8">
            <div className="block h-9 md:h-10 aspect-[1115.63/208]">
              <ThamserkuLogo />
            </div>
            <p className="font-['Radley'] italic font-light text-fluid-md text-white max-w-[20ch] leading-[1.3]">
              The Spirit of the Himalayas, refined for the world.
            </p>
          </div>
          
          <div className="w-full md:w-2/12 flex flex-col gap-6 font-['Lexend'] font-light text-fluid-body-sm">
            <h4 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
              EXPEDITIONS
            </h4>
            <Link to="/atlas" className="hover:text-white transition-colors">Expedition Atlas</Link>
            <Link to="/expeditions/everest" className="hover:text-white transition-colors">Everest</Link>
            <Link to="/editions" className="hover:text-white transition-colors">Editions</Link>
            <Link to="/7000m" className="hover:text-white transition-colors">7,000m Qualifying Pathway</Link>
            <Link to="/private" className="hover:text-white transition-colors">Private Expeditions</Link>
          </div>
          
          <div className="w-full md:w-3/12 flex flex-col gap-6 font-['Lexend'] font-light text-fluid-body-sm">
            <h4 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
              THE HOUSE
            </h4>
            <Link to="/legacy" className="hover:text-white transition-colors">Legacy</Link>
            <Link to="/yeti-infrastructure" className="hover:text-white transition-colors">Yeti Infrastructure</Link>
            <Link to="/archive" className="hover:text-white transition-colors">Expedition Archive</Link>
          </div>
          
          <div className="w-full md:w-2/12 flex flex-col gap-6 font-['Lexend'] font-light text-fluid-body-sm">
            <h4 className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673] mb-2">
              EDITORIAL & HELP
            </h4>
            <Link to="/field-notes" className="hover:text-white transition-colors">Field Notes</Link>
            <Link to="#newsletter" className="hover:text-white transition-colors">Newsletter Sign-up</Link>
            <Link to="/faq" className="hover:text-white transition-colors">Main FAQ</Link>
            <Link to="/consultation" className="hover:text-white transition-colors">Schedule a Consultation</Link>
          </div>
        </div>

        <div className="border-t border-[#5A6673]/30 pt-8 flex flex-col md:flex-row items-center justify-between font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[10px] text-[#5A6673]">
          <div>© THAMSERKU EXPEDITIONS · YETI GROUP</div>
          <div>KATHMANDU — NEPAL | DIRECTION 01 · MOCKUP</div>
        </div>
        
      </div>
    </footer>
  );
}