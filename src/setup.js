var minimist = require('minimist')
var ENV = require('./constants').ENV

var defaultConfig = {
    cwd: process.cwd(),
    env: ENV.prod,
    input: './data.json',
    output: './site',
    filename: 'index.html'
}

function getConfig() {
    var config = { ...defaultConfig }
    var args = minimist(process.argv.slice(2))

    for (const arg in args) {
        switch (arg) {
            case 'dev':
            case 'd': {
                config.env = ENV.dev
                break
            }
            case 'filename':
            case 'f': {
                config.filename = args[arg]
                break
            }
            case 'input':
            case 'i': {
                config.input = args[arg]
                break
            }
            case 'output':
            case 'o': {
                config.output = args[arg]
                break
            }
            case 'version':
            case 'v': {
                console.log(require('../package.json').version)
                process.exit(0)
            }
            case 'help':
            case 'h': {
                console.log(`Usage: johannes [options]

Options:
  --dev, -d ............... Set environment to 'development' 
  --input, -i ............. Input file [default: ${defaultConfig.input}]
  --output, -o ............ Build directory [default: ${defaultConfig.output}]
  --filename, -f .......... Build file in directory [default: ${
      defaultConfig.filename
  }]
  --help, -h .............. Output usage information
  --version, -v ........... Output the version number
                `)
                process.exit(0)
            }
        }
    }
    return config
}

module.exports = {
    getConfig
}
