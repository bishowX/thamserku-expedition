import { MoveRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type ClosingData = {
  closingHeading?: string
  closingBody?: string
}

export function Closing({ data }: { data?: ClosingData }) {
  const heading = data?.closingHeading ?? "Begin with knowledge. Move with respect."
  const body = data?.closingBody ?? "Every Thamserku journey begins with a private conversation — with our expedition desk, not a booking page."

  return (
    <section className="relative w-full bg-[#1A1A1A] text-white py-48 px-8 overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1761844318449-9090457ba38c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YW4lMjByYW5nZSUyMHR3aWxpZ2h0JTIwc2lsaG91ZXR0ZXxlbnwxfHx8fDE3Nzc0NDYzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Himalayan range twilight silhouette"
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A] opacity-80" />
      </div>

      <div className="relative z-10 w-full max-w-[880px] mx-auto flex flex-col items-center gap-8">
        <span className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#C8CDD2]">
          07 — BEGIN PRIVATELY
        </span>

        <h2 className="font-['Radley'] font-light text-fluid-display leading-[1.1] mb-2">
          {heading}
        </h2>

        <p className="font-['Lexend'] font-light text-[#C8CDD2] text-fluid-body leading-[1.8] max-w-[48ch] mb-4">
          {body}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link to="/consultation" className="border border-white bg-white text-[#0A3A77] px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center gap-3 hover:bg-transparent hover:text-white transition-colors">
            Schedule a Consultation <MoveRight className="w-3 h-3" />
          </Link>
          <Link to="/atlas" className="border border-white/30 px-8 py-4 font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] flex items-center gap-3 hover:border-white transition-colors">
            Explore the Atlas <MoveRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
