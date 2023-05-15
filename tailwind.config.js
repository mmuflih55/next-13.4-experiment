/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    fontSize: {
      "2xs": ["10px", "12.1px"],
      xs: ["12px", "16px"],
      sm: ["14px", "18px"],
      tiny: ["16px", "24px"],
      base: ["20px", "30px"],
      lg: ["32px", "38px"],
      "2lg": ["40px", "50px"],
      xl: ["56px", "60px"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        neutral: "#FFFFFF",
        "neutral-gray/10": "#FFFFFF",
        "neutral-gray/30": "#E9EDF1",
        "neutral-gray/40": "#D9E0E7",
        "neutral-gray/60": "#A09E9E;",
        "neutral-gray/70": "#627688",
        "neutral-gray/90": "#33414D",

        "neutral/400": "#9C9EB0",
        "neutral/500": "#6B6D80",
        "neutral/900": "#111327",

        primary: "#4567d6",
        "primary/40": "#E1E2EC",
        "primary/50": "#F9F9FB",
        "primary/200": "#ECEDF3",
        "primary/300": "##E6E7EF",
        "primary/400": "#E0E1EB",
        "primary/900": "#50537C",

        secondary: "#40c77d",
      },
      borderColor: {
        neutral: "#FFFFFF",
        "neutral-gray/10": "#FFFFFF",
        "neutral-gray/30": "#E9EDF1",
        "neutral-gray/40": "#D9E0E7",
        "neutral-gray/60": "#A09E9E;",
        "neutral-gray/70": "#627688",
        "neutral-gray/90": "#33414D",

        "neutral/400": "#9C9EB0",
        "neutral/500": "#6B6D80",
        "neutral/900": "#111327",

        primary: "#4567d6",
        "primary-blue/20": "#CDDCFE",
        "primary-blue/100": "#036FCD",

        "primary/40": "#E1E2EC",
        "primary/50": "#F9F9FB",
        "primary/200": "#ECEDF3",
        "primary/300": "##E6E7EF",
        "primary/400": "#E0E1EB",
        "primary/900": "#50537C",

        secondary: "#40c77d",
      },
    },
    fontFamily: {
      sans: ["Inter", ...fontFamily.sans],
      robotoflex: ["Roboto Flex", "sans-serif"],
      newsreader: ["Newsreader", "serif"],
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
