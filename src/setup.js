var program = require('commander')
var ENV = require('./constants').ENV

var defaultConfig = {
    cwd: process.cwd(),
    input: './data.json',
    output: './site',
    filename: 'index.html',
    stylesFilename: 'styles.min.css'
}

function getConfig() {
    program
        .version(require('../package.json').version)
        .option('-d, --dev', `set environment to 'development'`)
        .option('-i, --input <path>', 'input data file', defaultConfig.input)
        .option('-o, --output <path>', 'build directory', defaultConfig.output)
        .option(
            '-f, --filename <name>',
            'build file in directory',
            defaultConfig.filename
        )
        .parse(process.argv)

    process.env.NODE_ENV = program.dev ? ENV.dev : ENV.prod

    return { ...defaultConfig, ...program }
}

module.exports = {
    getConfig
}
