import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAF9",
        text: {
          primary: "#18181B",
          secondary: "#52525B",
          muted: "#A1A1AA",
        },
        border: "#F5F5F4",
        accent: "#18181B",
      },
      borderRadius: {
        none: "0",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
