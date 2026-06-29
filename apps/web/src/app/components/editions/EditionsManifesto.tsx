import { stegaClean } from "@sanity/client/stega";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import { urlFor } from "../../../lib/sanity";

type PageData = {
  manifestoEyebrow?: string;
  manifestoHeading?: string;
  manifestoBody?: string;
  manifestoImage?: { asset: { _ref: string } } | null;
};

export function EditionsManifesto({
  page,
  encodeDataAttribute,
}: {
  page?: PageData;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}) {
  const eyebrow = page?.manifestoEyebrow ?? "02 — THE READING";
  const cleanHeading = stegaClean(page?.manifestoHeading ?? "");
  const bodyParagraphs = stegaClean(page?.manifestoBody ?? "")
    .split(/\n\n+/)
    .map((para) => para.trim())
    .filter(Boolean);
  const parts = cleanHeading ? cleanHeading.split(".").filter(Boolean) : [];
  const lastSentence = parts.length > 1 ? parts[parts.length - 1].trim() : null;
  const leadText =
    parts.length > 1
      ? parts.slice(0, -1).join(".") + "."
      : cleanHeading || undefined;
  const imageUrl = page?.manifestoImage
    ? urlFor(page.manifestoImage).width(800).url()
    : null;

  return (
    <section className="w-full bg-[#F4F2EC] text-[#1A1A1A] py-8 px-5 md:py-16 md:px-8">
      <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-8 md:gap-10">
        <div className="flex items-center gap-4">
          <span className="hidden md:block h-px w-8 shrink-0 bg-[#5A6673]" />
          <p className="font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] text-[#5A6673]">
            {eyebrow}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-stretch gap-8 md:gap-12">
          {imageUrl && (
            <div className="w-full md:w-[320px] shrink-0 self-stretch">
              <img
                src={imageUrl}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
                data-sanity={encodeDataAttribute?.([
                  "editionsPage",
                  "manifestoImage",
                ])}
              />
            </div>
          )}

          <div className="flex flex-col gap-6 md:gap-8 flex-1 min-w-0">
            {page?.manifestoHeading && (
              <h2
                className="font-['Fraunces'] font-light text-display-l max-w-[30ch] tracking-tight text-[#1A1A1A]"
                data-sanity={encodeDataAttribute?.([
                  "editionsPage",
                  "manifestoHeading",
                ])}
              >
                {leadText}
                {lastSentence && (
                  <>
                    {" "}
                    <span className="italic text-[#0A3A77]">{lastSentence}</span>
                  </>
                )}
              </h2>
            )}

            {bodyParagraphs.length > 0 && (
              <div
                className="flex flex-col gap-4 font-['DM_Sans'] font-light text-[#5A6673] text-body leading-relaxed"
                data-sanity={encodeDataAttribute?.([
                  "editionsPage",
                  "manifestoBody",
                ])}
              >
                {bodyParagraphs.map((para, i) => (
                  <p key={i}>{para.replace(/\n/g, " ")}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
