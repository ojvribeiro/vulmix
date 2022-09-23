const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../.vulmix'),
      '@assets': path.resolve(__dirname, '../assets'),
      '@components': path.resolve(__dirname, '../components'),
      '@composables': path.resolve(__dirname, '../composables'),
      '@pages': path.resolve(__dirname, '../pages'),
      '@sass': path.resolve(__dirname, '../assets/sass'),
    },
  },
}
