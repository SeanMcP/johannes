var minimist = require('minimist')
var ENV = require('./constants').ENV

function getConfig() {
    var config = {
        cwd: process.cwd(),
        env: ENV.prod,
        input: './data.json',
        output: './site',
        filename: 'index.html'
    }
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
            case 'output':
            case 'O': {
                config.output = args[arg]
                break
            }
        }
    }
    return config
}

module.exports = {
    getConfig
}
