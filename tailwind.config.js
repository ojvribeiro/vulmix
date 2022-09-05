/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './.vue-mix/**/pages/*.{vue,html,js}',
    './.vue-mix/**/components/*.{vue,html,js}',
    './pages/*.{vue,html,js}',
    './components/*.{vue,html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
