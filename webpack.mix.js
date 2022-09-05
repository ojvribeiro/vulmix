const mix = require('laravel-mix')
const path = require('path')

require('laravel-mix-serve')

mix
  .setPublicPath('.')

  .serve(
    'npx http-server -p 8000 -a localhost -c-1 --proxy http://localhost:8000?',
    {
      verbose: false,
      watch: false,
      build: false,
      dev: true,
      prod: false,
    }
  )

  .webpackConfig({
    devtool: 'source-map',
  })

  .alias({
    '@': path.join(__dirname, '.vue-mix'),
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
    files: ['./*.{html,ejs,php}', './{src,.vue-mix}/**/*.{js,vue,scss}'],
  })
