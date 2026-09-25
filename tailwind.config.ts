import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rtq: {
          green: {
            50: "#f0fdf4",
            100: "#dcfce7",
            200: "#bbf7d0",
            300: "#86efac",
            400: "#4ade80",
            500: "#22c55e",
            600: "#16a34a",
            700: "#15803d",
            800: "#134e32",
            900: "#0d3321",
            950: "#061f13",
          },
          gold: {
            50: "#fefce8",
            100: "#fef9c3",
            200: "#fef08a",
            300: "#fde047",
            400: "#eab308",
            500: "#cca028",
            600: "#b28a1c",
            700: "#8a6813",
            800: "#6e5113",
            900: "#5a4114",
          },
          cream: {
            50: "#fcfbfa",
            100: "#f8f5ee",
            200: "#f0ebe1",
            300: "#e4dbcc",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
      },
      boxShadow: {
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.06), 0 4px 12px -2px rgba(0, 0, 0, 0.03)",
        "card-hover": "0 20px 35px -5px rgba(0, 0, 0, 0.1), 0 8px 16px -4px rgba(0, 0, 0, 0.06)",
        gold: "0 8px 25px -4px rgba(234, 179, 8, 0.3)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        rtqtheme: {
          primary: "#0d3321",
          secondary: "#cca028",
          accent: "#52b788",
          neutral: "#2d2d2d",
          "base-100": "#ffffff",
          "base-200": "#f8f5ee",
          "base-300": "#f0ebe1",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};

export default config;
