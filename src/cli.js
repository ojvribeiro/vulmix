const fp = require('find-free-port')

exec(`tsc ./demo/vulmix.config.ts --outDir ./demo/.vulmix`)

fp(3000, function (err, freePort) {
  try {
    const port = freePort

    exec(`mix watch --hot -- --port=${port}`)
  } catch (err) {
    console.log(err)
  }
})
