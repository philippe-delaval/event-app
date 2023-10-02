/** @type {import("tailwindcss").Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-grey": "#FBFBFD",
        "primary-orange": "#93C01F",
        "secondary-orange": "#7CAB17",
        "primary-gray": "#545454",
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
