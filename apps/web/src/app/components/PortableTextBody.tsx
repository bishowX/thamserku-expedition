import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const THEMES = {
  light: {
    text: "text-[#5A6673]",
    strong: "text-[#1A1A1A]",
  },
  dark: {
    text: "text-[#C8CDD2]",
    strong: "text-white",
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
} as const;

function createComponents(
  theme: keyof typeof THEMES,
  size: keyof typeof SIZES,
  spacing: keyof typeof SPACING,
): PortableTextComponents {
  const colors = THEMES[theme];
  const typography = SIZES[size];
  const space = SPACING[spacing];

  return {
    block: {
      normal: ({ children }) => (
        <p
          className={`font-['DM_Sans'] font-light ${colors.text} ${typography} ${space.block}`}
        >
          {children}
        </p>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul
          className={`list-disc pl-5 font-['DM_Sans'] font-light ${colors.text} ${typography} ${space.list}`}
        >
          {children}
        </ul>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className={`font-medium ${colors.strong}`}>{children}</strong>
      ),
      em: ({ children }) => <em>{children}</em>,
    },
  };
}

export function PortableTextBody({
  value,
  theme = "light",
  size = "default",
  spacing = "default",
}: {
  value: PortableTextBlock[];
  theme?: keyof typeof THEMES;
  size?: keyof typeof SIZES;
  spacing?: keyof typeof SPACING;
}) {
  return (
    <PortableText value={value} components={createComponents(theme, size, spacing)} />
  );
}
