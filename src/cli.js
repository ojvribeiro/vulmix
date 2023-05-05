const fs = require('node:fs')
const execSync = require('node:child_process').execSync
const fp = require('find-free-port')
const chalk = require('chalk')

const pkg = require('../package.json')
const { useConsole } = require('./utils/useConsole.js')
const { absoluteVulmixPaths, isDevMode } = require('./config/paths.js')

const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths().absoluteRootPath
const ABSOLUTE_PACKAGE_PATH = absoluteVulmixPaths().absolutePackagePath

function prepare() {
  if (!fs.existsSync(`${ABSOLUTE_ROOT_PATH}/.vulmix`)) {
    fs.mkdirSync(`${ABSOLUTE_ROOT_PATH}/.vulmix`)
  }

  if (!fs.existsSync(`${ABSOLUTE_ROOT_PATH}/.vulmix/laravel-mix`)) {
    fs.mkdirSync(`${ABSOLUTE_ROOT_PATH}/.vulmix/laravel-mix`)

    copyMixFile()
  } else {
    copyMixFile()
  }

  if (!fs.existsSync(`${ABSOLUTE_ROOT_PATH}/.vulmix/types`)) {
    fs.mkdirSync(`${ABSOLUTE_ROOT_PATH}/.vulmix/types`)

    copyTypes()
  } else {
    copyTypes()
  }

  if (!fs.existsSync(`${ABSOLUTE_ROOT_PATH}/.vulmix/utils`)) {
    fs.mkdirSync(`${ABSOLUTE_ROOT_PATH}/.vulmix/utils`)

    copyUtils()
  } else {
    copyUtils()
  }

  execSync(
    `tsc ${ABSOLUTE_ROOT_PATH}/vulmix.config.ts --outDir ${ABSOLUTE_ROOT_PATH}/.vulmix`,
    {
      stdio: 'inherit',
    }
  )
}

function dev() {
  prepare()

  runLaravelMix('hot')
}

function prod() {
  prepare()

  runLaravelMix('prod')
}

function serve() {
  runLaravelMix('serve')
}

function runLaravelMix(mixCommand) {
  fp(3000, function (fpError, freePort) {
    if (fpError) {
      console.log(fpError)

      return
    }

    try {
      const port = freePort
      const serveCommand = `npx http-server -p ${port} -a localhost ${ABSOLUTE_ROOT_PATH}/_dist --gzip --proxy http://localhost:${port}?`
      const command = `mix${
        mixCommand === 'hot' ? ' watch' : ''
      } --mix-config=${ABSOLUTE_ROOT_PATH}/.vulmix/laravel-mix/webpack.mix.js${
        mixCommand === 'hot' ? ` --hot -- --port=${port}` : ''
      }${
        mixCommand === 'prod' || mixCommand === 'serve' ? ' --production' : ''
      }${mixCommand === 'serve' ? ` && ${serveCommand}` : ''}`

      useConsole.clear()
      useConsole.log(chalk.grey(`Vulmix ${pkg.version}\n`))

      execSync(command, {
        stdio: 'inherit',
      })
    } catch (err) {
      console.log(err)
    }
  })
}

function copyMixFile() {
  fs.copyFileSync(
    `${ABSOLUTE_PACKAGE_PATH}/utils/webpack.mix${isDevMode ? '.dev' : ''}.js`,
    `${ABSOLUTE_ROOT_PATH}/.vulmix/laravel-mix/webpack.mix.js`
  )
}

function copyTypes() {
  fs.copyFileSync(
    `${ABSOLUTE_PACKAGE_PATH}/utils/tsconfig.json`,
    `${ABSOLUTE_ROOT_PATH}/.vulmix/types/tsconfig.json`
  )

  fs.copyFileSync(
    `${ABSOLUTE_PACKAGE_PATH}/types/vue-shims.d.ts`,
    `${ABSOLUTE_ROOT_PATH}/.vulmix/types/vue-shims.d.ts`
  )
}

function copyUtils() {
  fs.copyFileSync(
    `${ABSOLUTE_PACKAGE_PATH}/utils/defineVulmixConfig${
      isDevMode ? '.dev' : ''
    }.ts`,
    `${ABSOLUTE_ROOT_PATH}/.vulmix/utils/defineVulmixConfig.ts`
  )
}

if (process.argv[2] === 'prepare') {
  prepare()
} else if (process.argv[2] === 'dev') {
  dev()
} else if (process.argv[2] === 'prod') {
  prod()
} else if (process.argv[2] === 'serve') {
  serve()
} else {
  console.log(chalk.redBright('Invalid command'))
}
