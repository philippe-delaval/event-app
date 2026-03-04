/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: colors.slate[50], // Was background-grey
        primary: colors.indigo[600], // Was primary-orange
        "primary-hover": colors.indigo[700], // Was secondary-orange
        "primary-gray": colors.slate[600], // Updated to match slate theme
        revenue: colors.emerald[600],
        alert: colors.rose[600],
        // Keeping old keys mapped to new values temporarily if needed, but better to refactor.
        // I will refactor the code to use the new names.
      },
      fontFamily: {
        bebas: ["Bebas Neue Cyrillic", "sans-serif"],
        fira: ["Fira Sans", "sans-serif"],
      },
    },
  },
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("@tailwindcss/forms"),
  ],
};
