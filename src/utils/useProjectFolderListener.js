const fs = require('node:fs')
const chalk = require('chalk')
const { useConsole } = require('./useConsole')
const { absoluteVulmixPaths } = require('../config/paths.js')

const useProjectFolderListener = (isDevMode = false) => {
  const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths(isDevMode).absoluteRootPath

  const folders = ['assets', 'components', 'layouts', 'pages']

  const objects = []

  folders.forEach(folder => {
    objects.push(
      fs.existsSync(`${ABSOLUTE_ROOT_PATH}/${folder}`)
        ? {
            match: `${ABSOLUTE_ROOT_PATH}/${folder}`,
            fn: async (event, file) => {
              if (event === 'unlinkDir') {
                exec(
                  `tsc ${ABSOLUTE_ROOT_PATH}/vulmix.config.ts --outDir ${ABSOLUTE_ROOT_PATH}/.vulmix`,
                  (error, stdout, stderr) => {
                    if (error) {
                      useConsole.log(chalk.red(`exec error: ${error}`))
                      return
                    }

                    useConsole.log(
                      chalk.yellow(
                        `\n\n${chalk.greenBright('➜')} ${chalk.yellowBright(
                          folder
                        )} folder deleted. Please restart the server to apply changes.\n\n`
                      )
                    )
                  }
                )
              }
            },
          }
        : {
            match: `${ABSOLUTE_ROOT_PATH}/${folder}`,
            fn: async (event, file) => {
              if (event === 'addDir') {
                setTimeout(() => {
                  useConsole.log(
                    chalk.yellow(
                      `\n\n${chalk.greenBright('➜')} ${chalk.yellowBright(
                        folder
                      )} folder created. Please restart the server to apply changes.\n\n`
                    )
                  )
                })
              }
            },
          },

      fs.existsSync(`${ABSOLUTE_ROOT_PATH}/${folder}`) && {
        match: `${ABSOLUTE_ROOT_PATH}/${folder}/**/*.{*}`,
        fn: async (event, file) => {
          if (event === 'change' || event === 'add' || event === 'unlink') {
            exec(
              `tsc ${ABSOLUTE_ROOT_PATH}/vulmix.config.ts --outDir ${ABSOLUTE_ROOT_PATH}/.vulmix`,
              (error, stdout, stderr) => {
                if (error) {
                  useConsole.log(chalk.red(`exec error: ${error}`))
                  return
                }

                useConsole.log(
                  chalk.cyanBright(
                    `\n\n${chalk.greenBright('✓')} Recompiling done.\n\n`
                  )
                )
              }
            )
          }
        },
      }
    )
  })

  return objects
}

module.exports = { useProjectFolderListener }
