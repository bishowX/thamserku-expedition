type PageData = {
  manifestoHeading?: string;
  manifestoBody?: string;
};

export function EditionsManifesto({ page }: { page?: PageData }) {
  const parts = page?.manifestoHeading?.split('.').filter(Boolean) ?? [];
  const lastSentence = parts.length > 1 ? parts[parts.length - 1].trim() : null;
  const leadText = parts.length > 1 ? parts.slice(0, -1).join('.') + '.' : page?.manifestoHeading;

  return (
    <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-24 md:py-48 px-8">
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
        <div className="col-span-1 md:col-span-4 lg:col-span-5">
          <p className="font-['JetBrains_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            02 — THE READING
          </p>
        </div>

        <div className="col-span-1 md:col-span-8 lg:col-span-7 flex flex-col gap-12">
          {page?.manifestoHeading && (
            <h2 className="font-['Radley'] font-light text-4xl md:text-[52px] leading-[1.1] max-w-[30ch] tracking-tight text-[#1A1A1A]">
              {leadText}{lastSentence && <> <span className="italic text-[#0A3A77]">{lastSentence}</span></>}
            </h2>
          )}

          {page?.manifestoBody && (
            <p className="font-['Lexend'] font-light text-[#5A6673] text-[16px] leading-relaxed max-w-[60ch]">
              {page.manifestoBody}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
