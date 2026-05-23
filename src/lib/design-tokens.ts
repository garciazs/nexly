/**
 * Design tokens — referência central para o design system Nexly (AuthKit / Linear style)
 */
export const tokens = {
  radius: {
    sm: "calc(var(--radius) - 4px)",
    md: "calc(var(--radius) - 2px)",
    lg: "var(--radius)",
    xl: "calc(var(--radius) + 4px)",
  },
  spacing: {
    section: "8rem",
    sectionSm: "5rem",
    page: "2rem",
  },
  typography: {
    display: "text-display",
    headline: "text-headline",
    bodyLg: "text-body-lg",
  },
  surfaces: {
    card: "surface-card",
    cardInteractive: "surface-card-interactive",
    glass: "glass",
  },
} as const;
