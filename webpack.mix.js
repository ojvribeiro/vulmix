const mix = require('laravel-mix')

require('./.vulmix/mix.js')

mix
  .vueMix()

  .sass('assets/sass/main.scss', '.dist/css')

