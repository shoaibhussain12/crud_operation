/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{html,js}",
    "./pages/**/*.{html,js}",
    "./index.html",
  ],
  theme: {
    fontFamily :{
      roboto : ["Roboto"],
    },
    extend: {
      backgroundImage: {
        'bg': "url('./img/bg.png')",
      }
    },
  },
  plugins: [],
};
