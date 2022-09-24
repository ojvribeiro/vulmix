const mix = require('laravel-mix')
const config = require('./webpack.config.js')

require('laravel-mix-serve')
require('laravel-mix-simple-image-processing')
require('laravel-mix-replace-in-file')

class VulmixInit {
  name() {
    return 'vulmix'
  }

  register() {
    mix
      .setPublicPath('.')

      .webpackConfig(config)

    if (mix.inProduction()) {
      mix
        .copy('index.html', '_dist')

        .sass(
          '.vulmix/assets/sass/main.scss',
          '_dist/assets/_vulmix/css/main.vulmix.css'
        )

        .sass('assets/sass/main.scss', '_dist/assets/css')

        .js('.vulmix/main.js', '_dist/assets/_vulmix/js/main.vulmix.js')
        .vue()

        .replaceInFile({
          files: '_dist/index.html',
          from: /build(|\/_vulmix)/g,
          to: 'assets',
        })

        .replaceInFile({
          files: '_dist/assets/**/*',
          from: /build\/img/g,
          to: 'assets/img',
        })

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

        .version()

        .extract()
    } else {
      mix
        .webpackConfig({
          devtool: 'source-map',
        })
        .serve(
          'npx http-server -p 8000 -a localhost -c-1 --proxy http://localhost:8000?',
          {
            verbose: false,
            build: false,
            dev: true,
            prod: false,
          }
        )

        .sass(
          '.vulmix/assets/sass/main.scss',
          'build/_vulmix/css/main.vulmix.css'
        )

        .sass('assets/sass/main.scss', 'build/css')

        .js('.vulmix/main.js', 'build/_vulmix/js/main.vulmix.js')
        .vue()

        .sourceMaps()

        .imgs({
          source: 'assets/img',
          destination: 'build/img',
          webp: true,
          thumbnailsSizes: [1920, 1200, 900, 600, 300, 50],
          smallerThumbnailsOnly: true,
          thumbnailsOnly: true,
          imageminWebpOptions: {
            quality: 90,
          },
        })

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
}

mix.extend('vulmix', new VulmixInit())
