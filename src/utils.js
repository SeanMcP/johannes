var ENV = require('./constants').ENV

function camelToKabob(string) {
    // From: https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1)
}

function getClass(condition, className, defaultValue = undefined) {
    if (condition) {
        return className
    }
    return defaultValue
}

function getId(tag) {
    // From: https://gist.github.com/gordonbrander/2230317
    var output = tag ? `${tag}-` : ''
    output += Math.random()
        .toString(36)
        .substr(2, 5)
    return output
}

function ifDev(fn) {
    if (process.env.NODE_ENV === ENV.dev && typeof fn === 'function') {
        fn()
    }
}

function startProcess(message) {
    const startTime = new Date().getTime()
    process.stdout.write(message)
    return startTime
}

function finishProcess(startTime) {
    process.stdout.write(` (${new Date().getTime() - startTime}ms)\n`)
}

function logProcess(message, blockingAction) {
    const start = startProcess(message)
    const output = blockingAction()
    finishProcess(start)
    return output
}

module.exports = {
    camelToKabob,
    capitalize,
    getClass,
    getId,
    ifDev,
    logProcess
}
