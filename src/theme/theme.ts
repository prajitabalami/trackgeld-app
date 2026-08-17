export const theme = {
  colors: {
    background: "#EAF1EF",
    surface: "#FFFFFF",
    surfaceMuted: "#D7E3DF",
    text: "#212823",
    textMuted: "#6C766F",
    textFaint: "#98A19B",
    primary: "#1B6B62",
    primaryPressed: "#154F49",
    primaryTint: "#DCEBE8",
    accent: "#C67A22",
    success: "#1B6B62",
    warning: "#C67A22",
    danger: "#B24A36",
    border: "#DEE7E3",
    white: "#FFFFFF",
    google: "#4285F4"
  },
  // One entry per transaction category: icon tint (fg) and its soft
  // background chip (bg). Shared by CategoryRow on Home/Activity and by
  // the category picker in the Add Transaction sheet.
  category: {
    food: { fg: "#C67A22", bg: "#F3E3CF" },
    transport: { fg: "#2E5FA3", bg: "#DCE7F2" },
    subscriptions: { fg: "#7A4E8C", bg: "#E3DCEF" },
    shopping: { fg: "#3E8E6E", bg: "#DCEFE4" },
    health: { fg: "#B24A36", bg: "#F4DAD3" },
    income: { fg: "#1B6B62", bg: "#DCEBE8" },
    other: { fg: "#6C766F", bg: "#E7EBE8" }
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 20,
    lg: 32,
    xl: 40,
    xxl: 44
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 20,
    pill: 999
  },
  typography: {
    title: 34,
    heading: 24,
    body: 16,
    small: 13,
    label: 12
  },
  shadow: {
    shadowColor: "#151922",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3
  }
} as const;

export type AppTheme = typeof theme;
export type CategoryKey = keyof typeof theme.category;
