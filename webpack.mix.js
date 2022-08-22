const mix = require('laravel-mix')
const path = require('path')

mix
  .setPublicPath('.')

  .webpackConfig({
    devtool: 'source-map',
  })

  .alias({
    '@assets': path.join(__dirname, 'src/assets'),
    '@components': path.join(__dirname, 'src/components'),
    '@composables': path.join(__dirname, 'src/composables'),
    '@pages': path.join(__dirname, 'src/pages'),
    '@router': path.join(__dirname, 'src/router'),
  })

  .sass('src/assets/sass/main.scss', 'dist/css')

  .js('src/main.js', 'dist/js')
  .vue()

  .sourceMaps()

  .extract()

  .browserSync({
    proxy: 'http://127.0.0.1:8000/',
    files: ['*.html', './src/**/*.{js, vue, scss}'],
  })
