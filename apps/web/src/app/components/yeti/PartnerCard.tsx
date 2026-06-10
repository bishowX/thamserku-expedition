interface PartnerCardProps {
  logo: string;
  name: string;
  label?: string;
  href?: string;
  className?: string;
}

export const PartnerCard = ({ logo, name, label, href, className }: PartnerCardProps) => {
  const inner = (
    <>
      <div className="flex h-[clamp(44px,4.6vw,68px)] w-full items-center justify-center">
        <img
          src={logo}
          alt={name}
          className="h-full w-full object-contain"
          loading="eager"
          draggable={false}
        />
      </div>

      {label ? (
        <div data-chip className="flex justify-center">
          <span className="inline-block border-[0.8px] border-white/50 px-[7.2px] py-[4px] font-['JetBrains_Mono'] text-[8.8px] uppercase leading-[13.2px] tracking-[0.22em] text-white whitespace-nowrap">
            {label}
          </span>
        </div>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
        className={`flex flex-col items-center gap-[clamp(7px,0.85vw,11px)] cursor-pointer transition-opacity duration-200 hover:opacity-100 ${className ?? ""}`}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      className={`flex flex-col items-center gap-[clamp(7px,0.85vw,11px)] ${className ?? ""}`}
    >
      {inner}
    </div>
  );
};
