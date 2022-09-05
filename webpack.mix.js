const mix = require('laravel-mix')
const path = require('path')

require('./.vue-mix/mix.js')

mix
  .vueMix()

  .alias({
    '@': path.join(__dirname, '.vue-mix'),
    '@assets': path.join(__dirname, 'assets'),
    '@components': path.join(__dirname, 'components'),
    '@composables': path.join(__dirname, 'composables'),
    '@pages': path.join(__dirname, 'pages'),
    '@sass': path.join(__dirname, 'assets/sass'),
  })

  .sass('assets/sass/main.scss', '.dist/css')

