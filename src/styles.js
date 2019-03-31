function buildBlockCSS(id, styles, theme) {
    // It would be cool if this function could check for and create classes
    // based on common styles.
    var output = ''
    if (styles) {
        output += `#${id} {`
        for (var key in styles) {
            var value = styles[key]
            if (value[0] === '@') {
                var variable = value.slice(1)
                if (theme.variables.hasOwnProperty(variable)) {
                    value = theme.variables[variable]
                } else {
                    throw new Error(
                        `Block "${id}" referenced variable "${variable}" but no variable by name exists in theme variables.`
                    )
                }
            }
            output += `${key}:${value};`
        }
        output += '}'
    }
    return output
}

function buildGlobalCSS(data) {
    var output = ''
    // TODO: Change this ⤵️ when data structure changes
    if (data.theme.styles_v2) {
        var stylesString = 'body {'
        for (var key in data.theme.styles_v2) {
            stylesString += `${key}: ${data.theme.styles_v2[key]};`
        }
        stylesString += '}'
        output += stylesString
    }
    if (data.theme.variables) {
        var variablesString = '.Block {'
        if (data.theme.variables.contentBackground)
            variablesString += `background-color: ${
                data.theme.variables.contentBackground
            };`
        variablesString += '}'
        output += variablesString
    }
    return output
}

module.exports = {
    buildBlockCSS,
    buildGlobalCSS
}