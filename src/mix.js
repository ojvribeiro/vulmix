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
      .before(() => {
        fs.rmSync('_dist', { recursive: true, force: true })

        if (!fs.existsSync('./_dist/assets/img')) {
          fs.mkdirSync('./_dist/assets/img', { recursive: true })
        }
      })

      .setPublicPath('_dist')

      .webpackConfig({
        resolve: {
          extensions: ['.js', '.vue'],
          alias: {
            '~': path.resolve(__dirname, '../../../'),
            '@': path.resolve(__dirname, '../../../node_modules/vulmix/src'),
            '@assets': path.resolve(__dirname, '../../../assets'),
            '@components': path.resolve(__dirname, '../../../components'),
            '@composables': path.resolve(__dirname, '../../../composables'),
            '@layouts': path.resolve(__dirname, '../../../layouts'),
            '@pages': path.resolve(__dirname, '../../../pages'),
            '@sass': path.resolve(__dirname, '../../../assets/sass'),
          },
        },
      })

      .ejs(
        ['node_modules/vulmix/src/index.ejs', '_dist/mix-manifest.json'],
        '_dist',
        {},
        {
          partials: ['_dist/mix-manifest.json'],
          mixVersioning: true,
        }
      )

      .sass(
        'node_modules/vulmix/src/assets/sass/main.scss',
        '_dist/assets/_vulmix/css/main.vulmix.css'
      )

      .sass('assets/sass/main.scss', '_dist/assets/css')

      .js(
        'node_modules/vulmix/src/main.js',
        '_dist/assets/_vulmix/js/main.vulmix.js'
      )
      .vue()

      .version()

      .extract()

      .imgs({
        source: 'assets/img',
        destination: '_dist/assets/img',
        webp: true,
        thumbnailsSizes: [1920, 1200, 900, 600, 300, 50],
        smallerThumbnailsOnly: true,
        thumbnailsOnly: false,
        imageminWebpOptions: {
          quality: 90,
        },
      })

      .after(stats => {
        /**
         * Only prints user files to the terminal
         */
        const assets = { ...stats.compilation.assets }
        stats.compilation.assets = {}

        for (const [path, asset] of Object.entries(assets)) {
          if (!path.match(/((\.|_)vulmix|\.map)/)) {
            stats.compilation.assets[path] = asset
          }
        }
      })

    if (fs.existsSync('assets/icons/')) {
      mix.copy('assets/icons', '_dist/assets/icons')
    }

    /**
     * Production mode only
     */
    if (mix.inProduction()) {
      mix.copy('node_modules/vulmix/utils/deploy/.htaccess', '_dist')
    } else {
      /**
       * Development mode only
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
            './node_modules/vulmix/src/index.ejs',
            './app.vue',
            './node_modules/vulmix/src/**/*.{js,vue,scss}',
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
