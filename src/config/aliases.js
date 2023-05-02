const fs = require('node:fs')
const path = require('node:path')
const { absoluteVulmixPaths } = require('./paths')

const VulmixAliases = (isDevMode = false) => {
  return {
    '~': absoluteVulmixPaths(isDevMode).absoluteRootPath,
    '@': path.resolve(
      __dirname,
      `${absoluteVulmixPaths(isDevMode).absolutePackagePath}/src`
    ),
    '@assets':
      fs.existsSync(
        `${absoluteVulmixPaths(isDevMode).absoluteRootPath}/assets`
      ) && `${absoluteVulmixPaths(isDevMode).absoluteRootPath}/assets`,
    '@components':
      fs.existsSync(
        `${absoluteVulmixPaths(isDevMode).absoluteRootPath}/components`
      ) && `${absoluteVulmixPaths(isDevMode).absoluteRootPath}/components`,
    '@composables':
      fs.existsSync(
        `${absoluteVulmixPaths(isDevMode).absoluteRootPath}/composables`
      ) && `${absoluteVulmixPaths(isDevMode).absoluteRootPath}/composables`,
    '@layouts':
      fs.existsSync(
        `${absoluteVulmixPaths(isDevMode).absoluteRootPath}/layouts`
      ) && `${absoluteVulmixPaths(isDevMode).absoluteRootPath}/layouts`,
    '@pages':
      fs.existsSync(
        `${absoluteVulmixPaths(isDevMode).absoluteRootPath}/pages`
      ) && `${absoluteVulmixPaths(isDevMode).absoluteRootPath}/pages`,
  }
}

module.exports = { VulmixAliases }
