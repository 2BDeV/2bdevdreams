/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0F1419",
        darker: "#0A0E13",
        cyan: {
          DEFAULT: "#00D9FF",
          light: "#0EA5E9",
        },
        card: "#161C25",
        border: "#2A3A4A",
        textPrimary: "#F5F5F5",
        textSecondary: "#B0B5B8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(0, 217, 255, 0.35)",
      },
      borderRadius: {
        "3xl": "1.75rem",
      },
      animation: {
        "float-slow": "float 10s ease-in-out infinite",
        "float-medium": "float 14s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, 20px, 0)" },
        },
      },
    },
  },
  plugins: [],
};
