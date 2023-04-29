const mix = require('laravel-mix')
const path = require('node:path')
const fs = require('node:fs')
const chalk = require('chalk')
const { argv } = require('yargs')

const getRelativePath = require('./utils/getRelativePath.js')

let VulmixConfig

require('laravel-mix-ejs')

let isFirstRun = false

class VulmixInit {
  name() {
    return 'vulmix'
  }

  register(options = { dev: false }) {
    const absoluteRootPath =
      options.dev === true
        ? path.resolve(__dirname, '../demo')
        : path.resolve(__dirname, '../../..')
    const absolutePackagePath =
      options.dev === true
        ? path.resolve(__dirname, '../')
        : path.resolve(__dirname, '..')
    const absolutePublicPath =
      options.dev === true
        ? path.resolve(__dirname, '../demo/_dist')
        : path.resolve(__dirname, '../../../_dist')

    const relativeRootPath =
      options.dev === true
        ? getRelativePath(absolutePackagePath, absoluteRootPath)
        : getRelativePath(absoluteRootPath, absoluteRootPath)
    const relativePackagePath =
      options.dev === true
        ? getRelativePath(absolutePackagePath, absolutePackagePath)
        : getRelativePath(absoluteRootPath, absolutePackagePath)
    const relativePublicPath =
      options.dev === true
        ? getRelativePath(absolutePackagePath, absolutePublicPath)
        : getRelativePath(absoluteRootPath, absolutePublicPath)

    VulmixConfig = require(`${absoluteRootPath}/.vulmix/${
      options.dev === true ? 'demo/' : ''
    }vulmix.config.js`)

    fs.rmSync(`${absoluteRootPath}/_dist/assets`, {
      recursive: true,
      force: true,
    })

    if (!fs.existsSync(`${absoluteRootPath}/_dist/assets/img`)) {
      fs.mkdirSync(`${absoluteRootPath}/_dist/assets/img`, { recursive: true })
    }

    mix.options({
      hmrOptions: {
        host: 'localhost',
        port: argv.port,
      },
    })

    mix
      .setPublicPath(relativePublicPath)

      .before(() => {
        if (options.dev === false) {
          if (!fs.existsSync(`${absoluteRootPath}/vercel.json`)) {
            mix.copy(
              `${absolutePackagePath}/utils/deploy/vercel.json`,
              absoluteRootPath
            )
          }

          mix
            .copy(
              `${absolutePackagePath}/utils/tsconfig.json`,
              `${absoluteRootPath}/.vulmix/types`
            )
            .copy(
              `${absolutePackagePath}/types/vue-shims.d.ts`,
              `${absoluteRootPath}/.vulmix/types`
            )
        }
      })

      .webpackConfig({
        plugins: [
          require('unplugin-vue-components/webpack')({
            /* options */

            // Vue version of project. It will detect automatically if not specified.
            // Acceptable value: 2 | 2.7 | 3
            version: 3,

            // relative paths to the directory to search for components.
            dirs: [
              `${absoluteRootPath}/components`,
              `${absolutePackagePath}/src/vue/components/**`,
            ],

            // valid file extensions for components.
            extensions: ['vue', 'ts', 'js'],

            // Allow subdirectories as namespace prefix for components.
            directoryAsNamespace: true,

            // Collapse same prefixes (camel-sensitive) of folders and components
            // to prevent duplication inside namespaced component name.
            // works when `directoryAsNamespace: true`
            collapseSamePrefixes: true,

            // generate `components.d.ts` global declarations,
            // also accepts a path for custom filename
            // default: `true` if package typescript is installed
            dts:
              options.dev === true
                ? `${absolutePackagePath}/types/components.d.ts`
                : `${absoluteRootPath}/.vulmix/types/components.d.ts`,
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
              `${absoluteRootPath}/composables/**`, // all nested modules
            ],

            // Filepath to generate corresponding .d.ts file.
            // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
            // Set `false` to disable.
            dts:
              options.dev === true
                ? `${absolutePackagePath}/types/auto-imports.d.ts`
                : `${absoluteRootPath}/.vulmix/types/auto-imports.d.ts`,

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
            '~': absoluteRootPath,
            '@': path.resolve(__dirname, `${absolutePackagePath}/src`),
            '@assets':
              fs.existsSync(`${absoluteRootPath}/assets`) &&
              `${absoluteRootPath}/assets`,
            '@components':
              fs.existsSync(`${absoluteRootPath}/components`) &&
              `${absoluteRootPath}/components`,
            '@composables':
              fs.existsSync(`${absoluteRootPath}/composables`) &&
              `${absoluteRootPath}/composables`,
            '@layouts':
              fs.existsSync(`${absoluteRootPath}/layouts`) &&
              `${absoluteRootPath}/layouts`,
            '@pages':
              fs.existsSync(`${absoluteRootPath}/pages`) &&
              `${absoluteRootPath}/pages`,
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
        [
          `${relativePackagePath}/src/index.ejs`,
          `${relativePublicPath}/mix-manifest.json`,
        ],
        `${relativePublicPath}`,
        VulmixConfig,
        {
          partials: [`${relativePublicPath}/mix-manifest.json`],
          mixVersioning: true,
        }
      )

      .ts(
        `${absolutePackagePath}/src/vue/main.ts`,
        `${absoluteRootPath}/_dist/assets/_vulmix/js/main.vulmix.js`
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
            isFirstRun = true
          }
        })
      })

    if (fs.existsSync(`${absoluteRootPath}/assets/icons/`)) {
      mix.copy(
        `${absoluteRootPath}/assets/icons`,
        `${absoluteRootPath}/_dist/assets/icons`
      )
    }

    if (fs.existsSync(`${absoluteRootPath}/assets/img/`)) {
      mix.copy(
        `${absoluteRootPath}/assets/img`,
        `${absoluteRootPath}/_dist/assets/img`
      )
    }

    /**
     * Production mode only
     */
    if (mix.inProduction()) {
      mix
        .before(() => {
          console.log(chalk.cyan('\n\nPreparing production bundle...\n\n'))

          mix
            .copy(
              `${relativePackagePath}/utils/tsconfig.json`,
              `${relativePublicPath}/.vulmix/types`
            )
            .copy(
              `${relativePackagePath}/types/vue-shims.d.ts`,
              `${relativePublicPath}/.vulmix/types`
            )
        })

        .copy(
          `${absolutePackagePath}/utils/deploy/.htaccess`,
          `${absolutePublicPath}`
        )
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
