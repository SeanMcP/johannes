const { getId } = require('./utils')

function preprocessData() {
    const styleCounter = {}
    global.data.content.forEach(function(block) {
        block.id = getId(block.type)

        for (const key in block.styles) {
            const className = `.--${key}--${block.styles[key]}`
            if (!styleCounter[className]) {
                styleCounter[className] = {
                    property: [key],
                    value: block.styles[key]
                }
            }
        }
    })

    let css = ''
    for (const className in styleCounter) {
        const obj = styleCounter[className]
        // TODO: Check if value is variable, substitute
        // from global.data.theme
        css += `
            ${className} {
                ${obj.property}: ${obj.value};
            }
        `
    }

    console.log(css)

    return css
}

module.exports = {
    preprocessData
}