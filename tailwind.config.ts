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
        // 东方美学配色
        ink: {
          DEFAULT: "#1A1A1A", // 墨色
          light: "#6B6B6B",   // 水墨灰
          lighter: "#D4D4D4", // 淡墨色
        },
        paper: "#FAF9F6",     // 宣纸白
        cinnabar: "#C8102E",  // 朱砂红
        gold: "#D4AF37",      // 金色

        // 保留原有配色以兼容现有页面
        bg: "#FAFAF9",
        text: {
          primary: "#18181B",
          secondary: "#52525B",
          muted: "#A1A1AA",
        },
        border: "#F5F5F4",
        accent: "#18181B",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "PingFang SC", "苹方", "sans-serif"],
        song: ["Source Han Serif SC", "思源宋体", "serif"],
      },
      borderRadius: {
        none: "0",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      backgroundImage: {
        "ink-gradient": "linear-gradient(to bottom, #1A1A1A, #3A3A3A, #FAF9F6)",
      },
    },
  },
  plugins: [],
};

export default config;
