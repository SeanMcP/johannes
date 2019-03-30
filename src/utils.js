function getId(tag) {
    var output = ''
    if (tag) output += `${tag}-`
    output += Math.floor(Math.random() * new Date().getTime())
        .toString(16)
        .slice(-5)
    return output
}

function camelToKabob(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

module.exports = {
    camelToKabob,
    getId
}