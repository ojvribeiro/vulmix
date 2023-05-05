const fs = require('node:fs')
const path = require('node:path')
const { absoluteVulmixPaths } = require('./paths')

const VulmixAliases = () => {
  const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths().absoluteRootPath
  const ABSOLUTE_PACKAGE_PATH =
    absoluteVulmixPaths().absolutePackagePath

  return {
    '~': ABSOLUTE_ROOT_PATH,
    '@': path.resolve(__dirname, `${ABSOLUTE_PACKAGE_PATH}/src`),
    '@assets':
      fs.existsSync(`${ABSOLUTE_ROOT_PATH}/assets`) &&
      `${ABSOLUTE_ROOT_PATH}/assets`,
    '@components':
      fs.existsSync(`${ABSOLUTE_ROOT_PATH}/components`) &&
      `${ABSOLUTE_ROOT_PATH}/components`,
    '@composables':
      fs.existsSync(`${ABSOLUTE_ROOT_PATH}/composables`) &&
      `${ABSOLUTE_ROOT_PATH}/composables`,
    '@layouts':
      fs.existsSync(`${ABSOLUTE_ROOT_PATH}/layouts`) &&
      `${ABSOLUTE_ROOT_PATH}/layouts`,
    '@pages':
      fs.existsSync(`${ABSOLUTE_ROOT_PATH}/pages`) &&
      `${ABSOLUTE_ROOT_PATH}/pages`,
  }
}

module.exports = { VulmixAliases }
