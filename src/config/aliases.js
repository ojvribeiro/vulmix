const fs = require('node:fs')
const { absoluteVulmixPaths } = require('./paths')

const VulmixAliases = () => {
  const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths().absoluteRootPath
  const ABSOLUTE_PACKAGE_PATH = absoluteVulmixPaths().absolutePackagePath
  const ABSOLUTE_SRC_PATH = absoluteVulmixPaths().absoluteSrcPath

  return {
    '~': ABSOLUTE_ROOT_PATH,
    '@': ABSOLUTE_SRC_PATH,
    '@@': `${ABSOLUTE_PACKAGE_PATH}/src`,
    '@appFile': fs.existsSync(`${ABSOLUTE_SRC_PATH}/app.vue`)
      ? `${ABSOLUTE_SRC_PATH}/app.vue`
      : fs.existsSync(`${ABSOLUTE_SRC_PATH}/pages/index.vue`) &&
        !fs.existsSync(`${ABSOLUTE_SRC_PATH}/app.vue`)
      ? `${ABSOLUTE_PACKAGE_PATH}/src/vue/pages/app.vue`
      : `${ABSOLUTE_PACKAGE_PATH}/src/vue/pages/404.vue`,
    '@assets': fs.existsSync(`${ABSOLUTE_SRC_PATH}/assets`)
      ? `${ABSOLUTE_SRC_PATH}/assets`
      : false,
    '@icons': fs.existsSync(`${ABSOLUTE_SRC_PATH}/assets/icons`)
      ? `${ABSOLUTE_SRC_PATH}/assets/icons`
      : false,
    '@components': fs.existsSync(`${ABSOLUTE_SRC_PATH}/components`)
      ? `${ABSOLUTE_SRC_PATH}/components`
      : false,
    '@composables': fs.existsSync(`${ABSOLUTE_SRC_PATH}/composables`)
      ? `${ABSOLUTE_SRC_PATH}/composables`
      : false,
    '@layouts': fs.existsSync(`${ABSOLUTE_SRC_PATH}/layouts`)
      ? `${ABSOLUTE_SRC_PATH}/layouts`
      : false,
    '@pages': fs.existsSync(`${ABSOLUTE_SRC_PATH}/pages`)
      ? `${ABSOLUTE_SRC_PATH}/pages`
      : false,
    '@plugins': fs.existsSync(`${ABSOLUTE_SRC_PATH}/plugins`)
      ? `${ABSOLUTE_SRC_PATH}/plugins`
      : false,
    '@404': fs.existsSync(`${ABSOLUTE_SRC_PATH}/404.vue`)
      ? `${ABSOLUTE_SRC_PATH}/404.vue`
      : `${ABSOLUTE_PACKAGE_PATH}/src/vue/pages/404.vue`,
  }
}

module.exports = { VulmixAliases }
