/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './.vulmix/**/pages/*.{vue,html,js}',
    './.vulmix/**/components/*.{vue,html,js}',
    './pages/*.{vue,html,js}',
    './components/*.{vue,html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
