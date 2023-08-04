/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './_components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background-grey': '#FBFBFD',
        'primary-orange': '#EE7408',
        'secondary-orange': '#DA6308',
        'primary-gray': '#545454',
      },
      fontFamily: {
        bebas: ['Bebas Neue Cyrillic', 'sans-serif'],
        fira: ['Fira Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/forms'),
  ],
}
