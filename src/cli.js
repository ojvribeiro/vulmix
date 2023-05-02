const fp = require('find-free-port')
const execSync = require('child_process').execSync

execSync(`tsc ./demo/vulmix.config.ts --outDir ./demo/.vulmix`, {
  stdio: 'inherit',
})

fp(3000, function (fpError, freePort) {
  if (fpError) {
    console.log(fpError)

    return
  }

  try {
    const port = freePort

    execSync(`mix watch --hot -- --port=${port}`, { stdio: 'inherit' })
  } catch (err) {
    console.log(err)
  }
})
