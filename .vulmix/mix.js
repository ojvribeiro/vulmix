const mix = require('laravel-mix')
const config = require('./webpack.config.js')

require('laravel-mix-serve')
require('laravel-mix-simple-image-processing')

class VueMixInit {
  name() {
    return 'vueMix'
  }

  register() {
    mix
      .setPublicPath('.dist/')

      .webpackConfig(config)

      .serve(
        'npx http-server -p 8000 -a localhost -c-1 --proxy http://localhost:8000?',
        {
          verbose: false,
          build: false,
          dev: true,
          prod: false,
        }
      )

      .webpackConfig({
        devtool: 'source-map',
      })

      .imgs({
        source: 'assets/img',
        destination: '.vulmix/assets/img',
        webp: true,
        thumbnailsSizes: [1920, 1200, 900, 600, 300, 50],
        smallerThumbnailsOnly: true,
        thumbnailsOnly: true,
        imageminWebpOptions: {
          quality: 90,
        },
      })

      .sass('.vulmix/assets/sass/main.scss', '.dist/.vulmix/dist/css')

      .js('.vulmix/main.js', '.dist/.vulmix/dist/js')
      .vue()

      .sourceMaps()

      .extract()

      .browserSync({
        proxy: 'http://localhost:8000/',
        files: [
          './*.{html,ejs,php}',
          './.vulmix/**/*.{js,vue,scss}',
          './assets/**/*.{js,vue,scss}',
          './components/**/*.{js,vue,scss}',
          './composables/**/*.{js,vue,scss}',
          './pages/**/*.{js,vue,scss}',
        ],
      })

      .disableSuccessNotifications()
  }
}

mix.extend('vueMix', new VueMixInit())
