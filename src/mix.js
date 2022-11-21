const mix = require('laravel-mix')
const path = require('path')
const fs = require('fs')
const clc = require('cli-color')

require('laravel-mix-simple-image-processing')
require('laravel-mix-ejs')

let isImgGenerated = false

const port = '3000'
const rootPath = path.join(__dirname, '../../..')
const packagePath = path.join(__dirname, '../')
const publicPath = '_dist'

const pkg = require(`${packagePath}/package.json`)

console.log({ rootPath, packagePath })

fs.rmSync(`${rootPath}/_dist/assets`, { recursive: true, force: true })

if (!fs.existsSync(`${rootPath}/_dist/assets/img`)) {
  fs.mkdirSync(`${rootPath}/_dist/assets/img`, { recursive: true })
}

class VulmixInit {
  name() {
    return 'vulmix'
  }

  register() {
    console.log(clc.cyan.underline(`\n\nVulmix ${pkg.version}`))

    mix
      .setPublicPath(publicPath)

      .options({
        hmrOptions: {
          host: 'localhost',
          port: port,
        },
      })

      .before(() => {
        console.log(`\n\nWarming up...`)
      })

      .webpackConfig({
        resolve: {
          extensions: ['.js', '.vue'],
          alias: {
            '~': rootPath,
            '@': path.resolve(__dirname, `${packagePath}/src`),
            '@assets':
              fs.existsSync(`${rootPath}/assets`) && `${rootPath}/assets`,
            '@components':
              fs.existsSync(`${rootPath}/components`) &&
              `${rootPath}/components`,
            '@composables':
              fs.existsSync(`${rootPath}/composables`) &&
              `${rootPath}/composables`,
            '@layouts':
              fs.existsSync(`${rootPath}/layouts`) && `${rootPath}/layouts`,
            '@pages': fs.existsSync(`${rootPath}/pages`) && `${rootPath}/pages`,
            '@sass':
              fs.existsSync(`${rootPath}/assets/sass`) &&
              `${rootPath}/assets/sass`,
          },
        },
      })

      .ejs(
        [`${packagePath}/src/index.ejs`, `${rootPath}/_dist/mix-manifest.json`],
        `${rootPath}/_dist`,
        {},
        {
          partials: [`${rootPath}/_dist/mix-manifest.json`],
          mixVersioning: true,
        }
      )

      .sass(
        `${packagePath}/src/assets/sass/main.scss`,
        `${rootPath}/_dist/assets/_vulmix/css/main.vulmix.css`
      )

      .sass(`${rootPath}/assets/sass/main.scss`, `${rootPath}/_dist/assets/css`)

      .js(
        `${packagePath}/src/main.js`,
        `${rootPath}/_dist/assets/_vulmix/js/main.vulmix.js`
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
              destination: publicPath + '/assets/img',
              webp: true,
              thumbnailsSizes: [1920, 1200, 900, 600, 300, 50, 4],
              smallerThumbnailsOnly: true,
              thumbnailsWebpOnly: true,
              processOriginalImage: true,
              thumbnailsWebp: true,
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

    if (fs.existsSync(`${rootPath}/assets/icons/`)) {
      mix.copy(`${rootPath}/assets/icons`, `${rootPath}/_dist/assets/icons`)
    }

    /**
     * Production mode only
     */
    if (mix.inProduction()) {
      mix
        .before(() => {
          console.log(clc.cyan('\n\nPreparing production bundle...\n\n'))
        })

        .copy(`${packagePath}/utils/deploy/.htaccess`, `${rootPath}/_dist`)
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
