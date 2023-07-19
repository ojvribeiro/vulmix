const fs = require('node:fs')
const path = require('node:path')
const { absoluteVulmixPaths } = require('./paths')

const VulmixAliases = () => {
  const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths().absoluteRootPath
  const ABSOLUTE_PACKAGE_PATH = absoluteVulmixPaths().absolutePackagePath

  return {
    '~': ABSOLUTE_ROOT_PATH,
    '@': ABSOLUTE_ROOT_PATH,
    '@@': `${ABSOLUTE_PACKAGE_PATH}/src`,
    '@assets':
      fs.existsSync(`${ABSOLUTE_ROOT_PATH}/assets`) ?
      `${ABSOLUTE_ROOT_PATH}/assets` : false,
    '@components':
      fs.existsSync(`${ABSOLUTE_ROOT_PATH}/components`) ?
      `${ABSOLUTE_ROOT_PATH}/components` : false,
    '@composables':
      fs.existsSync(`${ABSOLUTE_ROOT_PATH}/composables`) ?
      `${ABSOLUTE_ROOT_PATH}/composables` : false,
    '@layouts':
      fs.existsSync(`${ABSOLUTE_ROOT_PATH}/layouts`) ?
      `${ABSOLUTE_ROOT_PATH}/layouts` : false,
    '@pages':
      fs.existsSync(`${ABSOLUTE_ROOT_PATH}/pages`) ?
      `${ABSOLUTE_ROOT_PATH}/pages` : false,
    '@stores':
      fs.existsSync(`${ABSOLUTE_ROOT_PATH}/stores`) ?
      `${ABSOLUTE_ROOT_PATH}/stores` : false,
  }
}

module.exports = { VulmixAliases }
