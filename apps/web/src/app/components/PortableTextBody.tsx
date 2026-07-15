import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const THEMES = {
  light: {
    text: "text-[#5A6673]",
    strong: "text-[#1A1A1A]",
    subhead: "text-[#5A6673]",
    heading: "text-[#1A1A1A]",
    link: "text-[#1A1A1A]",
  },
  dark: {
    text: "text-[#C8CDD2]",
    strong: "text-white",
    subhead: "text-[#8F8F8F]",
    heading: "text-white",
    link: "text-white",
  },
} as const;

const SIZES = {
  default: "text-body leading-[24.375px]",
  lg: "text-body-lg leading-[1.85]",
} as const;

const SPACING = {
  default: {
    block: "[&:not(:last-child)]:mb-5",
    list: "space-y-1 [&:not(:last-child)]:mb-5",
  },
  compact: {
    block: "[&:not(:last-child)]:mb-0.5 [&:has(+ul)]:mb-0",
    list: "-mt-0.5 space-y-0 [&:not(:last-child)]:mb-0.5",
  },
  // Denser rhythm for long structured legal / policy documents so consecutive
  // paragraphs (e.g. label:value lines) don't stack into big gaps. A paragraph
  // that leads directly into a list hugs it.
  document: {
    block: "[&:not(:last-child)]:mb-3.5 [&:has(+ul)]:mb-2 [&:has(+ol)]:mb-2",
    list: "space-y-1.5 [&:not(:last-child)]:mb-3.5",
  },
} as const;

// Per-variant heading treatments. "prose" keeps the tiny mono eyebrow used on
// marketing pages; "document" enlarges subsection labels so a section heading is
// never smaller than the body beneath it.
const VARIANTS = {
  prose: {
    listPad: "pl-5",
    h4: (c: (typeof THEMES)[keyof typeof THEMES]) =>
      `font-['DM_Mono'] uppercase tracking-[0.22em] text-[11px] ${c.subhead} [&:not(:first-child)]:mt-6 mb-2`,
  },
  document: {
    listPad: "pl-6",
    h4: (c: (typeof THEMES)[keyof typeof THEMES]) =>
      `font-['DM_Mono'] font-medium uppercase tracking-[0.18em] text-[13px] ${c.heading} [&:not(:first-child)]:mt-8 mb-3`,
  },
} as const;

function createComponents(
  theme: keyof typeof THEMES,
  size: keyof typeof SIZES,
  spacing: keyof typeof SPACING,
  variant: keyof typeof VARIANTS,
): PortableTextComponents {
  const colors = THEMES[theme];
  const typography = SIZES[size];
  const space = SPACING[spacing];
  const chrome = VARIANTS[variant];

  return {
    block: {
      normal: ({ children }) => (
        <p
          className={`font-['DM_Sans'] font-light ${colors.text} ${typography} ${space.block}`}
        >
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2
          className={`font-['Fraunces'] text-display-l ${colors.heading} font-light [&:not(:first-child)]:mt-16 mb-6`}
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3
          className={`font-['Fraunces'] text-display-m ${colors.heading} font-light [&:not(:first-child)]:mt-12 mb-4`}
        >
          {children}
        </h3>
      ),
      h4: ({ children }) => <p className={chrome.h4(colors)}>{children}</p>,
    },
    list: {
      bullet: ({ children }) => (
        <ul
          className={`list-disc ${chrome.listPad} font-['DM_Sans'] font-light ${colors.text} ${typography} ${space.list}`}
        >
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol
          className={`list-decimal ${chrome.listPad} font-['DM_Sans'] font-light ${colors.text} ${typography} ${space.list}`}
        >
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className={`font-medium ${colors.strong}`}>{children}</strong>
      ),
      em: ({ children }) => <em>{children}</em>,
      link: ({ children, value }) => (
        <a
          href={value?.href}
          className={`${colors.link} underline underline-offset-4 decoration-white/30 hover:decoration-current transition-colors`}
          {...(value?.href?.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      ),
    },
  };
}

export function PortableTextBody({
  value,
  theme = "light",
  size = "default",
  spacing = "default",
  variant = "prose",
}: {
  value: PortableTextBlock[];
  theme?: keyof typeof THEMES;
  size?: keyof typeof SIZES;
  spacing?: keyof typeof SPACING;
  variant?: keyof typeof VARIANTS;
}) {
  return (
    <PortableText
      value={value}
      components={createComponents(theme, size, spacing, variant)}
    />
  );
}
