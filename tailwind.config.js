/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact colors from the design
        primary: {
          DEFAULT: "#5669FF", // Main blue color
          light: "#EEF0FF",
        },
        secondary: {
          DEFAULT: "#FFC107", // Yellow color
          light: "#FFF8E1",
        },
        accent: {
          purple: "#9E77ED", // Purple in visits chart
          red: "#FF5454", // Red for emergency
          green: "#4CAF50", // Green used in charts
          blue: "#42A5F5", // Light blue for sessions
        },
        sidebar: "#1A1F2B", // Sidebar dark color
        background: {
          DEFAULT: "#FFFFFF",
          light: "#F5F5F7",
        },
        text: {
          DEFAULT: "#1A1F2B",
          secondary: "#6B7588",
          light: "#B4B9C8",
        },
        chart: {
          yellow: "#FFD166", // Patient summary chart
          pink: "#FF9EB9", // Visits summary chart
          green: "#79D489", // Conditions chart
          blue: "#78AEFF", // Sessions chart
        },
      },
      borderRadius: {
        card: "20px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
