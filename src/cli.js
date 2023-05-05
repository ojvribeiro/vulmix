const fs = require('node:fs')
const execSync = require('node:child_process').execSync
const fp = require('find-free-port')
const { absoluteVulmixPaths, isDevMode } = require('./config/paths.js')

execSync('tsc ./demo/vulmix.config.ts --outDir ./demo/.vulmix', {
  stdio: 'inherit',
})
const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths().absoluteRootPath
const ABSOLUTE_PACKAGE_PATH = absoluteVulmixPaths().absolutePackagePath

if (!fs.existsSync(`${ABSOLUTE_ROOT_PATH}/.vulmix`)) {
  fs.mkdirSync(`${ABSOLUTE_ROOT_PATH}/.vulmix`)
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

fp(3000, function (fpError, freePort) {
  if (fpError) {
    console.log(fpError)

    return
  }

  try {
    const port = freePort

    execSync(`mix watch --hot -- --port=${port}`, { stdio: 'inherit' })
  } catch (err) {
    console.log(err)
  }
})

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
