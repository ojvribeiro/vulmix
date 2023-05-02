const path = require('node:path')

module.exports = function getRelativePath(from, to) {
  const relativePath = path.relative(from, to)

  if (relativePath !== '') {
    return './' + relativePath.replace(/\\/gi, '/')
  }

  return '.'
}
