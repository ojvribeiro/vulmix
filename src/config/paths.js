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
  return {
    relativePackagePath:
      isDevMode === true
        ? getRelativePath(
            absoluteVulmixPaths(isDevMode).absolutePackagePath,
            absoluteVulmixPaths(isDevMode).absolutePackagePath
          )
        : getRelativePath(
            absoluteVulmixPaths(isDevMode).absoluteRootPath,
            absoluteVulmixPaths(isDevMode).absolutePackagePath
          ),

    relativePublicPath:
      isDevMode === true
        ? getRelativePath(
            absoluteVulmixPaths(isDevMode).absolutePackagePath,
            absoluteVulmixPaths(isDevMode).absolutePublicPath
          )
        : getRelativePath(
            absoluteVulmixPaths(isDevMode).absoluteRootPath,
            absoluteVulmixPaths(isDevMode).absolutePublicPath
          ),
  }
}

module.exports = { absoluteVulmixPaths, relativeVulmixPaths }
