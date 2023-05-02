const path = require('node:path')

module.exports = function getRelativePath(from, to) {
  const relativePath = path.relative(from, to)

  if (relativePath !== '') {
    // Replace Windows backslashes with forward slashes
    return './' + relativePath.replace(/\\/gi, '/')
  }

  // If `relative` returns an empty string, we're already in the same directory
  return '.'
}
