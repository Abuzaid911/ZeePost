/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  daisyui: {
    themes: ["cupcake", "cmyk"],
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        dark: {
          primary: '#1a1a1a',
          secondary: '#2d2d2d',
          text: '#e5e5e5'
        }
      }
    },
  },
  plugins: [require("daisyui")],
};