interface PartnerCardProps {
  /**
   * Imported SVG asset URL. Vite resolves `.svg` imports to a URL string
   * (see `assetsInclude` in vite.config), so pass the imported logo directly.
   */
  logo: string;
  /** Accessible name for the logo (used as the image alt text). */
  name: string;
  /**
   * Category label rendered inside the bordered chip, e.g. "Travel",
   * "Airlines". Displayed uppercase. Omit to hide the chip entirely.
   */
  label?: string;
  /** Extra classes for the root element (positioning, width, etc.). */
  className?: string;
}

/**
 * A partner logo presented on a dark background with an optional bordered
 * category chip beneath it — the "Yeti ecosystem" card from the infrastructure
 * hero. Logos vary wildly in aspect ratio (wide airline wordmarks, tall vertical
 * marks), so the logo is constrained by height and `object-contain`ed to keep
 * every card visually balanced.
 *
 * The chip carries `data-chip` so the hero's scroll timeline can stagger it in.
 */
export const PartnerCard = ({ logo, name, label, className }: PartnerCardProps) => {
  return (
    <div
      className={`flex flex-col items-center gap-[clamp(7px,0.85vw,11px)] ${className ?? ""}`}
    >
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
    </div>
  );
};
