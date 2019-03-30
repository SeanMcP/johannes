function getId(tag) {
    var output = ''
    if (tag) output += `${tag}-`
    output += Math.floor(Math.random() * new Date().getTime())
        .toString(16)
        .slice(-5)
    return output
}

function camelToKabob(string) {
    // From: https://gist.github.com/nblackburn/875e6ff75bc8ce171c758bf75f304707
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

module.exports = {
    camelToKabob,
    getId
}
