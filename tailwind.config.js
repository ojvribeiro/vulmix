/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.vue',
    './.vulmix/**/pages/*.{vue,js}',
    './.vulmix/**/components/*.{vue,js}',
    './.vulmix/**/layouts/*.{vue,js}',
    './pages/*.{vue,js}',
    './components/*.{vue,js}',
    './layouts/*.{vue,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
