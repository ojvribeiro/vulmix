module.exports.useConsole = {
  clear() {
    process.stdout.write('\u001b[2J\u001b[0;0H')
  },

  async log(message) {
    await new Promise(resolve => {
      process.stdout.write(message, resolve)
    })
  },
}
