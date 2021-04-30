const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
    colors: colors
  },
  variants: {
    extend: {
      gradientColorStops: ["dark"]
    },
  },
  plugins: [],
}
