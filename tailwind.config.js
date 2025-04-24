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
          light: "#FEF6E6", // Beige background in the design
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
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        scaleIn: "scaleIn 0.3s ease-out",
        fadeSlideIn: "fadeSlideIn 0.3s ease-out",
        bounce: "bounce 0.5s ease-in-out",
        ping: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeSlideIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-pink-100",
    "bg-pink-300",
    "bg-blue-100",
    "bg-blue-300",
    "bg-amber-100",
    "bg-amber-300",
    "bg-green-100",
    "bg-green-300",
    "bg-red-100",
    "bg-red-300",
    "bg-gray-100",
    "bg-gray-300",
  ],
};
