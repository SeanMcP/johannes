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
            case 'D': {
                config.env = ENV.dev
                break
            }
            case 'filename':
            case 'F': {
                config.filename = args[arg]
                break
            }
            case 'input':
            case 'I': {
                config.input = args[arg]
                break
            }
            case 'help':
            case 'H': {
                console.log(`Usage: johannes [options]

Options:
  --dev, -D ............... Set environment to 'development' 
  --input, -I ............. Input file [default: ${defaultConfig.input}]
  --output, -O ............ Build directory [default: ${defaultConfig.output}]
  --filename, -F .......... Build file in directory [default: ${
      defaultConfig.filename
  }]
  --help, -H .............. Output usage information
  --version, -V ........... Output the version number
                `)
                process.exit(0)
            }
            case 'output':
            case 'O': {
                config.output = args[arg]
                break
            }
            case 'version':
            case 'V': {
                console.log(require('../package.json').version)
                process.exit(0)
            }
        }
    }
    return config
}

module.exports = {
    getConfig
}
