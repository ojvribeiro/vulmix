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
    '@sass': path.join(__dirname, 'src/assets/sass'),
  })

  .sass('src/assets/sass/main.scss', 'dist/css')

  .js('src/main.js', 'dist/js')
  .vue()
  .sourceMaps()

  .extract()

  .browserSync({
    proxy: 'http://localhost:8000/',
    files: ['./*.{html,ejs,php}', './src/**/*.{js,vue,scss}'],
  })
