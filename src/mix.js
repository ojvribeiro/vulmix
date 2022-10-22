const mix = require('laravel-mix')
const path = require('path')
const fs = require('fs')
const clc = require('cli-color')

require('laravel-mix-simple-image-processing')
require('laravel-mix-replace-in-file')
require('laravel-mix-ejs')

const pkg = require('../package.json')

const port = '3000'
let isImgGenerated = false

class VulmixInit {
  name() {
    return 'vulmix'
  }

  register() {
    console.log(clc.cyan.underline(`\n\nVulmix ${pkg.version}`))

    mix
      .options({
        hmrOptions: {
          host: 'localhost',
          port: port,
        },
      })

      .before(() => {
        console.log(`\n\nWarming up...`)

        fs.rmSync('_dist/assets', { recursive: true, force: true })

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
            '@assets':
              fs.existsSync(path.resolve(__dirname, '../../../assets')) &&
              path.resolve(__dirname, '../../../assets'),
            '@components':
              fs.existsSync(path.resolve(__dirname, '../../../components')) &&
              path.resolve(__dirname, '../../../components'),
            '@composables':
              fs.existsSync(path.resolve(__dirname, '../../../composables')) &&
              path.resolve(__dirname, '../../../composables'),
            '@layouts':
              fs.existsSync(path.resolve(__dirname, '../../../layouts')) &&
              path.resolve(__dirname, '../../../layouts'),
            '@pages':
              fs.existsSync(path.resolve(__dirname, '../../../pages')) &&
              path.resolve(__dirname, '../../../pages'),
            '@sass':
              fs.existsSync(path.resolve(__dirname, '../../../assets/sass')) &&
              path.resolve(__dirname, '../../../assets/sass'),
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

        // Synchronous run
        setTimeout(() => {
          if (isImgGenerated === false) {
            mix.imgs({
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

            isImgGenerated = true
          }

          console.log(
            clc.white('\nServing on:'),
            clc.magentaBright.underline(`http://localhost:${port}\n`)
          )
        })
      })

    if (fs.existsSync('assets/icons/')) {
      mix.copy('assets/icons', '_dist/assets/icons')
    }

    /**
     * Production mode only
     */
    if (mix.inProduction()) {
      mix
        .before(() => {
          console.log(clc.cyan('\n\nPreparing production bundle...\n\n'))
        })

        .copy('node_modules/vulmix/utils/deploy/.htaccess', '_dist')
    } else {
      /**
       * Development mode only
       */
      mix
        .webpackConfig({
          devtool: 'source-map',
        })

        .sourceMaps()

        .disableSuccessNotifications()
    }
  }
}

mix.extend('vulmix', new VulmixInit())
