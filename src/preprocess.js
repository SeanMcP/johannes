const { getId } = require('./utils')
const { checkThemeVariable } = require('./styles')

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
        css += `\n${className} { ${obj.property}: ${checkThemeVariable(obj.value, data.theme)}; }`
    }

    return css
}

module.exports = {
    preprocessData
}