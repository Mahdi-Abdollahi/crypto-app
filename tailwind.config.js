/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      midnight: "#0A2647",
      sky: "#0f172a",
      error: "#b91c1c",
      success: "#16a34a",
      gray: "#374151",
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
