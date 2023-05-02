const path = require('node:path')
const getRelativePath = require('../utils/getRelativePath.js')

const normalizePath = originalPath => {
  return originalPath.replace(/\\/g, '/')
}

const absoluteVulmixPaths = (isDevMode = false) => {
  return {
    absoluteRootPath:
      isDevMode === true
        ? normalizePath(path.resolve(__dirname, '../../demo'))
        : normalizePath(path.resolve(__dirname, '../../../..')),

    absolutePackagePath: path.resolve(__dirname, '../..'),

    absolutePublicPath:
      isDevMode === true
        ? normalizePath(path.resolve(__dirname, '../../demo/_dist'))
        : normalizePath(path.resolve(__dirname, '../../../../_dist')),
  }
}

const relativeVulmixPaths = (isDevMode = false) => {
  const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths(isDevMode).absoluteRootPath
  const ABSOLUTE_PACKAGE_PATH =
    absoluteVulmixPaths(isDevMode).absolutePackagePath
  const ABSOLUTE_PUBLIC_PATH = absoluteVulmixPaths(isDevMode).absolutePublicPath

  return {
    relativePackagePath:
      isDevMode === true
        ? getRelativePath(ABSOLUTE_PACKAGE_PATH, ABSOLUTE_PACKAGE_PATH)
        : getRelativePath(ABSOLUTE_ROOT_PATH, ABSOLUTE_PACKAGE_PATH),

    relativePublicPath:
      isDevMode === true
        ? getRelativePath(ABSOLUTE_PACKAGE_PATH, ABSOLUTE_PUBLIC_PATH)
        : getRelativePath(ABSOLUTE_ROOT_PATH, ABSOLUTE_PUBLIC_PATH),
  }
}

module.exports = { absoluteVulmixPaths, relativeVulmixPaths }
