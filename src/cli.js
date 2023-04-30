const fp = require('find-free-port')
const execSync = require('child_process').execSync

execSync(`tsc ./demo/vulmix.config.ts --outDir ./demo/.vulmix`, {
  stdio: 'inherit',
})

fp(3000, function (err, freePort) {
  try {
    const port = freePort

    execSync(`mix watch --hot -- --port=${port}`, { stdio: 'inherit' })
  } catch (err) {
    console.log(err)
  }
})
