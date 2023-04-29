const fp = require('find-free-port')
const chalk = require('chalk')
const exec = require('child_process').exec
const pkg = require('../package.json')

exec(`tsc ./demo/vulmix.config.ts --outDir ./demo/.vulmix`)

fp(3000, function (err, freePort) {
  try {
    const port = freePort

    exec(`mix watch --hot -- --port=${port}`)

    console.log(
      chalk.blueBright(
        `${chalk.grey(
          `\nVulmix ${pkg.version}`
        )}\nHMR Server running at: ${chalk.greenBright(
          `http://localhost:${port}`
        )}`
      )
    )
  } catch (err) {
    console.log(err)
  }
})
