const mix = require('laravel-mix')
const fs = require('node:fs')
const { execSync } = require('node:child_process')
const chalk = require('chalk')
const { argv } = require('yargs')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const pkg = require('../package.json')
const { useConsole } = require('./utils/useConsole.js')
const getRelativePath = require('./utils/getRelativePath.js')
const { UnpluginAutoImports } = require('./config/imports.js')
const {
  absoluteVulmixPaths,
  relativeVulmixPaths,
} = require('./config/paths.js')
const { VulmixAliases } = require('./config/aliases')
const { useProjectFolderListener } = require('./utils/useProjectFolderListener')

require('laravel-mix-ejs')

const RELATIVE_ROOT_PATH = relativeVulmixPaths().relativeRootPath
const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths().absoluteRootPath
const RELATIVE_PUBLIC_PATH = relativeVulmixPaths().relativePublicPath
const ABSOLUTE_PACKAGE_PATH = absoluteVulmixPaths().absolutePackagePath
const RELATIVE_PACKAGE_PATH = relativeVulmixPaths().relativePackagePath
const ABSOLUTE_PUBLIC_PATH = absoluteVulmixPaths().absolutePublicPath

const vulmix = {
  globals: {
    rootPath: ABSOLUTE_ROOT_PATH,
  },
}

class VulmixInit {
  name() {
    return 'vulmix'
  }

