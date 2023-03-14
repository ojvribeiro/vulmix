const mix = require('laravel-mix')
const path = require('path')
const fs = require('fs')
const clc = require('cli-color')

require('laravel-mix-ejs')

let isFirstRun = false

class VulmixInit {
  name() {
    return 'vulmix'
  }

  register(options = { dev: false }) {
    const port = '3000'
    const rootPath =
      options.dev === true
        ? path.join(__dirname, '../demo')
        : path.join(__dirname, '../../..')
    const packagePath = path.join(__dirname, '../')
    const publicPath = options.dev === true ? 'demo/_dist' : '_dist'

    const pkg = require(`${packagePath}/package.json`)

    fs.rmSync(`${rootPath}/_dist/assets`, { recursive: true, force: true })

    if (!fs.existsSync(`${rootPath}/_dist/assets/img`)) {
      fs.mkdirSync(`${rootPath}/_dist/assets/img`, { recursive: true })
    }

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

        if (options.dev === false) {
          mix.copy(
            `${packagePath}/utils/webpack.mix.js`,
            `${rootPath}/\.vulmix/laravel-mix`
          )
        }
      })

      .webpackConfig({
        plugins: [
          require('unplugin-vue-components/webpack')({
            /* options */
            dirs: [
              `${rootPath}/components/**`,
              `${rootPath}/layouts/**`,
              `${packagePath}/src/vue/components/**`,
              `${packagePath}/demo/components/**`,
              `${packagePath}/demo/layouts/**`,
            ],

            dts: './types/components.d.ts',
          }),

          require('unplugin-auto-import/webpack')({
            // targets to transform
            include: [
              /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
              /\.vue$/,
              /\.vue\?vue/, // .vue
              /\.md$/, // .md
            ],

            // global imports to register
            imports: [
              // presets
              'vue',
              'vue-router',
              // custom
              {
                '@vueuse/core': [
                  // named imports
                  'useFetch', // import { useMouse } from '@vueuse/core',
                ],
              },
            ],
            // Enable auto import by filename for default module exports under directories
            defaultExportByFilename: false,

            // Auto import for module exports under directories
            // by default it only scan one level of modules under the directory
            dirs: [
              // './hooks',
              // './composables' // only root modules
              // './composables/**', // all nested modules
            ],

            // Filepath to generate corresponding .d.ts file.
            // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
            // Set `false` to disable.
            dts: './types/auto-imports.d.ts',

            // Auto import inside Vue template
            // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
            vueTemplate: true,

            // Custom resolvers, compatible with `unplugin-vue-components`
            // see https://github.com/antfu/unplugin-auto-import/pull/23/
            resolvers: [
              /* ... */
            ],
          }),
        ],

        resolve: {
          extensions: ['.js', '.vue', '.ts'],
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
          },
        },
        module: {
          rules: [
            // ... other rules omitted
            {
              test: /\.ts$/,
              loader: 'ts-loader',
              options: { appendTsSuffixTo: [/\.vue$/] },
            },
          ],
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

      .ts(
        `${packagePath}/src/vue/main.ts`,
        `${rootPath}/_dist/assets/_vulmix/js/main.vulmix.js`
      )
      .vue({ version: 3 })

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
          if (isFirstRun === false) {
            // ...

            isFirstRun = true
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
