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
        green: {
          100: "#D8E9E4",
          300: "#2B5F44",
          500: "#243831",
        },
        golden: "#C5A365",
        text: "#191919",
        grey: {
          100: "#BBC2C0",
          300: "#939494",
        },
        success: "#49A569",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        castoro: ["var(--font-castoro)"],
      },
    },
  },
  plugins: [],
};

export default config; 