  register() {
    const VULMIX_CONFIG_PATH = `${ABSOLUTE_ROOT_PATH}/.vulmix/vulmix.config.js`

    const VulmixConfig = require(VULMIX_CONFIG_PATH).default
    const APP_PUBLIC_PATH = VulmixConfig.dirs?.public
      ? `${ABSOLUTE_ROOT_PATH}/${VulmixConfig.dirs?.public?.replace('/', '')}/`
      : `${ABSOLUTE_ROOT_PATH}/public/`

    useConsole.clear()
    useConsole.log(
      `${chalk.grey(`Vulmix ${pkg.version}`)}\n${chalk.blueBright(
        'Warming up...'
      )}`
    )

    mix.options({
      hmrOptions: {
        host: 'localhost',
        port: argv.port,
      },

      processCssUrls: false,
    })

    mix
      .before(() => {
        if (
          fs.existsSync(`${ABSOLUTE_ROOT_PATH}/tailwind.config.js`) &&
          !fs.existsSync(`${ABSOLUTE_ROOT_PATH}/.vulmix/postcss.config.js`)
        ) {
          fs.copyFileSync(
            `${ABSOLUTE_PACKAGE_PATH}/utils/postcss.config.js`,
            `${ABSOLUTE_ROOT_PATH}/.vulmix/postcss.config.js`
          )
        }

        if (!fs.existsSync(`${ABSOLUTE_ROOT_PATH}/vercel.json`)) {
          mix.copy(
            `${ABSOLUTE_PACKAGE_PATH}/utils/deploy/vercel.json`,
            ABSOLUTE_ROOT_PATH
          )
        }
      })

      .webpackConfig(webpack => {
        return {
          plugins: [
            new webpack.DefinePlugin({
              __VUE_OPTIONS_API__: 'true',
              __VUE_PROD_DEVTOOLS__: 'false',
              __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
            }),
            ...UnpluginAutoImports(),
            ...(VulmixConfig.webpackConfig?.plugins || []),
            new ForkTsCheckerWebpackPlugin(),
          ],

          output: {
            assetModuleFilename: pathData => {
              let relativePath = pathData.module.resourceResolveData.path
                .replace(/\\/g, '/')
                .replace(ABSOLUTE_ROOT_PATH, '')

              console.log('path: ', pathData.module.resourceResolveData.path)
              console.log('relativePath', relativePath)

              if (
                /\.(png|jpe?g|gif|svg|webp|avif|ico)$/i.test(pathData.filename)
              ) {
                const transfomed = relativePath.replace(
                  /(.*)\/(.*)\.(png|jpe?g|gif|svg|webp|avif|ico)/,
                  'images'
                )

                console.log('transfomed: ', transfomed)

                return `/${transfomed}/[name][ext][query]`
              }
            },
          },

          resolve: {
            extensions: ['.js', '.vue', '.ts'],
            alias: {
              ...VulmixAliases(),
              ...(VulmixConfig.webpackConfig?.resolve?.alias || {}),
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
              {
                test: /\.s?(c|a)ss$/i,
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    config: fs.existsSync(
                      `${ABSOLUTE_ROOT_PATH}/tailwind.config.js`
                    )
                      ? `${ABSOLUTE_ROOT_PATH}/.vulmix/postcss.config.js`
                      : ABSOLUTE_ROOT_PATH,
                  },
                },
              },
              {
                test: /\.webmanifest$/,
                type: 'json',
              },
            ],
          },
        }
      })

      .vue({
        version: 3,

        options: {
          transformAssetUrls: {
            img: 'src',
            link: 'href',
            video: ['src', 'poster'],
            source: 'src',
            object: 'src',
            embed: 'src',
          },
        },
      })

      .version()

      .extract()

      .disableSuccessNotifications()

    /**
     * Production mode only
     */
    if (mix.inProduction()) {
      try {
        console.log(`\n${chalk.grey('Removing _dist folder')}`)

        fs.rmSync(`${ABSOLUTE_ROOT_PATH}/_dist`, {
          recursive: true,
          force: true,
        })

        if (fs.existsSync(APP_PUBLIC_PATH)) {
          mix.copy(APP_PUBLIC_PATH, `${ABSOLUTE_ROOT_PATH}/_dist/`)
        }

        if (!fs.existsSync(`${ABSOLUTE_ROOT_PATH}/assets`)) {
          fs.mkdirSync(`${ABSOLUTE_ROOT_PATH}/_dist/assets`, {
            recursive: true,
          })
        }
      } catch (error) {
        console.log(`\n${chalk.red(error)}`)
      } finally {
        mix
          .setPublicPath(RELATIVE_PUBLIC_PATH)

          .before(() => {
            useConsole.clear()
            useConsole.log(
              `${chalk.grey(`Vulmix ${pkg.version}`)}\n${chalk.cyan(
                'Preparing production bundle...\n'
              )}`
            )
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
            `${ABSOLUTE_ROOT_PATH}/_dist/_vulmix/js/main.vulmix.js`
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

              // Here I use native console object to block execution before the next message
              console.log(
                chalk.green(
                  `${chalk.grey(
                    `Vulmix ${pkg.version}`
                  )}\n\nOptimized build generated in the ${chalk.yellowBright(
                    getRelativePath(
                      ABSOLUTE_ROOT_PATH,
                      ABSOLUTE_PUBLIC_PATH
                    ).replace(/\.\//g, '')
                  )} folder. You can\ndeploy its contents on any static host.\n`
                )
              )

              useConsole.log(chalk.blueBright('Finishing...\n\n'))
            })
          })
      }
    } else {
      /**
       * Development mode only
       */

      // if server is killed, remove the .vulmix/client folder
      process.on('SIGINT', () => {
        fs.rmSync(`${ABSOLUTE_ROOT_PATH}/.vulmix/client`, {
          recursive: true,
          force: true,
        })
        process.exit()
      })

      try {
        if (fs.existsSync(APP_PUBLIC_PATH)) {
          mix.copy(APP_PUBLIC_PATH, `${ABSOLUTE_ROOT_PATH}/.vulmix/client`)
        }
      } catch (error) {
        console.log(`\n${chalk.red(error)}`)
      }

      mix
        .setPublicPath(`${RELATIVE_ROOT_PATH}/.vulmix/client`)
        .before(() => {
          useConsole.clear()

          useConsole.log(
            `${chalk.grey(`Vulmix ${pkg.version}`)}\n${chalk.cyan(
              'Compiling...\n'
            )}`
          )
        })

        .webpackConfig({
          devtool: 'source-map',
        })

        .ejs(
          [
            `${RELATIVE_PACKAGE_PATH}/src/index.ejs`,
            `${RELATIVE_ROOT_PATH}/.vulmix/client/mix-manifest.json`,
          ],
          `${RELATIVE_ROOT_PATH}/.vulmix/client`,
          VulmixConfig,
          {
            partials: [
              `${RELATIVE_ROOT_PATH}/.vulmix/client/mix-manifest.json`,
            ],
            mixVersioning: true,
          }
        )

        .ts(
          `${ABSOLUTE_PACKAGE_PATH}/src/vue/main.ts`,
          `${ABSOLUTE_ROOT_PATH}/.vulmix/client/_vulmix/js/main.vulmix.js`
        )

        .sourceMaps()

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
                )}\nHMR Server running at: ${chalk.green(
                  `http://localhost:${chalk.greenBright(argv.port)}/\n`
                )}`
              )
            )
          })
        })

        .browserSync({
          proxy: `localhost:${argv.port}`,
          logLevel: 'silent',
          open: false,
          notify: false,
          files: [
            ...useProjectFolderListener(),

            `${ABSOLUTE_ROOT_PATH}/app.{vue,js,ts}`,

            {
              match: `${ABSOLUTE_ROOT_PATH}/vulmix.config.ts`,
              fn: (event, file) => {
                if (event === 'change') {
                  useConsole.log(
                    chalk.cyan('\n\nConfig file changed. Recompiling...\n\n')
                  )

                  execSync(
                    `tsc ${ABSOLUTE_ROOT_PATH}/vulmix.config.ts --outDir ${ABSOLUTE_ROOT_PATH}/.vulmix`,
                    (error, stdout, stderr) => {
                      if (error) {
                        useConsole.log(chalk.red(`exec error: ${error}`))
                        return
                      }

                      useConsole.log(
                        chalk.cyanBright(
                          `\n\n${chalk.greenBright(
                            '✓'
                          )} Recompiling done. Please refresh the page.\n\n`
                        )
                      )
                    }
                  )
                }
              },
            },

            {
              match: `${ABSOLUTE_ROOT_PATH}/.vulmix/vulmix.config.js`,
              fn: (event, file) => {
                if (event === 'change') {
                  // Invalidate require cache
                  delete require.cache[require.resolve(VULMIX_CONFIG_PATH)]

                  const VulmixConfig_1 = require(VULMIX_CONFIG_PATH).default

                  useConsole.log(
                    chalk.cyan('\n\nRegenerating `index.html`...\n\n')
                  )

                  mix.ejs(
                    [
                      `${RELATIVE_PACKAGE_PATH}/src/index.ejs`,
                      `${RELATIVE_ROOT_PATH}/.vulmix/client/mix-manifest.json`,
                    ],
                    `${RELATIVE_ROOT_PATH}/.vulmix/client`,
                    VulmixConfig_1,
                    {
                      partials: [
                        `${RELATIVE_ROOT_PATH}/.vulmix/client/mix-manifest.json`,
                      ],
                      mixVersioning: true,
                    }
                  )
                }
              },
            },
          ],
        })
    }
  }
}

mix.extend('vulmix', new VulmixInit())

module.exports = { vulmix }
