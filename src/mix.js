const mix = require('laravel-mix')
const fs = require('node:fs')
const chalk = require('chalk')
const { argv } = require('yargs')

const pkg = require('../package.json')
const { useConsole } = require('./utils/console.js')
const getRelativePath = require('./utils/getRelativePath.js')
const { UnpluginAutoImports } = require('./config/unplugin.js')
const {
  absoluteVulmixPaths,
  relativeVulmixPaths,
} = require('./config/paths.js')
const { VulmixAliases } = require('./config/aliases')

require('laravel-mix-ejs')

class VulmixInit {
  name() {
    return 'vulmix'
  }

  register(options = { dev: false }) {
    const isDevMode = options.dev

    const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths(isDevMode).absoluteRootPath
    const RELATIVE_PUBLIC_PATH =
      relativeVulmixPaths(isDevMode).relativePublicPath
    const ABSOLUTE_PACKAGE_PATH =
      absoluteVulmixPaths(isDevMode).absolutePackagePath
    const RELATIVE_PACKAGE_PATH =
      relativeVulmixPaths(isDevMode).relativePackagePath
    const ABSOLUTE_PUBLIC_PATH =
      absoluteVulmixPaths(isDevMode).absolutePublicPath

    const VulmixConfig = require(`${ABSOLUTE_ROOT_PATH}/.vulmix/${
      isDevMode ? 'demo/' : ''
    }vulmix.config.js`)

    useConsole.clear()
    useConsole.log(
      `${chalk.grey(`Vulmix ${pkg.version}`)}\n${chalk.blueBright(
        `Warming up...`
      )}`
    )

    fs.rmSync(`${ABSOLUTE_ROOT_PATH}/_dist/assets`, {
      recursive: true,
      force: true,
    })

    if (!fs.existsSync(`${ABSOLUTE_ROOT_PATH}/_dist/assets/img`)) {
      fs.mkdirSync(`${ABSOLUTE_ROOT_PATH}/_dist/assets/img`, {
        recursive: true,
      })
    }

    mix.options({
      hmrOptions: {
        host: 'localhost',
        port: argv.port,
      },
    })

    mix
      .setPublicPath(RELATIVE_PUBLIC_PATH)

      .before(() => {
        if (!isDevMode) {
          if (!fs.existsSync(`${ABSOLUTE_ROOT_PATH}/vercel.json`)) {
            mix.copy(
              `${ABSOLUTE_PACKAGE_PATH}/utils/deploy/vercel.json`,
              ABSOLUTE_ROOT_PATH
            )
          }

          mix
            .copy(
              `${ABSOLUTE_PACKAGE_PATH}/utils/tsconfig.json`,
              `${ABSOLUTE_ROOT_PATH}/.vulmix/types`
            )
            .copy(
              `${ABSOLUTE_PACKAGE_PATH}/types/vue-shims.d.ts`,
              `${ABSOLUTE_ROOT_PATH}/.vulmix/types`
            )
        }
      })

      .webpackConfig({
        plugins: [...UnpluginAutoImports(isDevMode)],

        resolve: {
          extensions: ['.js', '.vue', '.ts'],
          alias: {
            ...VulmixAliases(isDevMode),
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
          `${RELATIVE_PACKAGE_PATH}/src/index.ejs`,
          `${RELATIVE_PUBLIC_PATH}/mix-manifest.json`,
        ],
        RELATIVE_PUBLIC_PATH,
        VulmixConfig,
        {
          partials: [`${RELATIVE_PUBLIC_PATH}/mix-manifest.json`],
          mixVersioning: true,
        }
      )

      .ts(
        `${ABSOLUTE_PACKAGE_PATH}/src/vue/main.ts`,
        `${ABSOLUTE_ROOT_PATH}/_dist/assets/_vulmix/js/main.vulmix.js`
      )
      .vue({ version: 3 })

      .version()

      .extract()

      .disableSuccessNotifications()

    if (fs.existsSync(`${ABSOLUTE_ROOT_PATH}/assets/icons/`)) {
      mix.copy(
        `${ABSOLUTE_ROOT_PATH}/assets/icons`,
        `${ABSOLUTE_ROOT_PATH}/_dist/assets/icons`
      )
    }

    if (fs.existsSync(`${ABSOLUTE_ROOT_PATH}/assets/img/`)) {
      mix.copy(
        `${ABSOLUTE_ROOT_PATH}/assets/img`,
        `${ABSOLUTE_ROOT_PATH}/_dist/assets/img`
      )
    }

    /**
     * Production mode only
     */
    if (mix.inProduction()) {
      mix
        .before(() => {
          useConsole.clear()
          useConsole.log(
            `${chalk.grey(`Vulmix ${pkg.version}`)}\n${chalk.cyan(
              `Preparing production bundle...\n\n`
            )}`
          )

          mix
            .copy(
              `${RELATIVE_PACKAGE_PATH}/utils/tsconfig.json`,
              `${RELATIVE_PUBLIC_PATH}/.vulmix/types`
            )
            .copy(
              `${RELATIVE_PACKAGE_PATH}/types/vue-shims.d.ts`,
              `${RELATIVE_PUBLIC_PATH}/.vulmix/types`
            )
        })

        .copy(
          `${ABSOLUTE_PACKAGE_PATH}/utils/deploy/.htaccess`,
          ABSOLUTE_PUBLIC_PATH
        )

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

          setTimeout(() => {
            useConsole.clear()

            console.log(
              chalk.greenBright(
                `${chalk.grey(
                  `Vulmix ${pkg.version}`
                )}\n\nOptimized build generated in the ${chalk.yellowBright(
                  isDevMode
                    ? getRelativePath(
                        ABSOLUTE_PACKAGE_PATH,
                        ABSOLUTE_PUBLIC_PATH
                      ).replace(/\.\//g, '')
                    : getRelativePath(
                        ABSOLUTE_ROOT_PATH,
                        ABSOLUTE_PUBLIC_PATH
                      ).replace(/\.\//g, '')
                )} folder. You can\ndeploy its contents on any static host.\n`
              )
            )

            useConsole.log(chalk.blueBright(`Finishing...`))
          })
        })
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

          setTimeout(() => {
            useConsole.clear()

            useConsole.log(
              chalk.blueBright(
                `${chalk.grey(
                  `Vulmix ${pkg.version}`
                )}\nHMR Server running at: ${chalk.greenBright(
                  `http://localhost:${argv.port}\n\n`
                )}`
              )
            )
          })
        })
    }
  }
}

mix.extend('vulmix', new VulmixInit())
