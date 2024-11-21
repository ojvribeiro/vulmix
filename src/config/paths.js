const path = require('node:path')
const getRelativePath = require('../utils/getRelativePath.js')

const normalizePath = originalPath => {
  return originalPath.replace(/\\/g, '/')
}

const absoluteVulmixPaths = () => {
  const absoluteRootPath = normalizePath(path.resolve(__dirname, '../../../..'))
  const VULMIX_CONFIG_PATH = `${absoluteRootPath}/.vulmix/vulmix.config.js`
  const VulmixConfig = require(VULMIX_CONFIG_PATH).default
  const absolutePackagePath = normalizePath(path.resolve(__dirname, '../..'))
  const absolutePublicPath = normalizePath(
    path.resolve(
      __dirname,
      `${absoluteRootPath}/_dist${
        VulmixConfig?.dirs?.dist?.root &&
        VulmixConfig?.dirs?.dist?.root.startsWith('/')
          ? VulmixConfig?.dirs?.dist?.root
          : `/${VulmixConfig?.dirs?.dist?.root}` || ''
      }`
    )
  )
  const absoluteSrcPath = normalizePath(
    path.resolve(
      __dirname,
      `${absoluteRootPath}/${VulmixConfig?.dirs?.src || ''}`
    )
  )

  return {
    absoluteRootPath,
    absolutePackagePath,
    absolutePublicPath,
    absoluteSrcPath,
  }
}

const relativeVulmixPaths = () => {
  const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths().absoluteRootPath
  const ABSOLUTE_PACKAGE_PATH = absoluteVulmixPaths().absolutePackagePath
  const ABSOLUTE_PUBLIC_PATH = absoluteVulmixPaths().absolutePublicPath
  const ABSOLUTE_SRC_PATH = absoluteVulmixPaths().absoluteSrcPath

  const relativePackagePath = getRelativePath(
    ABSOLUTE_ROOT_PATH,
    ABSOLUTE_PACKAGE_PATH
  )
  const relativePublicPath = getRelativePath(
    ABSOLUTE_ROOT_PATH,
    ABSOLUTE_PUBLIC_PATH
  )
  const relativeRootPath = getRelativePath(
    ABSOLUTE_ROOT_PATH,
    ABSOLUTE_ROOT_PATH
  )
  const relativeSrcPath = getRelativePath(ABSOLUTE_ROOT_PATH, ABSOLUTE_SRC_PATH)

  return {
    relativePackagePath,
    relativePublicPath,
    relativeRootPath,
    relativeSrcPath,
  }
}

module.exports = { absoluteVulmixPaths, relativeVulmixPaths }
