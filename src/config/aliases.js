const fs = require('node:fs')
const { absoluteVulmixPaths } = require('./paths')

const VulmixAliases = () => {
  const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths().absoluteRootPath
  const ABSOLUTE_PACKAGE_PATH = absoluteVulmixPaths().absolutePackagePath

  return {
    '~': ABSOLUTE_ROOT_PATH,
    '@': ABSOLUTE_ROOT_PATH,
    '@@': `${ABSOLUTE_PACKAGE_PATH}/src`,
    '@appFile': fs.existsSync(`${ABSOLUTE_ROOT_PATH}/app.vue`)
      ? `${ABSOLUTE_ROOT_PATH}/app.vue`
      : fs.existsSync(`${ABSOLUTE_ROOT_PATH}/pages/index.vue`) &&
        !fs.existsSync(`${ABSOLUTE_ROOT_PATH}/app.vue`)
      ? `${ABSOLUTE_PACKAGE_PATH}/src/vue/pages/app.vue`
      : `${ABSOLUTE_PACKAGE_PATH}/src/vue/pages/404.vue`,
    '@assets': fs.existsSync(`${ABSOLUTE_ROOT_PATH}/assets`)
      ? `${ABSOLUTE_ROOT_PATH}/assets`
      : false,
    '@components': fs.existsSync(`${ABSOLUTE_ROOT_PATH}/components`)
      ? `${ABSOLUTE_ROOT_PATH}/components`
      : false,
    '@composables': fs.existsSync(`${ABSOLUTE_ROOT_PATH}/composables`)
      ? `${ABSOLUTE_ROOT_PATH}/composables`
      : false,
    '@layouts': fs.existsSync(`${ABSOLUTE_ROOT_PATH}/layouts`)
      ? `${ABSOLUTE_ROOT_PATH}/layouts`
      : false,
    '@pages': fs.existsSync(`${ABSOLUTE_ROOT_PATH}/pages`)
      ? `${ABSOLUTE_ROOT_PATH}/pages`
      : false,
    '@plugins': fs.existsSync(`${ABSOLUTE_ROOT_PATH}/plugins`)
      ? `${ABSOLUTE_ROOT_PATH}/plugins`
      : false,
    '@404': fs.existsSync(`${ABSOLUTE_ROOT_PATH}/404.vue`)
      ? `${ABSOLUTE_ROOT_PATH}/404.vue`
      : `${ABSOLUTE_PACKAGE_PATH}/src/vue/pages/404.vue`,
  }
}

module.exports = { VulmixAliases }
