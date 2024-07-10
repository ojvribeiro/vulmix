const path = require('node:path')
const getRelativePath = require('../utils/getRelativePath.js')

const normalizePath = originalPath => {
  return originalPath.replace(/\\/g, '/')
}

const absoluteVulmixPaths = () => {
  return {
    absoluteRootPath: normalizePath(path.resolve(__dirname, '../../../..')),

    absolutePackagePath: normalizePath(path.resolve(__dirname, '../..')),

    absolutePublicPath: normalizePath(
      path.resolve(__dirname, '../../../../_dist')
    ),
  }
}

const relativeVulmixPaths = () => {
  const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths().absoluteRootPath
  const ABSOLUTE_PACKAGE_PATH = absoluteVulmixPaths().absolutePackagePath
  const ABSOLUTE_PUBLIC_PATH = absoluteVulmixPaths().absolutePublicPath

  return {
    relativePackagePath: getRelativePath(
      ABSOLUTE_ROOT_PATH,
      ABSOLUTE_PACKAGE_PATH
    ),

    relativePublicPath: getRelativePath(
      ABSOLUTE_ROOT_PATH,
      ABSOLUTE_PUBLIC_PATH
    ),

    relativeRootPath: getRelativePath(ABSOLUTE_ROOT_PATH, ABSOLUTE_ROOT_PATH),
  }
}

module.exports = { absoluteVulmixPaths, relativeVulmixPaths }
