const mix = require('laravel-mix')
const path = require('path')
const fs = require('fs')

require('laravel-mix-serve')
require('laravel-mix-simple-image-processing')
require('laravel-mix-replace-in-file')
require('laravel-mix-ejs')

class VulmixInit {
  name() {
    return 'vulmix'
  }

  register() {
    mix
      .setPublicPath('_dist')

      .webpackConfig({
        resolve: {
          extensions: ['.js', '.vue'],
          alias: {
            '@': path.resolve(__dirname, '../.vulmix'),
            '@assets': path.resolve(__dirname, '../assets'),
            '@components': path.resolve(__dirname, '../components'),
            '@composables': path.resolve(__dirname, '../composables'),
            '@layouts': path.resolve(__dirname, '../layouts'),
            '@pages': path.resolve(__dirname, '../pages'),
            '@sass': path.resolve(__dirname, '../assets/sass'),
          },
        },
      })

      .ejs(
        ['.vulmix/index.ejs', '_dist/mix-manifest.json'],
        '_dist',
        {},
        {
          partials: ['_dist/mix-manifest.json'],
          mixVersioning: true,
        }
      )

      .sass(
        '.vulmix/assets/sass/main.scss',
        '_dist/assets/_vulmix/css/main.vulmix.css'
      )

      .sass('assets/sass/main.scss', '_dist/assets/css')

      .js('.vulmix/main.js', '_dist/assets/_vulmix/js/main.vulmix.js')
      .vue()

      .version()

      .extract()

      .imgs({
        source: 'assets/img',
        destination: '_dist/assets/img',
        webp: true,
        thumbnailsSizes: [1920, 1200, 900, 600, 300, 50],
        smallerThumbnailsOnly: true,
        thumbnailsOnly: true,
        imageminWebpOptions: {
          quality: 90,
        },
      })


    if (fs.existsSync('assets/icons/')) {
      mix.copy('assets/icons', '_dist/assets/icons')
    }

    /**
     * Production mode
     */
    if (mix.inProduction()) {
      mix
        .copy('.vulmix/utils/deploy/.htaccess', '_dist')
    } else {
      /**
       * Development mode
       */
      mix
        .serve(
          'npx http-server -p 8000 -a localhost _dist --gzip --proxy http://localhost:8000?',
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

        .sourceMaps()

        .browserSync({
          proxy: 'http://localhost:8000/',
          files: [
            './.vulmix/index.ejs',
            './app.vue',
            './.vulmix/**/*.{js,vue,scss}',
            './assets/**/*.{js,vue,scss}',
            './components/**/*.{js,vue}',
            './composables/**/*.{js,vue}',
            './pages/**/*.{js,vue}',
          ],
        })

        .disableSuccessNotifications()
    }
  }
}

mix.extend('vulmix', new VulmixInit())
