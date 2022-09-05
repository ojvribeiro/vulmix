const mix = require('laravel-mix')

require('laravel-mix-serve')

class VueMixInit {
  name() {
    return 'vueMix'
  }

  register() {
    mix
      .setPublicPath('.dist/')

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

      .sass('.vue-mix/assets/sass/main.scss', '.dist/.vue-mix/dist/css')

      .js('.vue-mix/main.js', '.dist/.vue-mix/dist/js')
      .vue()

      .sourceMaps()

      .extract()

      .browserSync({
        proxy: 'http://localhost:8000/',
        files: [
          './*.{html,ejs,php}',
          './.vue-mix/**/*.{js,vue,scss}',
          './assets/**/*.{js,vue,scss}',
          './components/**/*.{js,vue,scss}',
          './composables/**/*.{js,vue,scss}',
          './pages/**/*.{js,vue,scss}',
        ],
      })
  }
}

mix.extend('vueMix', new VueMixInit())
