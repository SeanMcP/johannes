function getId(tag) {
    var output = ''
    if (tag) output += `${tag}-`
    output += (
        Math.floor(Math.random() * new Date().getTime())
        ).toString(16).slice(-5)
    return output
}

module.exports = {
    getId
}