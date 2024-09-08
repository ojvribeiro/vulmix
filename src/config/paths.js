const path = require('node:path')
const getRelativePath = require('../utils/getRelativePath.js')

const normalizePath = originalPath => {
  return originalPath.replace(/\\/g, '/')
}

const absoluteVulmixPaths = () => {
  const absoluteRootPath = normalizePath(path.resolve(__dirname, '../../../..'))
  const absolutePackagePath = normalizePath(path.resolve(__dirname, '../..'))
  const absolutePublicPath = normalizePath(
    path.resolve(__dirname, '../../../../_dist')
  )

  return {
    absoluteRootPath,
    absolutePackagePath,
    absolutePublicPath,
  }
}

const relativeVulmixPaths = () => {
  const ABSOLUTE_ROOT_PATH = absoluteVulmixPaths().absoluteRootPath
  const ABSOLUTE_PACKAGE_PATH = absoluteVulmixPaths().absolutePackagePath
  const ABSOLUTE_PUBLIC_PATH = absoluteVulmixPaths().absolutePublicPath
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

  return {
    relativePackagePath,
    relativePublicPath,
    relativeRootPath,
  }
}

module.exports = { absoluteVulmixPaths, relativeVulmixPaths }
