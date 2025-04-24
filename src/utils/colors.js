// Colors utility file to ensure consistent color usage across the application

export const COLORS = {
  // Main brand colors
  PRIMARY: "#5669FF",
  PRIMARY_LIGHT: "#EEF0FF",
  SECONDARY: "#FFC107",
  SECONDARY_LIGHT: "#FFF8E1",

  // Chart colors
  CHART_YELLOW: "#FFD166",
  CHART_PINK: "#FF9EB9",
  CHART_GREEN: "#79D489",
  CHART_BLUE: "#78AEFF",

  // Accent colors
  ACCENT_PURPLE: "#9E77ED",
  ACCENT_RED: "#FF5454",
  ACCENT_GREEN: "#4CAF50",
  ACCENT_BLUE: "#42A5F5",

  // Background colors
  BACKGROUND: "#FFFFFF",
  BACKGROUND_LIGHT: "#F5F5F7",
  SIDEBAR: "#1A1F2B",

  // Text colors
  TEXT: "#1A1F2B",
  TEXT_SECONDARY: "#6B7588",
  TEXT_LIGHT: "#B4B9C8",

  // Visit types background colors
  EMERGENCY_BG: "#FFEBEE",
  ROUTINE_BG: "#E3F2FD",
  VIDEO_CONSULTATION_BG: "#F5F5F5",
  CHECKUP_BG: "#E8F5E9",
};

// Helper function to get chart gradient
export const getChartGradient = (ctx, color, start = 0, end = 1) => {
  if (!ctx) return color;

  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(start, `${color}FF`); // Full opacity
  gradient.addColorStop(end, `${color}33`); // 20% opacity

  return gradient;
};
