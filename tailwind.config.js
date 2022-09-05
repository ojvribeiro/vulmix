/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './.vue-mix/**/pages/*.{vue,html,js}',
    './.vue-mix/**/components/*.{vue,html,js}',
    './src/**/pages/*.{vue,html,js}',
    './src/**/components/*.{vue,html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
