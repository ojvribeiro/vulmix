/**
 * Vulmix
 * This file is intended to be used for testing purposes
 * only. It is not part of the main package.
 */

const mix = require('laravel-mix')
const { argv } = require('yargs')

require('./src/mix.js')

mix
  .options({
    hmrOptions: {
      host: 'localhost',
      port: argv.port,
    },
  })

  .vulmix({ dev: true })
