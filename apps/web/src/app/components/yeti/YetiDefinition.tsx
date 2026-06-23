import { stegaClean } from "@sanity/client/stega";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import type { YetiPageData } from "../../../lib/queries";

type PageData = YetiPageData["yetiPage"];

export const YetiDefinition = ({
  page,
  encodeDataAttribute,
}: {
  page?: PageData;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}) => {
  const paragraphs = page?.definitionBody
    ? stegaClean(page.definitionBody).split("\n").filter(Boolean)
    : [];

  return (
    <section className="bg-[#F4F2EC] section-padding">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 md:gap-8">
        <div className="md:col-span-5 flex flex-col items-start">
          {page?.definitionHeading && (
            <h2 className="font-['Fraunces'] font-light text-display-l text-[#1A1A1A] max-w-[16ch] mb-6">
              {page.definitionHeading}
            </h2>
          )}
          {page?.definitionTagline && (
            <p className="font-['Fraunces'] italic text-[#0A3A77] text-display-m max-w-[30ch]">
              {page.definitionTagline}
            </p>
          )}
        </div>

        <div
          className="md:col-span-7 flex flex-col gap-6"
          data-sanity={
            paragraphs.length > 0
              ? encodeDataAttribute?.(["yetiPage", "definitionBody"])
              : undefined
          }
        >
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-['DM_Sans'] font-light text-body text-[#5A6673] leading-[1.75] max-w-[60ch]"
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
